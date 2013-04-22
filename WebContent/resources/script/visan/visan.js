function VISAN() {
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
}