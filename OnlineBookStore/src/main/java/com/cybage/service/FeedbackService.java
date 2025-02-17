package com.cybage.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cybage.model.Feedback;
import com.cybage.repository.FeedbackRepository;

@Service
public class FeedbackService {
	
	@Autowired
	private FeedbackRepository feedbackRepository;
	
	public Feedback addFeedback(Feedback feedback) {
		return feedbackRepository.save(feedback);
	} 
	
	public List<Feedback> getAllFeedback() {	
		return feedbackRepository.findAll();
	}
	
	 public void deleteFeedback(Long feedbackId) {
	        Optional<Feedback> feedback = feedbackRepository.findById(feedbackId);
	        if (feedback.isPresent()) {
	            feedbackRepository.deleteById(feedbackId);
	        } else {
	            throw new RuntimeException("Feedback not found with id: " + feedbackId);
	        }
	    }

}
