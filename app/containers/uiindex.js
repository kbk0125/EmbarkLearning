var React = require('react');
var ReactRouter= require('react-router');
var Legendcontain = require('../containers/legendcontainer')
var HeadSectcontain = require('../containers/headsectcontainer')
var ResListcontain = require('../containers/reslistcontainer')
var axios = require('axios')

var Mainui = React.createClass({
	contextTypes: {
  		router: React.PropTypes.object.isRequired
	},
	getInitialState: function() {
		return {
			curRes: [],
			isLoading: true,
			filter: '',
			checkbox: ['article', 'practical', 'video', 'book', 'course', 'beginner', 'intermediate', 'advanced']
		};
	},
	componentDidMount: function(){
		if(this.props.routeParams.subCat){
			this.props.updateState(
				this.props.routeParams.mainCat,
				this.props.routeParams.subCat 
			)
			axios.get('/subLinkList', {
					params: {
						listKey: this.props.routeParams.mainCat, 
						subKey:this.props.routeParams.subCat
					}
				})
				.then(function(resources){
					this.setState({
						curRes: resources.data,
						isLoading: false
					})
				}.bind(this))
		}
		else{
			this.props.updateState(
				this.props.routeParams.mainCat,
				''
			)
			axios.get('/linkList', {
					params: {
						listKey: this.props.routeParams.mainCat
					}
				})
				.then(function(resources){
					this.setState({
						curRes: resources.data,
						isLoading: false
					})
				}.bind(this))
		}
	},
	componentWillReceiveProps: function(nextProps){
		// THIS IS REPEATED AND HACKY BUT WORKS
		//Component does not remount, didupdate will create infinite create loop. Need nextprops
		//http://facebook.github.io/react/docs/component-specs.html#updating-componentwillreceiveprops
		if(nextProps.routeParams.subCat){
			axios.get('/subLinkList', {
					params: {
						listKey: nextProps.routeParams.mainCat, 
						subKey: nextProps.routeParams.subCat
					}
				})
				.then(function(resources){
					this.setState({
						curRes: resources.data
					})
				}.bind(this))
		}
		else{
			axios.get('/linkList', {
					params: {
						listKey: nextProps.routeParams.mainCat
					}
				})
				.then(function(resources){
					this.setState({
						curRes: resources.data
					})
				}.bind(this))
		}

	},
	updateFilter: function(str){
		this.setState({
			filter: str
		})
	},
	elimFilter: function(){
		this.setState({
			filter: ''
		})
	},
	updateChecked: function(arr){
		this.setState({
			checkbox: arr
		})
	},
	render: function (){
		return (
			<div className='window'>
				<div className='learningCat'>
					<Legendcontain 
						updateChecked={this.updateChecked} />

					<div id='mainPane'>
						<HeadSectcontain 
							headDets={this.state.curRes[0]} 
							isLoading={this.state.isLoading} 
							updateAddState={this.props.updateAddState}
							filter= {this.state.filter}
							elimFilter= {this.elimFilter} 
							updateFilter= {this.updateFilter}/>
						
						<ResListcontain
							headDets={this.state.curRes[0]} 
							bodyDets={this.state.curRes[1]} 
							isLoading={this.state.isLoading} 
							filter= {this.state.filter} 
							check= {this.state.checkbox}/>
					</div>
				</div>
			</div>
		)
	}
})

module.exports = Mainui;