package com.cybage.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cybage.model.Books;
import com.cybage.model.Users;
import com.cybage.model.Wishlist;
import com.cybage.repository.BookCardsRepository;
import com.cybage.repository.UserRepository;
import com.cybage.repository.WishlistRepository;

@Service
public class WishlistService {

	@Autowired
	private WishlistRepository wishlistRepository;
	
	@Autowired
	private BookCardsRepository bookCardsRepository;
	
	@Autowired
	private UserRepository userRepository;
	
	 public Wishlist addBookToWishlist(Long userId, Long bookId) {
	        Users user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
	        Books book = bookCardsRepository.findById(bookId).orElseThrow(() -> new RuntimeException("Book not found"));

	        Wishlist wishlist = wishlistRepository.findByUser(user);
	        if (wishlist == null) {
	            wishlist = new Wishlist();
	            wishlist.setUser(user);
	        }

	        wishlist.getBooks().add(book);
	        return wishlistRepository.save(wishlist);
	    }

	 
	 public Wishlist getWishlistByUser(Long userId) {
	        Users user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
	        return wishlistRepository.findByUser(user);
	    }
	 
	 public Wishlist removeBookFromWishlist(Long userId, Long bookId) {
	        Users user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
	        Books book = bookCardsRepository.findById(bookId).orElseThrow(() -> new RuntimeException("Book not found"));

	        Wishlist wishlist = wishlistRepository.findByUser(user);
	        if (wishlist != null) {
	            wishlist.getBooks().remove(book);
	            return wishlistRepository.save(wishlist);
	        }
	        return wishlist;
	    }
}
