var React = require('react');
var ReactRouter= require('react-router');
var Link = ReactRouter.Link

var ResList = React.createClass({
	capLetter: function(string){
		return string.charAt(0).toUpperCase() + string.slice(1);
	},
	reveal: function(el){
		return el.parentNode.firstChild.style.opacity = '1';
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
	    		if(shortTitle.indexOf(shortFilter) > -1){
	    			console.log('true')
		    		return <tr className="userPath" key={i}>
		    			<td className="thumbUp">
		    				<div className="upVoteBox">
		    					<p className="approval">Helped!</p>
		    					<h2 className="upTotal">{el.votes}</h2>
		    					<i className="fa fa-thumbs-o-up upvoteBtn" value={el.id}></i>
	    					</div>
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