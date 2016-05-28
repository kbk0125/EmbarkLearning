var React = require('react');
var ReactRouter= require('react-router');
var Link = ReactRouter.Link

var Header = React.createClass({
	render: function (){
		return (
			<div id="topBar">
				<div className='logoContain'>
					<img src={'/public/img/mainlogo2.png'} />
					<h3>Manual</h3>
				</div>
				<p> User-generated guide to top coding resources </p>
				<i className="fa fa-bars menuToggle"></i>
			</div>
		)
	}
})

module.exports = Header;