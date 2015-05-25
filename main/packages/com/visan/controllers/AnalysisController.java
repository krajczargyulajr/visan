package com.visan.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping(value = "/analysis")
public class AnalysisController {

	@RequestMapping(value = "/", method = RequestMethod.GET)
	public Object getAll() {
		return null;
	}
	
	// get single
	// put single
	// delete single
	
	// get as xml
	// put as xml
	
	// add data
}
