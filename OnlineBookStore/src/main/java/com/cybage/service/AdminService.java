package com.cybage.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cybage.model.Users;
import com.cybage.repository.AdminRepository;

@Service
public class AdminService {
	
	@Autowired
	private AdminRepository adminRepository;
	
	public List<Users> getAllSellers() {	
		return adminRepository.findByUserRole("SELLER");
	}

}
