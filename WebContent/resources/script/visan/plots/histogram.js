function histogramPlot(options, container, dataManager, visan) {
	var axis = options.axis;
	var binSize = options.binSize;
	
	var dataDimension = dataManager.getDimension(function(d) { return d[axis]; });
	var histogramData = dataDimension.group(function(total) { return Math.floor(total / binSize); });
	
	var orderedData = histogramData.reduceCount().orderNatural();
	var orderedDataArray = orderedData.all();
	var orderedDataLength = orderedDataArray.length;
	var columnWidth = 300 / orderedDataLength - 2;
	var topHeight = orderedData.top(1)[0].value;

	// var heightScale = d3.scale.linear().domain([0, topHeight]).range([0, options.height]);
	var heightScale = new VISAN.Scale({
		domain: [0, topHeight],
		range: [0, options.height]
	});

	var stage = new Kinetic.Stage({
		container: container.get(0),
		width: options.width,
		height: options.height
	});

	var shapeLayer = new Kinetic.Layer();

	for(var i = 0; i < orderedDataLength; i++) {
		var cur = orderedDataArray[i];
		var curHeight = heightScale.get(cur.value);

		var rect = new Kinetic.Rect({
			x: (i * (columnWidth + 2)),
			y: 300 - curHeight,
			width: columnWidth,
			height: curHeight,
			fill: 'grey',
			stroke: 'black',
			strokeWidth: 1
		});

		rect.setAttrs({
			data: cur
		});

		shapeLayer.add(rect);
	}
	
	stage.add(shapeLayer);

}

histogramPlot.renderPlotCreateOptions = function(optionsContainer) {
	optionsContainer.append($("<p />").text("Select the axis: ")).append($("<select />").addClass("histogram-axis").addClass("axis"));
	optionsContainer.append($("<p />").text("Specify a bin size: ")).append($("<input />").attr({ type: "number", min: 0}).addClass("histogram-bin-size"));
	
	return function(plotOptions, optionsContainer) {
		plotOptions.axis = optionsContainer.find("select.histogram-axis").val();
		plotOptions.binSize = optionsContainer.find("input.histogram-bin-size").val();
	};
};
