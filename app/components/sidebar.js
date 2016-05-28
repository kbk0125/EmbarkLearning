var React= require('react');
var ReactRouter= require('react-router');

var sidebar = React.createClass({
	render: function (){
		return(
			<div id="sideBar">
				<div className='sideHead'>
					<h3> Skill Categories </h3>
				</div>
				<div className='category'>
					<div className='catHead' data-category='html'>
						<i className="fa fa-chevron-right"></i>
						<p> HTML/CSS</p>
					</div>
					<ul>
						<li className='listSelect' data-filter='fundamentals' data-count='0'> Fundamentals </li>
						<li className='listSelect' data-filter='fullsite' data-count='0'> Build A Full Site </li>
						<li className='listSelect' data-filter='responsive' data-count='0'> Responsive Web Design </li>
					</ul>
				</div>
				<div className='category'>
					<div className='catHead' data-category='javascript'>
						<i className="fa fa-chevron-right"></i>
						<p> Javascript</p>
					</div>
					<ul>
						<li className='listSelect' data-filter='fundamentals' data-count='0'> Fundamentals </li>
						<li className='listSelect' data-filter='jquery' data-count='0'> JQuery </li>
						<li className='listSelect' data-filter='node' data-count='0'> Node.js </li>
						<li className='listSelect' data-filter='d3' data-count='0'> D3.js </li>
						<li className='listSelect' data-filter='react' data-count='0'> React </li>
					</ul>
				</div>
				<div className='category'>
					<div className='catHead' data-category='databases'>
						<i className="fa fa-chevron-right"></i>
						<p> Databases</p>
					</div>
					<ul>
						<li className='listSelect' data-filter='fundamentals' data-count='0'> Fundamentals </li>
						<li className='listSelect' data-filter='analytics' data-count='0'> Intro to Analytics </li>
						<li className='listSelect' data-filter='dbmgmt' data-count='0'> Database Management </li>
					</ul>
				</div>
				<div className='category'>
					<div className='catHead' data-category='userexperience'>
						<i className="fa fa-chevron-right"></i>
						<p> User Experience</p>
					</div>
					<ul>
						<li className='listSelect' data-filter='fundamentals' data-count='0'> Fundamentals </li>
						<li className='listSelect' data-filter='research' data-count='0'> User Research </li>
						<li className='listSelect' data-filter='landingpage' data-count='0'> Landing Page </li>
						<li className='listSelect' data-filter='onboarding' data-count='0'> Onboarding </li>
						<li className='listSelect' data-filter='microcopy' data-count='0'> Microcopy </li>
						<li className='listSelect' data-filter='conversion' data-count='0'> Conversion Optimization </li>
					</ul>
				</div>
				 <div className='category'>
					<div className='catHead' data-category='webdesign'>
						<i className="fa fa-chevron-right"></i>
						<p> Web Design</p>
					</div>
					<ul>
						<li className='listSelect' data-filter='color' data-count='0'> Color </li>
						<li className='listSelect' data-filter='typography' data-count='0'> Typography </li>
						<li className='listSelect' data-filter='space' data-count='0'> Space </li>
						<li className='listSelect' data-filter='information' data-count='0'> Information Hierarchy </li>
						<li className='listSelect' data-filter='wireframing' data-count='0'> Wireframing </li>
					</ul>
				</div>
				<a href="http://goo.gl/forms/wnzrCwAHU3" target="_blank"><div className='actionBtnMin suggest'> Suggest A New Category </div></a>
			</div>
		)
	}
});

module.exports = sidebar;