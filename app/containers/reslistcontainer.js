var React= require('react');
var ResList = require('../components/mainui/reslist');

var reslistcontain= React.createClass({
	render: function () {
		return (
			<ResList 
				bodyDets={this.props.bodyDets}
				filter= {this.props.filter} 
				isLoading={this.props.isLoading}/>
		)
	}
});

module.exports = reslistcontain;