package com.cybage.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.cybage.DTO.SubscriptionDTO;
import com.cybage.model.Books;
import com.cybage.service.SubscriptionService;

@RestController
@CrossOrigin(origins="http://localhost:4200")
public class SubscriptionController {

	@Autowired
	private SubscriptionService subscriptionService;
	
	 @PostMapping("/subscribe")
	    public ResponseEntity<SubscriptionDTO> subscribeToSeries(@RequestBody SubscriptionDTO subscriptionDTO) {
	        SubscriptionDTO resultDTO = subscriptionService.subscribeToSeries(subscriptionDTO);
	        return ResponseEntity.ok(resultDTO);
	    }
	 
	 @GetMapping("/check")
	    public ResponseEntity<Boolean> checkSubscription(
	        @RequestParam Long userId,
	        @RequestParam String bookSeries) {
	        boolean isSubscribed = subscriptionService.isSubscribed(userId, bookSeries);
	        return ResponseEntity.ok(isSubscribed);
	    }
	 
	 @GetMapping("/subscribed/{userId}")
	    public ResponseEntity<List<String>> getUserSubscribedSeries(@PathVariable Long userId) {
	        List<Books> subscribedSeries = subscriptionService.getUserSubscribedSeries(userId);
	        List<String> seriesNames = subscribedSeries.stream()
	                                                   .map(Books::getBookSeries)
	                                                   .collect(Collectors.toList());
	        return ResponseEntity.ok(seriesNames);
	    }
}
