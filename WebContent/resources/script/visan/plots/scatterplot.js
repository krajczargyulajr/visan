(function() {
	VISAN.Plots.Scatterplot = function(options, container, stepModule, visan) {
		var _ = this;
		this._stepModule = stepModule;
		this._dataManager = stepModule._dataManager;
		this._padding = 25;
		
		// get axes
		this._xAxis = options.xAxis;
		this._yAxis = options.yAxis;
		
		this._dataDimension1 = this._dataManager.getDimension(function(d) { return d[_._xAxis]; }).filterAll();
		this._dataDimension2 = this._dataManager.getDimension(function(d) { return d[_._yAxis]; }).filterAll();
		var xMax = this._dataDimension1.top(1)[0][this._xAxis], xMin = this._dataDimension1.bottom(1)[0][this._xAxis];
		var yMax = this._dataDimension2.top(1)[0][this._yAxis], yMin = this._dataDimension2.bottom(1)[0][this._yAxis];
		console.log("[Sc] [xMin, xMax]: [" + xMin + ", " + xMax + "]");
		console.log("[Sc] [yMin, yMax]: [" + yMin + ", " + yMax + "]");
		
		// render canvas
		this._stage = new Kinetic.Stage({
			container: container.get(0),
			width: options.width || 500,
			height: options.height || 500
		});
		
		this._scXScale = new VISAN.Scale({
			range: [this._padding, this._stage.getWidth() - this._padding],
			domain: [xMin, xMax]
		});
		this._scYScale = new VISAN.Scale({
			range: [this._stage.getHeight() - this._padding, this._padding],
			domain: [yMin, yMax]
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
			
			var scXScale = this._scXScale;
			var scYScale = this._scYScale;

			var context = this._shapeLayer.getContext("2d");
			
			new VISAN.Axis({ scale: scXScale, orientation: VISAN.AxisOrientation.BOTTOM, padding: padding }).draw(this._axisLayer.getCanvas());
			new VISAN.Axis({ scale: scYScale, orientation: VISAN.AxisOrientation.LEFT, padding: padding }).draw(this._axisLayer.getCanvas());
			
			var _ = this;
			this._dataManager.getData().forEach(function(cur) {
				if(cur._selected) {
					context.fillStyle = "#ff0000";
				} else {
					context.fillStyle = "#000000";
				}
				
				context.fillRect(scXScale.get(cur[_._xAxis]), scYScale.get(cur[_._yAxis]), 2,2);
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

			var scXScale = this._scXScale;
			var scYScale = this._scYScale;
			
			var xFrom = scXScale.getReverse(this._selection.getX()), xTo = scXScale.getReverse(this._selection.getX() + this._selection.getWidth());
			var yFrom = scYScale.getReverse(this._selection.getY()), yTo = scYScale.getReverse(this._selection.getY() + this._selection.getHeight());
			if(xFrom > xTo) { var temp = xFrom; xFrom = xTo; xTo = temp; }
			if(yFrom > yTo) { var temp = yFrom; yFrom = yTo; yTo = temp; }
			
			this._stepModule.createHighlight({
				type: "selection",
				axis1: {
					axis: this._xAxis,
					from: xFrom,
					to: xTo
				},
				axis2: {
					axis: this._yAxis,
					from: yFrom,
					to: yTo
				}
			});
			this._stepModule.refreshPlots();
			
			this._selection.setWidth(0);
			this._selection.setHeight(0);
			this._selectionLayer.draw();
		}
	};
})();
