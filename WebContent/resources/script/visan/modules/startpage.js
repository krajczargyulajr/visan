function startPageModule(workingArea, visan) {
	visan.title("Welcome");
	
	visan.loadTemplate("startpage", function(template) {
		workingArea.append(template);
		
		workingArea.find("a#create-analysis-link").click(function(e) {
			e.preventDefault();
			
			visan.goTo(createAnalysisModule);
		});
		
		workingArea.find("a#open-analysis-link").click(function(e) {
			e.preventDefault();
			
			visan.goTo(openAnalysisModule);
		});
		
		workingArea.find("a.open-demo-data").click(function(e) {
			e.preventDefault();
			
			visan.goTo(VISAN.Modules.AnalysisStepModule, {
				title: "Demo data",
				data: [
				       ["Column 0","Column 1","Column 2","Column 3","Column 4","Column 5","Column 6","Column 7","Column 8","Column 9","Column 10","Column 11"],
				       {"Column 0":161,"Column 1":157,"Column 2":120,"Column 3":213,"Column 4":120,"Column 5":208,"Column 6":61,"Column 7":82,"Column 8":201,"Column 9":123,"Column 10":200,"Column 11":377},
				       {"Column 0":99,"Column 1":118,"Column 2":189,"Column 3":254,"Column 4":229,"Column 5":183,"Column 6":14,"Column 7":152,"Column 8":60,"Column 9":155,"Column 10":207,"Column 11":218},
				       {"Column 0":152,"Column 1":-6,"Column 2":260,"Column 3":111,"Column 4":87,"Column 5":-35,"Column 6":8,"Column 7":202,"Column 8":195,"Column 9":172,"Column 10":45,"Column 11":143},
				       {"Column 0":155,"Column 1":101,"Column 2":147,"Column 3":250,"Column 4":178,"Column 5":-17,"Column 6":88,"Column 7":213,"Column 8":217,"Column 9":162,"Column 10":0,"Column 11":212},
				       {"Column 0":281,"Column 1":19,"Column 2":-6,"Column 3":177,"Column 4":189,"Column 5":176,"Column 6":163,"Column 7":215,"Column 8":162,"Column 9":190,"Column 10":156,"Column 11":-16},
				       {"Column 0":109,"Column 1":-15,"Column 2":179,"Column 3":53,"Column 4":102,"Column 5":113,"Column 6":186,"Column 7":116,"Column 8":163,"Column 9":111,"Column 10":61,"Column 11":196},
				       {"Column 0":232,"Column 1":96,"Column 2":132,"Column 3":-53,"Column 4":70,"Column 5":197,"Column 6":260,"Column 7":236,"Column 8":109,"Column 9":134,"Column 10":137,"Column 11":146},
				       {"Column 0":257,"Column 1":102,"Column 2":213,"Column 3":133,"Column 4":199,"Column 5":114,"Column 6":216,"Column 7":125,"Column 8":8,"Column 9":182,"Column 10":209,"Column 11":153},
				       {"Column 0":122,"Column 1":-40,"Column 2":11,"Column 3":106,"Column 4":46,"Column 5":178,"Column 6":246,"Column 7":119,"Column 8":189,"Column 9":116,"Column 10":185,"Column 11":173},
				       {"Column 0":148,"Column 1":222,"Column 2":189,"Column 3":297,"Column 4":226,"Column 5":243,"Column 6":151,"Column 7":119,"Column 8":273,"Column 9":164,"Column 10":267,"Column 11":125},
				       {"Column 0":50,"Column 1":244,"Column 2":92,"Column 3":205,"Column 4":181,"Column 5":162,"Column 6":181,"Column 7":178,"Column 8":71,"Column 9":141,"Column 10":72,"Column 11":99},
				       {"Column 0":316,"Column 1":265,"Column 2":102,"Column 3":120,"Column 4":88,"Column 5":180,"Column 6":139,"Column 7":19,"Column 8":260,"Column 9":206,"Column 10":144,"Column 11":161},
				       {"Column 0":174,"Column 1":302,"Column 2":231,"Column 3":118,"Column 4":195,"Column 5":45,"Column 6":136,"Column 7":299,"Column 8":179,"Column 9":244,"Column 10":34,"Column 11":58},
				       {"Column 0":206,"Column 1":-17,"Column 2":218,"Column 3":166,"Column 4":97,"Column 5":258,"Column 6":234,"Column 7":76,"Column 8":148,"Column 9":154,"Column 10":213,"Column 11":196},
				       {"Column 0":154,"Column 1":37,"Column 2":113,"Column 3":129,"Column 4":179,"Column 5":176,"Column 6":131,"Column 7":72,"Column 8":143,"Column 9":182,"Column 10":100,"Column 11":36},
				       {"Column 0":145,"Column 1":138,"Column 2":183,"Column 3":110,"Column 4":227,"Column 5":25,"Column 6":152,"Column 7":216,"Column 8":161,"Column 9":211,"Column 10":48,"Column 11":144},
				       {"Column 0":172,"Column 1":249,"Column 2":163,"Column 3":234,"Column 4":175,"Column 5":204,"Column 6":227,"Column 7":203,"Column 8":60,"Column 9":117,"Column 10":82,"Column 11":97},
				       {"Column 0":236,"Column 1":259,"Column 2":182,"Column 3":192,"Column 4":-26,"Column 5":196,"Column 6":175,"Column 7":110,"Column 8":241,"Column 9":121,"Column 10":89,"Column 11":61},
				       {"Column 0":145,"Column 1":118,"Column 2":151,"Column 3":224,"Column 4":135,"Column 5":125,"Column 6":134,"Column 7":229,"Column 8":165,"Column 9":259,"Column 10":263,"Column 11":184},
				       {"Column 0":102,"Column 1":330,"Column 2":136,"Column 3":54,"Column 4":79,"Column 5":272,"Column 6":200,"Column 7":208,"Column 8":217,"Column 9":105,"Column 10":53,"Column 11":56},
				       {"Column 0":174,"Column 1":215,"Column 2":197,"Column 3":207,"Column 4":273,"Column 5":107,"Column 6":119,"Column 7":76,"Column 8":20,"Column 9":151,"Column 10":132,"Column 11":67},
				       {"Column 0":199,"Column 1":90,"Column 2":170,"Column 3":50,"Column 4":28,"Column 5":207,"Column 6":191,"Column 7":97,"Column 8":133,"Column 9":296,"Column 10":206,"Column 11":137},
				       {"Column 0":257,"Column 1":327,"Column 2":24,"Column 3":164,"Column 4":49,"Column 5":203,"Column 6":179,"Column 7":-65,"Column 8":184,"Column 9":92,"Column 10":192,"Column 11":189},
				       {"Column 0":236,"Column 1":76,"Column 2":120,"Column 3":33,"Column 4":136,"Column 5":285,"Column 6":142,"Column 7":275,"Column 8":272,"Column 9":198,"Column 10":368,"Column 11":159},
				       {"Column 0":235,"Column 1":156,"Column 2":174,"Column 3":165,"Column 4":96,"Column 5":107,"Column 6":252,"Column 7":91,"Column 8":76,"Column 9":234,"Column 10":110,"Column 11":91},
				       {"Column 0":167,"Column 1":183,"Column 2":136,"Column 3":317,"Column 4":124,"Column 5":84,"Column 6":20,"Column 7":192,"Column 8":60,"Column 9":31,"Column 10":143,"Column 11":348},
				       {"Column 0":230,"Column 1":225,"Column 2":160,"Column 3":110,"Column 4":93,"Column 5":174,"Column 6":239,"Column 7":78,"Column 8":198,"Column 9":-5,"Column 10":133,"Column 11":200},
				       {"Column 0":271,"Column 1":96,"Column 2":57,"Column 3":110,"Column 4":190,"Column 5":113,"Column 6":44,"Column 7":287,"Column 8":140,"Column 9":109,"Column 10":204,"Column 11":209},
				       {"Column 0":187,"Column 1":96,"Column 2":147,"Column 3":76,"Column 4":159,"Column 5":310,"Column 6":90,"Column 7":130,"Column 8":-60,"Column 9":277,"Column 10":212,"Column 11":246},
				       {"Column 0":175,"Column 1":201,"Column 2":384,"Column 3":-41,"Column 4":166,"Column 5":140,"Column 6":97,"Column 7":104,"Column 8":86,"Column 9":171,"Column 10":139,"Column 11":172},
				       {"Column 0":220,"Column 1":100,"Column 2":146,"Column 3":16,"Column 4":191,"Column 5":78,"Column 6":153,"Column 7":215,"Column 8":152,"Column 9":107,"Column 10":129,"Column 11":245},
				       {"Column 0":160,"Column 1":86,"Column 2":206,"Column 3":137,"Column 4":88,"Column 5":288,"Column 6":37,"Column 7":259,"Column 8":151,"Column 9":188,"Column 10":255,"Column 11":153},
				       {"Column 0":133,"Column 1":122,"Column 2":151,"Column 3":60,"Column 4":97,"Column 5":118,"Column 6":69,"Column 7":122,"Column 8":135,"Column 9":124,"Column 10":121,"Column 11":182},
				       {"Column 0":189,"Column 1":99,"Column 2":277,"Column 3":-44,"Column 4":201,"Column 5":167,"Column 6":185,"Column 7":167,"Column 8":90,"Column 9":74,"Column 10":261,"Column 11":165},
				       {"Column 0":176,"Column 1":190,"Column 2":176,"Column 3":175,"Column 4":163,"Column 5":251,"Column 6":261,"Column 7":55,"Column 8":145,"Column 9":200,"Column 10":219,"Column 11":153},
				       {"Column 0":166,"Column 1":107,"Column 2":130,"Column 3":202,"Column 4":25,"Column 5":224,"Column 6":165,"Column 7":183,"Column 8":220,"Column 9":177,"Column 10":129,"Column 11":-5},
				       {"Column 0":255,"Column 1":182,"Column 2":131,"Column 3":131,"Column 4":24,"Column 5":294,"Column 6":123,"Column 7":203,"Column 8":131,"Column 9":277,"Column 10":197,"Column 11":121},
				       {"Column 0":75,"Column 1":243,"Column 2":7,"Column 3":285,"Column 4":67,"Column 5":93,"Column 6":120,"Column 7":83,"Column 8":120,"Column 9":132,"Column 10":224,"Column 11":105},
				       {"Column 0":82,"Column 1":189,"Column 2":95,"Column 3":184,"Column 4":78,"Column 5":108,"Column 6":159,"Column 7":62,"Column 8":144,"Column 9":221,"Column 10":156,"Column 11":82},
				       {"Column 0":122,"Column 1":298,"Column 2":192,"Column 3":108,"Column 4":247,"Column 5":68,"Column 6":124,"Column 7":190,"Column 8":-2,"Column 9":100,"Column 10":138,"Column 11":241},
				       {"Column 0":129,"Column 1":182,"Column 2":179,"Column 3":203,"Column 4":248,"Column 5":108,"Column 6":95,"Column 7":88,"Column 8":199,"Column 9":86,"Column 10":217,"Column 11":311},
				       {"Column 0":382,"Column 1":130,"Column 2":114,"Column 3":157,"Column 4":92,"Column 5":246,"Column 6":107,"Column 7":175,"Column 8":218,"Column 9":248,"Column 10":248,"Column 11":40},
				       {"Column 0":159,"Column 1":101,"Column 2":11,"Column 3":166,"Column 4":31,"Column 5":-40,"Column 6":157,"Column 7":192,"Column 8":125,"Column 9":101,"Column 10":189,"Column 11":127},
				       {"Column 0":166,"Column 1":120,"Column 2":108,"Column 3":239,"Column 4":273,"Column 5":165,"Column 6":165,"Column 7":62,"Column 8":96,"Column 9":36,"Column 10":125,"Column 11":142},
				       {"Column 0":153,"Column 1":209,"Column 2":160,"Column 3":84,"Column 4":185,"Column 5":169,"Column 6":190,"Column 7":237,"Column 8":140,"Column 9":116,"Column 10":88,"Column 11":171},
				       {"Column 0":201,"Column 1":122,"Column 2":108,"Column 3":128,"Column 4":171,"Column 5":45,"Column 6":207,"Column 7":148,"Column 8":112,"Column 9":123,"Column 10":158,"Column 11":197},
				       {"Column 0":0,"Column 1":248,"Column 2":257,"Column 3":228,"Column 4":279,"Column 5":65,"Column 6":76,"Column 7":284,"Column 8":75,"Column 9":89,"Column 10":234,"Column 11":210},
				       {"Column 0":193,"Column 1":179,"Column 2":148,"Column 3":161,"Column 4":227,"Column 5":187,"Column 6":123,"Column 7":279,"Column 8":81,"Column 9":166,"Column 10":59,"Column 11":148},
				       {"Column 0":112,"Column 1":158,"Column 2":-85,"Column 3":-2,"Column 4":246,"Column 5":153,"Column 6":73,"Column 7":279,"Column 8":76,"Column 9":331,"Column 10":129,"Column 11":51},
				       {"Column 0":72,"Column 1":174,"Column 2":72,"Column 3":-66,"Column 4":104,"Column 5":214,"Column 6":191,"Column 7":166,"Column 8":101,"Column 9":-1,"Column 10":120,"Column 11":244},
				       {"Column 0":205,"Column 1":91,"Column 2":90,"Column 3":204,"Column 4":161,"Column 5":77,"Column 6":15,"Column 7":191,"Column 8":117,"Column 9":227,"Column 10":209,"Column 11":-82},
				       {"Column 0":202,"Column 1":81,"Column 2":182,"Column 3":325,"Column 4":-1,"Column 5":155,"Column 6":174,"Column 7":102,"Column 8":176,"Column 9":251,"Column 10":70,"Column 11":179},
				       {"Column 0":99,"Column 1":31,"Column 2":219,"Column 3":152,"Column 4":248,"Column 5":121,"Column 6":113,"Column 7":78,"Column 8":76,"Column 9":-3,"Column 10":140,"Column 11":196},
				       {"Column 0":135,"Column 1":140,"Column 2":165,"Column 3":87,"Column 4":115,"Column 5":52,"Column 6":159,"Column 7":308,"Column 8":104,"Column 9":76,"Column 10":152,"Column 11":245},
				       {"Column 0":70,"Column 1":43,"Column 2":163,"Column 3":244,"Column 4":158,"Column 5":218,"Column 6":190,"Column 7":50,"Column 8":58,"Column 9":195,"Column 10":214,"Column 11":292},
				       {"Column 0":162,"Column 1":113,"Column 2":179,"Column 3":197,"Column 4":39,"Column 5":292,"Column 6":84,"Column 7":95,"Column 8":115,"Column 9":133,"Column 10":176,"Column 11":143},
				       {"Column 0":273,"Column 1":39,"Column 2":140,"Column 3":121,"Column 4":195,"Column 5":211,"Column 6":153,"Column 7":204,"Column 8":298,"Column 9":99,"Column 10":97,"Column 11":177},
				       {"Column 0":155,"Column 1":283,"Column 2":27,"Column 3":113,"Column 4":186,"Column 5":-3,"Column 6":186,"Column 7":134,"Column 8":228,"Column 9":63,"Column 10":153,"Column 11":35},
				       {"Column 0":-20,"Column 1":225,"Column 2":170,"Column 3":348,"Column 4":142,"Column 5":72,"Column 6":97,"Column 7":128,"Column 8":175,"Column 9":123,"Column 10":205,"Column 11":98},
				       {"Column 0":168,"Column 1":178,"Column 2":153,"Column 3":172,"Column 4":-30,"Column 5":175,"Column 6":112,"Column 7":166,"Column 8":208,"Column 9":181,"Column 10":213,"Column 11":123},
				       {"Column 0":107,"Column 1":144,"Column 2":91,"Column 3":165,"Column 4":78,"Column 5":274,"Column 6":225,"Column 7":-53,"Column 8":174,"Column 9":316,"Column 10":170,"Column 11":91},
				       {"Column 0":99,"Column 1":124,"Column 2":144,"Column 3":111,"Column 4":202,"Column 5":224,"Column 6":271,"Column 7":302,"Column 8":136,"Column 9":133,"Column 10":252,"Column 11":178},
				       {"Column 0":120,"Column 1":212,"Column 2":265,"Column 3":179,"Column 4":113,"Column 5":164,"Column 6":127,"Column 7":197,"Column 8":99,"Column 9":186,"Column 10":68,"Column 11":13},
				       {"Column 0":139,"Column 1":121,"Column 2":323,"Column 3":143,"Column 4":200,"Column 5":324,"Column 6":-16,"Column 7":113,"Column 8":148,"Column 9":131,"Column 10":130,"Column 11":204},
				       {"Column 0":194,"Column 1":139,"Column 2":72,"Column 3":113,"Column 4":290,"Column 5":197,"Column 6":114,"Column 7":167,"Column 8":-5,"Column 9":197,"Column 10":57,"Column 11":128},
				       {"Column 0":22,"Column 1":278,"Column 2":303,"Column 3":167,"Column 4":229,"Column 5":126,"Column 6":183,"Column 7":38,"Column 8":223,"Column 9":75,"Column 10":130,"Column 11":217},
				       {"Column 0":124,"Column 1":239,"Column 2":165,"Column 3":89,"Column 4":202,"Column 5":96,"Column 6":70,"Column 7":81,"Column 8":76,"Column 9":261,"Column 10":180,"Column 11":139},
				       {"Column 0":102,"Column 1":124,"Column 2":102,"Column 3":134,"Column 4":162,"Column 5":22,"Column 6":180,"Column 7":151,"Column 8":115,"Column 9":114,"Column 10":217,"Column 11":91},
				       {"Column 0":127,"Column 1":179,"Column 2":68,"Column 3":291,"Column 4":36,"Column 5":221,"Column 6":223,"Column 7":229,"Column 8":156,"Column 9":124,"Column 10":65,"Column 11":170},
				       {"Column 0":103,"Column 1":216,"Column 2":207,"Column 3":139,"Column 4":197,"Column 5":200,"Column 6":135,"Column 7":95,"Column 8":210,"Column 9":190,"Column 10":183,"Column 11":135},
				       {"Column 0":35,"Column 1":149,"Column 2":25,"Column 3":204,"Column 4":214,"Column 5":153,"Column 6":121,"Column 7":92,"Column 8":72,"Column 9":218,"Column 10":228,"Column 11":254},
				       {"Column 0":135,"Column 1":141,"Column 2":134,"Column 3":90,"Column 4":195,"Column 5":145,"Column 6":147,"Column 7":32,"Column 8":120,"Column 9":161,"Column 10":201,"Column 11":134},
				       {"Column 0":85,"Column 1":58,"Column 2":80,"Column 3":171,"Column 4":288,"Column 5":160,"Column 6":138,"Column 7":160,"Column 8":114,"Column 9":259,"Column 10":187,"Column 11":127},
				       {"Column 0":362,"Column 1":113,"Column 2":127,"Column 3":221,"Column 4":-9,"Column 5":222,"Column 6":165,"Column 7":296,"Column 8":99,"Column 9":65,"Column 10":97,"Column 11":167},
				       {"Column 0":134,"Column 1":168,"Column 2":97,"Column 3":171,"Column 4":130,"Column 5":116,"Column 6":171,"Column 7":99,"Column 8":167,"Column 9":119,"Column 10":231,"Column 11":255},
				       {"Column 0":223,"Column 1":63,"Column 2":128,"Column 3":152,"Column 4":71,"Column 5":121,"Column 6":229,"Column 7":198,"Column 8":96,"Column 9":68,"Column 10":200,"Column 11":181},
				       {"Column 0":148,"Column 1":195,"Column 2":191,"Column 3":150,"Column 4":140,"Column 5":263,"Column 6":135,"Column 7":145,"Column 8":208,"Column 9":177,"Column 10":110,"Column 11":204},
				       {"Column 0":69,"Column 1":279,"Column 2":210,"Column 3":216,"Column 4":146,"Column 5":149,"Column 6":211,"Column 7":38,"Column 8":223,"Column 9":182,"Column 10":59,"Column 11":122},
				       {"Column 0":109,"Column 1":369,"Column 2":196,"Column 3":155,"Column 4":-8,"Column 5":220,"Column 6":224,"Column 7":254,"Column 8":103,"Column 9":172,"Column 10":181,"Column 11":61},
				       {"Column 0":252,"Column 1":235,"Column 2":96,"Column 3":69,"Column 4":223,"Column 5":229,"Column 6":132,"Column 7":141,"Column 8":119,"Column 9":154,"Column 10":108,"Column 11":274},
				       {"Column 0":159,"Column 1":269,"Column 2":277,"Column 3":94,"Column 4":46,"Column 5":23,"Column 6":113,"Column 7":102,"Column 8":105,"Column 9":172,"Column 10":86,"Column 11":69},
				       {"Column 0":246,"Column 1":259,"Column 2":149,"Column 3":154,"Column 4":19,"Column 5":179,"Column 6":207,"Column 7":87,"Column 8":55,"Column 9":192,"Column 10":231,"Column 11":189},
				       {"Column 0":65,"Column 1":78,"Column 2":96,"Column 3":253,"Column 4":93,"Column 5":181,"Column 6":215,"Column 7":186,"Column 8":232,"Column 9":34,"Column 10":169,"Column 11":181},
				       {"Column 0":215,"Column 1":306,"Column 2":195,"Column 3":135,"Column 4":164,"Column 5":138,"Column 6":146,"Column 7":134,"Column 8":97,"Column 9":173,"Column 10":150,"Column 11":94},
				       {"Column 0":233,"Column 1":130,"Column 2":157,"Column 3":153,"Column 4":242,"Column 5":107,"Column 6":82,"Column 7":157,"Column 8":107,"Column 9":144,"Column 10":-63,"Column 11":174},
				       {"Column 0":173,"Column 1":267,"Column 2":124,"Column 3":173,"Column 4":155,"Column 5":165,"Column 6":123,"Column 7":235,"Column 8":112,"Column 9":168,"Column 10":165,"Column 11":86},
				       {"Column 0":230,"Column 1":183,"Column 2":133,"Column 3":146,"Column 4":227,"Column 5":269,"Column 6":175,"Column 7":231,"Column 8":253,"Column 9":246,"Column 10":-35,"Column 11":94},
				       {"Column 0":214,"Column 1":177,"Column 2":242,"Column 3":217,"Column 4":142,"Column 5":203,"Column 6":110,"Column 7":63,"Column 8":180,"Column 9":94,"Column 10":137,"Column 11":271},
				       {"Column 0":71,"Column 1":81,"Column 2":188,"Column 3":59,"Column 4":81,"Column 5":253,"Column 6":232,"Column 7":139,"Column 8":199,"Column 9":154,"Column 10":174,"Column 11":152},
				       {"Column 0":61,"Column 1":144,"Column 2":282,"Column 3":166,"Column 4":153,"Column 5":217,"Column 6":202,"Column 7":87,"Column 8":279,"Column 9":319,"Column 10":146,"Column 11":157},
				       {"Column 0":86,"Column 1":160,"Column 2":111,"Column 3":142,"Column 4":193,"Column 5":142,"Column 6":245,"Column 7":249,"Column 8":259,"Column 9":124,"Column 10":160,"Column 11":223},
				       {"Column 0":190,"Column 1":189,"Column 2":-12,"Column 3":50,"Column 4":207,"Column 5":256,"Column 6":69,"Column 7":103,"Column 8":224,"Column 9":226,"Column 10":167,"Column 11":126},
				       {"Column 0":175,"Column 1":186,"Column 2":143,"Column 3":274,"Column 4":127,"Column 5":96,"Column 6":207,"Column 7":211,"Column 8":139,"Column 9":111,"Column 10":157,"Column 11":236},
				       {"Column 0":169,"Column 1":89,"Column 2":85,"Column 3":97,"Column 4":155,"Column 5":134,"Column 6":226,"Column 7":238,"Column 8":67,"Column 9":134,"Column 10":231,"Column 11":191},
				       {"Column 0":174,"Column 1":124,"Column 2":280,"Column 3":274,"Column 4":216,"Column 5":172,"Column 6":78,"Column 7":266,"Column 8":280,"Column 9":131,"Column 10":188,"Column 11":83},
				       {"Column 0":311,"Column 1":189,"Column 2":232,"Column 3":134,"Column 4":279,"Column 5":25,"Column 6":229,"Column 7":163,"Column 8":219,"Column 9":86,"Column 10":108,"Column 11":226},
				       {"Column 0":165,"Column 1":92,"Column 2":264,"Column 3":153,"Column 4":197,"Column 5":346,"Column 6":104,"Column 7":199,"Column 8":53,"Column 9":292,"Column 10":53,"Column 11":150},
				       {"Column 0":103,"Column 1":295,"Column 2":161,"Column 3":100,"Column 4":134,"Column 5":209,"Column 6":125,"Column 7":204,"Column 8":172,"Column 9":163,"Column 10":0,"Column 11":264},
				       {"Column 0":143,"Column 1":44,"Column 2":184,"Column 3":191,"Column 4":1,"Column 5":159,"Column 6":65,"Column 7":249,"Column 8":129,"Column 9":116,"Column 10":95,"Column 11":0},
				       {"Column 0":105,"Column 1":110,"Column 2":143,"Column 3":151,"Column 4":269,"Column 5":145,"Column 6":214,"Column 7":19,"Column 8":163,"Column 9":203,"Column 10":125,"Column 11":140},
				       {"Column 0":143,"Column 1":125,"Column 2":77,"Column 3":170,"Column 4":184,"Column 5":83,"Column 6":81,"Column 7":160,"Column 8":171,"Column 9":176,"Column 10":137,"Column 11":156},
				       {"Column 0":153,"Column 1":361,"Column 2":68,"Column 3":143,"Column 4":155,"Column 5":128,"Column 6":201,"Column 7":47,"Column 8":240,"Column 9":312,"Column 10":303,"Column 11":39},
				       {"Column 0":150,"Column 1":335,"Column 2":12,"Column 3":96,"Column 4":152,"Column 5":245,"Column 6":67,"Column 7":168,"Column 8":119,"Column 9":60,"Column 10":106,"Column 11":115},
				       {"Column 0":190,"Column 1":99,"Column 2":152,"Column 3":301,"Column 4":115,"Column 5":20,"Column 6":186,"Column 7":125,"Column 8":129,"Column 9":150,"Column 10":158,"Column 11":61},
				       {"Column 0":131,"Column 1":117,"Column 2":277,"Column 3":285,"Column 4":21,"Column 5":195,"Column 6":243,"Column 7":175,"Column 8":62,"Column 9":118,"Column 10":145,"Column 11":231},
				       {"Column 0":226,"Column 1":169,"Column 2":176,"Column 3":133,"Column 4":83,"Column 5":227,"Column 6":152,"Column 7":246,"Column 8":63,"Column 9":84,"Column 10":27,"Column 11":141},
				       {"Column 0":189,"Column 1":351,"Column 2":326,"Column 3":266,"Column 4":63,"Column 5":222,"Column 6":190,"Column 7":253,"Column 8":215,"Column 9":89,"Column 10":145,"Column 11":224},
				       {"Column 0":140,"Column 1":210,"Column 2":222,"Column 3":145,"Column 4":166,"Column 5":85,"Column 6":133,"Column 7":178,"Column 8":141,"Column 9":316,"Column 10":30,"Column 11":199},
				       {"Column 0":154,"Column 1":343,"Column 2":112,"Column 3":221,"Column 4":147,"Column 5":205,"Column 6":278,"Column 7":276,"Column 8":186,"Column 9":79,"Column 10":169,"Column 11":118},
				       {"Column 0":43,"Column 1":184,"Column 2":128,"Column 3":44,"Column 4":195,"Column 5":78,"Column 6":139,"Column 7":144,"Column 8":167,"Column 9":161,"Column 10":80,"Column 11":208},
				       {"Column 0":108,"Column 1":214,"Column 2":217,"Column 3":40,"Column 4":24,"Column 5":208,"Column 6":282,"Column 7":35,"Column 8":273,"Column 9":138,"Column 10":203,"Column 11":91},
				       {"Column 0":97,"Column 1":243,"Column 2":171,"Column 3":215,"Column 4":222,"Column 5":101,"Column 6":175,"Column 7":72,"Column 8":75,"Column 9":111,"Column 10":145,"Column 11":86},
				       {"Column 0":-167,"Column 1":119,"Column 2":169,"Column 3":233,"Column 4":301,"Column 5":69,"Column 6":157,"Column 7":-6,"Column 8":141,"Column 9":189,"Column 10":227,"Column 11":277},
				       {"Column 0":77,"Column 1":175,"Column 2":50,"Column 3":73,"Column 4":170,"Column 5":122,"Column 6":41,"Column 7":91,"Column 8":205,"Column 9":291,"Column 10":149,"Column 11":229},
				       {"Column 0":265,"Column 1":201,"Column 2":142,"Column 3":133,"Column 4":168,"Column 5":213,"Column 6":184,"Column 7":128,"Column 8":234,"Column 9":147,"Column 10":225,"Column 11":142},
				       {"Column 0":80,"Column 1":105,"Column 2":168,"Column 3":162,"Column 4":86,"Column 5":169,"Column 6":114,"Column 7":211,"Column 8":201,"Column 9":30,"Column 10":57,"Column 11":219},
				       {"Column 0":128,"Column 1":77,"Column 2":129,"Column 3":255,"Column 4":88,"Column 5":99,"Column 6":137,"Column 7":218,"Column 8":199,"Column 9":132,"Column 10":95,"Column 11":66},
				       {"Column 0":125,"Column 1":265,"Column 2":110,"Column 3":151,"Column 4":189,"Column 5":164,"Column 6":78,"Column 7":186,"Column 8":122,"Column 9":108,"Column 10":143,"Column 11":77},
				       {"Column 0":289,"Column 1":93,"Column 2":138,"Column 3":139,"Column 4":215,"Column 5":250,"Column 6":225,"Column 7":183,"Column 8":134,"Column 9":-41,"Column 10":254,"Column 11":155},
				       {"Column 0":232,"Column 1":205,"Column 2":115,"Column 3":177,"Column 4":111,"Column 5":103,"Column 6":-25,"Column 7":69,"Column 8":160,"Column 9":254,"Column 10":73,"Column 11":72},
				       {"Column 0":148,"Column 1":165,"Column 2":184,"Column 3":57,"Column 4":-56,"Column 5":53,"Column 6":74,"Column 7":421,"Column 8":263,"Column 9":80,"Column 10":140,"Column 11":264},
				       {"Column 0":150,"Column 1":73,"Column 2":78,"Column 3":68,"Column 4":230,"Column 5":187,"Column 6":38,"Column 7":355,"Column 8":185,"Column 9":-16,"Column 10":205,"Column 11":62},
				       {"Column 0":174,"Column 1":169,"Column 2":186,"Column 3":180,"Column 4":45,"Column 5":178,"Column 6":243,"Column 7":191,"Column 8":99,"Column 9":128,"Column 10":268,"Column 11":210}
				      ],
				plots: [{
					type: "scatterplot",
					title: "Demo scatterplot",
					xAxis: "Column 1",
					yAxis: "Column 4",
					top: 20,
					left: 120,
					width: 200,
					height: 300
				}, {
					type: "scatterplot",
					title: "Demo scatterplot 2",
					xAxis: "Column 3",
					yAxis: "Column 4",
					top: 20,
					left: 350,
					width: 300,
					height: 300
				}, {
					type: "histogram",
					title: "Demo histogram",
					axis: "Column 0",
					binSize: 70,
					top: 20,
					left: 690,
					width: 300,
					height: 300
				}, {
					type: "parallel_coordinates",
					title: "Demo par coord",
					axes: ["Column 0", "Column 2", "Column 5", "Column 7"],
					top: 360,
					left: 120,
					height: 300,
					width: 600
				}],
				highlights: [{
					type: "selection",
					axis1: {
						axis: "Column 3",
						from: 53,
						to: 222
					},
					axis2: {
						axis: "Column 4",
						from: 100,
						to: 200
					}
				}]
			});
		});
	});
}
