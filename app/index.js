var React = require('react');
var ReactDOM = require('react-dom');
var routes = require('./config/routes')

console.log(routes)

ReactDOM.render(
	routes,
	document.getElementById('app')
)