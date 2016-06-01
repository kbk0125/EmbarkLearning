var React = require('react');
var ReactRouter= require('react-router');
var Link = ReactRouter.Link

var Legend = React.createClass({
	render: function (){
		return (
			<div className='legend'>
                <p> Type of Content </p>
                <div>
                    <input type="checkbox" className='legendBox content' name="contentFilter" id="contentFilter1" value="article" /><label for="contentFilter1"> Article/Blog</label> 
                </div>
                <div>
                    <input type="checkbox" className='legendBox content' name="contentFilter" id="contentFilter2" value="practical" /><label for="contentFilter2"> Hands On </label>
                </div>
                <div>
                    <input type="checkbox" className='legendBox content' name="contentFilter" id="contentFilter3" value="video" /><label for="contentFilter3"> Video </label>
                </div>
                <div>
                    <input type="checkbox" className='legendBox content' name="contentFilter" id="contentFilter4" value="book" /><label for="contentFilter4"> Book </label>
                </div>
                <div>
                    <input type="checkbox" className='legendBox content' name="contentFilter" id="contentFilter5" value="course" /><label for="contentFilter5"> Course </label>
                </div>
                <p className='second'> Difficulty </p>
                <div>
                    <input type="checkbox" className='legendBox diff' name="diffFilter" id="diffFilter1" value="beginner" /><label for="diffFilter1"> Beginner </label> 
                </div>
                <div>
                    <input type="checkbox" className='legendBox diff' name="diffFilter" id="diffFilter2" value="intermediate" /><label for="diffFilter2"> Intermediate </label>
                </div>
                <div>
                    <input type="checkbox" className='legendBox diff' name="diffFilter" id="diffFilter3" value="advanced" /><label for="diffFilter3"> Advanced </label>
                </div>
            </div>
		)
	}
})

module.exports = Legend;