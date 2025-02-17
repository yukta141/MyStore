package com.cybage.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cybage.model.CartItem;

@Repository
public interface CartItemRepository extends JpaRepository<CartItem, Long> {
	
}
