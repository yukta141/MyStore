package com.cybage.DTO;

import java.time.LocalDate;
import java.time.LocalDateTime;

import com.cybage.model.Books;
import com.cybage.model.Users;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderDTO {
	
	private long orderId;
	private int groupId;
	private int userId;
	private String userEmail;
	private String userName;
	private Users user ;
	private Books book;
	private long bookId;
	private String bookName;
	private String bookDescription;
	private String bookCategory;
	private String orderStatus;
	private LocalDate placedDate;
	private LocalDate estimatedDeliveryDate;
	private int quantity;
	

}
