# Leaflet - Plugin LabelsRenderer

This is a plugin for `leaflet.js` that adds support for rendering labels along the path of Polylines. It is based on the popular plugins `L.StreetLabels` and `L.LabelTextCollision`. This plugin aims to provide faster rendering times for drawing labels.

## Installation

To install and use the plugin, choose one of these methods:

### Using package managers

```bash
npm install leaflet-labels-renderer
# or
bun add leaflet-labels-renderer
# or
pnpm add leaflet-labels-renderer
```

### Manual installation

Follow these steps if you prefer not to use a package manager:

### 1. Generate the build

First, you need to generate the plugin build by running the following command:

```bash
npm run build
```

### 2. Include the plugin in your project

Make sure to include the `leaflet-labels.js` file from the `dist` folder in your project. You can do this by adding the following line to your HTML:

```html
<script src="/path/to/leaflet.js"></script>
<script src="/path/to/leaflet-labels.js"></script>
```

### 3. Use the plugin

To use the plugin, simply create an instance of `L.LabelsRenderer` or use the `L.labelsRenderer` function and add it to your map. Here's a basic example:

```javascript
const renderer = L.labelsRenderer({
  propertyName: "name", // Property containing the label text,
  font: {
    size: 13, // Font size in pixels,
    fill: "black",
    stroke: "transparent",
    lineWidth: 4,
  },
  showLabelIf: (feature) => feature.properties.isPrimary == true,
});

const map = L.map({ renderer });

// Additional map setup...
```
