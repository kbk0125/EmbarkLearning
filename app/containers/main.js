var React = require('react');
var ReactRouter= require('react-router');
var Header= require('../components/header')
var Sidebar= require('../containers/sidecontainer')
require('../../src/styles/main.styl')
var Lightbox= require('../containers/lightboxcontainer')

var allCats= {
	'htmlhead': {'name': 'HTML/CSS', 'gen': 'html'},
	'htmlsub1': { 'name' : 'Fundamentals', "spec" : 'fundamentals', 'gen': 'html'},
	'htmlsub2': { 'name' : 'Build A Full Site', "spec" : 'fullsite', 'gen': 'html'},
	'htmlsub3': { 'name' : 'Responsive Web Design', "spec" : 'responsive', 'gen': 'html'},
	'javascripthead': {'name': 'JavaScript', 'gen': 'javascript'},
	'javascriptsub1': { 'name' : 'Fundamentals', "spec" : 'fundamentals', 'gen': 'javascript'},
	'javascriptsub2': { 'name' : 'JQuery', "spec" : 'jquery', 'gen': 'javascript'},
	'javascriptsub3': { 'name' : 'Node.js', "spec" : 'node', 'gen': 'javascript'},
	'javascriptsub4': { 'name' : 'D3.js', "spec" : 'd3', 'gen': 'javascript'},
	'javascriptsub5': { 'name' : 'React.js', "spec" : 'react', 'gen': 'javascript'},
	'databaseshead': {'name': 'Databases', 'gen': 'databases'},
	'databasessub1': { 'name' : 'Fundamentals', "spec" : 'fundamentals', 'gen': 'databases'},
	'databasessub2': { 'name' : 'Intro to Analytics', "spec" : 'analytics', 'gen': 'databases'},
	'databasessub3': { 'name' : 'Database Management', "spec" : 'dbmgmt', 'gen': 'databases'},
	'userexperiencehead': {'name': 'User Experience', 'gen': 'userexperience'},
	'userexperiencesub1': { 'name' : 'Fundamentals', "spec" : 'fundamentals', 'gen': 'userexperience'},
	'userexperiencesub2': { 'name' : 'User Research', "spec" : 'research', 'gen': 'userexperience'},
	'userexperiencesub3': { 'name' : 'Landing Page', "spec" : 'landingpage', 'gen': 'userexperience'},
	'userexperiencesub4': { 'name' : 'Onboarding', "spec" : 'onboarding', 'gen': 'userexperience'},
	'userexperiencesub5': { 'name' : 'Microcopy', "spec" : 'microcopy', 'gen': 'userexperience'},
	'userexperiencesub6': { 'name' : 'Conversion Optimization', "spec" : 'conversion', 'gen': 'userexperience'},
	'webdesignhead': {'name': 'Web Design', 'gen': 'webdesign'},
	'webdesignsub1': { 'name' : 'Color', "spec" : 'color', 'gen': 'webdesign'},
	'webdesignsub2': { 'name' : 'Typography', "spec" : 'typography', 'gen': 'webdesign'},
	'webdesignsub3': { 'name' : 'Space', "spec" : 'space', 'gen': 'webdesign'},
	'webdesignsub4': { 'name' : 'Information Hierarchy', "spec" : 'information', 'gen': 'webdesign'},
	'webdesignsub5': { 'name' : 'Wireframing', "spec" : 'wireframing', 'gen': 'webdesign'}
}

var Main = React.createClass({
	contextTypes: {
  		router: React.PropTypes.object.isRequired
	},
	getInitialState: function(){
		return {
			mainCat: '',
			subCat: '',
			add: false
		}
	},
	newCatState: function(mainPath, subPath){
		this.setState({
			mainCat: mainPath,
			subCat: subPath
		})
		//console.log(this.state)
		if(subPath.length){
			this.context.router.push('/'+mainPath+ '/'+subPath)
		}
		else{
			this.context.router.push('/'+mainPath)
		}
	},
	newResState: function(){
		this.setState({
			add: !this.state.add
		})
	},
	render: function (){
		//http://facebook.github.io/react/docs/thinking-in-react.html
		return (
			<div className='container'>
				<a href="http://goo.gl/forms/4NfzYQTSpp" target="_blank"><div className='actionBtnMin comments'> Question or Comment?</div></a>
				<Header 
					updateState= {this.newCatState} />
				<Sidebar
					mainCat={this.state.mainCat} 
					subCat= {this.state.subCat}
					updateState= {this.newCatState}
					allCats= {allCats} />
					
				<Lightbox
					mainCat={this.state.mainCat} 
					subCat= {this.state.subCat} 
					active={this.state.add}
					allCats= {allCats} 
					updateAddState={this.newResState}/>

				{React.cloneElement(this.props.children, {
					mainCat: this.state.mainCat,
					subCat: this.state.subCat,
					updateState: this.newCatState,
					updateAddState:this.newResState
				})}
			</div>
		)
	}
})

module.exports = Main;