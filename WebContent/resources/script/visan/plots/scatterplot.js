(function() {
	VISAN.Plots.Scatterplot = function(options, container, dataManager, visan) {
		this._padding = 20;
		
		// get axes
		this._xAxis = options.xAxis;
		this._yAxis = options.yAxis;
		
		// render canvas
		this._stage = new Kinetic.Stage({
			container: container.get(0),
			width: options.width || 500,
			height: options.height || 500
		});
		
		this._shapeLayer = new Kinetic.Layer({
			clearBeforeDraw: false
		});
		
		this._axisLayer = new Kinetic.Layer({
			clearBeforeDraw: false
		});
		
		this._selectionLayer = new Kinetic.Layer();
		
		this._stage.add(this._shapeLayer);
		this._stage.add(this._axisLayer);
		this._stage.add(this._selectionLayer);
		
		var dataDimension1 = dataManager.getDimension(function(d) { return d[this._xAxis]; });
		var dataDimension2 = dataManager.getDimension(function(d) { return d[this._yAxis]; });
		
		this._dataManager = dataManager;
		
		this.draw();
	};
	
	VISAN.Plots.Scatterplot.renderPlotCreateOptions = function(optionsContainer) {
		optionsContainer.append($("<p />").text("Please select the X axis:")).append($("<select />").addClass("scatterplot-x").addClass("axis"));
		optionsContainer.append($("<p />").text("Please select the Y axis:")).append($("<select />").addClass("scatterplot-y").addClass("axis"));
		
		return function(plotOptions, optionsContainer) {
			plotOptions.xAxis = optionsContainer.find("select.scatterplot-x").val();
			plotOptions.yAxis = optionsContainer.find("select.scatterplot-y").val();
		};
	};
	
	VISAN.Plots.Scatterplot.prototype = {
		draw: function() {
			var padding = this._padding;
			
			var scXScale = new VISAN.Scale({
				range: [padding, 500 - padding],
				domain: [0, 300]
			});
			var scYScale = new VISAN.Scale({
				range: [500 - padding, padding],
				domain: [0, 300]
			});

			var context = this._shapeLayer.getContext("2d");
			
			new VISAN.Axis({ scale: scXScale, orientation: VISAN.AxisOrientation.BOTTOM, padding: 25 }).draw(this._axisLayer.getCanvas());
			new VISAN.Axis({ scale: scYScale, orientation: VISAN.AxisOrientation.LEFT, padding: 25 }).draw(this._axisLayer.getCanvas());
			
			var _ = this;
			this._dataManager.getData().forEach(function(cur) {
				if(cur._selected) {
					context.fillStyle = "#ff0000";
				} else {
					context.fillStyle = "#000000";
				}
				
				context.fillRect(scXScale.get(cur[_._xAxis]), scYScale.get(cur[_._yAxis]), 2,2);
			});
		}
	};
})();
