(function() {
	VISAN.Plots.Histogram = function(options, container, stepModule, visan) {
		var _ = this;
		
		this._padding = 25;
		
		this._axis = options.axis;
		this._binSize = options.binSize;
		
		var dataManager = stepModule._dataManager;
		this._dataDimension = dataManager.getDimension(function(d) { return d[_._axis]; });
		this._histogramData = this._dataDimension.group(function(total) { return Math.floor(total / _._binSize); });
		
		this._stage = new Kinetic.Stage({
			container: container.get(0),
			width: options.width || 500,
			height: options.height || 500
		});
		
		var orderedData = this._histogramData.reduceCount().orderNatural();
		this._orderedDataArray = orderedData.all();
		this._orderedDataLength = this._orderedDataArray.length;
		this._columnWidth = this._stage.getWidth() / this._orderedDataLength - 2;
		var topHeight = orderedData.top(1)[0].value;
		
		this._heightScale = new VISAN.Scale({
			domain: [0, topHeight],
			range: [this._padding, this._stage.getHeight() - this._padding]
			// ,debug: true
		});

		this._shapeLayer = new Kinetic.Layer();

		this._stage.add(this._shapeLayer);
		
		this.draw();
	};
	
	VISAN.Plots.Histogram.renderPlotCreateOptions = function(optionsContainer) {
		optionsContainer.append($("<p />").text("Select the axis: ")).append($("<select />").addClass("histogram-axis").addClass("axis"));
		optionsContainer.append($("<p />").text("Specify a bin size: ")).append($("<input />").attr({ type: "number", min: 0}).addClass("histogram-bin-size"));
		
		return function(plotOptions, optionsContainer) {
			plotOptions.axis = optionsContainer.find("select.histogram-axis").val();
			plotOptions.binSize = optionsContainer.find("input.histogram-bin-size").val();
		};
	};
	
	VISAN.Plots.Histogram.prototype = {
		draw: function() {
			this._shapeLayer.clear();
			
			for(var i = 0; i < this._orderedDataLength; i++) {
				var cur = this._orderedDataArray[i];
				var curHeight = this._heightScale.get(cur.value);

				var rect = new Kinetic.Rect({
					x: (i * (this._columnWidth + 2)),
					y: this._stage.getHeight() - curHeight,
					width: this._columnWidth,
					height: curHeight - this._padding,
					fill: 'grey',
					stroke: 'black',
					strokeWidth: 1
				});

				rect.setAttrs({
					data: cur
				});

				this._shapeLayer.add(rect);
			}
			
			this._shapeLayer.draw();
		}
	};

})();
