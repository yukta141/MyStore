package com.cybage.model;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name="books")
public class Books {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long bookId;
	private String bookName;
	private String bookAuthorName;
	private String bookDescription;
	private String bookCategory;
	private float  bookPrice;
	private String bookImage;
	private String bookSeries;
	
	
	@OneToMany(mappedBy="book", cascade=CascadeType.ALL)
	@JsonIgnore
    private List<Orders> orders;
	
	@OneToMany(mappedBy = "book")
	@JsonIgnore
	private List<CartItem> cartItems = new ArrayList<>();
	
	@OneToMany(mappedBy = "books")
	@JsonIgnore
	private List<Subscription> subscription;
	
	@OneToMany(mappedBy = "books")
	@JsonIgnore
	private List<Notification> notification;
	
	@ManyToMany(mappedBy = "books") 
	@JsonIgnore
	private List<Wishlist> wishlists;
	
	@ManyToOne
	@JoinColumn(name = "user_id")
	private Users user; // This represents the seller
	
	

}
