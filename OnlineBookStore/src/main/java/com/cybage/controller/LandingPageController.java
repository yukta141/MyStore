package com.cybage.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cybage.model.Category;
import com.cybage.service.CategoryService;

@RestController
@CrossOrigin(origins="http://localhost:4200")
public class LandingPageController {
	
	@Autowired
	private CategoryService categoryService;
	
	@GetMapping(path="getAllCategory")
	public ResponseEntity<List<Category>> getAllCategory() {
		
		return new ResponseEntity<List<Category>>(categoryService.getAllCategory(), HttpStatus.OK);
	}

}
