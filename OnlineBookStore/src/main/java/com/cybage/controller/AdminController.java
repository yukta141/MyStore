package com.cybage.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cybage.model.Users;
import com.cybage.service.AdminService;

@RestController
@CrossOrigin(origins="http://localhost:4200")
public class AdminController {
	
	@Autowired
	private AdminService adminService;
	
	@GetMapping(path="getAllSellers")
	public ResponseEntity<List<Users>> getAllSellers() {
		
		return new ResponseEntity<List<Users>>(adminService.getAllSellers(), HttpStatus.OK);
	}

}
