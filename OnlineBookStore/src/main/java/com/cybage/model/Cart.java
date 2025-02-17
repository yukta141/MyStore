package com.cybage.model;

import java.util.ArrayList;
import java.util.List;

import org.hibernate.engine.internal.Cascade;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class Cart {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long cartId;
	
	 @OneToOne
	    @JoinColumn(name = "userId")
	    private Users user;

	    @OneToMany(mappedBy = "cart", cascade = CascadeType.ALL, orphanRemoval = true)
	    private List<CartItem> items = new ArrayList<>();
	    
	    @OneToOne(cascade= CascadeType.ALL)
	    @JoinColumn(name = "coupon_id") 
	    private Coupon coupon;

	    private double totalPrice;

}
