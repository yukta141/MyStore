package com.cybage.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.cybage.DTO.NotificationDTO;
import com.cybage.model.Notification;
import com.cybage.service.NotificationService;

@RestController
@CrossOrigin(origins="http://localhost:4200")
public class NotificationController {
	
	@Autowired
	private NotificationService notificationService;
	
	 @PostMapping("/createNotifications")
	    public ResponseEntity<String> createNotifications(@RequestBody Long bookId) {
	        try {
	            notificationService.createNotificationsForNewBook(bookId);
	            return ResponseEntity.ok("Notifications created successfully for all subscribed users");
	        } catch (IllegalArgumentException e) {
	            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
	        }
	    }

	    @GetMapping("/getNotify")
	    public List<NotificationDTO> getNotifications(@RequestParam Long userId) {
	        return notificationService.getNotificationsForUser(userId);
	    }
	    
	    @PatchMapping("/mark-as-seen/{notificationId}")
	    public ResponseEntity<Void> markAsSeen(@PathVariable Long notificationId) {
	        boolean updated = notificationService.markNotificationAsSeen(notificationId);

	        if (updated) {
	            return ResponseEntity.noContent().build();
	        } else {
	            return ResponseEntity.notFound().build();
	        }
	    }
	    
	    @GetMapping("/users/{userId}/notifications")
	    public List<Notification> getOrderNotifications(@PathVariable Long userId) {
	        return notificationService.getOrderNotificationsForUser(userId);
	    }
	    
	    

}
