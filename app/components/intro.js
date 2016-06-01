var React= require('react');
var ReactRouter= require('react-router');

var LinkCount=React.createClass({
	render: function (){
		var thisObj =this.props.voteTot.find(function( obj ) { return obj.category === this.props.uniq; }.bind(this))
		var linkTot= this.props.voteTot.length ? thisObj.linkTot :0;
		var votes= this.props.voteTot.length ? thisObj.votes :0;
		return(
			<div className='linkCount'>
				<p className='links'> {linkTot} Tutorials </p>
	            <p className='votes'> {votes} Votes </p>
			</div>
		)
	}
})	

var intro = React.createClass({
	newState : function(e){
		this.props.updateState(
			e.target.value,
			''
		)
	},
	render: function (){
		return(
			<div className="window">
	            <div id='opening'>
	                <div className="backImg">
	                    <div className='screen'></div>
	                </div>
	                <h1> Learn from the most helpful coding tutorials on the planet </h1>
	                <p> Upvote the ones you like or add nev ones that helped you. <br/> For the developers, by the developers.</p>
	                <div className="featureRow">
	                    <div className='mainPgCat'>
	                        <div className='actionBtn initChoice specClick' value='html' onClick={this.newState}><span className='symbol'>{'< />'}</span><p> HTML/CSS</p></div>
	                        <LinkCount uniq='html' voteTot={this.props.voteTot} />
	                    </div>
	                    <div className='mainPgCat'>
	                        <div className='actionBtn initChoice specClick' value='javascript' onClick={this.newState}><span className='symbol'>{'{..}'}</span><p> Javascript</p></div>
	                        <LinkCount uniq='javascript' voteTot={this.props.voteTot} />
	                    </div>
	                    <div className='mainPgCat'>
	                        <div className='actionBtn initChoice specClick' value='databases' onClick={this.newState}><i className="fa fa-database"></i><p> Databases </p></div>
	                        <LinkCount uniq='databases' voteTot={this.props.voteTot} />
	                    </div>
	                </div>
	                <div className="featureRow second">
	                    <div className='mainPgCat'>
	                        <div className='actionBtn initChoice specClick' value='userexperience' onClick={this.newState}><i className="fa fa-users"></i><p className="smallTxt"> User Experience </p></div>
	                        <LinkCount uniq='userexperience' voteTot={this.props.voteTot} />
	                    </div>
	                    <div className='mainPgCat' >
	                        <div className='actionBtn initChoice specClick' value='webdesign' onClick={this.newState}><i className="fa fa-area-chart"></i><p> Web Design </p></div>
	                        <LinkCount uniq='webdesign' voteTot={this.props.voteTot} />
	                    </div>
	                    <div className='mainPgCat phantomBox'></div>
	                </div>
	            </div>
            </div>
		)
	}
});

module.exports = intro;