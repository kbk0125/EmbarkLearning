var React= require('react');
var Intro = require('../components/intro');
var axios = require('axios')

var introcontain= React.createClass({
	getInitialState: function() {
		return {
			voteTot: []
		};
	},
	componentDidMount: function(){
		console.log('didmount')
		axios.get('/voteTotal')
			.then(function(result){
				this.setState({
					voteTot: result.data
				})
			}.bind(this))
	},
	render: function () {
		return (
			<Intro
				voteTot = {this.state.voteTot} 
				updateState ={this.props.updateState}/>
		)
	}
});

module.exports = introcontain;