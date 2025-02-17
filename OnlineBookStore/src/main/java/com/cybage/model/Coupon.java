package com.cybage.model;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name="coupon")
public class Coupon {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long couponId;
	
	private String couponName;
	private String couponCode;
	private long couponDiscount;
	private String couponDescription;
	private LocalDate couponExpirationDate;
	
	private String conditionType; 
	private String conditionValue;
}
