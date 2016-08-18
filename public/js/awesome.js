function flatten(arr) {
  return arr.reduce(function (flat, toFlatten) {
    return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten);
  }, []);
}

//http://stackoverflow.com/questions/9063383/how-to-invoke-click-event-programmatically-in-d3
jQuery.fn.d3Click = function () {
  this.each(function (i, e) {
    var evt = new MouseEvent("click");
    e.dispatchEvent(evt);
  });
};

$.get('/testPath2', function(res){

  //console.log(res[1])
  $('#auto').autocomplete({
    source: res[0],
    minLength:1
  })
  runD3(res[1])
})

/*$.get('/specRepo', function(res){
  console.log(res)
  //runD3(res[1])
})*/

function runD3(root){
  var margin = 20,
      diameter = window.innerHeight-60;

  /*var color = d3.scale.linear()
      .domain([-1, 5])
      .range(["hsl(152,80%,80%)", "hsl(228,30%,40%)"])
      .interpolate(d3.interpolateHcl);*/

    var color=d3.scale.category20c()

  var pack = d3.layout.pack()
      .padding(2)
      .size([diameter - margin, diameter - margin])
      .value(function(d) { return d.link.length; })

  var svg = d3.select("#main").append("svg")
      .attr("width", window.innerWidth)
      .attr("height", diameter)
      .append("g")
      .attr("transform", "translate(" + window.innerWidth / 2 + "," + diameter / 2 + ")");

  var focus = root,
      nodes = pack.nodes(root),
      view;

  var circle = svg.selectAll("circle")
      .data(nodes)
      .enter().append("circle")
      //This creates separate classes for the entire circle, the general category, the mid-level category when needed, and the smallest circles
      .attr("class", function(d) { return d.parent ? d.children ? d.parent.parent ? "node nodeMid" : "node nodeGen" : "node node--leaf" : "node node--root"; })
      .attr("id", function(d){return "circle-node-"+ d.uniq})
      .style("fill", function(d) { return d.children ? color(d.depth) : null; })
      .on("click", function(d) {
        //NEEDS FIXING
        if (focus !== d && d.children){
          zoom(d), d3.event.stopPropagation();
        }
        if(d.depth>0){
          d3.selectAll(".node--leaf, .nodeMid").style('pointer-events', 'all')
          if(!d.children)
            window.open(d.link)
        }
      });

  var text = svg.selectAll("text")
      .data(nodes)
      .enter().append("text")
      .attr("class", "label")
      .style("fill-opacity", function(d) { return d.parent === root ? 1 : 0; })
      .style("display", function(d) { return d.parent === root ? "inline" : "none"; })
      .text(function(d) {
        return d.name; 
      });

  var node = svg.selectAll("circle, text");

  d3.select("body")
    //.style("background", color(-1))
    .on("click", function() { 
      d3.selectAll(".node--leaf, .nodeMid").style('pointer-events', 'none')
      zoom(root); 
    });

  zoomTo([root.x, root.y, root.r * 2 + margin]);

  function zoom(d) {
    var focus0 = focus; focus = d;
    var transition = d3.transition()
        .duration(d3.event.altKey ? 7500 : 750)
        .tween("zoom", function(d) {
          var i = d3.interpolateZoom(view, [focus.x, focus.y, focus.r * 2 + margin]);
          return function(t) { zoomTo(i(t)); };
        });

    transition.selectAll("text")
      .filter(function(d) { return d.parent === focus || this.style.display === "inline"; })
        .style("fill-opacity", function(d) { return d.parent === focus ? 1 : 0; })
        .each("start", function(d) { if (d.parent === focus) this.style.display = "inline"; })
        .each("end", function(d) { if (d.parent !== focus) this.style.display = "none"; });
  }

  function zoomTo(v) {
    var k = diameter / v[2]; view = v;
    node.attr("transform", function(d) { return "translate(" + (d.x - v[0]) * k + "," + (d.y - v[1]) * k + ")"; });
    circle.attr("r", function(d) { return d.r * k; });
  }

  d3.select(self.frameElement).style("height", diameter + "px");

  $( "#auto" ).on( "autocompleteselect", function( event, ui ) {
    if(d3.select("#circle-node-"+ui.item.value).datum().children)
      $("#circle-node-"+ui.item.value).d3Click()
    else{
      var parUniq= d3.select("#circle-node-"+ui.item.value).datum().parent.uniq
      $("#circle-node-"+parUniq).d3Click()
      $("#circle-node-"+ui.item.value).css('fill', '#fdae6b')
    }
    
  });

}

function runSubD3(root){
  $('.spinnerBox').fadeOut()

  var margin = {top: 20, right: 120, bottom: 20, left: 120},
    width = window.innerWidth*0.95 - margin.right - margin.left,
    height = 1000 - margin.top - margin.bottom;

  var i = 0,
    duration = 750;

  var tree = d3.layout.tree()
    .size([height, width]);

  var diagonal = d3.svg.diagonal()
    .projection(function(d) { return [d.y, d.x]; });

  var svg = d3.select("#main").append("svg")
    .attr("width", width + margin.right + margin.left)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  root.x0 = height / 2;
  root.y0 = 0;

  var storeChildren=[]

  function collapse(d) {
    if (d.children) {
      d._children = d.children;
      d._children.forEach(collapse);
      d.children = null;
    }
  }

  root.children.forEach(collapse);
  update(root);

  d3.select(self.frameElement).style("height", "1000px");

  function update(source) {

    // Compute the new tree layout.
    var nodes = tree.nodes(root).reverse(),
        links = tree.links(nodes);

    // Normalize for fixed-depth.
    nodes.forEach(function(d) { d.y = d.depth * 180; });

    // Update the nodes…
    var node = svg.selectAll("g.smNode")
        .data(nodes, function(d) { return d.id || (d.id = ++i); });

    // Enter any new nodes at the parent's previous position.
    var nodeEnter = node.enter().append("g")
        .attr("class", "smNode")
        .attr("id", function(d){return "smNode-"+ d.uniq})
        .attr("transform", function(d) { return "translate(" + source.y0 + "," + source.x0 + ")"; })
        .on("click", click);

    nodeEnter.append("circle")
        .attr("r", 1e-6)
        .style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; });

    nodeEnter.append("text")
      .attr("x", function(d) { return d.children || d._children ? -10 : 10; })
      .attr("dy", function(d){
        if(d.link && d.parent.children.length <20)
          return '-0.1em';
        else
          return "0.3em";
      })
      .attr('class', 'headTxt')
      .attr("text-anchor", function(d) { return d.children || d._children ? "end" : "start"; })
      .text(function(d) { return d.name; })
      .style("fill-opacity", 1e-6);

    nodeEnter.append("text")
      .attr("x", function(d) { return d.children || d._children ? -10 : 10; })
      .attr("dy", "1em")
      .attr('class', 'descTxt')
      .attr("text-anchor", function(d) { return d.children || d._children ? "end" : "start"; })
      .text(function(d) {
        if(d.link && d.parent.children.length <20) 
          return d.link;
        else
          return ''; 
      })
      .style("fill-opacity", 1e-6);

    //This allows us to shield when there is overlap(if needed)
    nodeEnter.insert('rect', 'circle')
      .attr('x', function(d){
        return -(this.parentNode.getBBox().width) -6;
      })
      .attr('y', function(d){
        return -(this.parentNode.getBBox().height/2);
      })
      .attr('width', function(d){
        return this.parentNode.getBBox().width;
      })
      .attr('height', function(d){
        return this.parentNode.getBBox().height;
      })
      .attr("fill-opacity", function(d) { return d.children || d._children ? "1" : "0"; })

    // Transition nodes to their new position.
    var nodeUpdate = node.transition()
        .duration(duration)
        .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; });

    nodeUpdate.select("circle")
        .attr("r", 4.5)
        .style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; });

    nodeUpdate.select("text.headTxt")
        .style("fill-opacity", 1);

    nodeUpdate.select("text.descTxt")
        .style("fill-opacity", 1);

    // Transition exiting nodes to the parent's new position.
    var nodeExit = node.exit().transition()
        .duration(duration)
        .attr("transform", function(d) { return "translate(" + source.y + "," + source.x + ")"; })
        .remove();

    nodeExit.select("circle")
        .attr("r", 1e-6);

    nodeExit.select("text")
        .style("fill-opacity", 1e-6);

    // Update the links…
    var link = svg.selectAll("path.smLink")
        .data(links, function(d) { return d.target.id; });

    // Enter any new links at the parent's previous position.
    link.enter().insert("path", "g")
        .attr("class", "smLink")
        .attr("d", function(d) {
          var o = {x: source.x0, y: source.y0};
          return diagonal({source: o, target: o});
        });

    // Transition links to their new position.
    link.transition()
        .duration(duration)
        .attr("d", diagonal);

    // Transition exiting nodes to the parent's new position.
    link.exit().transition()
        .duration(duration)
        .attr("d", function(d) {
          var o = {x: source.x, y: source.y};
          return diagonal({source: o, target: o});
        })
        .remove();

    // Stash the old positions for transition.
    nodes.forEach(function(d) {
      d.x0 = d.x;
      d.y0 = d.y;
    });
  }


  // Toggle children on click.
  function click(d) {
    
    if (d.children) {
      d._children = d.children;
      d.children = null;
    } 
    else {
      d.children = d._children;
      d._children = null;
    }

    //if it is last level, open the link associated
    if(!d._children && !d.children)
      window.open(d.link)

    update(d);
  }

  $( "#auto" ).on( "autocompleteselect", function( event, ui ) {
    var topParent= ui.item.topParent
    var nearParent= ui.item.nearParent

    if(topParent){
      $("#smNode-"+topParent).d3Click()
      if(nearParent)
        $("#smNode-"+nearParent).d3Click()
    }
    else
      $("#smNode-"+ui.item.value).d3Click()

    d3.select("#smNode-"+ui.item.value).selectAll('text.headTxt').style('fill', 'red')
    
  });
}