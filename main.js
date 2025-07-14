import L from "leaflet";
import "leaflet.markercluster";
import "./lib/main";

const tileUrl = "http://localhost:8080/maptiler/madrid/{z}/{x}/{y}.png";
const renderer = L.labelsRenderer({
  propertyName: "name",
  font: { size: 13 },
});

const map = L.map("map", { renderer }).setView([70, -70], 2);

L.tileLayer(tileUrl, {
  noWrap: true,
  minZoom: 2,
  maxZoom: 7,
}).addTo(map);

map.doubleClickZoom.disable();

const maxBounds = L.latLngBounds([-80, 180], [100, -180]);
map.setMaxBounds(maxBounds);

fetch("http://localhost:8080/api/bombero-callejero/street-map/zones?id=89")
  .then((res) => res.json())
  .then(({ zones }) => {
    const primaryStreets = L.geoJson(zones.primaryStreets, {
      style: { color: "transparent" },
    });

    const secondaryStreets = L.geoJson(zones.secondaryStreets, {
      style: { color: "transparent" },
    });
    const cluster = L.markerClusterGroup({
      showCoverageOnHover: false,
    });

    zones.equipments.forEach((equipment) => {
      const { properties, geometry } = equipment;
      const marker = L.marker(
        [geometry.coordinates[1], geometry.coordinates[0]],
        {
          icon: L.icon({
            iconUrl: properties.icon,
            iconSize: [32, 32],
            iconAnchor: [32, 32],
          }),
        }
      );

      marker.bindPopup(`<strong>${properties.name}</strong>`);

      cluster.addLayer(marker);
    });

    map.addLayer(primaryStreets);

    map.on("zoomend", () => {
      const zoom = map.getZoom();

      if (zoom > 4) {
        map.addLayer(secondaryStreets);
        map.addLayer(cluster);
      }
    });
  });
