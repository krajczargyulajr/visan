var VISAN = {}; (function() {
	VISAN.Application = function() {
		var body = $("body");
		var header = $("<div />");
		var workingArea = $("<div />");
		var workingAreaCache = [];
		
		function initializeEmptyWorkingArea() {
			workingArea.addClass("visan-working-area");
			body.append(workingArea);
		}
		
		this.run = function() {
			header.attr("id", "visan-header");
			header.append($("<h2 />").html("&nbsp;"));
			header.append($("<h1 />").text("VISAN"));
			body.append(header);
			initializeEmptyWorkingArea();
			this.goTo(startPageModule);
		};
		
		this.goTo = function(moduleClass, options) {
			workingArea.removeClass("visan-working-area").addClass("visan-working-area-hidden");
			workingAreaCache.push({ title: header.find("h2").text(), workingArea: workingArea });
			workingArea = $("<div />");
			initializeEmptyWorkingArea();
			new (moduleClass)(workingArea, this, options);
		};
		
		this.title = function(title) {
			header.find("h2").html(title);
		};
		
		this.loadTemplate = function(templateName, callback) {
			var url = "./resources/templates/" + templateName + ".html";
			$.get(url)
			.done(function(template) {
				callback($("<div />").html(template));
			})
			.fail(function() {
				console.log("Failed to load template:" + url);
			});
		};
		
	}; 
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
			// (range.to - range.from) / (domain.to - domain.from)
			this._ratio = (this._range[1] - this._range[0]) / (this._domain[1] - this._domain[0]);
			if(this._debug) { console.log("[V.Scale] Ratio: " + this._ratio); }
		},
		/**
		 * Maps {number} from domain to range.
		 * @param {Number} number The number on the scale of domain
		 * @returns {Number} The mapped value of number on the scale of range
		 */
		get: function(number) {
			var num = this._range[0] + number * this._ratio
			if(this._debug) { console.log("[V.Scale] Number: " + num); }
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
		BOTTOM: 3
	};
	
	VISAN.Axis = function(options) {
		this._scale = options.scale;
		this._orientation = options.orientation; // left, right, top, bottom
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
			}
		}
	};
})();