(function() {
	VISAN.Plots.Boxplot = function(options, container, stepModule, visan) {
		
		var _ = this;
		
		this._padding = 25;
		
		this._axes = options.axes;
		this._axesInfo = [];
		this._stepModule = stepModule;
		
		this._stage = new Kinetic.Stage({
			container: container.get(0),
			width: options.width || 500,
			height: options.height || 500
		});
		
		this._shapeLayer = new Kinetic.Layer();
		this._axisLayer = new Kinetic.Layer();
		
		this._stage.add(this._shapeLayer);
		this._stage.add(this._axisLayer);
		
		this._axes.forEach(function(axis) {
			var axisDimension = _._stepModule._dataManager.getDimension(function(d) { return d[axis]; });
			var data = axisDimension.top(Infinity);
			var n = data.length;
			var firstQuartile = null;
			if(n % 2) {
				firstQuartile = (data[Math.floor(n / 4)][axis] + data[Math.floor(n / 4) + 1][axis]) / 2;
			} else {
				firstQuartile = data[Math.floor(n / 4)][axis];
			}
			
			var thirdQuartile = null;
			if(n % 2) {
				thirdQuartile = (data[Math.floor(3*n / 4)][axis] + data[Math.floor(3*n / 4) + 1][axis]) / 2;
			} else {
				thirdQuartile = data[Math.floor(3*n / 4)][axis];
			}
			
			
			
			_._axesInfo.push({
				axis: axis,
				sampleMinimum: axisDimension.bottom(1)[0][axis],
				firstQuartile: firstQuartile,
				median: (n % 2 ? data[(n + 1) / 2][axis] : (data[Math.floor(n / 2)][axis] + data[Math.floor(n/2) + 1][axis]) / 2),
				thirdQuartile: thirdQuartile,
				sampleMaximum: axisDimension.top(1)[0][axis]
			});
		});
		
		this.draw();
	};
	
	VISAN.Plots.Boxplot.renderPlotCreateOptions = function(optionsContainer) {
		optionsContainer.append($("<p />").text("Please select one or more axes:"));
		optionsContainer.append($("<select />").addClass("axis").addClass("boxplot-axes").attr({ multiple: "multiple", size: 6 }));
		
		return function(plotOptions, optionsContainer) {
			var selected = optionsContainer.find("select.boxplot-axes").val();
			plotOptions.axes = selected;
		};
	};
	
	VISAN.Plots.Boxplot.prototype = {
		draw: function() {
			var _ = this;
			var min = undefined, max = undefined;
			var length = this._axesInfo.length;
			var plotWidth = (this._stage.getWidth() - 3 * this._padding) / length;
			
			var context = this._shapeLayer.getContext("2d");
			
			this._axesInfo.forEach(function(axisInfo) {
				if(min == undefined || axisInfo.sampleMinimum < min) min = axisInfo.sampleMinimum;
				if(max == undefined || axisInfo.sampleMaximum > max) max = axisInfo.sampleMaximum;
			});
			
			var scale = new VISAN.Scale({
				range: [this._stage.getHeight() - this._padding, this._padding],
				domain: [min, max]
				//,debug: true
			});
			
			new VISAN.Axis({
				scale: scale,
				orientation: VISAN.AxisOrientation.LEFT,
				padding: _._padding
			}).draw(this._axisLayer.getCanvas());
			
			this._axesInfo.forEach(function(axisInfo, index) {
				var x = _._padding + index * plotWidth + (index + 1) * (_._padding / length);
				
				
				// sample minimum
				var sampleMinimumScaled = scale.get(axisInfo.sampleMinimum); 
				context.beginPath();
				context.setLineDash([]);
				context.moveTo(x, sampleMinimumScaled);
				context.lineTo(x + plotWidth, sampleMinimumScaled);
				context.strokeStyle = "#000";
				context.stroke();
				
				// sample maximum
				var sampleMaximumScaled = scale.get(axisInfo.sampleMaximum); 
				context.beginPath();
				context.setLineDash([]);
				context.moveTo(x, sampleMaximumScaled);
				context.lineTo(x + plotWidth, sampleMaximumScaled);
				context.strokeStyle = "#000";
				context.stroke();
				
				// connect the two
				var middlePointX = x + plotWidth / 2;
				context.beginPath();
				context.moveTo(middlePointX, sampleMinimumScaled);
				context.lineTo(middlePointX, sampleMaximumScaled);
				context.setLineDash([2,4]);
				context.strokeStyle = "#000";
				context.stroke();
				
				// draw the quartiles
				var firstQuartileScaled = scale.get(axisInfo.firstQuartile);
				var thirdQuartileScaled = scale.get(axisInfo.thirdQuartile);
				context.setLineDash([]);
				context.strokeStyle = "#000";
				context.clearRect(x, firstQuartileScaled, plotWidth, thirdQuartileScaled - firstQuartileScaled);
				context.strokeRect(x, firstQuartileScaled, plotWidth, thirdQuartileScaled - firstQuartileScaled);
				
				// draw median
				var medianScaled = scale.get(axisInfo.median);
				context.strokeStyle = "#000";
				
				context.beginPath();
				context.moveTo(x, medianScaled - 1);
				context.lineTo(x + plotWidth, medianScaled - 1);
				context.stroke();
				context.beginPath();
				context.moveTo(x, medianScaled + 1);
				context.lineTo(x + plotWidth, medianScaled + 1);
				context.stroke();
				
				 // print name
				var textLength = context.measureText(axisInfo.axis);
				context.textAlign = "hanging";
				context.textBaseline = "alphabetic";
				context.fillText(axisInfo.axis, middlePointX - textLength.width / 2, scale.get(min) + 10);
			});
		}
	};
})();