var React = require('react');
var Header= require('../components/header')
var Sidebar= require('../containers/sidecontainer')
require('../../src/styles/main.styl')

var Main = React.createClass({
	render: function (){
		return (
			<div className='container'>
				<Header />
				<Sidebar />
				{/*this.props.children*/}
			</div>
		)
	}
})

module.exports = Main;