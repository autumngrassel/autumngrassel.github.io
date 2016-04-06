// Initialize tooltip
var bacteriaTip = d3.tip()
  	.attr('class', 'tooltip')
  	.html(function(d) {
  		var health = d.attr("health");
  		if (health <= 1) {
  			health = 1;
  		}
        return "<div><p>Resistance: " + d.attr("resistanceLevel") + "</p>" +
        		"<p>Current Health: " + Math.round(health) + "</p>" +
        		"<p>Hours Alive: " + Math.round(d.attr("survivalTime")) + "</p></div>"});




var dosage = 500;
var duration = 5;
var colonySize = 1000;
var time = 0;
var damagePerHour = getDamage();

function getDamage() {
	return dosage / colonySize * 10.0 / 5;
}

// $("#btn-play").click(function (d) {
// 	timeBar.increase(1);
// });

d3.select("#dosage").on("oninput", function() {
	d3.select("#displayDosage").text("Dosage: " + this.value + "mg");
	dosage = this.value;
	if (time != 0) {
		sliderUpdate();
	}
});

function onInputDosage(value) {
	d3.select("#displayDosage").text("Dosage: " + value + "mg");
	dosage = value;
	sliderUpdate();
	damagePerHour = getDamage();

}

function onInputDuration(value) {
	d3.select("#displayTreatmentDuration").text("Treatment Duration: " + value + " days");
	duration = value;
	//sliderUpdate();
	damagePerHour = getDamage();
}

d3.select("#treatmentDuration").on("change", function() {
	d3.select("#displayTreatmentDuration").text("Treatment Duration: " + this.value + " days");
	duration = this.value;
	sliderUpdate();
	damagePerHour = getDamage();
});

d3.select("#bacteriaColony").on("change", function() {
	d3.select("#displayBacteriaColony").text("Size of Bacteria Colony: " + this.value);
	d3.select("#numberBacteriaAlive").text("Number of Bacteria Alive: " + this.value);
	d3.select("#numberBacteriaEliminated").text("Number of Bacteria Eliminated: 0");
	colonySize = this.value;
	sliderUpdate();
	damagePerHour = getDamage();
});

function onInputColonySize(value) {
	d3.select("#displayBacteriaColony").text("Size of Bacteria Colony: " + value);
	d3.select("#numberBacteriaAlive").text("Number of Bacteria Alive: " + value);
	d3.select("#numberBacteriaEliminated").text("Number of Bacteria Eliminated: 0");
	colonySize = value;
	sliderUpdate();
}

var svg = d3.select("#display").append("svg")
	.attr("width", 800)
	.attr("height", 400)
	.attr("id", "svg_main")
	.attr("border", 1);

svg.call(bacteriaTip);

var width = parseInt(d3.select("#svg_main").style("width"), 10);
var xStart = parseInt(d3.select("#svg_main").style("x"), 10);
var yStart = parseInt(d3.select("#svg_main").style("y"), 10);

var height = parseInt(d3.select("#svg_main").style("height"), 10);

var borderPath = svg.append("rect")
	.attr("x", 0)
	.attr("y", 0)
	.attr("height", 400)
	.attr("width", width)
	.style("stroke", 'black')
	.style("fill", "none")
	.style("stroke-width", 1);

//  Function triggered when a cell is hovered over
var MouseOverBacteria = function() {
	var rect = d3.select(this);
	rect.transition().duration(400)
		.attr("height", 20)
    	.attr("width", 40)
    	.attr("rx", 10);
  bacteriaTip.show(rect);
}

//  Function triggered when a cell is mousedout
var MouseOutBacteria = function() {
	bacteriaTip.hide();
	var rect = d3.select(this);
	rect.transition().duration(400)
	  .attr("height", 10)
	  .attr("width", 20)
	  .attr("rx", 5);
}

var MouseOverAntibiotic = function() {
	var antibiotic = d3.select(this);
	antibiotic.transition().duration(400)
		.attr("height", 45)
    	.attr("width", 40);
}

var MouseOutAntibiotic = function() {
	var antibiotic = d3.select(this);
	antibiotic.transition().duration(400)
		.attr("height", 30)
    	.attr("width", 25);
}

var numAntibiotic = 50; // change to dosage / 10 eventually

function drawAntibiotics() {
	for (var i = 0; i < dosage / 10; i++) {
		var x = Math.floor(Math.random() * (780)) + 0;// + xStart;
		var y = Math.floor(Math.random() * (360)) + 10; // + yStart;
		var rotate = Math.floor(Math.random() * 90);
		var direction = parseInt(Math.floor(Math.random() * 4) + 1); // direction
		if (Math.random() < 0.5) {
			rotate = -1 * rotate;
		}
		d3.select("#svg_main").append("svg:image")
	  		.attr("xlink:href", "/images/medical.svg")
	  		.attr("class", "antibiotic")
	  		.attr("width", 25)
	  		.attr("height", 30)
			.attr("x", x)
			.attr("y", y)
			.on("mouseover", MouseOverAntibiotic)
	    	.on("mouseout", MouseOutAntibiotic)
			.attr("direction", direction);
	}
}


function removeAll() {
	d3.selectAll(".bacteria").remove();
	d3.selectAll(".antibiotic").remove();
}

function drawBacteria() {
	// populate svg with bacteria placed randomly
	for (var i = 0; i <= colonySize / 5; i++) {
		var direction = parseInt(Math.floor(Math.random() * 4) + 1); // direction
		var resistance = 0;
		if (Math.random() < 0.02) { // 2% of bacteria are resistant
			resistance = Math.ceil(Math.random() * 3);
		}
		var x = Math.floor(Math.random() * (780)) + 0; 	
		var y = Math.floor(Math.random() * (380)) + 10;
		var rotate = Math.floor(Math.random() * 90);
		if (Math.random() < 0.5) {
			rotate = -1 * rotate;
		}
		var startingHealth = Math.round(15 + Math.random() * 10);
		if (resistance > 0) {
			startingHealth = 27 + 3 * resistance;
		}
		var bact = d3.select("#svg_main").append("rect")         // attach a rectangle
	      	.attr("class", "bacteria")
		    .attr("x", x)          // position the left of the rectangle
		    .attr("y", y)          // position the top of the rectangle
		    .attr("height", 10)    // set the height
		    .attr("width", 20)     // set the width
		    .attr("rx", 5)         // set the x corner curve radius
		    .attr("fill", "#9e9ac8")
		    .attr("health", startingHealth)
		    .attr("resistance", resistance) // 1 for resistance exists, 0 if not resistant
		    .attr("resistanceLevel", function (x) {
		    	if (resistance == 0) {
		    		return "None";
		    	} else if (resistance == 1) {
		    		return "Low";
		    	} else if (resistance == 2) {
		    		return "Medium";
		    	} else {
		    		return "High";
		    	}
		    })
		    .attr("direction", direction)
		    .attr("untilReproduce", getReproduceValue())
	      	.attr("opacity", 0.7)
	      	.attr("survivalTime", 0)
	      	.attr("timeCreated", time)
	      	.attr("angle", rotate)
			.on("mouseover", MouseOverBacteria)
	    	.on("mouseout", MouseOutBacteria)
	    	.attr("transform", "rotate(" + rotate + " " + (x + 10 ) + " " + (y + 5) + ")")
	    	;

		if (resistance > 0) {
			bact.attr("fill", function (d) {
				if (resistance == 1) {
					return "#A1d99B";
				} else if (resistance == 2) {
					return "#31A354";
				} else {
					return "#1E6333";
				}
			})
			.attr("untilReproduce", getReproduceValue() + 5)
			.attr("opacity", 0.7);
		}
		var rotateString = "" + getRotateString(bact.attr("x"), bact.attr("y"), bact.attr("angle"));
		bact.attr("transform", rotateString);

	}
}

function moveBacteria(steps) {
	var duration = 1000;

	d3.select("#svg_main").selectAll(".bacteria").attr("transform", 0);
	
	d3.select("#svg_main").selectAll(".bacteria")
		.transition()
		.attr("x", function() {
			var thisBact = d3.select(this);
			var oldX = parseInt(thisBact.attr("x"));
			var newX = parseInt(thisBact.attr("x")) + steps * (100 * getX(parseInt(thisBact.attr("direction"))));
			while (newX > 780) {
				newX -= 400;
			} 
			while (newX < 20) {
				newX += 400;
			} 
			return newX;
		})
		.attr("y", function() {
			var thisBact = d3.select(this);
			var oldY = parseInt(thisBact.attr("y"));
			var newY = parseInt(thisBact.attr("y")) + steps * (100 * getY(parseInt(thisBact.attr("direction"))));
			
			while (newY > 380) {
				newY -= 400;
			} 
			while(newY < 20) {
				newY += 400
			} 
			return newY;
		})
		.attr("untilReproduce", function() {
			var thisBact = d3.select(this);
			var old = parseInt(thisBact.attr("untilReproduce"));
			var newR = old - (1 * steps);
			if (newR < 1) {
				newR = 0;
			}
			return newR;
		})
		.attr("survivalTime", function() {
			var thisBact = d3.select(this);
			return Math.round(time - parseInt(thisBact.attr("timeCreated")));
		})
		.attr("health", function() {
			var thisBact = d3.select(this);
			var newHealth = parseInt(thisBact.attr("health") - steps * damagePerHour);
			if (Math.round(newHealth) <= 0) {
				return 0;
			} else {
				return Math.floor(newHealth);
			}
		})
		.attr("transform", function() {
			var thisBact = d3.select(this);
	    	return getRotateString(thisBact.attr("x"), thisBact.attr("y"), thisBact.attr("angle"));
	    })
	    .duration(1200);
	//d3.select("#svg_main").selectAll(".bacteria[health='0']").remove().duration(1200).delay(1200);
}

function moveAntibiotics() {
	d3.select("#svg_main").selectAll(".antibiotic")
		.transition()
		.attr("x", function() {
			var thisBact = d3.select(this);
			var oldX = parseInt(thisBact.attr("x"));
			var newX = parseInt(thisBact.attr("x")) + (10 * getX(parseInt(thisBact.attr("direction"))));
			if (newX > 800) {
				newX -= 800;
			} else if (newX < 0) {
				newX += 800;
			} 
			return newX;
		})
		.attr("y", function() {
			var thisBact = d3.select(this);
			var oldY = parseInt(thisBact.attr("y"));
			var newY = parseInt(thisBact.attr("y")) + (10 * getY(parseInt(thisBact.attr("direction"))));
			
			if (newY > 400) {
				newY -= 400;
			} else if (newY < 0) {
				newY += 400
			} 
			return newY;
		})
	    .duration(1200)
	    .ease("linear");
}

function getRotateString(x, y, angle) {
	return "rotate(" + parseInt(angle) + " " + (parseInt(x) + 10) + " " + (parseInt(y) + 5) + ")";
}

function getRotateStr(b) {
	var x = parseInt(b.attr("x"));
	var y = parseInt(b.attr("y"));
	var angle = parseInt(b.attr("angle"));
	return getRotateString(x, y, angle);
}

function getX(quad) {
	if (quad === 1 || quad === 4) {
		return 1;
	} else {
		return -1;
	}

}

function getY(quad) {
	if (quad === 1 || quad === 2) {
		return 1;
	} else {
		return -1;
	}
}

function getReproduceValue() {
	return (Math.floor(Math.random() * 4) + 4) * 4; //value 3 - 6
}


function advance(steps) {
	var timeLeft = duration * 24 - time;
	steps = Math.min(timeLeft, steps);
	if (steps != 0) {
		time += steps;
		d3.select("#current_progress").style("width", function() {
			var percentage = (100.0 * time / (24.0 * duration));
			if (percentage == 0) {
				return "2px";
			}
			return percentage+ "%";
		});
		d3.select("#timeElapsed").html(function() {
			var days = Math.floor(time / 24);
			var hours = time % 24;
			return "" + days + " days, " + hours+ " hours";
		});

		moveBacteria(steps);
		moveAntibiotics();

		d3.select("#svg_main").selectAll(".bacteria")	
			.each(function(d) {
				var bact = d3.select(this);
				if (parseInt(bact.attr("untilReproduce")) < 1) {
					bact.attr("untilReproduce", getReproduceValue());
					var resistance = parseInt(bact.attr("resistance"));
					var x = parseInt(bact.attr("x"));
					var y = parseInt(bact.attr("y"));
					drawOneBacteria(resistance, x, y);
				}
				if (parseInt(bact.attr("health")) < 1) {
					bact.remove().transition().duration(1200);
				}

			});
	
		//d3.select("#svg_main").selectAll(".bacteria[health='0.0']").remove();
		if (time % 6 == 0 || steps >= 6) {
			// remove antibiotics, add antibiotics
			d3.selectAll(".antibiotic")
				.remove();
			drawAntibiotics();

		}
		
	}
}

function advance6() {
	var timeLeft = duration * 24 - time;
	advance(Math.min(6, timeLeft));
}

function advance24() {
	var timeLeft = duration * 24 - time;
	advance(Math.min(24, timeLeft));
}

function sliderUpdate() {
	time = 0;
	d3.select("#current_progress").style("width", "2px");
	d3.select("#timeElapsed").html(function() {
		return "Time Elapsed: 0 days, 0 hours";
	});
	removeAll();
	drawBacteria();		// get val from slider
	drawAntibiotics(); // get val from slider
}

function reset() {
	sliderUpdate();
}

function drawOneBacteria(resistance, x, y) {
	// if not already resistant, the bacteria has a chance to 
	// become resistant
	if (resistance == 0) {
		if (Math.random() < 0.02) { // 2% of bacteria are resistant
			resistance = Math.ceil(Math.random() * 3);
		}
	}
	var direction = parseInt(Math.floor(Math.random() * 4) + 1); // direction
	var rotate = Math.floor(Math.random() * 90);
	if (Math.random() < 0.5) {
		rotate = -1 * rotate;
	}
	var startingHealth = Math.round(15 + Math.random() * 10);
	if (resistance > 0) {
		startingHealth = 27 + 3 * resistance;
	}
	var bact = d3.select("#svg_main").append("rect")         // attach a rectangle
      	.attr("class", "bacteria")
	    .attr("x", x + 5)          // position the left of the rectangle
	    .attr("y", y + 5)          // position the top of the rectangle
	    .attr("height", 10)    // set the height
	    .attr("width", 20)     // set the width
	    .attr("rx", 5)         // set the x corner curve radius
	    .attr("fill", "#9e9ac8")
	    .attr("health", startingHealth)
	    .attr("resistance", resistance) // 1 for resistance exists, 0 if not resistant
	    .attr("resistanceLevel", function (x) {
	    	if (resistance == 0) {
	    		return "None";
	    	} else if (resistance == 1) {
	    		return "Low";
	    	} else if (resistance == 2) {
	    		return "Medium";
	    	} else {
	    		return "High";
	    	}
	    })
	    .attr("untilReproduce", getReproduceValue())
	    .attr("direction", direction)
      	.attr("opacity", 0.7)
      	.attr("survivalTime", 0)
      	.attr("timeCreated", time)
      	.attr("angle", rotate)
		.on("mouseover", MouseOverBacteria)
    	.on("mouseout", MouseOutBacteria)
    	.attr("transform", "rotate(" + rotate + " " + (x + 10) + " " + (y + 5) + ")")
    	;

	if (resistance > 0) {
		bact.attr("fill", function (d) {
			if (resistance == 1) {
				return "#A1d99B";
			} else if (resistance == 2) {
				return "#31A354";
			} else {
				return "#1E6333";
			}
		})
		.attr("untilReproduce", getReproduceValue() + 5)
		.attr("opacity", 0.7);
	}
	var rotateString = "" + getRotateString(bact.attr("x"), bact.attr("y"), bact.attr("angle"));
	bact.attr("transform", rotateString);
}



drawBacteria();
drawAntibiotics();

