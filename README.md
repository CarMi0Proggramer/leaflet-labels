# Leaflet - LabelsRenderer Plugin

This is a `leaflet.js` plugin that adds support for rendering labels along the path in `Polylines` and its based on the famous `L.StreetLabels` and `L.LabelTextCollision` plugins. This plugin aims to provide a faster renderer time than the other plugins mentioned above by using asynchronous functions to draw the draw the labels.

# Usage

To use the plugin makes sure to import leaflet before using it. You can use this plugin in two different ways:

- Install via npm:

```bash
npm install leaflet-labels
```

Then make sure to import the plugin before you leaflet import.

```js
import L from "leaflet";
import "leaflet-labels";
```

- Adding a script tag:

Download the `leaflet-labels.js` file from the `dist` folder and add the following script tag.

```js
<script src="/path/to/leaflet.js"></script>
<script src="/path/to/leaflet-labels.js"></script>
```

That's it, you can start using the plugin:

```js
const renderer = L.labelsRenderer({
  propertyName: "name", // Property that contains the label text,
  font: {
    size: 13, // Size in pixels,
    fill: "black",
    stroke: "transparent",
    lineWidth: 4,
  },
  showLabelIf: (feature) => feature.properties.isPrimary == true,
});
const map = L.map({ renderer });

// Rest map configuration...
```
