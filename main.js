 d3.select("#dosage").on("change", function() {
	d3.select("#displayDosage").text("Dosage: " + this.value);
});

d3.select("#treatmentDuration").on("change", function() {
	d3.select("#displayTreatmentDuration").text("Treatment Duration: " + this.value);
});

d3.select("#bacteriaColony").on("change", function() {
	d3.select("#displayBacteriaColony").text("Size of Bacteria Colony: " + this.value);
});