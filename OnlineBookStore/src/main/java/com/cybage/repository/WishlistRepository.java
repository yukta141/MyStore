package com.cybage.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cybage.model.Users;
import com.cybage.model.Wishlist;

@Repository
public interface WishlistRepository extends JpaRepository<Wishlist, Long>{
	Wishlist findByUser(Users user);
}
