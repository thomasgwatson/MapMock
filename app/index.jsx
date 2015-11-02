var React = require('react')

// css and styling friends
// require('font-awesome-webpack')
require('font-awesome/css/font-awesome.css')
require('expose?$!expose?jQuery!jquery')
require('bootstrap-webpack')
require('./normalize.css')
require('../node_modules/leaflet/dist/leaflet.css')
require('./main.css')

// routing and friends
var ReactRouter = require('react-router')
var appRoutes = require('./routes.jsx')

var appNode = document.createElement('div')
appNode.className = 'react-app heighty'
document.body.appendChild(appNode)

ReactRouter.run(appRoutes, function (Handler) {
  React.render(<Handler/>, appNode)
})
