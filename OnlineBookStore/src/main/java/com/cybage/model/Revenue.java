package com.cybage.model;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name="revenue")
public class Revenue {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int revenueId;
	private LocalDate month;
	private double revenue;
}
