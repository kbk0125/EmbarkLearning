var React= require('react');
var Lightbox = require('../components/lightbox');

var lightboxcontain= React.createClass({
	//https://facebook.github.io/react/tips/props-in-getInitialState-as-anti-pattern.html
	//Postmain andpostsub seeded with props, all good though
	getInitialState: function(){
		return {
			postMain: '',
			postSub: '',
			errMsg: '',
			blocked: true, 
			charCount: 0
		}
	},
	updateThisState: function(main, sub){
		this.setState({
			postMain: main,
			postSub: sub
		})
	},
	updateErr: function(str, status){
		if(status ===true || status=== false){
			this.setState({
				errMsg: str,
				blocked: status
			})
		}
		else{
			this.setState({
				errMsg: str,
			})
		}
	},
	updateChar: function(num){
		this.setState({
			charCount: num
		})
	},
	render: function () {
		return (
			<div>
				{ this.props.active ? 
					<Lightbox
						charCount={this.state.charCount}
						blocked={this.state.blocked}
						updateCharCount={this.updateChar}
						updateErr={this.updateErr}
						errMsg={this.state.errMsg}
						mainCat={this.props.mainCat} 
						subCat= {this.props.subCat}
						postMain ={this.state.postMain}
						postSub={this.state.postSub}
						updateThisState= {this.updateThisState} 
						updateAddState={this.props.updateAddState} 
						allCats= {this.props.allCats} /> 
					: null }
			</div>
		)
	}
});

module.exports = lightboxcontain;