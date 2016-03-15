$(document).ready(function() {
    var scroll = scroller()
    .container(d3.select('#graphic'));

  // pass in .step selection as the steps
  scroll(d3.selectAll('.step'));

  // setup event handling
  scroll.on('active', function(index) {
    // highlight current step text
    d3.selectAll('.step')
      .style('opacity',  function(d,i) { return i == index ? 1 : 0.1; });

    d3.selectAll('.title')
      .style('opacity',  function(d,i) { return i == index ? 1 : 0.0; });

    d3.selectAll('#definitions')
      .style('opacity',  function(d,i) { return 0.0; });

  });
});