package com.cybage.model;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import com.cybage.enums.OrderStatus;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name="orders")
public class Orders {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long orderId;
	private int groupId;
	
	@ManyToOne
	@JoinColumn(name="userId")	
	private Users user;
	
	
	@ManyToOne
    @JoinColumn(name="bookId")
    @JsonIgnore
    private Books book;
	private String orderStatus;
	private LocalDate placedDate;
	private LocalDate estimatedDeliveryDate;
	private double totalAmount;
	
	 @OneToMany(mappedBy = "orders", cascade = CascadeType.ALL)
	 @JsonIgnore
	 private List<Notification> notification;

}
