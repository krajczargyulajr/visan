function analysisStepModule(workingArea, visan, options) {
	var analysis = (typeof options == "undefined") ? {} : options;
	analysis.plots = analysis.plots || [];
	var headers = analysis.data[0];
	
	// create data manager
	// var data = analysis.data.slice(0);
	var dataManager = new DataManager();
	dataManager.load(analysis.data);
	var plotObjects = [];
	
	visan.title((typeof analysis.title == "undefined" ? "Untitled analysis" : analysis.title));
	
	visan.loadTemplate("analysis-step", function(template) {
		workingArea.append(template);
		
		workingArea.find("button#analysis-step-new-plot").button().click(function() {
			// find available plots and add them as options
			
			// open new plot dialog
			var dialog = workingArea.find("div#analysis-step-new-plot-dialog").clone();
			var plotTypeSelect = dialog.find("select#new-plot-type");
			for(var type in plottypes) {
				plotTypeSelect.append($("<option />").attr("value", plottypes[type].classname).text(type));
			}
			
			console.log("initialized plot type select");
			
			var optionsContainer = dialog.find("div#new-plot-options");
			
			plotTypeSelect.change(function() {
				// find current selection and render options
				var plotClassName = $(this).val();
				
				// do nothing if "empty" is selected
				if(plotClassName == "empty") return;
				
				window[plotClassName].renderPlotCreateOptions(optionsContainer);
				
				// initialize options
				// initialize axes
				optionsContainer.find("select.axis").each(function() {
					var axesSelect = $(this);
					headers.forEach(function(item, index) {
						$("<option />").val(item).text(item).appendTo(axesSelect);
					});
				});
			});
			
			dialog.dialog({
				modal: true,
				buttons: {
					"Create plot": function() {
						var plotTitle = dialog.find("input#new-plot-title").val();
						var plotClassName = plotTypeSelect.val();
						
						if(plotClassName == "empty") return;
						
						var plotDialog = $("<div />").attr("title", "plotTitle");
						plotDialog.appendTo(workingArea);
						
						var plotOptions = {
							title: plotTitle,
							type: plotClassName,
							optionsContainer: optionsContainer,
							container: plotDialog
						};
						
						analysis.plots.push(plotOptions);
						plotObjects.push(new (window[plotClassName])(plotOptions, dataManager, visan));
						
						$(this).dialog("close");
						
						plotDialog.dialog({
							width: 500,
							height: 500
						});
					},
					"Cancel": function() {
						$(this).dialog("close");
					}
				}
			});
		});
	});
};