var activeCategory ="";
var activeSubCategory ="";

//initial get to load up the data
$.get('/objSend', function(data){
	main(data);
})

//Capitalize first letter of a string
function capLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

//Tooltip for what to include in tooltip
var tipString= "<p class='tipTitle'> Pick a Tutorial Type (optional) </p>" +
	"<div class='triangle'></div>"+
	"<div class='cat'><i class='fa fa-list-alt' aria-hidden='true'></i><p> Article </p></div>"+
	"<div class='cat'><i class='fa fa-video-camera' aria-hidden='true'></i><p> Video </p></div>"+
	"<div class='cat'><i class='fa fa-pencil' aria-hidden='true'></i><p> Practical </p></div>"+
	"<div class='cat'><i class='fa fa-book' aria-hidden='true'></i><p> Book </p></div>"+
	"<div class='cat'><i class='fa fa-graduation-cap' aria-hidden='true'></i><p> Course </p></div>";


function getCategorySub(category, subcat){
	$.get('/subDevList', {listKey: category, subKey:subcat}, function (linkList){
		if(linkList.length){
			$('.labels').hide('slide', function(){
				$('.topP').text('3 Most Popular Tutorials')
				$('.linkSum').hide('slow', function(){
					$(this).remove()
				});
				$('.topTuts').show(function(){
					for(var i=0; i<linkList.length; i++){
						addLink(linkList[i]);
					}
				})
			});
			
		}
	})
}

function addLink(linkData){
	
	var	mainBody = '<div class="linkSum"><div class="topLine"><a href="'+linkData.link+'" target="_blank"><h3><i class="fa fa-link" aria-hidden="true"></i>'+capLetter(linkData.title)+'</h3></a>'+
	'<p class="filter">'+linkData.filter+'</p>'+
	'<p class="votes">Votes: '+linkData.votes+'</p>'+
	'<p class="diff">'+linkData.challenge+'</p></div>'+
	'<p class="description">'+linkData.description+'</p></div>';

	//http://stackoverflow.com/questions/14160498/sort-element-by-numerical-value-of-data-attribute
	var wrapper = $('.topTuts').children('.topLinks')
	$(mainBody).appendTo(wrapper).show('slow');
}

function main(allData){
	var w = window.innerWidth*0.99;
	// nTop = number of top level categories in categories.js
	var keys = Object.keys(allData)
	var nTop = keys.length;
	var prevID= "";
	var prevTitle = "";

	//calculate radius
	var oR = w/(1+3.5*nTop);
	//small radius
	var smoR= oR/2.5;

	var h = window.innerHeight*0.62

	if(window.innerWidth > 1500){
		var bigFont= 20;
		var smFont=11;
	}
	else{
		var bigFont= 16;
		var smFont=10;
	}

	function xPos (i){
		return oR*(3.75*(0.6+i)-1);
	}

	var yPos= (h+oR)/2.5;

	function xPosChild(iB, i){
		return (xPos(iB) + oR*1.75*Math.cos((i-2)*30/180*3.1415926));
	} 

	function yPosChild(i){
		return (yPos +        oR*1.75*Math.sin((i-2)*30/180*3.1415926));
	}

	var svgContainer = d3.select("#mainBubble")
		.style("height", h+"px")
		.on("mouseleave", function() {
			hideTooltip();
			return resetBubbles();
		});
  
	//Create svg and make sure correct functon runs when leaving
	var svg = d3.select("#mainBubble").append("svg")
		.attr("class", "mainBubbleSVG")
		.attr("width", w)
		.attr("height",h);

	var vertLine = svg.selectAll(".vertLine")
		.data(keys+keys)
		.enter().append("g")
		.attr("id", function(d,i) {return "vertLine_" + i});

    var lineObj = svg.selectAll(".lineObj")
		.data(keys)
		.enter().append("g")
		.attr("id", function(d,i) {return "topLine_" + i});	 
		

	//Tooltip guide http://bl.ocks.org/d3noob/a22c42db65eb00d4e369
	var div = d3.select("#mainBubble").append("div")	
	    .attr("id", "tooltip")				
	    .style("display", 'none'); 

	var bubbleObj = svg.selectAll(".topBubble")
		.data(keys)
		.enter().append("g")
		.attr("id", function(d,i) {return "topBubbleAndText_" + i});
		 

	//auto create color category of 10 things
	//https://github.com/mbostock/d3/wiki/Ordinal-Scales
	//https://color.adobe.com/Flat-rainbow-color-theme-3012612/?showPublished=true
	var colVals = ["#2D95BF", "#4EBA6F", '#F0C419', "#F15A5A", "#955BA5"]

	var faHash = ["\uf1fe", "\uf0c0", "\uf13b", "\uf121","\uf1c0" ]

	lineObj.append('line')
		.attr("class", "lineObj")
	    .attr("x1", 0)     // x position of the first end of the line
	    .attr("y1", function(d,i) {return (i+1)*(h/6);})      // y position of the first end of the line
	    .attr("x2", window.innerWidth)     // x position of the second end of the line
	    .attr("y2", function(d,i) {return (i+1)*(h/6);})      // y position of the first end of the line

    vertLine.append('line')
		.attr("class", "vertLine")
	    .attr("y1", h/20)     // x position of the first end of the line
	    .attr("x1", function(d,i) {return (i+1)*(w/11);})      // y position of the first end of the line
	    .attr("y2", h*0.95)     // x position of the second end of the line
	    .attr("x2", function(d,i) {return (i+1)*(w/11);})      // y position of the first end of the line
	
	//creates top level bubbles, main categories
	//positioning dependent on OR 
	bubbleObj.append("circle")
		.attr("class", "topBubble")
		.attr("id", function(d,i) {return "topBubble" + i;})
		.attr("title", function(d, i) { return ".childBubble"+i})
		.attr("r", function(d) { return oR; })
		.attr("cx", function(d, i) {return xPos(i)})
		.attr("cy", yPos)
		.style("fill", function(d,i) { return colVals[i]; })
		.on("mouseover", function(d,i) {
			var title= d3.select(this).attr("title")
			if(title !== prevTitle){
				hideTooltip()
			}
			return activateBubble(d,i);
		})
		.on("click", function(d,i) {
			//finds all children elements related to the one big one
			var title= d3.select(this).attr("title")
			var children = d3.selectAll(title);
			var color = d3.select(this).style("fill")

			children.transition()		
                .duration(500)
                .style('fill', '#404040')
            setTimeout(function(){
            	children.transition()		
                	.duration(500)
                	.style("fill", color)
            },500)
		});
	 
	//add appropriate name to top level bubble	 
	bubbleObj.append("text")
		.attr("class", "topBubbleText")
		.attr("x", function(d, i) {return xPos(i);})
		.attr("y", yPos +bigFont/2)
		.attr("font-size", bigFont)
		.attr("text-anchor", "middle")
		.attr("dominant-baseline", "middle")
		.attr("alignment-baseline", "middle")
		.text(function(d,i) {
			return allData[keys[i]]['default']['short']
		})

	//add appropriate name to top level bubble	 
	bubbleObj.append("text")
		.attr("class", "topBubbleChar")
		.attr("x", function(d, i) {return xPos(i);})
		.attr("y", yPos-bigFont)
		.attr("font-size", bigFont*1.5)
		.attr("text-anchor", "middle")
		.attr("dominant-baseline", "middle")
		.attr("alignment-baseline", "middle")
		.text(function(d,i) {
			return faHash[i];
		})      
		 
		 
	for(var iB = 0; iB < nTop; iB++){
		// This creates the child bubbles at a level below the top ones

		var childBubbles = svg.selectAll(".childBubble" + iB)
			.data(Object.keys(allData[keys[iB]]['subcat']))
			.enter().append("g");
			 
		//add child bubbles at certain ratio around main bubble
		//id is the subcat with a number on the end
		//title is the whole category 
		childBubbles.append("circle")
			.attr("class", "smBubble childBubble" + iB)
			.attr("id", function(d,i) {return d + iB;})
			.attr("title", keys[iB])
			.attr("r",  function(d) {return smoR;})
			.attr("cx", function(d,i) {return xPosChild(iB,i);})
			.attr("cy", function(d,i) {return yPosChild(i);})
			.style("fill", function(d,i) { return colVals[iB]; })
			.style("stroke", function(d,i) { return colVals[iB]; })
			.on("click", function(d,i) {
				var cat= d3.select(this).attr("title")
				var fullID=d3.select(this).attr("id")
				var id = fullID.slice(0, -1);
				activeCategory = cat;
				activeSubCategory= id;
				getCategorySub(cat, id)
				// open the specific link on click
				div.html(tipString)
					.style("display", 'block');
				var width = document.getElementById('tooltip').offsetWidth;
				var currentx = Number(d3.select(this).attr("cx")) - width/2
				var currenty = Number(d3.select(this).attr("cy")) + Number(d3.select(this).attr("r")) +8
				div.transition()		
	                .duration(500)	
	                .style("left", currentx + "px")		
	                .style("top", currenty + "px");                
			})
			.on("mouseover", function(d,i) {
				var curID= d3.select(this).attr("id")
				if(curID !== prevID){
					hideTooltip();
				}
				prevID= curID;
				var keyClass = d3.select(this).attr("class")
				var splitClass= keyClass.split(" ")
				prevTitle = "."+splitClass[1]
			});

		//Add title to the respective circle
		childBubbles.append("text")
			.attr("class", "smBubbleTxt childBubbleText" + iB)
			.attr("x", function(d,i) {return xPosChild(iB,i);})
			.attr("y", function(d,i) {return yPosChild(i);})
			.attr("text-anchor", "middle")
			.attr("font-size", smFont)
			.attr("dominant-baseline", "middle")
			.attr("alignment-baseline", "middle")
			.text(function(d,i) {
				return allData[keys[iB]]['subcat'][d]['short']
			})      

	}

	hideTooltip = function(){
		div.transition()		
            .style('display', 'none')
	}

	resetBubbles = function () {
		
		// These correspond to original ways that the variables were created... but needs to be there so it can be called continuously
		w = window.innerWidth*0.95;
		oR = w/(1+3.5*nTop);
		smoR= oR/2.5;

		h = window.innerHeight*0.62
		yPos= (h+oR)/2.5;

		svgContainer.style("height",h+"px");
		   
		svg.attr("width", w);
		svg.attr("height",h);

		if(window.innerWidth > 1500){
			var bigFont= 20;
			var smFont=11;
		}
		else{
			var bigFont= 16;
			var smFont=10;
		}       


		var t = svg.transition()
			.duration(650);

	t.selectAll(".lineObj")
	    .attr("x1", 0)     // x position of the first end of the line
	    .attr("y1", function(d,i) {return (i+1)*(h/6);})      // y position of the first end of the line
	    .attr("x2", window.innerWidth)     // x position of the second end of the line
	    .attr("y2", function(d,i) {return (i+1)*(h/6);})      // y position of the first end of the line

    t.selectAll(".vertLine")
	    .attr("y1", h/20)     // x position of the first end of the line
	    .attr("x1", function(d,i) {return (i+1)*(w/11);})      // y position of the first end of the line
	    .attr("y2", h*0.95)     // x position of the second end of the line
	    .attr("x2", function(d,i) {return (i+1)*(w/11);})      // y position of the first end of the line
		
		// this is basically all a duplicate of thing above, just with transition 
		t.selectAll(".topBubble")
			.attr("r", function(d) { return oR; })
			.attr("cx", function(d, i) {return xPos(i);})
			.attr("cy", yPos);

		t.selectAll(".topBubbleText")
			.attr("font-size", bigFont)
			.attr("x", function(d, i) {return xPos(i);})
			.attr("y", yPos+bigFont/2);

		t.selectAll(".topBubbleChar")
			.attr("font-size", bigFont*1.5)
			.attr("x", function(d, i) {return xPos(i);})
			.attr("y", yPos-bigFont);

		for(var k = 0; k < nTop; k++) {
			t.selectAll(".childBubbleText" + k)
				.attr("x", function(d,i) {return xPosChild(k,i);})
				.attr("y", function(d,i) {return yPosChild(i);})
				.attr("font-size", smFont)
				.style("opacity",0.5);

			t.selectAll(".childBubble" + k)
				.attr("r",  function(d) {return smoR;})
				.style("opacity",0.5)
				.attr("cx", function(d,i) {return xPosChild(k,i);})
				.attr("cy", function(d,i) {return yPosChild(i);});
					 
		}   
	}
	 
	 
	function activateBubble(d,i) {

		if(window.innerWidth > 1500){
			var bigFont= 20;
			var smFont=11;
		}
		else{
			var bigFont= 16;
			var smFont=10;
		}    

		// increase this bubble and decrease others
		var t = svg.transition()
			.duration(d3.event.altKey ? 7500 : 350);

		//NEED TO FIX TO ALIGN WITH Ones up top
		function pushleft(a){
			return oR*(3.4*(0.9+a)-1);
		}

		function adjustX(a){
			return 0.6*oR*(a-1)
		}

		function pushRight(a){
			//2.9*ntop affects how far right they go
			//0.6 is spacing between circles
			//last number is the back anchor- how far right is furthest right?
			//this one is more or less acceptable
			return oR*(nTop*2.9+2) - oR*0.8*(3*(nTop-a)-2.5)
		}

		function calcXMove(i){
			return oR*2.4*Math.cos((i-1.2)*45/180*3.1415926)
		}

		function calcYMove(i){
			return oR*2.4*Math.sin((i-1.2)*45/180*3.1415926)
		}

		t.selectAll(".topBubble")
			.attr("cx", function(d,ii){
				if(i == ii) {
					// Nothing to change
					return pushleft(ii) - adjustX(ii);
				} 
				else {
					// Push away a little bit
					if(ii < i){
						// left side
						return 0.6*pushleft(ii);
					} else {
						// right side
						return pushRight(ii);
					}
				}               
			})
			.attr("r", function(d, ii) { 
				if(i == ii)
					return oR*1.5;
				else
					return oR*0.8;
				});
				 
		t.selectAll(".topBubbleText")
			.attr("x", function(d,ii){
				if(i == ii) {
					// Nothing to change
					return pushleft(ii) - adjustX(ii);
				} 
				else {
					// Push away a little bit
					if(ii < i){
						// left side
						return 0.6*pushleft(ii);
					} else {
						// right side
						return pushRight(ii);
					}
				}               
			})          
			.attr("font-size", function(d,ii){
				if(i == ii)
					return bigFont*1.5;
				else
					return bigFont*0.6;              
			})
			.attr("y", function(d,ii){
				if(i == ii)
					return yPos +(bigFont*0.75);
				else
					return yPos +(bigFont*0.5);              
			});

		t.selectAll(".topBubbleChar")
			.attr("x", function(d,ii){
				if(i == ii) {
					// Nothing to change
					return pushleft(ii) - adjustX(ii);
				} 
				else {
					// Push away a little bit
					if(ii < i){
						// left side
						return 0.6*pushleft(ii);
					} else {
						// right side
						return pushRight(ii);
					}
				}               
			})          
			.attr("font-size", function(d,ii){
				if(i == ii)
					return bigFont*2.2;
				else
					return bigFont*0.9;              
			})
			.attr("y", function(d,ii){
				if(i == ii)
					return yPos -(bigFont*1.25);
				else
					return yPos -(bigFont*0.5);              
			});

		var signSide = -1;
		for(var k = 0; k < nTop; k++) {
			signSide = 1;

			if(k < nTop/2) 
				signSide = 1;
			t.selectAll(".childBubbleText" + k)
				.attr("x", function(d,i) {return (pushleft(k) - adjustX(k) + signSide*calcXMove(i));})
				.attr("y", function(d,i) {return (yPos + signSide*calcYMove(i));})
				.attr("font-size", function(){
					return (k==i)?(smFont*1.2):smFont;
				})
				.style("opacity",function(){
					return (k==i)?1:0;
				});
				 
			t.selectAll(".childBubble" + k)
				.attr("cx", function(d,i) {return (pushleft(k) - adjustX(k) + signSide*calcXMove(i));})
				.attr("cy", function(d,i) {return (yPos + signSide*calcYMove(i));})
				.attr("r", function(){
					return (k==i)?(smoR*1.75):(smoR);               
				})
				.style("opacity", function(){
					return (k==i)?1:0;                  
				})
				.style("pointer-events",function(){
					return (k==i)?'auto':'none';
				}); 
		}                   
	}

	window.onresize = resetBubbles;
	
}

$('body').on('click', '#tooltip .cat', function(){
	var conType= $(this).children('p').text()
	var conTrimmed= conType.toLowerCase().trim()
	$.get('/subDevListType', {listKey: activeCategory, subKey:activeSubCategory, conType:conTrimmed}, function (linkList){
		$('.linkSum').hide('slow', function(){
			$(this).remove()
		});
		if(linkList.length){
			$('.topP').text('3 Most Popular Tutorials-'+conType)
			for(var i=0; i<linkList.length; i++){
				addLink(linkList[i]);
			}
		}
	})

})