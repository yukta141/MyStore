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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.cybage.DTO.CartItemDTO;
import com.cybage.model.Cart;
import com.cybage.service.CartService;

import jakarta.validation.ValidationException;

@RestController
@CrossOrigin(origins="http://localhost:4200")
public class CartController {
	
	@Autowired
	private CartService cartService;
	
	
	@PostMapping(path="{userId}/add")
    public ResponseEntity<Cart> addItemToCart(
            @PathVariable Long userId,
            @RequestBody List<CartItemDTO> cartItems) {
        Cart cart = null;
        for (CartItemDTO item : cartItems) {
            cart = cartService.addItemToCart(userId, item.getBookId(), item.getQuantity());
        }
        return ResponseEntity.ok(cart);
    }
	
	
	
	 @GetMapping(path="{userId}")
	    public ResponseEntity<Cart> getCart(@PathVariable Long userId) {
	        Cart cart = cartService.getCartByUser(userId);
	        return ResponseEntity.ok(cart);
	    }
	 
	
	 
	 @GetMapping(path="applyCoupon/{userId}/{couponCode}")
	 public ResponseEntity<?> applyCoupon(@PathVariable Long userId, @PathVariable String couponCode) {
	     try {
	         // Check if the user already has a coupon applied
	         if (cartService.isCouponApplied(userId)) {
	             return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("A coupon has already been applied.");
	         }

	         Cart cart = cartService.applyCoupon(userId, couponCode);
	         return ResponseEntity.ok(cart);
	     } catch (ValidationException ex) {
	         return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getMessage());
	     }
	 }

	 
	 @DeleteMapping("/{userId}/remove/{cartItemId}")
	    public ResponseEntity<Cart> removeItemFromCart(
	            @PathVariable Long userId,
	            @PathVariable Long cartItemId) {
	        Cart cart = cartService.removeItemFromCart(userId, cartItemId);
	        return ResponseEntity.ok(cart);
	    }
	 
	 @DeleteMapping("/removecartitem/{userId}")
	 public ResponseEntity<Void> removeAllCartItemsForUser(@PathVariable Long userId) {
	     cartService.removeAllCartItemsForUser(userId);
	     return ResponseEntity.noContent().build();
	 }
	 
	 
	 @PostMapping(path = "removeCoupon/{userId}")
	 public ResponseEntity<?> removeCoupon(@PathVariable Long userId) {
	     try {
	         Cart cart = cartService.removeCoupon(userId);
	         return ResponseEntity.ok(cart); 
	     } catch (ValidationException e) {
	         return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
	     } catch (Exception e) {
	         return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error removing coupon.");
	     }
	 }



}
