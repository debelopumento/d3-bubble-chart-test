function bubbleChart() {
  var center = { x: 470, y: 300 };
  var forceStrength = 0.03;

  var svg = null;
  var bubbles = null;
  var nodes = [
    {
      id: 1,
      radius: 50,
      x: 30,
      y: 30
    },
    {
      id: 3,
      radius: 150,
      x: 250,
      y: 200
    }
  ];

  function charge(d) {
    console.log(d);
    return -Math.pow(d.radius, 2) * forceStrength;
  }

  var simulation = d3
    .forceSimulation()
    .velocityDecay(0.2)
    .force("x", d3.forceX().strength(forceStrength).x(center.x))
    .force("y", d3.forceY().strength(forceStrength).y(center.y))
    .force("charge", d3.forceManyBody().strength(charge))
    .on("tick", ticked);

  simulation.stop();

  var colorCollection = ["red", "green", "blue"];

  var fillColor = function() {
    return colorCollection[Math.floor(Math.random() * colorCollection.length)];
  };

  var chart = function chart() {
    svg = d3
      .select("#vis")
      .append("svg")
      .attr("width", 940)
      .attr("height", 600);

    bubbles = svg.selectAll(".anyClassName").data(nodes, function(d) {
      return d.id;
    });

    var bubble = bubbles
      .enter()
      .append("circle")
      .classed("anyClassName", true)
      .attr("fill", function(d) {
        return fillColor(d.group);
      })
      .attr("stroke", function(d) {
        return d3.rgb(fillColor(d.group)).darker();
      })
      .attr("stroke-width", 2);

    bubbles = bubbles.merge(bubble);

    bubbles.transition().duration(1000).attr("r", function(d) {
      return d.radius;
    });

    simulation.nodes(nodes);

    simulation.alpha(1).restart();
  };

  function ticked() {
    bubbles
      .attr("cx", function(d) {
        return d.x;
      })
      .attr("cy", function(d) {
        return d.y;
      });
  }

  return chart;
}

var myBubbleChart = bubbleChart();
myBubbleChart();
