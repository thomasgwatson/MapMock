var React = require('react')
var Router = require('react-router')
var MapComponent = require('./components/MapComponent')

var Route = Router.Route
var RouteHandler = Router.RouteHandler
var State = Router.State

var AppHandler = React.createClass({
  render: function () {
    return (
      <div className='heighty'>
        <RouteHandler />
      </div>
    )
  },
})

var mapHandler = React.createClass({
  mixins: [State, Router.Navigation],
  getInitialState: function () {
    return {activeStep: 'first'}
  },
  render: function () {
    const theme = {primary: '#fff', secondary: '#474C57', accent1: '#F5A623', accent2: '#8C8C8C'}
    let lat, lng
    let seekPosition = true
    let zoom = 13
    let step = 'first'

    if (this.getQuery().lat) lat = this.getQuery().lat; seekPosition = false
    if (this.getQuery().lng) lng = this.getQuery().lng; seekPosition = false
    if (this.getQuery().zoom) zoom = Math.round(this.getQuery().zoom)
    if (this.getQuery().step) step = this.getQuery().step

    return (
      <MapComponent transitionTo={this.transitionTo} theme={theme} activeStep={step} lat={lat} lng={lng} zoom={zoom} seekPosition={seekPosition} />
    )
  },
})

var routes = (
<Route handler={AppHandler}>
  <Route name='map-woo' handler={mapHandler} path='/'/>
</Route>
)

module.exports = routes
