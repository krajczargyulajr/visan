function analysisStepModule(workingArea, visan, options) {
	var analysis = (typeof options == "undefined") ? {} : options;
	analysis.plots = analysis.plots || [];
	var headers = analysis.data[0];
	
	var analysisWorkingArea = undefined;
	
	var dataManager = new DataManager();
	dataManager.load(analysis.data);
	var plotObjects = [];
	
	function createPlot(plotOptions) {
		var plotDialog = $("<div />").attr("title", plotOptions.title);
		plotDialog.appendTo(workingArea);
		
		plotObjects.push(new (window[plottypes[plotOptions.type].classname])(plotOptions, plotDialog, dataManager, visan));
		
		var top = 0, left = 0;
		if(plotOptions.top) {
			top = plotOptions.top;
		}
		
		if(plotOptions.left) {
			left = plotOptions.left;
		}
		
		plotDialog.dialog({
			width: plotOptions.width,
			height: plotOptions.height + 30,
			position: {
				my: "left+" + left + " top+" + top,
				at: "left top",
				of: analysisWorkingArea
			}
		});
		
		console.log(plotDialog.dialog("option", "position"));
	}
	
	function newPlotEventHandler() {
		
		var dialog = workingArea.find("div#analysis-step-new-plot-dialog").clone();
		var plotTypeSelect = dialog.find("select#new-plot-type");
		for(var type in plottypes) {
			plotTypeSelect.append($("<option />").attr("value", type).text(plottypes[type].displayName));
		}
		
		console.log("initialized plot type select");
		
		var optionsContainer = dialog.find("div#new-plot-options");
		var plotCallback = undefined;
		
		plotTypeSelect.change(function() {
			// find current selection and render options
			var plotType = $(this).find("option:selected").val();
			var plotClassName = (plotType != "empty" ? plottypes[plotType].classname : "empty");
			
			// do nothing if "empty" is selected
			if(plotClassName == "empty") return;
			
			plotCallback = window[plotClassName].renderPlotCreateOptions(optionsContainer);
			
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
					var plotType = plotTypeSelect.find("option:selected").val();
					
					if(plotType == "empty") return;
					
					var plotOptions = {
						title: plotTitle,
						type: plotType,
						width: 500,
						height: 500,
						top: 10,
						left: 100
					};
					
					plotCallback(plotOptions, optionsContainer);
					
					analysis.plots.push(plotOptions);
					
					$(this).dialog("close");
					
					createPlot(plotOptions);
				},
				"Cancel": function() {
					$(this).dialog("close");
				}
			}
		});
	};
	
	visan.title((typeof analysis.title == "undefined" ? "Untitled analysis" : analysis.title));
	
	visan.loadTemplate("analysis-step", function(template) {
		workingArea.append(template);
		analysisWorkingArea = workingArea.find("div#analysis-step-working-area");
		
		// render existing plots
		analysis.plots.forEach(function(plotOptions) {
			createPlot(plotOptions);
		});
		
		workingArea.find("button#analysis-step-new-plot").button().click(newPlotEventHandler);
	});
};