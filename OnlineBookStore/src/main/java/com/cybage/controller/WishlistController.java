package com.cybage.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.cybage.model.Wishlist;
import com.cybage.service.WishlistService;

@RestController
@CrossOrigin(origins="http://localhost:4200")
@RequestMapping("/")
public class WishlistController {
	
	@Autowired
	private WishlistService wishlistService;
	
	
	 @PostMapping("/addBookToWishlist")
	    public Wishlist addBookToWishlist(@RequestParam Long userId, @RequestParam Long bookId) {
	        return wishlistService.addBookToWishlist(userId, bookId);
	    }
	 
	  @GetMapping("/getUsersWishlist/{userId}")
	    public Wishlist getWishlistByUser(@PathVariable Long userId) {
	        return wishlistService.getWishlistByUser(userId);
	    }
	  
	  @DeleteMapping("/removeFromWishlist")
	    public Wishlist removeBookFromWishlist(@RequestParam Long userId, @RequestParam Long bookId) {
	        return wishlistService.removeBookFromWishlist(userId, bookId);
	    }

}
