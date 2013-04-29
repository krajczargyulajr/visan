<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>

<%@ page language="java" contentType="text/html; charset=US-ASCII" pageEncoding="US-ASCII"%>
<!DOCTYPE html>
<html>
	<head>
		<title>VISAN</title>
		
		<link rel="stylesheet" href="./resources/theme/jquery-ui.css" />
		<link rel="stylesheet" href="./resources/style/visan.css" />
		
		<script type="text/javascript" src="./resources/script/nrand.js"></script>
		
		<script type="text/javascript" src="./resources/script/jquery-1.9.1.min.js"></script>
		<script type="text/javascript" src="./resources/script/jquery-ui.js"></script>
		<script type="text/javascript" src="./resources/script/kinetic-v4.3.3.js"></script>
		<script type="text/javascript" src="./resources/script/crossfilter.js"></script>
		<script type="text/javascript" src="./resources/script/mustache.js"></script>
		
		<script type="text/javascript" src="./resources/script/visan/visan.js"></script>
		<script type="text/javascript" src="./resources/script/visan/datamanager.js"></script>
		<script type="text/javascript" src="./resources/script/visan/modules/startpage.js"></script>
		<script type="text/javascript" src="./resources/script/visan/modules/createanalysispage.js"></script>
		<script type="text/javascript" src="./resources/script/visan/modules/openanalysispage.js"></script>
		<script type="text/javascript" src="./resources/script/visan/modules/analysismodule.js"></script>
		<script type="text/javascript" src="./resources/script/visan/modules/analysisstepmodule.js"></script>
		
		<!-- Plot types -->
		<script type="text/javascript" src="./resources/script/visan/plots/scatterplot.js"></script>
		<script type="text/javascript" src="./resources/script/visan/plots/histogram.js"></script>
		<script type="text/javascript" src="./resources/script/visan/plots/_plottypes.js"></script>
		
		<script type="text/javascript">
		$(function() {
			var APP = new VISAN.Application();
			APP.run();
		});
		</script>
	</head>
<body>
</body>
</html>