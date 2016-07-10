var React = require('react');
var ReactRouter= require('react-router');
var Link = ReactRouter.Link
var axios = require('axios')
var querystring = require('querystring');
//this is a random package from the internet, interim solution, used in one place
var ImageLoader = require('react-imageloader')

var ResList = React.createClass({
	capLetter: function(string){
		return string.charAt(0).toUpperCase() + string.slice(1);
	},
	addVote: function(e){
		var id = e.target.dataset.val.split(",")[0]
		var votes = e.target.dataset.val.split(",")[1]
		var targ= e.target
		console.log(id)
		var obj ={}
		obj['id'] = id
		obj['votes'] = votes
		var vals= JSON.stringify(obj)
		axios.post('/addVote', 
			querystring.stringify({
				vals
			})
		)
		.then(function(res){
			//change neighboring text
			var oldVal=targ.previousSibling.innerHTML
			var newVal= Number(targ.previousSibling.innerHTML) +1
			targ.previousSibling.innerHTML= newVal
			this.props.updateClicked(Number(id))
		}.bind(this))
	},
	render: function (){
		if(this.props.isLoading === true){
            return(
                <h2> Loading </h2>
            )
        }

        else{
        	var that= this
        	var rows= this.props.bodyDets.map(function(el,i){
	    		var checkSub= el.subcategory.length ? el.subcategory : ''
	    		var shortDiff= el.challenge.slice(0, 3);
	    		var shortTitle= el.title.toLowerCase()
	    		var shortFilter= that.props.filter.toLowerCase()
	    		//this creates a Base URL for use in grabbing logos with Clearbit API
	    		var baseURL= el.link.split('/')[2]
	    		//NEED TO FIX- include Clearbit logo
	    		var fullImgLink="//logo.clearbit.com/"+baseURL;
	    		var backupImg= that.props.headDets.img;

	    		var test= axios.get(fullImgLink)
	    			.then(function(res){
	    				console.log('yes')
	    			})
	    			.catch(function(err){
	    				console.log('no')
	    			})

	    		//Ternary operator to see if click should still be valid based on whether it has been clicked before
	    		var clickTern = that.props.hasClicked.indexOf(el.id) == -1 ? that.addVote :null
	    		//this is checking search parameters
	    		//also check to see if the appropraite checkbox is highlighted
	    		if(shortTitle.indexOf(shortFilter) > -1 && that.props.check.indexOf(el.filter) > -1 && that.props.check.indexOf(el.challenge) > -1){
		    		return <tr className="userPath" key={i}>
		    			<td className="thumbUp">
		    				<div className="upVoteBox">
		    					<h2 className="upTotal">{el.votes}</h2>
		    					<i className="fa fa-thumbs-o-up upvoteBtn" data-val={[el.id, Number(el.votes)]} onClick={clickTern}></i>
		    					<p className="approval">Helped!</p>
	    					</div>
	    					</td>
    					<td className='logoClear'>
    						<ImageLoader src={fullImgLink}>
    							<img src={backupImg}/>
    						</ImageLoader>
    					</td>
		    			<td className="mostTxt">
		    				<div className="linkSum">
		    					<div className="topLine">
		    						<a href={el.link} target="_blank"><h3>{that.capLetter(el.title)}</h3></a>
		    						<p className="subcat">{checkSub}</p>
		    						<p className="filter">{el.filter}</p>
		    						<p className="diff">{shortDiff}</p>
	    						</div>
	    						<p className="linkLab">{el.link}</p>
	    						<p className="description">{el.description}</p>
							</div>
						</td>
	    			</tr>
	    		}
	    		else {
	    			//console.log('false')
	    			return null;
	    		}

        	})
			return (
				<div className='addPathsBody'>
	                <table>
	                    <tbody>
	                    	{rows}
	                    </tbody>
	                </table>                    
	            </div>
			)
		}
	}
})

module.exports = ResList;