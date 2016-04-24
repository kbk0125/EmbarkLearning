//initial get to load up the data
$.get('/objSend', function(data){
	main(data);
})

//Tooltip for what to include in tooltip
var tipString= "<p> Test Title"+
	"</br>"+
	"<i class='fa fa-taxi' aria-hidden='true'></i>"+
	"<h2> category example </h2>";

function main(allData){
	var w = window.innerWidth*0.95;
	// nTop = number of top level categories in categories.js
	var keys = Object.keys(allData)
	var nTop = keys.length;

	//calculate radius
	var oR = w/(1+3.5*nTop);
	//small radius
	var smoR= oR/2.5;

	var h = window.innerHeight*0.65

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

	var yPos= (h+oR)/2.7;

	function xPosChild(iB, i){
		return (xPos(iB) + oR*1.75*Math.cos((i-2)*30/180*3.1415926));
	} 

	function yPosChild(i){
		return (yPos +        oR*1.75*Math.sin((i-2)*30/180*3.1415926));
	}

	var svgContainer = d3.select("#mainBubble")
		.style("height", h+"px");

	//Tooltip guide http://bl.ocks.org/d3noob/a22c42db65eb00d4e369
	var div = d3.select("#mainBubble").append("div")	
	    .attr("class", "tooltip")				
	    .style("opacity", 0);
  
	//Create svg and make sure correct functon runs when leaving
	var svg = d3.select("#mainBubble").append("svg")
		.attr("class", "mainBubbleSVG")
		.attr("width", w)
		.attr("height",h)
		.on("mouseleave", function() {return resetBubbles();});
	
	//append note at bottom	 
	var mainNote = svg.append("text")
		.attr("id", "bubbleItemNote")
		.attr("x", 10)
		.attr("y", w/2-15)
		.attr("font-size", 12)
		.attr("dominant-baseline", "middle")
		.attr("alignment-baseline", "middle")
		.style("fill", "#888888")
		.text(function(d) {return "D3.js bubble menu developed by Shipeng Sun (sunsp.gis@gmail.com), Institute of Environment, University of Minnesota, and University of Springfield, Illinois.";});   


	// REVIEW
	var bubbleObj = svg.selectAll(".topBubble")
		.data(keys)
		.enter().append("g")
		.attr("id", function(d,i) {return "topBubbleAndText_" + i});
		 

	//auto create color category of 10 things
	//https://github.com/mbostock/d3/wiki/Ordinal-Scales
	var colVals = d3.scale.category10();
	
	//creates top level bubbles, main categories
	//positioning dependent on OR 
	bubbleObj.append("circle")
		.attr("class", "topBubble")
		.attr("id", function(d,i) {return "topBubble" + i;})
		.attr("r", function(d) { return oR; })
		.attr("cx", function(d, i) {return xPos(i)})
		.attr("cy", yPos)
		.style("fill", function(d,i) { return colVals(i); }) // #1f77b4
		.style("opacity",0.3)
		.on("mouseover", function(d,i) {return activateBubble(d,i);});
	 
	//add appropriate name to top level bubble	 
	bubbleObj.append("text")
		.attr("class", "topBubbleText")
		.attr("x", function(d, i) {return xPos(i);})
		.attr("y", yPos)
		.style("fill", function(d,i) { return colVals(i); }) // #1f77b4
		.attr("font-size", bigFont)
		.attr("text-anchor", "middle")
		.attr("dominant-baseline", "middle")
		.attr("alignment-baseline", "middle")
		.text(function(d,i) {
			return allData[keys[i]]['default']['short']
		})      
		.on("mouseover", function(d,i) {return activateBubble(d,i);});
		 
		 
		for(var iB = 0; iB < nTop; iB++){
			// This creates the child bubbles at a level below the top ones

			var childBubbles = svg.selectAll(".childBubble" + iB)
				.data(Object.keys(allData[keys[iB]]['subcat']))
				.enter().append("g");
				 
			//add child bubbles at certain ratio around main bubble 
			childBubbles.append("circle")
				.attr("class", "childBubble" + iB)
				.attr("id", function(d,i) {return "childBubble_" + iB + "sub_" + i;})
				.attr("r",  function(d) {return smoR;})
				.attr("cx", function(d,i) {return xPosChild(iB,i);})
				.attr("cy", function(d,i) {return yPosChild(i);})
				.attr("cursor","pointer")
				.style("opacity",0.5)
				.style("fill", "#eee")
				.on("click", function(d,i) {
					// open the specific link on click
					var currentx = Number(d3.select(this).attr("cx")) - Number(d3.select(this).attr("r"))/2.25
					var currenty = Number(d3.select(this).attr("cy")) + Number(d3.select(this).attr("r")) +5
					div.transition()		
		                .duration(200)		
		                .style("opacity", 1);		
		            div.html(tipString)	
		                .style("left", currentx + "px")		
		                .style("top", currenty + "px");                
				})
				.on("mouseover", function(d,i) {
					//update the note in bottom left
					var noteText = "";
					if (d.note == null || d.note == "") {
						noteText = d.address;
					} 
					else {
						noteText = d.note;
					}
					d3.select("#bubbleItemNote").text(noteText);
				})
				.append("svg:title")

			//Add title to the respective circle
			childBubbles.append("text")
				.attr("class", "childBubbleText" + iB)
				.attr("x", function(d,i) {return xPosChild(iB,i);})
				.attr("y", function(d,i) {return yPosChild(i);})
				.style("opacity",0.5)
				.attr("text-anchor", "middle")
				.style("fill", function(d,i) { return colVals(iB); }) // #1f77b4
				.attr("font-size", smFont)
				.attr("cursor","pointer")
				.attr("dominant-baseline", "middle")
				.attr("alignment-baseline", "middle")
				.text(function(d,i) {
					return allData[keys[iB]]['subcat'][d]['short']
				})      
				.on("click", function(d,i) {
					window.open(d.address);
				}); 

		}


	resetBubbles = function () {
		
		// These correspond to original ways that the variables were created... but needs to be there so it can be called continuously
		w = window.innerWidth*0.95;
		oR = w/(1+3.5*nTop);

		h = window.innerHeight*0.65


		svgContainer.style("height",h+"px");

		//this is the bottom note text
		mainNote.attr("y",h-15);
		   
		svg.attr("width", w);
		svg.attr("height",h);       

		d3.select("#bubbleItemNote").text("D3.js bubble menu developed by Shipeng Sun (sunsp.gis@gmail.com), Institute of Environment, University of Minnesota, and University of Springfield, Illinois.");


		var t = svg.transition()
			.duration(650);
		
		// this is basically all a duplicate of thing above, just with transition 
		t.selectAll(".topBubble")
			.attr("r", function(d) { return oR; })
			.attr("cx", function(d, i) {return xPos(i);})
			.attr("cy", yPos);

		t.selectAll(".topBubbleText")
			.attr("font-size", bigFont)
			.attr("x", function(d, i) {return xPos(i);})
			.attr("y", yPos);

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

		// increase this bubble and decrease others
		var t = svg.transition()
			.duration(d3.event.altKey ? 7500 : 350);

		//NEED TO FIX TO ALIGN WITH Ones up top
		function pushleft(a){
			return oR*(3*(1+a)-1);
		}

		function adjustX(a){
			return 0.6*oR*(a-1)
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
						return oR*(nTop*3+1) - oR*0.6*(3*(nTop-ii)-1);
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
						return oR*(nTop*3+1) - oR*0.6*(3*(nTop-ii)-1);
					}
				}               
			})          
			.attr("font-size", function(d,ii){
				if(i == ii)
					return bigFont*1.5;
				else
					return bigFont*0.6;              
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
				}); 
		}                   
	}

	window.onresize = resetBubbles;
	
}