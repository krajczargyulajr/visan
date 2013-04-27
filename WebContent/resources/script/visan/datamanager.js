(function() { 
	VISAN.DataManager = function() {
		this._columns = [];
		this._data = [];
		this._cf = {};
	};
	
	VISAN.DataManager.prototype = {
		load: function(jsonArray) {
			if(jsonArray.length == 0) return;

			var headers = jsonArray[0];

			for(var h in headers) {
				if(h != "_shapes") this._columns.push(h);
			}
			
			this._data = jsonArray.splice(1);

			this._cf = crossfilter(this._data);
		},
		loadCsv: function(csvData) {
			throw { error: "not implemented" };
		},
		loadTsv: function(tsvData) {
			throw { error: "not implemented" };	
		},
		getData: function() {
			return this._data;
		},
		getDimension: function(dimFunc) {
			return this._cf.dimension(dimFunc);
		}
	};
})();