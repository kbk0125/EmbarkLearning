var React= require('react');
var ResList = require('../components/mainui/reslist');

var reslistcontain= React.createClass({
	getInitialState: function() {
		return {
			hasClicked: []
		}
	},
	updateClicked: function(id) {
		this.setState({ 
		    hasClicked: this.state.hasClicked.concat([id])
		})
	},
	render: function () {
		return (
			<ResList
				updateClicked= {this.updateClicked}
				hasClicked= {this.state.hasClicked}
				headDets={this.props.headDets} 
				bodyDets={this.props.bodyDets}
				filter= {this.props.filter} 
				isLoading={this.props.isLoading}
				check= {this.props.check}/>
		)
	}
});

module.exports = reslistcontain;