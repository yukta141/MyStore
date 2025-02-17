package com.cybage.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cybage.model.Users;

@Repository
public interface AdminRepository extends JpaRepository<Users, Integer> {
	List<Users> findByUserRole(String userRole);

}
