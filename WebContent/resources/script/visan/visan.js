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