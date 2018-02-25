var vis = d3.select("#visualisation"),
  WIDTH = 800,
  HEIGHT = 500,
  MARGINS = {
      top: 50,
      right: 20,
      bottom: 50,
      left: 250
  };

lSpace = WIDTH / data.length;

xScale = d3.scale.linear().range([MARGINS.left, WIDTH - MARGINS.right]).domain([0, 50]),
  yScale = d3.scale.linear().range([HEIGHT - MARGINS.top, MARGINS.bottom]).domain([0, 50]);

xAxis = d3.svg.axis()
  .scale(xScale),
  vis.append("svg:g")
      .attr("transform", "translate(0," + (HEIGHT - MARGINS.bottom) + ")")
      .call(xAxis),
  yAxis = d3.svg.axis()
      .scale(yScale)
      .orient("left");
vis.append("svg:g")
  .attr("transform", "translate(" + (MARGINS.left) + ",0)")
  .call(yAxis);

var lineGen = d3.svg.line()
  .x(function (d) {
      return xScale(d.points);
  })
  .y(function (d) {
      return yScale(d.time);
  });

data.forEach(function (d, i) {
  vis.append('svg:path')
      .attr('d', lineGen(d.progress))
      .attr('stroke', function (d, j) {
          return "hsl(" + Math.random() * 360 + ",100%,50%)";
      })
      .attr('stroke-width', 2)
      .attr('id', 'line_' + d.student_id)
      .attr('fill', 'none');

  vis.append("text")
      .attr("x", (lSpace / 2) + i * lSpace)
      .attr("y", HEIGHT)
      .style("fill", "black")
      .attr("class", "legend")
      .on('click', function () {
          var active = d.active ? false : true;
          var opacity = active ? 0 : 1;
          d3.select("#line_" + d.student_id).style("opacity", opacity);
          d.active = active;
      })
      .text(d.student_id);
});
