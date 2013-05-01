(function() {
	VISAN.Plots.ParallelCoordinates = function(options, container, stepModule, visan) {
		var _ = this;
		
		this._padding = 25;
		
		this._stage = new Kinetic.Stage({
			container: container.get(0),
			width: options.width || 500,
			height: options.height || 500
		});
		
		this._shapeLayer = new Kinetic.Layer();
		this._axisLayer = new Kinetic.Layer();
		this._stage.add(this._shapeLayer);
		this._stage.add(this._axisLayer);
		
		this._options = options;
		this._stepModule = stepModule;
		
		this._scales = {};
		this._options.axes.forEach(function(axis) {
			var dim = stepModule._dataManager.getDimension(function(d) { return d[axis]; });
			var max = dim.top(1)[0][axis];
			var min = dim.bottom(1)[0][axis];
			_._scales[axis] = new VISAN.Scale({
				range: [_._stage.getHeight() - _._padding, _._padding],
				domain: [min, max]
			});
		});
		
		this.draw();
	};
	
	VISAN.Plots.ParallelCoordinates.renderPlotCreateOptions = function(optionsContainer) {
		optionsContainer.append($("<p />").text("Please select all the axes to display:"));
		optionsContainer.append($("<select />").addClass("parallel-coordinates-axes").addClass("axis").attr("multiple", "multiple").attr("size", 6));
		
		return function(plotOptions, optionsContainer) {
			var selected = optionsContainer.find("select.parallel-coordinates-axes").val();
			plotOptions.axes = selected;
		};
	};
	
	VISAN.Plots.ParallelCoordinates.prototype = {
		draw: function() {
			var _ = this;
			
			var dataManager = this._stepModule._dataManager;
			var axes = this._options.axes;
			var numberOfAxes = axes.length;
			
			// axis positions
			var padding = this._padding;
			var width = this._stage.getWidth();
			var posDelta = (width - 2 * padding) / (numberOfAxes - 1);
			
			this._shapeLayer.clear();
			var context = this._shapeLayer.getContext("2d");
			
			// draw axes
			axes.forEach(function(axis, index) {
				new VISAN.Axis({
					scale: _._scales[axis],
					orientation: VISAN.AxisOrientation.CUSTOM_VERTICAL,
					orientationOptions: {
						x: padding + index * posDelta
					},
					padding: _._padding,
					description: axis
				}).draw(_._axisLayer.getCanvas());
			});
			
			dataManager.getData().forEach(function(cur) {
				context.beginPath();
				axes.forEach(function(axis, index) {
					var x = padding + index * posDelta;
					var y = _._scales[axis].get(cur[axis]);
					if(index == 0) {
						context.moveTo(x, y);
					} else {
						context.lineTo(x, y);
					}
				});
				
				if(cur._selected) {
					context.strokeStyle = "rgba(255, 0, 0, 1.0)";
				} else {
					context.strokeStyle = "rgba(0, 0, 0, 0.2)";
				}
				context.stroke();
			});
		}
	};
})();