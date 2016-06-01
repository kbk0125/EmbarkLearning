var React= require('react');
var ReactRouter= require('react-router');
var Sidebar = require('../components/sidebar.js');

var sidebarcontain= React.createClass({
	contextTypes: {
  		router: React.PropTypes.object.isRequired
	},
	render: function () {
		return (
			<Sidebar
				mainCat={this.props.mainCat} 
				subCat= {this.props.subCat}
				allCats= {this.props.allCats}
				updateState= {this.props.updateState}/>
		)
	}
});

module.exports = sidebarcontain;