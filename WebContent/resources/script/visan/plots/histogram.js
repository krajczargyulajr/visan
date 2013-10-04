(function() {
	VISAN.Plots.Histogram = function(options, container, stepModule, visan) {
		var _ = this;
		
		this._padding = 25;
		
		this._axis = options.axis;
		this._binSize = options.binSize;
		
		var dataManager = stepModule._dataManager;
		this._dataDimension = dataManager.getDimension(function(d) { return d[_._axis]; });
		var max = this._dataDimension.top(1)[0][_._axis];
		var min = this._dataDimension.bottom(1)[0][_._axis];
		
		console.log("[Histogram]" + max + ", " + min);
		
		this._bins = [];
		for(var binMin = min; binMin < max; binMin += this._binSize) {
			this._bins.push({
				min: binMin,
				max: binMin + this._binSize,
				items: []
			});
		}
		
		this._dataDimension.top(Infinity).forEach(function(item) {
			_._bins.forEach(function(bin) {
				if(item[_._axis] >= bin.min && item[_._axis] < bin.max) { // upper inclusive
					bin.items.push(item);
				}
			});
		});
		
		var largestBinSize = 0;
		this._bins.forEach(function(bin) {
			if(bin.items.length > largestBinSize) largestBinSize = bin.items.length;
		});
		
		this._stage = new Kinetic.Stage({
			container: container.get(0),
			width: options.width || 500,
			height: options.height || 500
		});
		
		this._columnWidth = this._stage.getWidth() / this._bins.length - 2;
		var topHeight = largestBinSize;
		
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
			console.log(this._bins);
			this._shapeLayer.clear();
			this._shapeLayer.removeChildren();

			console.log(this._bins.length);
			for (var i = 0; i < this._bins.length; i++) {
				
				var cur = this._bins[i];
				
				var selectedSize = cur.items.filter(function(item) {
					return item._selected;
				}).length;
				
				var curHeight = this._heightScale.get(cur.items.length);
				var selHeight = this._heightScale.get(selectedSize);
				console.log("[Histogram] Cur: " + curHeight + ", sel: " + selHeight);
				
				if(selectedSize > 0) {
					console.log("hasSelected");
					var selRect = new Kinetic.Rect({
						x: (i * (this._columnWidth + 2)),
						y: this._stage.getHeight() - (selHeight),
						width: this._columnWidth,
						height: selHeight - this._padding,
						fill: 'red',
						stroke: 'black',
						strokeWidth: 1
					});
					
					this._shapeLayer.add(selRect);
				}

				var rect = new Kinetic.Rect({
					x: (i * (this._columnWidth + 2)),
					y: this._stage.getHeight() - curHeight,
					width: this._columnWidth,
					height: curHeight - selHeight,
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
