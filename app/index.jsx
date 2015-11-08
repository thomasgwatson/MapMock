var React = require('react')
var ReactDOM = require('react-dom')

// css and styling friends
// require('font-awesome-webpack')
require('font-awesome/css/font-awesome.css')
require('expose?$!expose?jQuery!jquery')
require('bootstrap-webpack')
require('./normalize.css')
require('../node_modules/leaflet/dist/leaflet.css')
require('../node_modules/leaflet-draw/dist/leaflet.draw.css')
require('./main.css')
let injectTapEventPlugin = require('react-tap-event-plugin')
injectTapEventPlugin()

// routing and friends
var ReactRouter = require('react-router')
var appRoutes = require('./routes')
import createBrowserHistory from 'history/lib/createBrowserHistory'
let history = createBrowserHistory()

var appNode = document.createElement('div')
appNode.className = 'react-app heighty'
document.body.appendChild(appNode)

ReactDOM.render(<ReactRouter.Router routes={appRoutes} history={history} />, appNode)

// ReactRouter.run(appRoutes, function (Handler) {
//   React.render(<Handler/>, appNode)
// })
