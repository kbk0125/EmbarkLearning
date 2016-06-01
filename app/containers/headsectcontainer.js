var React= require('react');
var HeadSect = require('../components/mainui/headsect');

var headsectcontain= React.createClass({
	render: function () {
		return (
			<HeadSect 
				headDets={this.props.headDets} 
				isLoading={this.props.isLoading}
				filter= {this.props.filter}
				elimFilter = {this.props.elimFilter} 
				updateAddState={this.props.updateAddState} 
				updateFilter= {this.props.updateFilter} />
		)
	}
});

module.exports = headsectcontain;