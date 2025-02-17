package com.cybage.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.cybage.model.Feedback;
import com.cybage.model.Users;
import com.cybage.repository.UserRepository;
import com.cybage.service.FeedbackService;

@RestController
@CrossOrigin(origins="http://localhost:4200")
public class FeedbackController {
	
	@Autowired
	private FeedbackService feedbackService;
	
	@Autowired
	private UserRepository userRepository;

	
	@PostMapping(path = "addFeedback/{userId}")
	public ResponseEntity<Feedback> addFeedback(@RequestBody Feedback feedback, @PathVariable Long userId) {
	    Users user = userRepository.findById(userId)
	            .orElseThrow(() -> new RuntimeException("User not found"));

	    feedback.setUserName(user.getUserName());
	    feedback.setUser(user);
	    if (feedback.getRecommend() != null) {
	        feedback.setRecommend(feedback.getRecommend() ? true : false);
	    }
	    return new ResponseEntity<>(feedbackService.addFeedback(feedback), HttpStatus.CREATED);
	}

	
	@GetMapping(path="getAllFeedbacks")
	public ResponseEntity<List<Feedback>> getAllFeedback() {
		
		return new ResponseEntity<List<Feedback>>(feedbackService.getAllFeedback(), HttpStatus.OK);
	}

	
	@DeleteMapping(path="deletefeedback/{id}")
    public ResponseEntity<String> deleteFeedback(@PathVariable Long id) {
        try {
            feedbackService.deleteFeedback(id);
            return ResponseEntity.ok("Feedback deleted successfully");
        } catch (RuntimeException e) {
            return ResponseEntity.status(404).body(e.getMessage());
        }
    }
}
