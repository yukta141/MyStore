package com.cybage.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name="notification")
public class Notification {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long notificationId;
	
	@ManyToOne
    @JoinColumn(name = "user_id")
    private Users users;
	
	@ManyToOne
    @JoinColumn(name = "order_id")
    private Orders orders;
    
    
    @ManyToOne
    @JoinColumn(name="book_id")
    private Books books;
    

    private String status;
    private String message;
}
