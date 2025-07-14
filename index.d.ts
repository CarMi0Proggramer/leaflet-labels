import * as L from "leaflet";

declare namespace L {
  interface Feature {
    type: string;
    geometry: {
      coordinates: number[] | number[][] | number[][][];
      type: "Polygon" | "LineString" | "Point" | "MultiLineString";
    };
    properties: Record<string, unknown>;
  }

  interface LabelsRendererOptions {
    /**
     * Property of the feature to use as the label
     */
    propertyName: string;
    showLabelIf?: (feature: Feature) => boolean;
    font?: {
      /**
       * Font size in pixels
       */
      size?: number;
      /**
       * Fill color of the text
       */
      fill?: string;
      /**
       * Stroke color of the text
       */
      stroke?: string;
      lineWidth?: number;
    };
  }

  class LabelsRenderer extends Canvas {}

  /**
   * Creates a canvas renderer with support for adding labels
   * @param {CanvasRendererOptions} options
   */
  function labelsRenderer(options: LabelsRendererOptions): LabelsRenderer {}
}
