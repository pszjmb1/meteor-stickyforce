
if (Meteor.isClient) {

  Deps.autorun( function () {
    Meteor.subscribe('nodesSubscription');
    Meteor.subscribe('linksSubscription');
  });

  Meteor.startup( function() {
    var width = $( window ).width(),
    height = $( window ).height();

    var force = d3.layout.force()
    .size([width, height])
    .charge(-400)
    .linkDistance(40)
    .on("tick", tick);

    var drag = force.drag()
    .on("dragstart", dragstart);

    var svg = d3.select("#graph").append("svg")
    .attr("width", width)
    .attr("height", height);

    Deps.autorun( function() {
      var nodes = Nodes.find().fetch();      
      var links = Links.find().fetch();
      if(nodes && links){
        var link = svg.selectAll(".link"),
        node = svg.selectAll(".node");
        force = force.nodes(nodes)
        .links(links)
        .start();
        link = link.data(links)
        .enter().append("line")
        .attr("class", "link");

        node = node.data(nodes)
        .enter().append("circle")
        .attr("class", "node")
        .attr("id", node)
        .attr("r", 12)
        .call(drag);
      }
    });   

    function tick() {      
      var link = svg.selectAll(".link"),
      node = svg.selectAll(".node");
      link.attr("x1", function(d) { return d.source.x; })
      .attr("y1", function(d) { return d.source.y; })
      .attr("x2", function(d) { return d.target.x; })
      .attr("y2", function(d) { return d.target.y; });

      node.attr("cx", function(d) { return d.x; })
      .attr("cy", function(d) { return d.y; });
    }

    function dragstart(d) {
      d.fixed = true;
      d3.select(this).classed("fixed", true);
    }    
  });
}