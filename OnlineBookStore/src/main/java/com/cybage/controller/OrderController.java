package com.cybage.controller;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.cybage.DTO.CategoryDTO;
import com.cybage.DTO.OrderDTO;
import com.cybage.model.Orders;
import com.cybage.service.OrderService;

@RestController
@CrossOrigin(origins="http://localhost:4200")
@RequestMapping("/")
public class OrderController {
	
	@Autowired
	private OrderService orderService;
	
	@PostMapping("/submitOrder/{userId}")
    public ResponseEntity<OrderDTO> submitOrder(@RequestBody List<OrderDTO> orderDTOList, @PathVariable int userId) {
		 orderDTOList.forEach(orderDTO -> System.out.println("Quantity: " + orderDTO.getQuantity()));
        OrderDTO submittedOrder = orderService.submitOrder(orderDTOList, userId);
        if (submittedOrder != null) {
            return new ResponseEntity<>(submittedOrder, HttpStatus.CREATED);
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
	
	@GetMapping("/getorder/{userId}")
    public ResponseEntity<List<OrderDTO>> getAllOrdersByUserId(@PathVariable int userId) {
        List<OrderDTO> orders = orderService.getAllOrdersByUserId(userId);
        if (!orders.isEmpty()) {
            return new ResponseEntity<>(orders, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    
    @GetMapping("getAllOrders")
	public ResponseEntity<List<OrderDTO>> getAllOrders() {
		
		return new ResponseEntity<List<OrderDTO>>(orderService.getAllOrders(), HttpStatus.OK);
	}
	
    @GetMapping(path="orderCount")
    public long getCount() {
        return orderService.getOrdersCount();
    }
    
    @GetMapping("/topSale-categories")
    public ResponseEntity<List<CategoryDTO>> getTopSellingCategories() {
        List<CategoryDTO> topSellingCategories = orderService.getTopSellingCategories();
        return ResponseEntity.ok(topSellingCategories);
    }
    
    @PutMapping(path="updateStatus/{orderId}")
    public Orders updateOrderStatus(@PathVariable Long orderId,
                                   @RequestParam String status ) {
        return orderService.updateOrderStatus(orderId, status);
    }
    
    @GetMapping(path="sellerOrders/{sellerId}")
    public ResponseEntity<List<Orders>> getAllOrdersForSeller(@PathVariable long sellerId){
    	List<Orders> orders = orderService.getOrdersForSeller(sellerId);
    	return ResponseEntity.ok(orders);
    }
    
    @GetMapping("/countOrderBySeller/{sellerId}")
    public ResponseEntity<Long> countOrdersBySellerBooks(@PathVariable long sellerId) {
        long orderCount = orderService.countOrdersBySellerBooks(sellerId);
        return ResponseEntity.ok(orderCount);
    }
    
//    @GetMapping("/by-seller")
//    public ResponseEntity<List<Map<String, Object>>> getOrdersBySeller() {
//        return ResponseEntity.ok(orderService.getOrdersBySeller());
//    }
    
    @GetMapping("/OrdersBySellerName")
    public ResponseEntity<List<Map<String, Object>>> getOrdersBySeller() {
   
        List<Map<String, Object>> orders = orderService.getOrdersBySeller();
        return ResponseEntity.ok(orders); 
    }

}
