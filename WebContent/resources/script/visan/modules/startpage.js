function startPageModule(workingArea, visan) {
	visan.title("Welcome");
	
	visan.loadTemplate("startpage", function(template) {
		workingArea.html(template.find("#startpage-template").text());
		
		workingArea.find("a#create-analysis-link").click(function(e) {
			e.preventDefault();
			
			visan.goTo(createAnalysisModule);
		});
		
		workingArea.find("a#open-analysis-link").click(function(e) {
			e.preventDefault();
			
			visan.goTo(openAnalysisModule);
		});
	});
}
