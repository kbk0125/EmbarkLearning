var React= require('react');
var Sidebar = require('../components/sidebar.js');

var sidebarcontain= React.createClass({
	render: function () {
		return (
			<Sidebar />
		)
	}
});

module.exports = sidebarcontain;