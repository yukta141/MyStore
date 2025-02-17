package com.cybage.service;

import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cybage.model.Books;
import com.cybage.model.Cart;
import com.cybage.model.CartItem;
import com.cybage.model.Coupon;
import com.cybage.model.Users;
import com.cybage.repository.BookCardsRepository;
import com.cybage.repository.CartItemRepository;
import com.cybage.repository.CartRepository;
import com.cybage.repository.CouponRepository;
import com.cybage.repository.UserRepository;

import jakarta.transaction.Transactional;
import jakarta.validation.ValidationException;

@Service
public class CartService {
	
	@Autowired
	private CartRepository cartRepository;
	
	@Autowired
	private CartItemRepository cartItemRepository;
	
	@Autowired
	private BookCardsRepository bookCardsRepository;
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private CouponRepository couponRepository;
	
	
	 public Cart getCartByUser(Long userId) {
	        Users user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
	        return cartRepository.findByUser(user);
	    }
	 
//	 public Cart addItemToCart(Long userId, Long bookId, int quantity) {
//	        Users user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
//	        Books book = bookCardsRepository.findById(bookId).orElseThrow(() -> new RuntimeException("Book not found"));
//
//	        Cart cart = cartRepository.findByUser(user);
//	        if (cart == null) {
//	            cart = new Cart();
//	            cart.setUser(user);
////	            cart.setTotalPrice(0);
//	        }
//
//	        CartItem cartItem = new CartItem();
//	        cartItem.setCart(cart);
//	        cartItem.setBook(book);
//	        cartItem.setQuantity(quantity);
//	        cartItem= cartItemRepository.save(cartItem);
//
//	        cart.getItems().add(cartItem);
//	        cart.setTotalPrice(cart.getTotalPrice() + (cartItem.getQuantity() * cartItem.getBook().getBookPrice()));
//
//	        cartRepository.save(cart);
//
//	        return cart;
//	    }
	 
	 
	 public Cart addItemToCart(Long userId, Long bookId, int quantity) {
		    Users user = userRepository.findById(userId)
		            .orElseThrow(() -> new RuntimeException("User not found"));
		    Books book = bookCardsRepository.findById(bookId)
		            .orElseThrow(() -> new RuntimeException("Book not found"));

		    Cart cart = cartRepository.findByUser(user);
		    if (cart == null) {
		        cart = new Cart();
		        cart.setUser(user);
		    }

		    CartItem existingCartItem = cart.getItems().stream()
		            .filter(item -> item.getBook().getBookId() == bookId)  
		            .findFirst()
		            .orElse(null);


		    if (existingCartItem != null) {
		        existingCartItem.setQuantity(existingCartItem.getQuantity() + quantity);
		        cartItemRepository.save(existingCartItem);
		    } else {
		        CartItem cartItem = new CartItem();
		        cartItem.setCart(cart);
		        cartItem.setBook(book);
		        cartItem.setBookCategory(book.getBookCategory());
		        cartItem.setQuantity(quantity);
		        cart.getItems().add(cartItem);
		        cartRepository.save(cart);
//		        cartItemRepository.save(cartItem);
		        
		    }

		    updateTotalPrice(cart);
		    return cartRepository.save(cart);
		}

	 
	 public void updateTotalPrice(Cart cart) {
	        double total = cart.getItems().stream()
	                .mapToDouble(item -> item.getBook().getBookPrice() * item.getQuantity())
	                .sum();
	        cart.setTotalPrice(total);
	    }
	 
	 public Cart removeItemFromCart(Long userId, Long cartItemId) {
	        Users user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
	        Cart cart = cartRepository.findByUser(user);

	        if (cart != null) {
	            cart.getItems().removeIf(item -> item.getId().equals(cartItemId));
	            updateTotalPrice(cart);
	            cartRepository.save(cart);
	        }

	        return cart;
	    }
	 
	 public void removeAllCartItemsForUser(Long userId) {
	        Cart cart = cartRepository.findByUserUserId(userId);
	        if (cart != null) {
	            cart.getItems().clear();
	            cart.setTotalPrice(0);
	            cart.setCoupon(null);
	            cartRepository.save(cart);
	        }
	    }
	 
	 public Cart applyCoupon(Long userId, String couponCode) {
		 Users user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
		 Coupon coupon =couponRepository.findByCouponCode(couponCode).orElseThrow(()-> new ValidationException("Coupon Not found."));
		 
		 if (couponIsExpired(coupon)) {
			 throw new ValidationException("coupon has expired");
			 
		 }
		  Cart cart = cartRepository.findByUser(user);
		    
		    if (cart == null || cart.getItems().isEmpty()) {
		        throw new ValidationException("Cart is empty or not found.");
		    }
		  
		    if (cart.getCoupon() != null) {
		        throw new ValidationException("A coupon is already applied.");
		    }
		    
		    if (!isConditionMet(cart, coupon, user)) {
		        throw new ValidationException("Condition for applying this coupon is not met.");
		    }
		    
		    cart.setCoupon(coupon);
//		    cart.setCouponId(coupon.getCouponId());
		
		    Long discount = coupon.getCouponDiscount();  
		    double totalPrice = cart.getTotalPrice();
		    double discountedPrice = totalPrice - (totalPrice * (discount / 100.0)); 	    
		    
		    cart.setTotalPrice(discountedPrice);
		    cartRepository.save(cart);
		    
		    return cart;
	 }
	 
	 
	 private Boolean couponIsExpired(Coupon coupon) {
		 LocalDate currentdate= LocalDate.now();
		 LocalDate expirationDate = coupon.getCouponExpirationDate();
		 return expirationDate != null && currentdate.isAfter(expirationDate);
	 }
	 
	 public boolean isCouponApplied(Long userId) {		  
		    Cart cart = cartRepository.findByUserUserId(userId);
		    return cart != null && cart.getCoupon() != null; 
		}
	 

	 
	 public Cart removeCoupon(Long userId) {
		    Users user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
		    Cart cart = cartRepository.findByUser(user);

		    if (cart == null || cart.getCoupon() == null) {
		        throw new ValidationException("No coupon applied to remove.");
		    }

		  
		    Long discount = cart.getCoupon().getCouponDiscount();
		    double originalPrice = cart.getTotalPrice() * (100.0 / (100.0 - discount)); 
		    cart.setCoupon(null); 
		    cart.setTotalPrice(originalPrice); 
		    cartRepository.save(cart); 

		    return cart; 
		}
	 
//	  public boolean isNewUser() {
//	        // Assuming createdDate is of type LocalDate
//	        return createdDate != null && createdDate.isAfter(LocalDate.now().minusDays(30));
//	    }

	 private boolean isConditionMet(Cart cart, Coupon coupon, Users user) {
		 
		 String conditionType = coupon.getConditionType();
		    String conditionValue = coupon.getConditionValue();
		    
		    System.out.println("Condition Type: " + conditionType);
		    System.out.println("Condition Value: " + conditionValue);
		    System.out.println("Cart Total Price: " + cart.getTotalPrice());
		    
		    switch (conditionType) {
	        case "MIN_CART_TOTAL":
	            if (conditionValue == null || conditionValue.isEmpty()) {
	                throw new ValidationException("Coupon condition value is not set or invalid.");
	            }
	            double minCartTotal = Double.parseDouble(conditionValue);
	            return Double.compare(cart.getTotalPrice(), minCartTotal) >= 0;
	            
	        default:
	            System.out.println("Unknown coupon condition type: " + conditionType);
	            return false;
	    }
		    
//		    switch (coupon.getConditionType()) {
//		        case "MIN_CART_TOTAL":
//		            // Check if the cart's total price meets the minimum cart total condition
//		            return cart.getTotalPrice() >= Double.parseDouble(coupon.getConditionValue());
////		        case "CATEGORY":
////		            // Check if any items in the cart belong to the specified category
////		            return cart.getItems().stream()
////		                       .anyMatch(item -> item.getBookCategory().equals(coupon.getConditionValue()));
////		        case "NEW_USER":
////		            // Check if the user is a new user (you may have a flag or a method for this)
////		            return user.isNewUser(); // Ensure the Users class has the isNewUser method
////		        case "SALE":
////		            // Check if a sale condition applies; you may need to implement this logic
////		            return cart.isSaleApplicable(); // Ensure the Cart class has this method
//		        // Add more cases as necessary
//		        default:
//		            return false; // Deny coupon if the condition type is unknown
//		    }
	 }

	 
	



}
