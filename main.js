const renderer = L.labelsRenderer({
  propertyName: "name",
  font: { size: 13 },
});

const map = L.map("map", {
  renderer,
}).setView([23.13, -82.3666], 14);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

const streetsData = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: {
        name: "Malecón de La Habana",
      },
      geometry: {
        type: "LineString",
        coordinates: [
          [-82.4115, 23.1412],
          [-82.412, 23.1415],
          [-82.4125, 23.1418],
          [-82.413, 23.142],
          [-82.4135, 23.1423],
        ],
      },
    },
    {
      type: "Feature",
      properties: {
        name: "Calle 23",
      },
      geometry: {
        type: "LineString",
        coordinates: [
          [-82.398, 23.138],
          [-82.3985, 23.1382],
          [-82.399, 23.1385],
          [-82.3995, 23.1388],
          [-82.4, 23.139],
        ],
      },
    },
    {
      type: "Feature",
      properties: {
        name: "Avenida Paseo",
      },
      geometry: {
        type: "LineString",
        coordinates: [
          [-82.405, 23.135],
          [-82.4055, 23.1355],
          [-82.406, 23.136],
          [-82.4065, 23.1365],
          [-82.407, 23.137],
        ],
      },
    },
    {
      type: "Feature",
      properties: {
        name: "Calle Obispo",
      },
      geometry: {
        type: "LineString",
        coordinates: [
          [-82.366, 23.137],
          [-82.3665, 23.1368],
          [-82.367, 23.1365],
          [-82.3675, 23.1363],
          [-82.368, 23.136],
        ],
      },
    },
    {
      type: "Feature",
      properties: {
        name: "Avenida de los Presidentes",
      },
      geometry: {
        type: "LineString",
        coordinates: [
          [-82.39, 23.13],
          [-82.3905, 23.1305],
          [-82.391, 23.131],
          [-82.3915, 23.1315],
          [-82.392, 23.132],
        ],
      },
    },
    {
      type: "Feature",
      properties: {
        name: "Calle San Lázaro",
      },
      geometry: {
        type: "LineString",
        coordinates: [
          [-82.375, 23.14],
          [-82.3755, 23.1398],
          [-82.376, 23.1395],
          [-82.3765, 23.1393],
          [-82.377, 23.139],
        ],
      },
    },
    {
      type: "Feature",
      properties: {
        name: "Calle Línea",
      },
      geometry: {
        type: "LineString",
        coordinates: [
          [-82.42, 23.125],
          [-82.4205, 23.1255],
          [-82.421, 23.126],
          [-82.4215, 23.1265],
          [-82.422, 23.127],
        ],
      },
    },
    {
      type: "Feature",
      properties: {
        name: "Calle G",
      },
      geometry: {
        type: "LineString",
        coordinates: [
          [-82.385, 23.12],
          [-82.3855, 23.1205],
          [-82.386, 23.121],
          [-82.3865, 23.1215],
          [-82.387, 23.122],
        ],
      },
    },
    {
      type: "Feature",
      properties: {
        name: "Calle Neptuno",
      },
      geometry: {
        type: "LineString",
        coordinates: [
          [-82.36, 23.135],
          [-82.3605, 23.1348],
          [-82.361, 23.1345],
          [-82.3615, 23.1343],
          [-82.362, 23.134],
        ],
      },
    },
    {
      type: "Feature",
      properties: {
        name: "Calle Virtudes",
      },
      geometry: {
        type: "LineString",
        coordinates: [
          [-82.37, 23.142],
          [-82.3705, 23.1418],
          [-82.371, 23.1415],
          [-82.3715, 23.1413],
          [-82.372, 23.141],
        ],
      },
    },
    {
      type: "Feature",
      properties: {
        name: "Calle Amargura",
      },
      geometry: {
        type: "LineString",
        coordinates: [
          [-82.35, 23.13],
          [-82.3505, 23.1298],
          [-82.351, 23.1295],
          [-82.3515, 23.1293],
          [-82.352, 23.129],
        ],
      },
    },
    {
      type: "Feature",
      properties: {
        name: "Calle Oficios",
      },
      geometry: {
        type: "LineString",
        coordinates: [
          [-82.348, 23.138],
          [-82.3485, 23.1378],
          [-82.349, 23.1375],
          [-82.3495, 23.1373],
          [-82.35, 23.137],
        ],
      },
    },
    {
      type: "Feature",
      properties: {
        name: "Calle Mercaderes",
      },
      geometry: {
        type: "LineString",
        coordinates: [
          [-82.355, 23.14],
          [-82.3555, 23.1398],
          [-82.356, 23.1395],
          [-82.3565, 23.1393],
          [-82.357, 23.139],
        ],
      },
    },
    {
      type: "Feature",
      properties: {
        name: "Calle Brasil",
      },
      geometry: {
        type: "LineString",
        coordinates: [
          [-82.358, 23.135],
          [-82.3585, 23.1348],
          [-82.359, 23.1345],
          [-82.3595, 23.1343],
          [-82.36, 23.134],
        ],
      },
    },
    {
      type: "Feature",
      properties: {
        name: "Calle Habana",
      },
      geometry: {
        type: "LineString",
        coordinates: [
          [-82.365, 23.125],
          [-82.3655, 23.1248],
          [-82.366, 23.1245],
          [-82.3665, 23.1243],
          [-82.367, 23.124],
        ],
      },
    },
    {
      type: "Feature",
      properties: {
        name: "Calle Compostela",
      },
      geometry: {
        type: "LineString",
        coordinates: [
          [-82.368, 23.132],
          [-82.3685, 23.1318],
          [-82.369, 23.1315],
          [-82.3695, 23.1313],
          [-82.37, 23.131],
        ],
      },
    },
    {
      type: "Feature",
      properties: {
        name: "Calle Acosta",
      },
      geometry: {
        type: "LineString",
        coordinates: [
          [-82.372, 23.128],
          [-82.3725, 23.1278],
          [-82.373, 23.1275],
          [-82.3735, 23.1273],
          [-82.374, 23.127],
        ],
      },
    },
    {
      type: "Feature",
      properties: {
        name: "Calle Aguacate",
      },
      geometry: {
        type: "LineString",
        coordinates: [
          [-82.375, 23.13],
          [-82.3755, 23.1298],
          [-82.376, 23.1295],
          [-82.3765, 23.1293],
          [-82.377, 23.129],
        ],
      },
    },
    {
      type: "Feature",
      properties: {
        name: "Calle Lamparilla",
      },
      geometry: {
        type: "LineString",
        coordinates: [
          [-82.378, 23.135],
          [-82.3785, 23.1348],
          [-82.379, 23.1345],
          [-82.3795, 23.1343],
          [-82.38, 23.134],
        ],
      },
    },
    {
      type: "Feature",
      properties: {
        name: "Calle Sol",
      },
      geometry: {
        type: "LineString",
        coordinates: [
          [-82.38, 23.14],
          [-82.3805, 23.1398],
          [-82.381, 23.1395],
          [-82.3815, 23.1393],
          [-82.382, 23.139],
        ],
      },
    },
  ],
};

L.geoJSON(streetsData, {
  style: {
    weight: 5,
  },
}).addTo(map);
