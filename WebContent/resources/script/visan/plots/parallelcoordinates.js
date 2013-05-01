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
		this._selectionLayer = new Kinetic.Layer();
		
		this._stage.add(this._shapeLayer);
		this._stage.add(this._axisLayer);
		this._stage.add(this._selectionLayer);
		
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
		
		this._selection = new Kinetic.Rect({
			x: 0,
			y: 0,
			width: 0,
			height: 0,
			fill: 'transparent',
			stroke: 'red',
			strokeWidth: 2
		});

		this._selectionLayer.add(this._selection);

		this._selecting = false;
		
		var stageContainer = this._stage.getContent();
		stageContainer.addEventListener("mousedown", $.proxy(this.mousedownEventHandler, this));
		stageContainer.addEventListener('mousemove', $.proxy(this.mouseMoveEventHandler, this));
		stageContainer.addEventListener('mouseup', $.proxy(this.mouseUpEventHandler, this));
		
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
		},
		mousedownEventHandler: function(e) {
			if(!this._selecting) {
				this._selecting = true;
				this._selection.setX(e.layerX);
				this._selection.setY(e.layerY);
				this._selectionLayer.draw();
			}
		},
		mouseMoveEventHandler: function(e) {
			if(this._selecting) {
				/// TODO: this only works for drawing from top-left to bottom-right
				this._selection.setWidth(e.layerX - this._selection.getX());
				this._selection.setHeight(e.layerY - this._selection.getY());
				this._selectionLayer.draw();
			}
		},
		mouseUpEventHandler: function() {
			this._selecting = false;
			
			var scale = null;
			
			// find axis (if avail)
			var axes = this._options.axes;
			var selectedAxis = "";
			var posDelta = (this._stage.getWidth() - 2 * this._padding) / (axes.length - 1);
			for(var index = 0; index < axes.length; index++) {
				var axisX = this._padding + index * posDelta;  
				if(axisX >= this._selection.getX() && axisX < this._selection.getX() + this._selection.getWidth()) {
					// this is it
					selectedAxis = axes[index];
					scale = this._scales[selectedAxis];
					break;
				}
			}
			
			if(scale != null) {
				var to = scale.getReverse(this._selection.getY()), from = scale.getReverse(this._selection.getY() + this._selection.getHeight());
				console.log("[PC] [from, to]: [" + from + ", " + to + "]");
				this._stepModule.createHighlight({
					type: "selection",
					axis1: {
						axis: selectedAxis,
						from: from,
						to: to
					}
				});
				
				this._stepModule.refreshPlots();
			}
			
			this._selection.setWidth(0);
			this._selection.setHeight(0);
			this._selectionLayer.draw();
		}
	};
})();