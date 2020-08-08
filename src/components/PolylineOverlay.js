import React, { PureComponent } from 'react'
import { CanvasOverlay } from 'react-map-gl'

export default class PolylineOverlay extends PureComponent {
  _redraw ({ width, height, ctx, isDragging, project, unproject }) {
    const {color = 'red', lineWidth = 2, renderWhileDragging = true, from, to } = this.props

    async function returnRoute(from,to) {
      const points = await fetch(`https://api.mapbox.com/directions/v5/mapbox/driving/${from[0]},${from[1]};${to[0]},${to[1]}?geometries=geojson&access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`)
              .then(response => response.json())
              .then(data => {
                return data.routes[0].geometry.coordinates
              })
      await console.log(points)
      ctx.clearRect(0, 0, width, height)
      ctx.globalCompositeOperation = 'lighter'
      if ((renderWhileDragging || !isDragging) && points) {
        ctx.lineWidth = lineWidth
        ctx.strokeStyle = color
        ctx.beginPath()
        
        await points.forEach(point => {
          const pixel = project([point[0], point[1]])
          ctx.lineTo(pixel[0], pixel[1])
        })
        ctx.stroke()
      }
    }
    const points=returnRoute(from,to)
    console.log(points)

  }

  render () {
    return <CanvasOverlay redraw={this._redraw.bind(this)} />
  }
}