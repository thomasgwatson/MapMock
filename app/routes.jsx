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
    return {}
  },
  render: function () {
    var theme = {primary: '#fff', secondary: '#474C57', accent1: '#F5A623', accent2: '#8C8C8C'}

    return (
      <MapComponent transitionTo={this.transitionTo} theme={theme} />
    )
  },
})

var routes = (
<Route handler={AppHandler}>
  <Route name='map-woo' handler={mapHandler} path='/'/>
</Route>
)

module.exports = routes
