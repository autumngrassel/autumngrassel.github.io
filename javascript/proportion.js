var svg = d3.select("#proportion").append("svg")
	.attr("width", 800)
	.attr("height", 400);

function drawMen() {
	for (var i = 3; i < 10; i++) {
		var x = i * 70;// + xStart;
		var y = 50; // + yStart;
		
		if (i % 2 == 0) {
			svg.append("svg:image")
		  		.attr("xlink:href", "/images/blueMan.svg")
		  		.attr("class", "antibiotic")
		  		.attr("width", 100)
		  		.attr("height", 100)
				.attr("x", x)
				.attr("y", y);
		} else {

			svg.append("svg:image")
		  		.attr("xlink:href", "/images/blueWoman.svg")
		  		.attr("class", "antibiotic")
		  		.attr("width", 100)
		  		.attr("height", 100)
				.attr("x", x)
				.attr("y", y);
		}
	}

	svg.append("svg:image")
		  		.attr("xlink:href", "/images/greyMan.svg")
		  		.attr("class", "antibiotic")
		  		.attr("width", 100)
		  		.attr("height", 100)
				.attr("x", 700)
				.attr("y", 50);
}

drawMen();