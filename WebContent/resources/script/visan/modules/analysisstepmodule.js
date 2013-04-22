function analysisStepModule(workingArea, visan, options) {
	var analysis = (typeof options == "undefined") ? {} : options;
	var headers = analysis.data[0];
	var data = analysis.data.splice(0);
	
	visan.title((typeof analysis.title == "undefined" ? "Untitled analysis" : analysis.title));
	
	visan.loadTemplate("analysis-step", function(template) {
		workingArea.append(template);
		
		workingArea.find("button#analysis-step-new-plot").button().click(function() {
			// find available plots and add them as options
			
			// open new plot dialog
			var dialog = workingArea.find("div#analysis-step-new-plot-dialog");
			var select = dialog.find("select#new-plot-type");
			for(var type in plottypes) {
				select.append($("<option />").attr("value", plottypes[type].classname).text(type));
			}
			
			console.log("initialized plot type select");
			
			select.change(function() {
				// find current selection and render options
				var optionsContainer = dialog.find("div#new-plot-options");
				var plotClassName = $(this).val();
				
				// do nothing if "empty" is selected
				if(plotClassName == "empty") return;
				
				window[plotClassName].renderPlotCreateOptions(optionsContainer);
				
				// initialize options
				// initialize axes
				optionsContainer.find("select.axis").each(function() {
					
				});
			});
			
			dialog.dialog({
				modal: true,
				buttons: {
					"Create plot": function() {
						// create plot
					},
					"Cancel": function() {
						$(this).dialog("close");
					}
				}
			});
		});
	});
};