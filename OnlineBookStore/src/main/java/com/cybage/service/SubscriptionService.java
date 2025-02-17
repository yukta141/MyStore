package com.cybage.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cybage.DTO.SubscriptionDTO;
import com.cybage.model.Books;
import com.cybage.model.Subscription;
import com.cybage.model.Users;
import com.cybage.repository.BookRepository;
import com.cybage.repository.SubscriptionRepository;
import com.cybage.repository.UserRepository;

@Service
public class SubscriptionService {
	
	@Autowired
	private SubscriptionRepository subscriptionRepository;
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private BookRepository bookRepository;
	
	
	public SubscriptionDTO subscribeToSeries(SubscriptionDTO subscriptionDTO) {
        Users user = userRepository.findById(subscriptionDTO.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Books book = bookRepository.findById(subscriptionDTO.getBookId())
                .orElseThrow(() -> new RuntimeException("Book not found"));

        Subscription subscription = new Subscription();
        subscription.setUsers(user);
        subscription.setBooks(book);

        Subscription savedSubscription = subscriptionRepository.save(subscription);

        SubscriptionDTO resultDTO = new SubscriptionDTO();
        resultDTO.setSubscriptionId(savedSubscription.getSubscriptionId());
        resultDTO.setUserId(savedSubscription.getUsers().getUserId());
        resultDTO.setBookId(savedSubscription.getBooks().getBookId());
        resultDTO.setBookSeries(book.getBookSeries()); 
        
        return resultDTO;
    }
	
	 public boolean isSubscribed(Long userId, String bookSeries) {
	        return subscriptionRepository.existsByUsersUserIdAndBooksBookSeries(userId, bookSeries);
	    }
	 
	 public List<Books> getUserSubscribedSeries(Long userId) {
	        List<Subscription> subscriptions = subscriptionRepository.findByUsersUserId(userId);
	        return subscriptions.stream()
	                            .map(Subscription::getBooks)
	                            .collect(Collectors.toList());
	    }


}
