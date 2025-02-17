package com.cybage.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name="feedback")
public class Feedback {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long feedbackId;
	private String feedbackRating;
	private String feedbackText;
	private String userName;
	private Boolean recommend;
	

	@ManyToOne
	private Users user;
	

}
