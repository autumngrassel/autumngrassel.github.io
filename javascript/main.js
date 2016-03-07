


// Initialize tooltip
tip = d3.tip()
  .attr('class', 'tooltip')
  .html(function(d) {
            return "<div><h5>Cell X92</h5><p>Health Level: 82%</p><p>Days Alive: 13</p></div>"});

d3.select("#dosage").on("change", function() {
	d3.select("#displayDosage").text("Dosage: " + this.value + "mg");
});

d3.select("#treatmentDuration").on("change", function() {
	d3.select("#displayTreatmentDuration").text("Treatment Duration: " + this.value + " days");
});

d3.select("#bacteriaColony").on("change", function() {
	d3.select("#displayBacteriaColony").text("Size of Bacteria Colony: " + this.value);
	d3.select("#numberBacteriaAlive").text("Number of Bacteria Alive: " + this.value);
	d3.select("#numberBacteriaEliminated").text("Number of Bacteria Eliminated: 0");
});


var svg = d3.select("#main").append("svg")
	.attr("width", 800)
	.attr("height", 400)
	.attr("id", "svg_main")
	.attr("border", 1);

svg.call(tip);

console.log("made it " + svg);



var width = parseInt(d3.select("#svg_main").style("width"), 10);
var xStart = parseInt(d3.select("#svg_main").style("x"), 10);
var yStart = parseInt(d3.select("#svg_main").style("y"), 10);

var height = parseInt(d3.select("svg").style("height"), 10);
console.log(width + " w ," + height + " h, " + xStart + " xStart, " + yStart + " yStart");

var borderPath = svg.append("rect")
	.attr("x", 0)
	.attr("y", 0)
	.attr("height", height)
	.attr("width", width)
	.style("stroke", 'black')
	.style("fill", "none")
	.style("stroke-width", 1);

//  Function triggered when a cell is hovered over
var MouseOver = function() {
  console.log(this);
	var rect = d3.select(this);
	rect.transition().duration(400)
		.attr("height", 20)
    .attr("width", 40)
    .attr("rx", 10);
  tip.show(rect);
}

//  Function triggered when a cell is mousedout
var MouseOut = function(object) {
	tip.hide();
	var rect = d3.select(this);
	rect.transition().duration(400)
  .attr("height", 10)
  .attr("width", 20)
  .attr("rx", 5);
}
for (var i = 0; i <= 200; i++) {
		//Math.random(); // returns between 0 and 1
		var x = Math.floor(Math.random() * (780)) + 0;// + xStart;
		var y = Math.floor(Math.random() * (380)) + 10; // + yStart;
		var rotate = Math.floor(Math.random() * 90);
		if (Math.random() < 0.5) {
			rotate = -1 * rotate;
		}
		svg.append("rect")         // attach a rectangle
	      .attr("class", "bacteria")
		    .attr("x", x)          // position the left of the rectangle
		    .attr("y", y)          // position the top of the rectangle
		    .attr("height", 10)    // set the height
		    .attr("width", 20)     // set the width
		    .attr("rx", 5)         // set the x corner curve radius
		    .attr("fill", "purple")
	      .attr("opacity", 0.7)

				.on("mouseover", MouseOver )
	    	.on("mouseout", MouseOut)

		    .attr("transform", "rotate(" + rotate + " " + (x + 10 ) + " " + (y + 5) + ")");
	      // set the y corner curve radius
		    // if you don't have the rotation, they're all in the frame
		    //.attr("transform", "rotate(" + rotate + ")");        // set the y corner curve radius

	}

function drawBacteria() {
	// populate svg with bacteria placed randomly
	for (var i = 0; i <= 200; i++) {
		//Math.random(); // returns between 0 and 1
		var x = Math.floor(Math.random() * (780)) + 0;// + xStart;
		var y = Math.floor(Math.random() * (380)) + 10; // + yStart;
		var rotate = Math.floor(Math.random() * 90);
		if (Math.random() < 0.5) {
			rotate = -1 * rotate;
		}
		svg.append("rect")         // attach a rectangle
	      .attr("class", "bacteria")
		    .attr("x", x)          // position the left of the rectangle
		    .attr("y", y)          // position the top of the rectangle
		    .attr("height", 10)    // set the height
		    .attr("width", 20)     // set the width
		    .attr("rx", 5)         // set the x corner curve radius
		    .attr("fill", "purple")
	      .attr("opacity", 0.7)

				.on("mouseover", MouseOver )
	    	.on("mouseout", MouseOut)

		    .attr("transform", "rotate(" + rotate + " " + (x + 10 ) + " " + (y + 5) + ")");
	      // set the y corner curve radius
		    // if you don't have the rotation, they're all in the frame
		    //.attr("transform", "rotate(" + rotate + ")");        // set the y corner curve radius

	}
}
