const React = require('react')
const L = require('leaflet')
require('leaflet-draw')
const MapTools = require('./MapTools')
const MapFooter = require('./MapFooter')
const FeatureSelector = require('./FeatureSelector')

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
      activeStep: 'first',
      surveryPreferences: [],
    }
  },
  componentWillReceiveProps: function (nextProps) {
    if (nextProps.lat !== this.props.lat || nextProps.lng !== this.props.lng || nextProps.zoom !== this.props.zoom) {
      this.map.setView(new L.LatLng(nextProps.lat, nextProps.lng), nextProps.zoom)
    }
  },
  componentDidMount: function () {
    this.estimateLayer = new L.FeatureGroup()
    this.drawControl = new L.Control.Draw({
      position: 'topright',
      draw: {
        polyline: {
          shapeOptions: {
            color: '#AC0000',
          },
        },
        polygon: {
          shapeOptions: {
            color: '#AC0000',
          },
        },
        circle: false,
        rectangle: {
          shapeOptions: {
            color: '#AC0000',
          },
        },
        marker: false,
      },
      edit: {
        featureGroup: this.estimateLayer,
        edit: false,
        remove: false,
      },
    })

    if ('geolocation' in navigator && this.props.seekPosition) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.map.setView(new L.LatLng(position.coords.latitude, position.coords.longitude), this.props.zoom)
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
    })

    this.backgroundTiles = L.tileLayer('https://{s}.tiles.mapbox.com/v3/tokugawa.nbp98oi4/{z}/{x}/{y}.png', {
      attribution: '<a href="https://www.linkedin.com/in/thomasgwatson" target="_blank"> Civil-Tom </a>| <a href="http://www.mapbox.com/about/maps/" target="_blank">Terms &amp; Feedback</a>',
    }) // Mapbox map tiles

    this.map.addControl(this.drawControl)
    this.map.addLayer(this.backgroundTiles)
    this.map.addLayer(this.estimateLayer)

    this.map.on('zoomend', this.updateZoom)
    this.map.on('moveend', this.updateCenter)
    this.map.on('draw:created', this.objectDrawn)
  },
  objectDrawn: function (evt) {
    const layer = evt.layer
    // need to make these geometries interactive

    this.estimateLayer.addLayer(layer)

    layer.on('click', function () {
      if (!layer.selected) {
        layer.closePopup()
      }

      this.estimateLayer.eachLayer(function (layer) {
        layer.selected = false
        layer.editing.disable()
      })
      layer.editing.enable()
      layer.selected = true
    }, this)
    this.updateStep('second')
  },
  updateStep: function (step) {
    this.updateURL({step: step})
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
      step: options.step || this.props.activeStep,
    }

    this.props.transitionTo('/', getParams, getQuery)
  },
  renderFeatureSelector: function (viewportHeight) {
    return <FeatureSelector {...this.props} viewportHeight={viewportHeight} />
  },
  renderEstimatePage: function (viewportHeight) {
    const EstimatePageStyling = {
      right: 0,
      top: 0,
      position: 'absolute',
      overflow: 'hidden',
      zIndex: 3,
      width: '50%',
      height: viewportHeight - 80,
      backgroundColor: this.props.theme.secondary,
    }

    return <div style={EstimatePageStyling}></div>
  },
  render: function () {
    let interactionPanel
    const viewportHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0)

    const mapStyling = {
      left: 0,
      top: 0,
      position: 'absolute',
      overflow: 'hidden',
      zIndex: 2,
      width: '100%',
      height: viewportHeight - 80,
    }

    const MapFooterStyling = {
      left: 0,
      bottom: 0,
      right: 0,
      position: 'absolute',
      overflow: 'hidden',
      zIndex: 4,
      width: '100%',
      height: 80,
      backgroundColor: this.props.theme.secondary,
    }

    if (this.props.activeStep === 'second') interactionPanel = this.renderFeatureSelector(viewportHeight)
    if (this.props.activeStep === 'fourth') interactionPanel = this.renderEstimatePage(viewportHeight)
    if (this.props.activeStep === 'second' || this.props.activeStep === 'fourth') {
      mapStyling.width = '50%'
      this.map.invalidateSize()
      const fitToBounds = this.estimateLayer.getBounds()
      this.map.panTo(fitToBounds.getCenter())
    }

    return (
      <div className='my-container'>
        <div ref='leafletTarget' id='map' style={mapStyling}>
          <MapTools map={this.map}
                    theme={this.props.theme}
                    mapStyling={mapStyling} />
        </div>
        {interactionPanel}
        <MapFooter map={this.map}
                   activeStep={this.props.activeStep}
                   theme={this.props.theme}
                   componentStyling={MapFooterStyling}/>
      </div>
      )
  },
})

module.exports = MapComponent
