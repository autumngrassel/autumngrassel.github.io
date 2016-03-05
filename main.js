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
	.attr("width", 600)
	.attr("height", 400)
	.attr("id", "svg_main")
	.attr("border", 1);

console.log("made it " + svg);



var width = parseInt(d3.select("#svg_main").style("width"), 10);
var xStart = parseInt(d3.select("#svg_main").style("x"), 10);
var yStart = parseInt(d3.select("#svg_main").style("y"), 10);

//parseInt(d3.select('#chart').style('width'), 10)
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

// populate svg with bacteria placed randomly
for (var i = 0; i <= 10; i++) {
	Math.random(); // returns between 0 and 1
	var x = Math.floor(Math.random() * (560)) + xStart + 20;
	var y = Math.floor(Math.random() * (360)) + yStart + 20;
	var rotate = Math.floor(Math.random() * 89);
	svg.append("rect")       // attach a rectangle
	    .attr("x", x)         // position the left of the rectangle
	    .attr("y", y)          // position the top of the rectangle
	    .attr("height", 10)    // set the height
	    .attr("width", 20)     // set the width
	    .attr("rx", 5)         // set the x corner curve radius
	    .attr("ry", 50)
	    .attr("fill", "purple");
	    //.attr("transform", "rotate(" + rotate + ")");        // set the y corner curve radius

}