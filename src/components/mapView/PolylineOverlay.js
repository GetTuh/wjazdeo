import React, { PureComponent } from "react";
import { CanvasOverlay } from "react-map-gl";
export default class PolylineOverlay extends PureComponent {
  _redraw({ width, height, ctx, isDragging, project }) {
    const { color = "blue", lineWidth = 2, points } = this.props;
    async function returnRoute(points) {
      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = "lighter";

      if (!isDragging && (await points)) {
        points = await points;
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = color;
        ctx.beginPath();
        points.forEach((point) => {
          const pixel = project([point[0], point[1]]);
          ctx.lineTo(pixel[0], pixel[1]);
        });
        ctx.stroke();
      }
    }
    returnRoute(points);
  }

  render() {
    return <CanvasOverlay redraw={this._redraw.bind(this)} />;
  }
}
