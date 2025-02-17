package com.cybage.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cybage.DTO.CategoryDTO;
import com.cybage.DTO.OrderDTO;
import com.cybage.enums.OrderStatus;
import com.cybage.model.Books;
import com.cybage.model.Cart;
import com.cybage.model.Orders;
import com.cybage.model.Users;
import com.cybage.repository.BookCardsRepository;
import com.cybage.repository.CartRepository;
import com.cybage.repository.OrderRepository;
import com.cybage.repository.UserRepository;

@Service
public class OrderService {

	@Autowired
	private OrderRepository orderRepository;
	@Autowired
	private ModelMapper modelMapper;
	@Autowired
	private UserRepository userRepository;
	@Autowired
	private BookCardsRepository bookRepository;
	@Autowired
	private NotificationService notificationService;
	@Autowired
	private CartRepository cartRepository;

	
	public OrderDTO submitOrder(List<OrderDTO> orderDTOList, int userId) {
	    Users user = userRepository.findByUserId(userId);
	    if (user != null && orderDTOList != null && !orderDTOList.isEmpty()) {
	        List<Orders> orders = new ArrayList<>();
	        
	        Cart cart = cartRepository.findByUserUserId((long) userId);
	        if (cart == null || cart.getItems().isEmpty()) {
	            throw new IllegalArgumentException("Cart is empty or not found.");
	        }

	      
	        double cartTotalPrice = cart.getTotalPrice();

	        for (OrderDTO orderDTO : orderDTOList) {
	            Orders order = new Orders();
	            Books book = bookRepository.findById(orderDTO.getBookId()).orElse(null);
	            if (book == null) {
	                throw new IllegalArgumentException("Invalid book ID: " + orderDTO.getBookId());
	            }
	            order.setUser(user);
	            order.setBook(book);
	            order.setGroupId(orderDTO.getGroupId());
	            order.setOrderStatus("PLACED");
	            order.setPlacedDate(LocalDate.now());
	            order.setEstimatedDeliveryDate(order.getPlacedDate().plusDays(5));
	            
//	            order.setTotalAmount(book.getBookPrice() * orderDTO.getQuantity());
//	            
//	            double totalAmount = book.getBookPrice() * orderDTO.getQuantity();
//	            System.out.println(book.getBookPrice());
//	            System.out.println(orderDTO.getQuantity());
//	            order.setTotalAmount(totalAmount);
	            
	            order.setTotalAmount(cartTotalPrice);

	            orders.add(order);
	        }
	        orders = orderRepository.saveAll(orders);
	        return modelMapper.map(orders.get(0), OrderDTO.class);
	    }
	    return null;
	}

	
	public List<OrderDTO> getAllOrdersByUserId(int userId) {
		List<Orders> orders = orderRepository.findByUserUserId(userId);
		return orders.stream().map(order -> modelMapper.map(order, OrderDTO.class)).collect(Collectors.toList());
	}

	public List<OrderDTO> getAllOrders() {

		return orderRepository.findAll().stream().map(order -> modelMapper.map(order, OrderDTO.class))
				.collect(Collectors.toList());
	}

	public long getOrdersCount() {
		return orderRepository.count();
	}
	
	 public List<CategoryDTO> getTopSellingCategories() {
	        return orderRepository.findTopSellingCategories();
	    }
 

	 public Orders updateOrderStatus(Long orderId, String newStatus) {
		    Orders order = orderRepository.findById(orderId)
		        .orElseThrow(() -> new RuntimeException("Order not found"));
		    
		    order.setOrderStatus(newStatus);
		    System.out.println("Order status updated. Creating notification...");

		    if (order.getUser() != null) {
		        notificationService.createOrderNotification(order.getUser(), order,order.getBook(), newStatus);
		    } else {
		        System.out.println("User not found for order: " + orderId);
		    }

		    return orderRepository.save(order);
		}


	 public List<Orders> getOrdersForSeller(long sellerId){
		 return orderRepository.findByBookUserUserId(sellerId);
	 }
	 
	 public long countOrdersBySellerBooks(long sellerId) {
	        return orderRepository.countByBook_User_UserId(sellerId);
	    }
	 
	 public List<Map<String, Object>> getOrdersBySeller() {
	        List<Object[]> results = orderRepository.getOrdersBySeller();
	        List<Map<String, Object>> sellerOrders = new ArrayList<>();

	        for (Object[] result : results) {
	            Map<String, Object> data = new HashMap<>();
	            data.put("sellerName", result[0]);
	            data.put("orderCount", result[1]);
	            sellerOrders.add(data);
	        }

	        return sellerOrders;
	    }
	 
	 
}
