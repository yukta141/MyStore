package com.cybage.model;

import java.util.ArrayList;
import java.util.List;

import com.cybage.enums.UserRole;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name="users")
public class Users {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long userId;
	private String userName;
	private String userEmail;
	private String userContactNumber;	
	private String userPassword;
	private String userAddress;
	private String userRole;
	private byte[] userImg;
	private boolean blocked;
	
	
	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	@JsonIgnore
	private List<Orders> order;
	
	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	@JsonIgnore
	private List<Wishlist> wishlist;
	
	 @OneToOne(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
	 @JsonIgnore
	 private Cart cart;
	 
	 @OneToMany(mappedBy = "users", cascade = CascadeType.ALL)
	 @JsonIgnore
	 private List<Subscription> subscriptions;
	 
	 @OneToMany(mappedBy = "users", cascade = CascadeType.ALL)
	 @JsonIgnore
	 private List<Notification> notification;
	 
	 @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
	 @JsonIgnore
	 private List<Feedback> feedbacks;
	 
	 @OneToMany(mappedBy = "user")
	 @JsonIgnore
	 private List<Books> books;
}
