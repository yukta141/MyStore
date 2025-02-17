package com.cybage.model;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name="wishlist")
public class Wishlist {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long wishlistId;
	
	 @ManyToOne
	 @JoinColumn(name = "user_id")
	 private Users user;
	 
	 @ManyToMany
//	 @JsonIgnore
	 @JoinTable(
	        name = "wishlist_books",
	        joinColumns = @JoinColumn(name = "wishlist_id"),
	        inverseJoinColumns = @JoinColumn(name = "book_id")
	    )
	    private List<Books> books= new ArrayList<>();
}
