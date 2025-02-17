package com.cybage.service;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.cybage.DTO.UserDTO;
import com.cybage.enums.UserRole;
import com.cybage.model.Users;
import com.cybage.repository.UserRepository;

@Service
public class UserService {

	@Autowired
	private UserRepository userRepository;
	
	@Autowired
    private ModelMapper modelMapper;
	
	@Autowired
	private BCryptPasswordEncoder passwordEncoder;
	
	// User Register
		public UserDTO registerUser(UserDTO usersDto) {
			  if (usersDto == null) {
		            throw new IllegalArgumentException("User details cannot be null");
		        }
		        String encryptedPassword = passwordEncoder.encode(usersDto.getUserPassword());
		        Users user = modelMapper.map(usersDto, Users.class);
		        user.setUserPassword(encryptedPassword);
//		        user.setUserRole(UserRole.USER);
		        userRepository.save(user);
		        return modelMapper.map(user, UserDTO.class);
		}
		
		
		public boolean isEmailExist(String userEmail) {
			
			return userRepository.existsByuserEmail(userEmail);
		}
		
		
		public Users findByEmail(String email)
		{
			return userRepository.findByuserEmail(email);
		}
		
		public UserDTO userLogin(String userEmail) {
	        Users user = userRepository.findByuserEmail(userEmail);
	        return user != null ? modelMapper.map(user, UserDTO.class):null;
	    }
		
		
		public void updatePassword(String userEmail, String newPassword) {
	        Users user = userRepository.findByuserEmail(userEmail);
	        
	        if (user != null) {
	        	 String encryptedPassword = passwordEncoder.encode(newPassword);
	             user.setUserPassword(encryptedPassword);
	             userRepository.save(user);
	        } else {
	            throw new IllegalArgumentException("User not found for email: " + userEmail);
	        }
	    }
		
		 public UserDTO getUserProfileById(int userId) {
			    Users user = userRepository.findByUserId(userId);
			    if (user != null) {
			        return modelMapper.map(user, UserDTO.class);
			    } else {
			        return null; 
			    }
			}
		 
		 
		 public Users updateUserDetails(int userId, UserDTO userDto) {
		        Users oldUser = userRepository.findByUserId(userId);
		        if (oldUser != null) {
		            if (userDto.getUserName() != null) 
		                oldUser.setUserName(userDto.getUserName());
		            if (userDto.getUserContactNumber() != null) 
		                oldUser.setUserContactNumber(userDto.getUserContactNumber());

		            return userRepository.save(oldUser);
		        } else {
		            return null;
		        }
		    }
		
		
		public UserDTO blockUser(int userId) {
	        Users user = userRepository.findByUserId(userId);
	        if (user == null) {
	            throw new RuntimeException("User not found with id: " + userId);
	        }
	        user.setBlocked(true);
	        userRepository.save(user);
	        return modelMapper.map(user, UserDTO.class);
	    }

	    public UserDTO unblockUser(int userId) {
	        Users user = userRepository.findByUserId(userId);
	        if (user == null) {
	            throw new RuntimeException("User not found with id: " + userId);
	        }
	        user.setBlocked(false);
	        userRepository.save(user);
	        return modelMapper.map(user, UserDTO.class);
	    }
		
}
