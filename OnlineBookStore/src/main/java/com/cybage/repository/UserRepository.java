package com.cybage.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cybage.model.Users;
import java.util.List;



@Repository
public interface UserRepository extends JpaRepository<Users, Long> {
	
	Users findByUserId(long userId);
	Users findByuserEmail(String userEmail);
	long countByUserRole(String userRole);
	boolean existsByuserEmail(String userEmail);


}
