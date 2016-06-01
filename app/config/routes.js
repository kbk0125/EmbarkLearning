var React = require('react');
var ReactRouter = require('react-router')
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;
var browserHistory = ReactRouter.browserHistory;
var Main = require('../containers/main')
var Intropg = require('../containers/introcontainer')
var Mainui = require('../containers/uiindex')

var routes = (
	<Router history={browserHistory}>
		<Route path='/' component={Main}>
			<IndexRoute component={Intropg} />
			<Route path='/:mainCat' component={Mainui} />
			<Route path='/:mainCat/:subCat' component={Mainui} />
		</Route>
	</Router>
)

module.exports = routes;