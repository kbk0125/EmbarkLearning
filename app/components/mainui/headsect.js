var React = require('react');
var ReactRouter= require('react-router');
var Link = ReactRouter.Link

var HeadSect = React.createClass({
    triggerFilter: function(){
        var val= document.getElementById('srch').value
        console.log(val)
        this.props.updateFilter(val)
    },
    clearInput: function(){
        document.getElementById('srch').value =''
        this.props.elimFilter()
    },
    render: function (){
        if(this.props.isLoading === true){
            return(
                <h2> Loading </h2>
            )
        }
		else{

            var dets=this.props.headDets
            var head=[];
            head.push(<h2> {dets.title}</h2>)
            head.push(<p> {dets.summary} </p>)

            var left = dets.reqs.map(function(el,i){
                return <div key={el}><i className='fa fa-check'></i><p className='listEl'> {el}</p></div>
            })

            var right = dets.next.map(function(el,i){
                return <div key={el}><i className='fa fa-dot-circle-o'></i> <span className='leadIn'>{el[0]}</span><p className='listEl'>{el[1]}</p></div>
            })

            return (
    			 <div className='topOptions'>
                    <div className='learnSum'>
                        {head}
                        <div className='suggest prev'>
                            <p className='title'> First, you GOTTA know: </p>
                            {left}
                        </div>
                        <div className='suggest next'>
                            <p className='title'> Next, you can learn: </p>
                            {right}
                        </div>
                    </div>
                    <div className='secondSearch'>
                        <div className='add actionBtn' onClick={this.props.updateAddState}>
                            <i className='fa fa-plus'></i>
                            <p> Add A Resource</p>
                        </div>
                        <div className='search'>
                            <input type='text' placeholder='Search' id='srch' className='searchBox' />
                            <i className={this.props.filter.length ? "fa fa-times" : "fa fa-times gone"} onClick={this.clearInput}></i>
                            <i className="fa fa-search" onClick={this.triggerFilter}></i>
                        </div>
                    </div>
                </div>
    		)
        }
	}
})

module.exports = HeadSect;