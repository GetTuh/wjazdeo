import React, { PureComponent } from "react";
import { CanvasOverlay } from "react-map-gl";

export default class PolylineOverlay extends PureComponent {
  _redraw({ width, height, ctx, isDragging, project }) {
    const {
      color = "red",
      lineWidth = 2,
      renderWhileDragging = true,
      from,
      to,
    } = this.props;
    let points;
    async function returnRoute(from, to) {
      if (isDragging) points = null;
      else {
        points = await fetch(
          `https://api.mapbox.com/directions/v5/mapbox/driving/${from[0]},${from[1]};${to[0]},${to[1]}?geometries=geojson&access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`
        )
          .then((response) => response.json())
          .then((data) => data.routes[0].geometry.coordinates);
      }
      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = "lighter";
      if ((renderWhileDragging || !isDragging) && points) {
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = color;
        ctx.beginPath();
        await points.forEach((point) => {
          const pixel = project([point[0], point[1]]);
          ctx.lineTo(pixel[0], pixel[1]);
        });
        ctx.stroke();
      }
    }
    returnRoute(from, to);
  }

  render() {
    return <CanvasOverlay redraw={this._redraw.bind(this)} />;
  }
}
