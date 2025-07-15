import "./ctxtextpath";

L.LabelsRenderer = L.Canvas.extend({
  initialize: function (options) {
    L.setOptions(this, options);
    L.Util.stamp(this);
    this._layers = this._layers ?? {};
  },

  _initContainer: function () {
    L.Canvas.prototype._initContainer.call(this);

    this._labelsContainer = document.createElement("canvas");
    this._labelsCtx = this._labelsContainer.getContext("2d");

    L.DomEvent.on(this._labelsContainer, "click", this._onClick, this);
    L.DomUtil.addClass(this._labelsContainer, "leaflet-zoom-animated");

    this.getPane().appendChild(this._labelsContainer);
  },

  _updateTransform: function (center, zoom) {
    L.Canvas.prototype._updateTransform.call(this, center, zoom);

    const scale = this._map.getZoomScale(zoom, this._zoom);
    const position = L.DomUtil.getPosition(this._container);
    const viewHalf = this._map.getSize().multiplyBy(0.5 + this.options.padding);
    const currentCenterPoint = this._map.project(this._center, zoom);
    const destCenterPoint = this._map.project(center, zoom);
    const centerOffset = destCenterPoint.subtract(currentCenterPoint);
    const topLeftOffset = viewHalf
      .multiplyBy(-scale)
      .add(position)
      .add(viewHalf)
      .subtract(centerOffset);

    if (L.Browser.any3d) {
      L.DomUtil.setTransform(this._labelsContainer, topLeftOffset, scale);
    } else {
      L.DomUtil.setPosition(this._labelsContainer, topLeftOffset);
    }
  },

  _update: function () {
    this._invalidBounds = [];

    L.Renderer.prototype._update.call(this);
    L.DomUtil.setPosition(this._labelsContainer, this._bounds.min);

    const offset = L.Browser.retina ? 2 : 1;
    const size = this._bounds.getSize();

    this._labelsContainer.width = offset * size.x;
    this._labelsContainer.height = offset * size.y;
    this._labelsContainer.style.width = size.x + "px";
    this._labelsContainer.style.height = size.y + "px";

    this._labelsContainer.style.zIndex = "4";
    this._container.style.zIndex = "3";

    if (L.Browser.retina) {
      this._labelsCtx.scale(2, 2);
    }

    this._labelsCtx.translate(-this._bounds.min.x, -this._bounds.min.y);
    L.Canvas.prototype._update.call(this);
  },

  _draw: function () {
    L.Canvas.prototype._draw.call(this);
    this._renderLabels(this._labelsCtx, this.options);
  },

  _renderLabels: function (ctx, options) {
    const polylines = [];
    const paths = [];

    for (const key in this._layers) {
      if (this._layers[key]?.feature?.geometry?.type == "LineString") {
        polylines.push(this._layers[key]);
      }
    }

    polylines.forEach((polyline) => {
      if (this._shouldDrawPolyline(polyline)) {
        const polylinePaths = this._getPolylinePaths(polyline);
        paths.push(...polylinePaths);
      }
    });

    if (paths.length) {
      ctx.globalAlpha = 1;
      ctx.lineJoin = "round";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.lineWidth = options.font?.lineWidth ?? 4;
      ctx.fillStyle = options.font?.fill ?? "black";
      ctx.strokeStyle = options.font?.stroke ?? "transparent";
      ctx.font = `${
        options.font?.size ?? 10
      }px 'Helvetica Neue',Helvetica,Arial,sans-serif`;

      paths.forEach(({ label, points }) => {
        ctx.textPath(label, points);
      });
    }
  },

  _shouldDrawPolyline: function (layer) {
    const { feature } = layer;
    const label = feature?.properties?.[this.options.propertyName];

    if (!label || layer._parts.length === 0) {
      return false;
    }

    if (typeof this.options.showLabelIf === "function") {
      if (this.options.showLabelIf(feature) === false) {
        return false;
      }
    }

    const center = this._getCenter(layer._parts[0]);
    const textWidth = this._labelsCtx.measureText(label).width + center.x;
    const textHeight = center.y + 20;
    const bounds = L.bounds(center, L.point(textWidth, textHeight));

    const collisionDetected = this._invalidBounds.some((invalidBounds) => {
      return invalidBounds.intersects(bounds);
    });

    if (collisionDetected) return false;

    this._invalidBounds.push(bounds);
    return true;
  },

  _getPolylinePaths: function (layer) {
    const label = layer.feature?.properties?.[this.options.propertyName];
    const latlngs = layer.getLatLngs();
    const startCoords = latlngs[0];
    const stopCoords = latlngs[latlngs.length - 1];

    if (this._getBearing(startCoords, stopCoords) < 0) {
      layer = this._getLineStringReverse(layer);
    }

    return layer._parts.map((part) => {
      const points = part.map(({ x, y }) => [x, y]).flat();
      return { label, points };
    });
  },

  /**
   * Returns the bearing in degrees clockwise from north (0 degrees)
   * from the first L.LatLng to the second, at the first LatLng
   *
   * @param {L.LatLng} startCoords: origin point of the bearing
   * @param {L.LatLng} stopCoords: destination point of the bearing
   * @returns {number} degrees clockwise from north.
   *
   * - Source: https://makinacorpus.github.io/Leaflet.GeometryUtil/leaflet.geometryutil.js.html
   */
  _getBearing: function (startCoords, stopCoords) {
    const radius = Math.PI / 180;
    const lat1 = startCoords.lat * radius;
    const lat2 = stopCoords.lat * radius;
    const lon1 = startCoords.lng * radius;
    const lon2 = stopCoords.lng * radius;

    const y = Math.sin(lon2 - lon1) * Math.cos(lat2);
    const x =
      Math.cos(lat1) * Math.sin(lat2) -
      Math.sin(lat1) * Math.cos(lat2) * Math.cos(lon2 - lon1);

    const bearing = ((Math.atan2(y, x) * 180) / Math.PI + 360) % 360;

    return bearing >= 180 ? bearing - 360 : bearing;
  },

  /**
   * Returns a clone with reversed coordinates.
   *
   * @param {L.PolyLine} polyline polyline to reverse
   * @returns {L.PolyLine} polyline reversed
   *
   * - Source: https://makinacorpus.github.io/Leaflet.GeometryUtil/leaflet.geometryutil.js.html
   */
  _getLineStringReverse: function (polyline) {
    const latLngs = polyline.getLatLngs().slice(0).reverse();
    polyline.setLatLngs(latLngs);

    return polyline;
  },

  _getCenter: function (points) {
    let halfDistance = 0;
    let distance = 0;

    if (!points.length) {
      return null;
    }

    // polyline centroid algorithm; only uses the first ring if
    // there are multiple
    for (let i = 0; i < points.length - 1; i++) {
      halfDistance += points[i].distanceTo(points[i + 1]) / 2;
    }

    // The line is so small in the current view that all points are
    // on the same pixel.
    if (halfDistance === 0) return points[0];

    for (let i = 0; i < points.length - 1; i++) {
      const point1 = points[i];
      const point2 = points[i + 1];
      const segmentDistance = point1.distanceTo(point2);
      distance += segmentDistance;

      if (distance > halfDistance) {
        const ratio = (distance - halfDistance) / segmentDistance;
        const result = [
          point2.x - ratio * (point2.x - point1.x),
          point2.y - ratio * (point2.y - point1.y),
        ];

        return L.point(result[0], result[1]);
      }
    }
  },
});

L.labelsRenderer = (options) => {
  return new L.LabelsRenderer(options);
};
