function scatterPlot(options, dataManager, visan) {
	
	var padding = 20;
	
	// get axes
	var optionsContainer = options.optionsContainer;
	var xAxis = optionsContainer.find("select.scatterplot-x").val();
	var yAxis = optionsContainer.find("select.scatterplot-y").val();
	
	// render canvas
	var stage = new Kinetic.Stage({
		container: options.container.get(0),
		width: options.width || 500,
		height: options.height || 500
	});
	
	var shapeLayer = new Kinetic.Layer({
		clearBeforeDraw: false
	});
	
	var selectionLayer = new Kinetic.Layer();
	
	stage.add(shapeLayer);
	stage.add(selectionLayer);
	
	var dataDimension1 = dataManager.getDimension(function(d) { return d[xAxis]; });
	var dataDimension2 = dataManager.getDimension(function(d) { return d[yAxis]; });
	
	// required
	this.draw = function() {
		var scXScale = d3.scale.linear().domain([0, 300]).range([padding, 500 - padding]);
		var scYScale = d3.scale.linear().domain([0, 300]).range([500 - padding, padding]);

		var context = shapeLayer.getContext("2d");
		
		var i = 0;
		dataManager.getData().forEach(function(cur) {
			if(cur._selected) {
				context.fillStyle = "#ff0000";
			} else {
				context.fillStyle = "#000000";
			}
			if(i < 5) console.log(scXScale(cur[xAxis]) + "," + scYScale(cur[yAxis]));
			i++;
			context.fillRect(scXScale(cur[xAxis]), scYScale(cur[yAxis]), 2,2);
		});
	};
	
	this.draw();
};

scatterPlot.renderPlotCreateOptions = function(optionsContainer) {
	optionsContainer.append($("<p />").text("Please select the X axis:")).append($("<select />").addClass("scatterplot-x").addClass("axis"));
	optionsContainer.append($("<p />").text("Please select the Y axis:")).append($("<select />").addClass("scatterplot-y").addClass("axis"));
	// axis x
	// axis y
};
