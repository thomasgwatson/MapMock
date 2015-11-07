var React = require('react')
var Router = require('react-router')
var MapComponent = require('./components/MapComponent')

var Route = Router.Route
var State = Router.State

var mapHandler = React.createClass({
  mixins: [State, Router.History],
  getInitialState: function () {
    return {activeStep: 'first'}
  },
  render: function () {
    const theme = {primary: '#fff', secondary: '#474C57', accent1: '#F5A623', accent2: '#8C8C8C'}
    let lat, lng
    let seekPosition = true
    let zoom = 13
    let step = 'first'
    if (this.props.location.query.lat) lat = parseFloat(this.props.location.query.lat).toFixed(8); seekPosition = false
    if (this.props.location.query.lng) lng = parseFloat(this.props.location.query.lng).toFixed(8); seekPosition = false
    if (this.props.location.query.zoom) zoom = Math.round(this.props.location.query.zoom)
    if (this.props.location.query.step) step = this.props.location.query.step

    return (
      <MapComponent transitionTo={this.history.pushState} theme={theme} activeStep={step} lat={lat} lng={lng} zoom={zoom} seekPosition={seekPosition} />
    )
  },
})

var routes = (
  <Route component={mapHandler} path='/' />
)

module.exports = routes
