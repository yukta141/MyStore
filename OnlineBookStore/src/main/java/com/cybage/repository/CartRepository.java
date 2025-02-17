package com.cybage.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cybage.model.Cart;
import com.cybage.model.Users;

@Repository
public interface CartRepository extends JpaRepository<Cart, Long>{
	Cart findByUser(Users user);
	void deleteByUserUserId(int userId);
	  Cart findByUserUserId(Long userId);
}
