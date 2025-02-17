package com.cybage.service;

import java.time.LocalDate;
import java.time.YearMonth;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cybage.DTO.MonthlyRevenueDTO;
import com.cybage.model.Books;
import com.cybage.model.Orders;
import com.cybage.model.Revenue;
import com.cybage.repository.OrderRepository;
import com.cybage.repository.RevenueRepository;

@Service
public class RevenueService {
	
	@Autowired
	private OrderRepository orderRepository;
	
	@Autowired
	private RevenueRepository revenueRepository;

	
	public double calculateMonthlyRevenue(int month, int year) {
			
		  LocalDate startDate = LocalDate.of(year, month, 1);
		  LocalDate endDate = startDate.plusMonths(1).minusDays(1);

		  List<Orders> orders = orderRepository.findByPlacedDateBetween(startDate, endDate);	
		  Set<Integer> uniqueGroupIds = new HashSet<>();
	    
	    return orders.stream()
	                 .filter(order -> uniqueGroupIds.add(order.getGroupId()))
	                 .mapToDouble(Orders::getTotalAmount)
	                 .sum();
	}
	
//	 public double calculateMonthlyRevenueForSeller(Long userId, int month, int year) {
//	        LocalDate startDate = LocalDate.of(year, month, 1);
//	        LocalDate endDate = startDate.plusMonths(1).minusDays(1);
//
//	        List<Orders> orders = orderRepository.findByUserAndPlacedDateBetween(userId, startDate, endDate);
//	        
//	        //groupid
//	        Set<Integer> uniqueGroupIds = new HashSet<>();
//	        return orders.stream()
//	                     .filter(order -> uniqueGroupIds.add(order.getGroupId()))
//	                     .mapToDouble(Orders::getTotalAmount)
//	                     .sum();
//	    }
	
	public double calculateMonthlyRevenueForSeller(Long userId, int month, int year) {
	    LocalDate startDate = LocalDate.of(year, month, 1);
	    LocalDate endDate = startDate.plusMonths(1).minusDays(1);

	    List<Orders> orders = orderRepository.findByUserAndPlacedDateBetween(userId, startDate, endDate);

	    Set<Integer> uniqueGroupIds = new HashSet<>();

	    return orders.stream()
                .filter(order -> {
                    Books book = order.getBook();
                    return book.getUser() != null && book.getUser().getUserId() == userId;
                })
                .filter(order -> uniqueGroupIds.add(order.getGroupId())) 
                .mapToDouble(order -> order.getBook().getBookPrice()) 
                .sum();
	}


	 
	 public void calculateAndSaveMonthlyRevenue() {
		    List<Object[]> monthlyRevenues = orderRepository.calculateMonthlyRevenue(); 
		    for (Object[] result : monthlyRevenues) {
		        int month = (int) result[0]; 
		        double totalRevenue = ((Number) result[1]).doubleValue(); 

		        YearMonth yearMonth = YearMonth.of(LocalDate.now().getYear(), month);
		        LocalDate firstDayOfMonth = yearMonth.atDay(1);

		        List<Orders> orders = orderRepository.findOrdersByMonthAndYear(month, LocalDate.now().getYear());

		        Set<Integer> uniqueGroupIds = new HashSet<>();
		        double filteredRevenue = orders.stream()
		                .filter(order -> uniqueGroupIds.add(order.getGroupId())) 
		                .mapToDouble(Orders::getTotalAmount)
		                .sum(); 

		       
		        Revenue revenue = revenueRepository.findByMonth(firstDayOfMonth)
		                .orElse(new Revenue());

		        revenue.setMonth(firstDayOfMonth);
		        revenue.setRevenue(filteredRevenue); 

		        revenueRepository.save(revenue);
		    }
		}
	 
	 public List<Map<String, Object>> getMonthlyRevenueForChart() {
	        List<Object[]> results = revenueRepository.getMonthlyRevenue();

	        return results.stream().map(row -> {
	            Map<String, Object> data = new HashMap<>();
	            data.put("month", row[0].toString());  
	            data.put("revenue", row[1]);          
	            return data;
	        }).collect(Collectors.toList());
	    }
	 

	 
}
