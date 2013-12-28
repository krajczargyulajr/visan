function createAnalysisModule(workingArea, visan) {
	visan.title("Create new analysis");
	
	visan.loadTemplate("create-analysis", function(template) {
		workingArea.html(template.find("#create-analysis-template").text());
		
		workingArea.find("div#create-analysis-tabs").tabs({ active: 2 });
		
		workingArea.find("button#random-generate-button").button().click(function() {
			var nameInput = $(this).parents("div.visan-working-area").find("input#create-analysis-name");
			var name = nameInput.val();
			
			if(!name) {
				alert("Specify a name please!");
				return;
			}
			
			var rowsInput = $(this).parents("div#random-generate-data-tab").find("input#random-generate-rows");
			var columnsInput = $(this).parents("div#random-generate-data-tab").find("input#random-generate-columns");
			var rows = rowsInput.val();
			var columns = columnsInput.val(); 
			
			if(!rows || !columns || rows < 0 || rows > 3000000 || columns < 0 || columns > 30) {
				alert("Incorrect data dimensions.");
				return;
			}
			
			var data = [];
			var headers = [];
			for(var c = 0; c < columns; c++) {
				headers.push("Column " + c);
			}
			data.push(headers);
			
			for(var r = 0; r < rows; r++) {
				var row = {};
				headers.forEach(function(column) {
					row[column] = Math.floor(Math.nrand() * 75) + 150;
				});
				
				data.push(row);
			}
			
			visan.goTo(VISAN.Modules.AnalysisStepModule, { title: name, data: data, highlights: [], plots: [] });
		});
		
		workingArea.find("button#cp-data-button").click(function() {
			var nameInput = $(this).parents("div.visan-working-area").find("input#create-analysis-name");
			var name = nameInput.val();
			
			if(!name) {
				alert("Specify a name please!");
				return;
			}
			
			var dataInput = $(this).parents("div#copy-and-paste-data-tab").find("textarea#cp-data");
			var separatorInput = $(this).parents("div#copy-and-paste-data-tab").find("input[name='cp-data-separator']:checked");
			var dataString = dataInput.val();
			var separator = "";
			var separatorType = separatorInput.val();
			
			switch(separatorType) {
			case "csv":
				separator = ",";
				break;
			case "tsv": 
				separator = "\t";
				break;
			case "other":
				separator = $(this).parents("div#copy-and-paste-data-tab").find("input#cp-data-separator-other-value").val();
				break;
			default:
				separator = ",";
			};
			
			var data = [];
			var headers = dataString.split("\n")[0].split(separator);
			data.push(headers);
			dataString.split("\n").splice(1).forEach(function(rowString) {
				var row = {};
				var cells = rowString.split(separator);
				if(cells.length != headers.length) {
					console.warn("All rows must have the same number of columns as the header (" + rowString +")");
				} else {
					headers.forEach(function(header, index) {
						row[header] = cells[index];
					});
					
					data.push(row);
				}
			});
			
			visan.goTo(VISAN.Modules.AnalysisStepModule, { title: name, data: data, highlights: [], plots: [] });
		});
	});
};