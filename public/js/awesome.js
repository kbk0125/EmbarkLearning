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

  console.log(res[0])
  $('#auto').autocomplete({
    source: res[0],
    minLength:1
  })
  runD3(res[1])
})

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
      .attr("class", function(d) { return d.parent ? d.children ? "node" : "node node--leaf" : "node node--root"; })
      .attr("id", function(d){return "circle-node-"+ d.uniq})
      .style("fill", function(d) { return d.children ? color(d.depth) : null; })
      .on("click", function(d) {
        if (focus !== d && d.children){
          console.log(d)
          zoom(d), d3.event.stopPropagation();
        }
        if(d.depth>0){
          d3.selectAll(".node--leaf").style('pointer-events', 'all')
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
      .text(function(d) { return d.name; });

  var node = svg.selectAll("circle, text");

  d3.select("body")
      //.style("background", color(-1))
      .on("click", function() { 
        d3.selectAll(".node--leaf").style('pointer-events', 'none')
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
    }
    
  });

}
