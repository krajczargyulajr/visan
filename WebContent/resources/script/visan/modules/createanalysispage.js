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
			
			visan.goTo(analysisStepModule, { title: name, data: data });
		});
	});
};