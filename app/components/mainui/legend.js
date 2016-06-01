var React = require('react');
var ReactRouter= require('react-router');
var Link = ReactRouter.Link

var Legend = React.createClass({
    handleClick: function(e){
        e.target.checked ==false
        this.props.getCheckedBoxes(
            'contentFilter',
            'diffFilter'
        )
    },
    getInitialState: function(){
        return {
            check: true
        }
    },
    render: function (){
		return (
			<div className='legend'>
                <p> Type of Content </p>
                <div>
                    <label for="contentFilter1"><input type="checkbox" className='legendBox content' name="contentFilter" id="contentFilter1" value="article" defaultChecked onChange={this.handleClick}/> Article/Blog</label> 
                </div>
                <div>
                    <label for="contentFilter2"><input type="checkbox" className='legendBox content' name="contentFilter" id="contentFilter2" value="practical" defaultChecked onChange={this.handleClick}/> Hands On </label>
                </div>
                <div>
                    <label for="contentFilter3"><input type="checkbox" className='legendBox content' name="contentFilter" id="contentFilter3" value="video" defaultChecked onChange={this.handleClick}/> Video </label>
                </div>
                <div>
                    <label for="contentFilter4"><input type="checkbox" className='legendBox content' name="contentFilter" id="contentFilter4" value="book" defaultChecked onChange={this.handleClick}/> Book </label>
                </div>
                <div>
                    <label for="contentFilter5"><input type="checkbox" className='legendBox content' name="contentFilter" id="contentFilter5" value="course" defaultChecked onChange={this.handleClick}/> Course </label>
                </div>
                <p className='second'> Difficulty </p>
                <div>
                    <label for="diffFilter1"><input type="checkbox" className='legendBox diff' name="diffFilter" id="diffFilter1" value="beginner" defaultChecked onChange={this.handleClick}/> Beginner </label> 
                </div>
                <div>
                    <label for="diffFilter2"><input type="checkbox" className='legendBox diff' name="diffFilter" id="diffFilter2" value="intermediate" defaultChecked onChange={this.handleClick}/> Intermediate </label>
                </div>
                <div>
                    <label for="diffFilter3"><input type="checkbox" className='legendBox diff' name="diffFilter" id="diffFilter3" value="advanced" defaultChecked onChange={this.handleClick}/> Advanced </label>
                </div>
            </div>
		)
	}
})

module.exports = Legend;