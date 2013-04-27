function scatterPlot(options, container, dataManager, visan) {
	
	var padding = 20;
	
	// get axes
	// var optionsContainer = options.optionsContainer;
	var xAxis = options.xAxis; // optionsContainer.find("select.scatterplot-x").val();
	var yAxis = options.yAxis; // optionsContainer.find("select.scatterplot-y").val();
	
	// render canvas
	var stage = new Kinetic.Stage({
		container: container.get(0),
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
		// var scXScale = d3.scale.linear().domain([0, 300]).range([padding, 500 - padding]);
		// var scYScale = d3.scale.linear().domain([0, 300]).range([500 - padding, padding]);
		var scXScale = new VISAN.Scale({
			range: [padding, 500 - padding],
			domain: [0, 300]
		});
		var scYScale = new VISAN.Scale({
			range: [500 - padding, padding],
			domain: [0, 300]
		});

		var context = shapeLayer.getContext("2d");
		
		var i = 0;
		dataManager.getData().forEach(function(cur) {
			if(cur._selected) {
				context.fillStyle = "#ff0000";
			} else {
				context.fillStyle = "#000000";
			}
			if(i < 5) console.log(scXScale(cur[xAxis]) + "," + scYScale(cur[yAxis]));
			if(i < 5) console.log(scXScale.get(cur[xAxis]) + "," + scYScale.get(cur[yAxis]));
			i++;
			context.fillRect(scXScale(cur[xAxis]), scYScale(cur[yAxis]), 2,2);
			context.fillRect(scXScale.get(cur[xAxis]), scYScale.get(cur[yAxis]), 2,2);
		});
	};
	
	this.draw();
};

scatterPlot.renderPlotCreateOptions = function(optionsContainer) {
	optionsContainer.append($("<p />").text("Please select the X axis:")).append($("<select />").addClass("scatterplot-x").addClass("axis"));
	optionsContainer.append($("<p />").text("Please select the Y axis:")).append($("<select />").addClass("scatterplot-y").addClass("axis"));
	
	return function(plotOptions, optionsContainer) {
		plotOptions.xAxis = optionsContainer.find("select.scatterplot-x").val();
		plotOptions.yAxis = optionsContainer.find("select.scatterplot-y").val();
	};
};
