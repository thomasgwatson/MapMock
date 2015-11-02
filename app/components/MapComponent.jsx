const React = require('react')
const L = require('leaflet')
const MapTools = require('./MapTools')
const MapFooter = require('./MapFooter')

const MapComponent = React.createClass({
  getDefaultProps: function () {
    return {
      lat: 37.8043,
      lng: -122.3952,
      zoom: 12,
      seekPosition: true,
    }
  },
  getInitialState: function () {
    return {
    }
  },
  componentWillReceiveProps: function (nextProps) {
    if (nextProps.lat !== this.props.lat || nextProps.lng !== this.props.lng || nextProps.zoom !== this.props.zoom) {
      this.map.setView(new L.LatLng(nextProps.lat, nextProps.lng), nextProps.zoom)
    }
  },
  componentDidMount: function () {
    var me = this

    if ('geolocation' in navigator && this.props.seekPosition) {
      navigator.geolocation.getCurrentPosition(function (position) {
        me.map.setView(new L.LatLng(position.coords.latitude, position.coords.longitude), me.props.zoom)
      })
    }

    var lat = this.props.lat
    var lng = this.props.lng

    this.map = new L.Map(this.refs.leafletTarget.getDOMNode(), {
      layers: [],
      center: new L.LatLng(lat, lng),
      zoom: Math.round(this.props.zoom),
      minZoom: 10,
      maxBounds: [[-85, -180.0], [85, 180.0]],
      zoomControl: false,
      markerZoomAnimation: false,
      fadeAnimation: false,
      boxZoom: true,
    }
    )

    this.backgroundTiles = L.tileLayer('https://{s}.tiles.mapbox.com/v3/tokugawa.nbp98oi4/{z}/{x}/{y}.png', {
      attribution: '<a href="https://www.linkedin.com/in/thomasgwatson" target="_blank"> Civil-Tom </a>| <a href="http://www.mapbox.com/about/maps/" target="_blank">Terms &amp; Feedback</a>',
    }) // Mapbox map tiles

    this.map.addLayer(this.backgroundTiles)

    this.map.on('zoomend', this.updateZoom)
    this.map.on('moveend', this.updateCenter)
  },
  updateCenter: function (evt) {
    if (evt) {
      this.updateURL({})
    }
  },
  updateZoom: function (evt) {
    if (evt) {
      this.updateURL({})
    }
  },
  updateURL: function (options) {
    var getParams = {}
    var getQuery = {
      zoom: options.zoom || Math.round(this.map.getZoom()),
      lat: options.lat || this.map.getCenter().lat,
      lng: options.lng || this.map.getCenter().lng,
    }

    this.props.transitionTo('/', getParams, getQuery)
  },
  render: function () {
    var viewportHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0)

    var mapStyling = {
      left: 0,
      top: 0,
      right: 0,
      position: 'absolute',
      overflow: 'hidden',
      zIndex: 2,
      width: '100%',
      height: viewportHeight - 80,
    }

    var MapFooterStyling = {
      left: 0,
      bottom: 0,
      right: 0,
      position: 'absolute',
      overflow: 'hidden',
      zIndex: 3,
      width: '100%',
      height: 80,
      backgroundColor: this.props.theme.secondary,
    }

    return (
      <div className='my-container'>
        <div ref='leafletTarget' id='map' style={mapStyling}>
          <MapTools map={this.map}
                    theme={this.props.theme}
                    mapStyling={mapStyling} />
        </div>
        <MapFooter map={this.map}
               theme={this.props.theme}
               componentStyling={MapFooterStyling}/>
      </div>
      )
  },
})

module.exports = MapComponent
