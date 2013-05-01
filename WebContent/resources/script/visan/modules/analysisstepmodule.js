(function() {
	VISAN.Modules.AnalysisStepModule = function(workingArea, visan, options) {
		this._analysis = (typeof options == "undefined") ? {} : options;
		this._analysis.plots = this._analysis.plots || [];
		
		this._dataManager = new VISAN.DataManager();
		this._dataManager.load(this._analysis.data);
		
		this._application = visan;
		this._workingArea = workingArea;
		this._analysisWorkingArea = undefined;
		
		this._plotObjects = [];
		this._selection = null;
		this._highlightObjects = [];
		
		var _ = this;
		
		visan.title((typeof this._analysis.title == "undefined" ? "Untitled analysis" : this._analysis.title));
		
		visan.loadTemplate("analysis-step", function(template) {
			_._workingArea.append(template);
			_._analysisWorkingArea = _._workingArea.find("div#analysis-step-working-area");

			// render existing highlights
			_._analysis.highlights.forEach(function(highlightOptions) {
				_.createHighlight(highlightOptions);
			});
			
			// render existing plots
			_._analysis.plots.forEach(function(plotOptions) {
				_.createPlot(plotOptions);
			});
			
			_._workingArea.find("button#analysis-step-new-plot").button().click($.proxy(_.newPlotEventHandler, _));
		});
	};
	
	VISAN.Modules.AnalysisStepModule.prototype = {
		createPlot: function(plotOptions) {
			var plotDialog = $("<div />").attr("title", plotOptions.title);
			plotDialog.appendTo(this._workingArea);
			
			this._plotObjects.push(new (plottypes[plotOptions.type].classname)(plotOptions, plotDialog, this, this._application));
			
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
					of: this._analysisWorkingArea
				}
			});
		},
		clearSelection: function() {
			this._dataManager.getData().forEach(function(d) { d._selected = false; });
		},
		createHighlight: function(highlightOptions) {
			switch(highlightOptions.type) {
			case "selection":
				if(this._selection != null) this.clearSelection();
				
				var hl = new VISAN.Highlight.Selection(highlightOptions, this._dataManager);
				hl.highlight();
				this._selection = hl;
				break;
			}
		},
		newPlotEventHandler: function() {
			
			var _ = this;
			
			var dialog = this._workingArea.find("div#analysis-step-new-plot-dialog").clone();
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
				
				optionsContainer.empty();
				plotCallback = (plotClassName).renderPlotCreateOptions(optionsContainer);
				
				optionsContainer.find("select.axis").each(function() {
					var axesSelect = $(this);
					_._dataManager._columns.forEach(function(item, index) {
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
						
						_._analysis.plots.push(plotOptions);
						
						$(this).dialog("close");
						
						_.createPlot(plotOptions);
					},
					"Cancel": function() {
						$(this).dialog("close");
					}
				}
			});
		},
		refreshPlots: function() {
			this._plotObjects.forEach(function(plotObj) {
				plotObj.draw();
			});
		}
	};
})();
