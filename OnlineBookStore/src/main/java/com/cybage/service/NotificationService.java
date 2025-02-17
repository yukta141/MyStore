package com.cybage.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.cybage.DTO.NotificationDTO;
import com.cybage.model.Books;
import com.cybage.model.Notification;
import com.cybage.model.Orders;
import com.cybage.model.Users;
import com.cybage.repository.BookCardsRepository;
import com.cybage.repository.NotificationRepository;
import com.cybage.repository.SubscriptionRepository;
import com.cybage.repository.UserRepository;

@Service
public class NotificationService {
	
	@Autowired
    private NotificationRepository notificationRepository;
	
	@Autowired
	private UserRepository userRepository;

	@Autowired
    private BookCardsRepository booksRepository;
	
	@Autowired
	private SubscriptionRepository subscriptionRepository;

	   public void createNotificationsForNewBook(Long bookId) {
	        List<Users> subscribedUsers = getSubscribedUsers(bookId);

	        if (subscribedUsers != null && !subscribedUsers.isEmpty()) {
	            Books book = getBookById(bookId);
	            if (book != null) {
	                for (Users user : subscribedUsers) {
	                    Notification notification = new Notification();
	                    notification.setBooks(book);
	                    notification.setUsers(user);
	                    notification.setStatus("unseen"); 
	                    notificationRepository.save(notification);
	                }
	            } else {
	                System.out.println("Book not found with ID: " + bookId);
	            }
	        } else {
	            System.out.println("No users are subscribed to this series.");
	        }
	    }

	   
	   public List<NotificationDTO> getNotificationsForUser(Long userId) {
		    List<Notification> notifications = notificationRepository.findByUsersUserIdAndStatus(userId, "Unseen");

		    return notifications.stream().map(notification -> {
		        NotificationDTO dto = new NotificationDTO();
		        if (notification.getMessage() == null ) {
		        
		            dto.setMessage(notification.getBooks().getBookName() + " has been added to the series "+ notification.getBooks().getBookSeries()+".");
		            dto.setBookName(notification.getBooks().getBookName()); 
		        } else {
		          
		            dto.setMessage(notification.getMessage()); 
		        }

		        dto.setNotificationId(notification.getNotificationId());
		        dto.setStatus(notification.getStatus());
		        dto.setUserId(notification.getUsers().getUserId());

		        return dto;
		    }).collect(Collectors.toList());
		}



	    
	    private NotificationDTO convertToDTO(Notification notification) {
	        NotificationDTO dto = new NotificationDTO();
	        dto.setNotificationId(notification.getNotificationId());
	        dto.setUserId(notification.getUsers().getUserId());
	        dto.setBookId(notification.getBooks().getBookId());
	        dto.setBookName(notification.getBooks().getBookName());
	        dto.setMessage("New book added to series: " + notification.getBooks().getBookSeries());
	        dto.setBookSeries(notification.getBooks().getBookSeries());
	        dto.setStatus(notification.getStatus());
	        return dto;
	    }

	   
	    private List<Users> getSubscribedUsers(Long bookId) {
	        Books book = getBookById(bookId);
	        if (book != null && book.getBookSeries() != null) {
	            return subscriptionRepository.findUsersByBookSeries(book.getBookSeries());
	        }
	        return new ArrayList<>(); 
	    }

	   
	    private Books getBookById(Long bookId) {
	        return booksRepository.findById(bookId).orElse(null);
	    }
	    
	    public boolean markNotificationAsSeen(Long notificationId) {
	        Optional<Notification> optionalNotification = notificationRepository.findById(notificationId);
	        if (optionalNotification.isPresent()) {
	            Notification notification = optionalNotification.get();
	            notification.setStatus("seen");
	            notificationRepository.save(notification);
	            return true;
	        } else {
	            return false;
	        }
	    }
	    
	    
	    public void createOrderNotification(Users user, Orders order, Books books, String newStatus) {
	        Notification notification = new Notification();
	        notification.setUsers(user);
	        notification.setOrders(order);
	        notification.setBooks(books);
	        notification.setMessage("Your order no. #" + order.getOrderId() +" placed on " +order.getPlacedDate() +" for book "+order.getBook().getBookName()+ " has been " + newStatus + ".");
	        notification.setStatus("Unseen");
	        
	        Notification savedNotification = notificationRepository.save(notification);
	        
	        if (savedNotification != null) {
	            System.out.println("Order notification created for user: " + user.getUserId() + " and order: " + order.getOrderId());
	        } else {
	            System.out.println("Failed to create notification for order: " + order.getOrderId());
	        }
	    }



	    public List<Notification> getOrderNotificationsForUser(Long userId) {
	        return notificationRepository.findByUsersUserId(userId);
	    }
	    
	    
}
