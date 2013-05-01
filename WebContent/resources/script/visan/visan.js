var VISAN = {}; (function() {
	VISAN.Application = function() {
		this._body = $("body");
		this._header = $("<div />");
		this._workingArea = $("<div />");
		this._workingAreaCache = [];
		this._loadedModules = [];
	};
	
	VISAN.Application.prototype = {
		_initializeEmptyWorkingArea: function() {
			this._workingArea.addClass("visan-working-area");
			this._body.append(this._workingArea);
		},
		run: function() {
			this._header.attr("id", "visan-header");
			this._header.append($("<h2 />").html("&nbsp;"));
			this._header.append($("<h1 />").text("VISAN"));
			this._body.append(this._header);
			this._initializeEmptyWorkingArea();
			this.goTo(startPageModule);
		},
		goTo: function(moduleClass, options) {
			this._workingArea.removeClass("visan-working-area").addClass("visan-working-area-hidden");
			this._workingAreaCache.push({ title: this._header.find("h2").text(), workingArea: this._workingArea });
			this._workingArea = $("<div />");
			this._initializeEmptyWorkingArea();
			this._loadedModules.push(new (moduleClass)(this._workingArea, this, options));
		},
		title: function(title) {
			this._header.find("h2").html(title);
		},
		loadTemplate: function(templateName, callback) {
			var url = "./resources/templates/" + templateName + ".html";
			$.get(url)
			.done(function(template) {
				callback($("<div />").html(template));
			})
			.fail(function() {
				console.log("Failed to load template:" + url);
			});
		}
	}; 
})();

(function() {
	VISAN.Modules = {};
	VISAN.Plots = {};
})();

(function() {
	/**
	 * Scale constructor
	 * @constructor
	 * @param {Object} options
	 */
	VISAN.Scale = function(options) {
		this._range = options.range;
		this._domain = options.domain;
		this._debug = options.debug ? true : false;
		
		this._calculateRatio();
	};
	
	VISAN.Scale.prototype = {
		/**
		 * Calculates the ratio required for range to domain mapping
		 */
		_calculateRatio: function() {
			this._ratio = (this._range[1] - this._range[0]) / (this._domain[1] - this._domain[0]);
			if(this._debug) { console.log("[V.Scale] Ratio: " + this._ratio); }
		},
		/**
		 * Maps {number} from domain to range.
		 * @param {Number} number The number on the scale of domain
		 * @returns {Number} The mapped value of number on the scale of range
		 */
		get: function(number) {
			var num = this._range[0] + (number - this._domain[0]) * this._ratio;
			if(this._debug) { console.log("[V.Scale] Number: " + num); }
			return num;
		},
		/** 
		 * Map {number} from range to domain. This is essentially a helper for calculating the real value of displayed values. 
		 * @param {Number} number The number on the scale of range
		 * @returns {Number} The reverse mapped value of number on the scale of domain
		 */
		getReverse: function(number) {
			var num = this._domain[0] + (number - this._range[0]) / this._ratio;
			if(this._debug) { console.log("[V.Scale] Reversed number: " + num); }
			return num;
		},
		/**
		 * Sets a new range for this scale.
		 * @param {Array} rangeArray The new range for this scale in the form of a 2D array as [from, to]
		 */
		range: function(rangeArray) {
			this._range = rangeArray;
			this._calculateRatio();
		},
		/**
		 * Sets a new domain for this scale
		 * @param {Array} domainArray The new domain for this scale in the form of a 2D array as [from, to]
		 */
		domain: function(domainArray) {
			this._domain = domainArray;
			this._calculateRatio();
		}
	};
})();

(function() {
	
	VISAN.AxisOrientation = {
		LEFT: 0,
		RIGHT: 1,
		TOP: 2,
		BOTTOM: 3,
		CUSTOM_HORIZONTAL: 4,
		CUSTOM_VERTICAL: 5
	};
	
	VISAN.Axis = function(options) {
		this._scale = options.scale;
		this._orientation = options.orientation; // left, right, top, bottom
		this._orientationOptions = options.orientationOptions || {};
		this._description = options.description;
		this._padding = options.padding; 
	};
	
	VISAN.Axis.prototype = {
		draw: function(canvas) {
			var canvasWidth = canvas.getWidth();
			var canvasHeight = canvas.getHeight();
			var context = canvas.getContext("2d");
			var from = this._scale._domain[0], to = this._scale._domain[1];
			
			switch(this._orientation) {
			case VISAN.AxisOrientation.LEFT:
				context.beginPath();
				context.moveTo(this._padding - 5, this._padding);
				context.lineTo(this._padding, this._padding);
				context.lineTo(this._padding, canvasHeight - this._padding);
				context.lineTo(this._padding - 5, canvasHeight - this._padding);
				context.stroke();
				
				var labelSize = context.measureText(to);
				context.textBaseline = "middle";
				context.fillText(to, this._padding - 7 - labelSize.width, this._padding);
				labelSize = context.measureText(from);
				context.fillText(from, this._padding - 7 - labelSize.width, canvasHeight - this._padding);
				break;
			case VISAN.AxisOrientation.RIGHT:
				context.beginPath();
				context.moveTo(canvasWidth - (this._padding - 5), this._padding);
				context.lineTo(canvasWidth - this._padding, this._padding);
				context.lineTo(canvasWidth - this._padding, canvasHeight - this._padding);
				context.lineTo(canvasWidth - (this._padding - 5), canvasHeight - this._padding);
				context.stroke();
				
				context.textBaseline = "middle";
				context.fillText(to, canvasWidth - this._padding + 7, this._padding);
				context.fillText(from, canvasWidth - this._padding + 7, canvasHeight - this._padding);
				break;
			case VISAN.AxisOrientation.TOP:
				context.beginPath();
				context.moveTo(this._padding, this._padding - 5);
				context.lineTo(this._padding, this._padding);
				context.lineTo(canvasWidth - this._padding, this._padding);
				context.lineTo(canvasWidth - this._padding, this._padding - 5);
				context.stroke();
				
				context.textAlign = "center";
				context.textBaseline = "alphabetic";
				context.fillText(to, canvasWidth - this._padding, this._padding - 7);
				context.fillText(from, this._padding, this._padding - 7);
				break;
			case VISAN.AxisOrientation.BOTTOM:
				context.beginPath();
				context.moveTo(this._padding, canvasHeight - (this._padding - 5));
				context.lineTo(this._padding, canvasHeight - this._padding);
				context.lineTo(canvasWidth - this._padding, canvasHeight - this._padding);
				context.lineTo(canvasWidth - this._padding, canvasHeight - (this._padding - 5));
				context.stroke();
				
				context.textAlign = "hanging";
				context.textBaseline = "alphabetic";
				context.fillText(to, canvasWidth - this._padding, canvasHeight - this._padding + 14);
				context.fillText(from, this._padding, canvasHeight - this._padding + 14);
				break;
			case VISAN.AxisOrientation.CUSTOM_HORIZONTAL:
				var y = this._orientationOptions.y;
				context.beginPath();
				context.moveTo(this._padding, y - 5);
				context.lineTo(this._padding, y + 5);
				context.stroke();
				
				context.beginPath();
				context.moveTo(this._padding, y);
				context.lineTo(canvasWidth - this._padding, y);
				context.stroke();
				
				context.beginPath();
				context.moveTo(canvasWidth - this._padding, y - 5);
				context.lineTo(canvasWidth - this._padding, y + 5);
				context.stroke();
				
				break;
			case VISAN.AxisOrientation.CUSTOM_VERTICAL:
				console.log("[AO] CUSTOM_VERTICAL");
				var x = this._orientationOptions.x;
				context.beginPath();
				context.moveTo(x - 5, this._padding);
				context.lineTo(x + 5, this._padding);
				context.stroke();
				
				context.beginPath();
				context.moveTo(x, this._padding);
				context.lineTo(x, canvasHeight - this._padding);
				context.stroke();
				
				context.beginPath();
				context.moveTo(x - 5, canvasHeight - this._padding);
				context.lineTo(x + 5, canvasHeight - this._padding);
				context.stroke();
				
				context.textBaseline = "alphabetic";
				var bottomCaption = from + " (" + this._description + ")";
				var bottomMeasure = context.measureText(bottomCaption).width;
				var topMeasure = context.measureText(to).width;
				
				context.fillText(bottomCaption, x - bottomMeasure / 2, canvasHeight - this._padding + 13);
				context.fillText(to, x - topMeasure / 2, this._padding - 7);
				
				break;
			}
		}
	};
})();

(function() {
	VISAN.Highlight = {};
})();

(function() {
	VISAN.Highlight.Selection = function(options, dataManager) {
		this._axis1 = options.axis1;
		this._axis2 = options.axis2;
		this._dataManager = dataManager;
	};
	
	VISAN.Highlight.Selection.prototype = {
		highlight: function() {
			var _selection = this;
			var selected = 0;
			var axis1Dimension = this._dataManager.getDimension(function(d) { return d[_selection._axis1.axis]; }).filterRange([_selection._axis1.from, _selection._axis1.to]);
			var axis1DimensionData = axis1Dimension.top(Infinity);
			if(typeof _selection._axis2 != "undefined") {
				var axis2Dimension = this._dataManager.getDimension(function(d) { return d[_selection._axis2.axis]; }).filterRange([this._axis2.from, this._axis2.to]);
				axis2Dimension.top(Infinity).forEach(function(d) {
					if(axis1DimensionData.indexOf(d) != -1) {
						d._selected = true;
						selected++;
					}
				});
				axis2Dimension.filterAll();
			} else {
				axis1DimensionData.forEach(function(d) {
					d._selected = true;
					selected++;
				});
			}
			
			axis1Dimension.filterAll();
			
			if(selected) console.log("[V.H.Selection] Selected: " + selected);
		}
	};
})();

(function() {
	VISAN.Highlight.ColorBrush = function(mapFunction, dataManager) {
		this._callback = mapFunction;
		this._dataManager = dataManager;
	};
	
	VISAN.Highlight.ColorBrush.prototype = {
		highlight: function() {
			this._dataManager.getData().forEach(mapFunction);
		}
	};
})();