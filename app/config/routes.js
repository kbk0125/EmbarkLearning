var React = require('react');
var ReactRouter = require('react-router')
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;
var hashHistory = ReactRouter.hashHistory;
var Main = require('../containers/main')
//var Home = require('../components/home')
//var Forecastcontain = require('../containers/forecastcontainer')
//var Daycontain = require('../containers/daycontainer')

var routes = (
	<Router history={hashHistory}>
		<Route path='/' component={Main}>
		</Route>
	</Router>
)

module.exports = routes;