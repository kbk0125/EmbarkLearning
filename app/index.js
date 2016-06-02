var React = require('react');
var ReactDOM = require('react-dom');
var routes = require('./config/routes')

//FULL GUIDE http://www.christianalfoni.com/articles/2015_04_19_The-ultimate-webpack-setup
//https://github.com/christianalfoni/webpack-express-boilerplate
//http://www.christianalfoni.com/articles/2015_04_19_The-ultimate-webpack-setup

ReactDOM.render(
	routes,
	document.getElementById('app')
)