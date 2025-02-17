package com.cybage.controller;


import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.cybage.DTO.MonthlyRevenueDTO;
import com.cybage.model.Revenue;
import com.cybage.service.RevenueService;

@RestController
@CrossOrigin(origins="http://localhost:4200")
public class RevenueController {
	
	@Autowired
	private RevenueService revenueService;
	
	@GetMapping("/revenueAdmin")
    public ResponseEntity<Double> getMonthlyRevenue(@RequestParam int month, @RequestParam int year) {
        double revenue = revenueService.calculateMonthlyRevenue(month, year);
        return ResponseEntity.ok(revenue);
    }
	
	 @GetMapping("/sellerRevenue/{sellerId}")
	    public double getRevenueForSeller(@PathVariable Long sellerId, @RequestParam int month, @RequestParam int year) {
	        return revenueService.calculateMonthlyRevenueForSeller(sellerId, month, year);
    }
	  
	 @PostMapping("/calculateRevenue")
	    public ResponseEntity<String> calculateRevenue() {
	        revenueService.calculateAndSaveMonthlyRevenue();
	        return ResponseEntity.ok("Revenue calculation completed successfully.");
	    }
	 
	 @GetMapping("/monthlyRevenue")
	    public ResponseEntity<List<Map<String, Object>>> getMonthlyRevenue() {
	        return ResponseEntity.ok(revenueService.getMonthlyRevenueForChart());
	    }

	 
}
