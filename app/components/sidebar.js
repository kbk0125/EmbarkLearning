var React= require('react');
var ReactRouter= require('react-router');

var SideCats= React.createClass({
	// WILL NEED TO REFERENCE http://stackoverflow.com/questions/36394539/react-router-link-how-to-trigger-a-click-event-on-a-link-from-another-component
	//https://facebook.github.io/react/docs/thinking-in-react.html
	newState : function(e){
		var id= e.target.id.length ? e.target.id :''

		console.log(id)
		this.props.updateState(
			e.target.dataset.gen,
			id
		)
	},

	render: function (){
		var allChoices= [];
		Object.keys(this.props.choices).map(function(el, i){
			var genTrue= this.props.mainCat == this.props.choices[el].gen
			var specTrue= this.props.subCat == this.props.choices[el].spec

			var arrow= genTrue ? "fa fa-chevron-down": "fa fa-chevron-right";
			var highlight= genTrue ? "listHighlight": "";
			if(genTrue && specTrue)
				var shown= 'listSelect show listHighlight'
			else if (genTrue && !specTrue)
				var shown= 'listSelect show'
			else
				var shown= 'listSelect hide'

			if (el.indexOf('head') > -1){
				var str=<div className="catHead" key={i} data-gen={this.props.choices[el].gen} onClick={this.newState}>
				<i className={arrow}></i>
				<p className={highlight}>{this.props.choices[el].name}</p>
				</div>
			}
			else{
				var str= <p className={shown} key={i} id={this.props.choices[el].spec} data-gen={this.props.choices[el].gen} onClick={this.newState}> {this.props.choices[el].name} </p>
			}

			allChoices.push(str)
		}.bind(this))

		return (
			<div>
				{allChoices}
			</div>
		)
	}
});

var sidebar = React.createClass({
	// WILL NEED TO REFERENCE http://stackoverflow.com/questions/36394539/react-router-link-how-to-trigger-a-click-event-on-a-link-from-another-component
	//https://facebook.github.io/react/docs/thinking-in-react.html
	render: function (){
			
		return(
			<div id="sideBar">
				<div className='sideHead'>
					<h3> Skill Categories </h3>
				</div>
				<SideCats
					mainCat={this.props.mainCat} 
					subCat= {this.props.subCat}
					updateState= {this.props.updateState}
					choices={this.props.allCats} />
				<a href="http://goo.gl/forms/wnzrCwAHU3" target="_blank"><div className='actionBtnMin suggest'> Suggest A New Category </div></a>
			</div>
		)
	}
});

module.exports = sidebar;