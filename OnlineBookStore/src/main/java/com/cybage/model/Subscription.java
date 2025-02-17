package com.cybage.model;

import java.time.LocalDateTime;

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
@Table(name="subscription")
public class Subscription {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long subscriptionId;

	 
    @ManyToOne
    @JoinColumn(name = "user_id")
    private Users users;
    
    @ManyToOne
    @JoinColumn(name="book_id")
    private Books books;
    


}
