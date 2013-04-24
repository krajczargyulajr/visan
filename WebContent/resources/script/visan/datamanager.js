/*
Requirements:
- parse data (CSV/TSV, JSON)
- provide "iterator"
- provide dimensions
*/
DataManager = function() {
	var columns = [];
	var data = [];
	var cf = {};
	this.load = function(jsonArray) {
		if(jsonArray.length == 0) return;

		var headers = jsonArray[0];

		for(var h in headers) {
			if(h != "_shapes") columns.push(h);
		}
		// headers.forEach(function(header) { columns.push(header); });
		data = jsonArray.splice(1);

		cf = crossfilter(data);
	};

	this.loadCsv = function(csvData) {
		throw { error: "not implemented" };
	};

	this.loadTsv = function(tsvData) {
		throw { error: "not implemented" };	
	};

	this.getData = function() {
		return data;
	};

	this.getDimension = function(dimFunc) {
		return cf.dimension(dimFunc);
	};
};