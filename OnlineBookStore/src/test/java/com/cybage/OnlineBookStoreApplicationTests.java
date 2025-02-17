package com.cybage;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.modelmapper.ModelMapper;
import org.springframework.boot.test.context.SpringBootTest;
import static org.mockito.Mockito.when;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.times;
import static org.junit.jupiter.api.Assertions.*;

import com.cybage.DTO.CategoryDTO;
import com.cybage.DTO.UserDTO;
import com.cybage.model.Category;
import com.cybage.model.Orders;
import com.cybage.model.Users;
import com.cybage.repository.CategoryRepository;
import com.cybage.repository.OrderRepository;
import com.cybage.repository.UserRepository;
import com.cybage.service.CategoryService;
import com.cybage.service.RevenueService;
import com.cybage.service.UserService;

@SpringBootTest
class OnlineBookStoreApplicationTests {
	
	 @InjectMocks
	    private RevenueService revenueService; 

	    @Mock
	    private OrderRepository orderRepository;

	    @BeforeEach
	    public void setUp() {
	        MockitoAnnotations.openMocks(this); 
	    }
	    
	    
		@Test
		void contextLoads() {
		}

	    @Test
	    public void testCalculateMonthlyRevenue() {
	        int month = 12; 
	        int year = 2023;

	        LocalDate startDate = LocalDate.of(year, month, 1);
	        LocalDate endDate = startDate.plusMonths(1).minusDays(1);

	        Orders order1 = new Orders();
	        order1.setGroupId(1);
	        order1.setTotalAmount(100.0);

	        Orders order2 = new Orders();
	        order2.setGroupId(2);
	        order2.setTotalAmount(150.0);

	        Orders duplicateOrder = new Orders();
	        duplicateOrder.setGroupId(1);
	        duplicateOrder.setTotalAmount(200.0); 

	        List<Orders> orders = Arrays.asList(order1, order2, duplicateOrder);

	        when(orderRepository.findByPlacedDateBetween(startDate, endDate)).thenReturn(orders);

	        double revenue = revenueService.calculateMonthlyRevenue(month, year);

	        assertEquals(250.0, revenue); // Only unique group ID
	    }
	    
	    @Test
	    public void testCalculateMonthlyRevenue_NoOrders() {
	        int month = 1; 
	        int year = 2024;

	        LocalDate startDate = LocalDate.of(year, month, 1);
	        LocalDate endDate = startDate.plusMonths(1).minusDays(1);

	        when(orderRepository.findByPlacedDateBetween(startDate, endDate)).thenReturn(Collections.emptyList());

	        double revenue = revenueService.calculateMonthlyRevenue(month, year);

	        assertEquals(0.0, revenue);
	    }

	
//	
	

  

}
