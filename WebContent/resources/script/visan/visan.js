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
		this.range = options.range;
		this.domain = options.domain;
		
		this._calculateRatio();
	};
	
	VISAN.Scale.prototype = {
		/**
		 * Calculates the ratio required for range to domain mapping
		 */
		_calculateRatio: function() {
			// (range.to - range.from) / (domain.to - domain.from)
			this.ratio = (this.range[1] - this.range[0]) / (this.domain[1] - this.domain[0]);
		},
		/**
		 * Maps {number} from range to domain.
		 * @param {Number} number the number on the scale of range
		 * @returns {Number} the mapped value of number on the scale of domain
		 */
		get: function(number) {
			return number * this.ratio;
		},
		/**
		 * Sets a new range for this scale.
		 * @param {Array} rangeArray The new range for this scale in the form of a 2D array as [from, to]
		 */
		range: function(rangeArray) {
			this.range = rangeArray;
			this._calculateRatio();
		},
		/**
		 * Sets a new domain for this scale
		 * @param {Array} domainArray The new domain for this scale in the form of a 2D array as [from, to]
		 */
		domain: function(domainArray) {
			this.domain = domainArray;
			this._calculateRatio();
		}
	};
})();