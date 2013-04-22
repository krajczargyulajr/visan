function analysisModule(workingArea, visan, options) {
	analysis = (typeof options == "undefined") ? {} : options;
	
	visan.title(analysis.name + " &raquo; Analysis Dashboard");
	
	visan.loadTemplate("analysis-dashboard", function(template) {
		workingArea.append(template);
		
		var stepsContainer = workingArea.find("#analysis-dashboard-steps");
		
		// TODO: assign event handlers to toolbox items
		workingArea.find("button#create-step-button").click(function() {
			
		});
		
		// display available steps :D
		// TODO: check for array on analysis.steps
		var steps = analysis.steps;
		if(!analysis.steps || analysis.steps.length == 0) {
			workingArea.find("#analysis-dashboard-steps").append($("<div />").text("No steps yet."));
			steps = [];
			steps.push({
				name: "Start"
			});
		}
		
		steps.forEach(function(item) {
			stepsContainer.append($("<div />").addClass("analysis-dashboard-step").text(item.name));
		});
	});
}