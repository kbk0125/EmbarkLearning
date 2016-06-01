var React = require('react');
var ReactRouter= require('react-router');
var axios = require('axios')
var querystring = require('querystring');

var Lightbox = React.createClass({
	newState : function(e){
		var both = e.target.value.split(",")
		this.props.updateThisState(
			both[0],
			both[1]
		)
	},
	validateUrl : function(e) {
		// Prevent catastrophic backtracking From http://stackoverflow.com/questions/10218594/how-can-i-make-this-regular-expression-not-result-in-catastrophic-backtracking
		var target =e.target.value
		var urlregex = /\b((?:https?:\/\/|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))/i;
		//var urlregex = new RegExp(
	    //    "^(http|https|ftp)\://([a-zA-Z0-9\.\-]+(\:[a-zA-Z0-9\.&amp;%\$\-]+)*@)*((25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9])\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[0-9])|([a-zA-Z0-9\-]+\.)*[a-zA-Z0-9\-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(\:[0-9]+)*(/($|[a-zA-Z0-9\.\,\?\'\\\+&amp;%\$#\=~_\-]+))*$");
		
		if(urlregex.test(target) === true){
			this.props.updateErr(
				'This is a good url',
				false
			)
		}
		else{
			this.props.updateErr(
				'Please submit valid url beginning with http(s)',
				true
			)
			
		}
		return;
	},
	checkWords: function (e){
		var words = e.target.value.split(' ');

		if(words.length >8){
			console.log(words)
			e.preventDefault();
			e.stopPropagation();
		}
	},
	updateChar : function(e){
		var length= e.target.value.length
		this.props.updateCharCount(Number(length));
	},
	handleSubmit: function(e){
		e.preventDefault()
		var form = e.target.elements;
		var targ= e.target
		console.log(this.props.mainCat)

		//HACKY FIX WITH A FEW EDGE CASES. Need to reconcile these two states in a better way
		if(this.props.postMain.length)
			document.querySelector('input[name="category"]').value = this.props.postMain
		if(this.props.postSub.length)
			document.querySelector('input[name="subcat"]').value = this.props.postSub

		var radio1 =document.querySelector('input[name="radio1"]:checked')
		var radio2 =document.querySelector('input[name="radio2"]:checked') 
		var subCat=document.querySelector('input[name="subcat"]')
		var txtarea= document.querySelector('textarea[name="desc"]')

		var fields=['category', 'link', 'title']
		
		var formData= {}
		for(var i=0; i< fields.length; i++){
			var each= fields[i]
			var value= document.querySelector('input[name="'+fields[i]+'"]').value
			if(value.length)
				formData[each] = value;
		}
		if(Object.keys(formData).length == 3 && !this.props.blocked && radio1 && radio2 &&txtarea){
			formData['desc']= txtarea.value
			formData['radio1'] =radio1.value
			formData['radio2'] =radio2.value
			formData['subcat'] = subCat.value
			var finForm = JSON.stringify(formData)
			// NEED Querystring + JSON.stringify, this makes up for serialize from jquery
			axios.post('/addLink', 
				querystring.stringify({
					finForm
				})
			)
			.then(function(res){
				this.props.updateAddState()
				this.props.updateErr(
					'',
					''
				)
				targ.reset()
			}.bind(this))
			
		}
		else{
			console.log(this.props)
			console.log(subCat.value)
			console.log(document.querySelector('input[name="category"]').value)
			this.props.updateErr(
				'Please fill out each field',
				''
			)
		}
	},
	render: function (){
		var allChoices= [];
		Object.keys(this.props.allCats).map(function(el, i){

			if (el.indexOf('head') > -1){
				var str= <option className='genCat' value={[this.props.allCats[el].gen,'']} key={el}> {this.props.allCats[el].name}, All </option>
			}
			else{
				var str= <option className='specCat' value={[this.props.allCats[el].gen,this.props.allCats[el].spec]} key={el} >&nbsp;&nbsp; {this.props.allCats[el].name} </option>
			}

			allChoices.push(str)
		}.bind(this))

		var stringMash=this.props.mainCat+','+this.props.subCat
		return (
			<div className='lightBox'>
	            <div className='newPath'>
	                <i className="fa fa-times" onClick={this.props.updateAddState}></i>
	                <div className='formWrap'>
	                    <form id='sendform' onSubmit={this.handleSubmit}>
	                        <input type='text' className='invis' name='category' defaultValue={this.props.mainCat} />
	                        <input type='text' className='invis' name='subcat' defaultValue={this.props.subcat} />
	                        <div className='chunk'>
	                            <div className='head'>
	                                <h3> Have A Resource That Helped You? </h3>
	                                <select className='curCat' onChange={this.newState} defaultValue={stringMash}>
	                                	{allChoices}
	                                </select>
	                            </div>
	                            <div className='col1'>
	                                <p> Link: </p> 
	                                <input type="text" className= "validUrl" name="link" onBlur={this.validateUrl}/>
	                                <p> Title (8 Words Max): </p> 
	                                <input type="text" className='wordLimit' name="title" onKeyPress={this.checkWords}/>
	                                <p> Challenge Level </p>
	                                <div className="radioSet">
	                                    <label for="smchoice1" ><input type="radio" id="smchoice1" name="radio1" value='beginner' /><span>Beginner</span></label>
	                                    <label for="smchoice2" ><input type="radio" id="smchoice2" name="radio1" value='intermediate' /><span>Intermediate</span></label>
	                                    <label for="smchoice3" ><input type="radio" id="smchoice3" name="radio1" value='advanced' /><span>Advanced</span></label>
	                                </div>
	                                <p className='formError large'>{this.props.errMsg}</p>
	                            </div>
	                            <div className='col2'>
	                                <p> Brief Description ({this.props.charCount+1}/140): </p> 
	                                <textarea className='descLimit' name="desc" maxlength="140" onKeyPress={this.updateChar}></textarea>
	                                <p> Type of Content </p>
	                                <div className="radioSet">
	                                    <label for="smchoice2.1" ><input type="radio" id="smchoice2.1" name="radio2" value='article' /><span>Article/Blog</span></label>
	                                    <label for="smchoice2.2" ><input type="radio" id="smchoice2.2" name="radio2" value='practical' /><span>Hands On</span></label>
	                                    <label for="smchoice2.3" ><input type="radio" id="smchoice2.3" name="radio2" value='video' /><span>Video</span></label>
	                                    <label for="smchoice2.4" ><input type="radio" id="smchoice2.4" name="radio2" value='book' /><span>Book</span></label>
	                                    <label for="smchoice2.5" ><input type="radio" id="smchoice2.5" name="radio2" value='course' /><span>Course</span></label>
	                                </div>
	                                <input type='submit' name='fin' value='Done' className='actionBtn formBtn' />
	                            </div>
	                        </div>
	                    </form>
	                </div>
	            </div>
	        </div>
		)
	}
})

module.exports = Lightbox;