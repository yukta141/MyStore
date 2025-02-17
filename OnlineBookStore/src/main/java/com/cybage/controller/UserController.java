package com.cybage.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.cybage.DTO.UserDTO;
import com.cybage.enums.UserRole;
import com.cybage.model.Users;
import com.cybage.service.UserService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
@CrossOrigin(origins="http://localhost:4200")
public class UserController {
	
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private BCryptPasswordEncoder passwordEncoder;
	
	@PostMapping(path="register/{userRole}")
	public ResponseEntity<?> registerUser(@RequestBody UserDTO userDto,@PathVariable String userRole) {
	    if (userService.isEmailExist(userDto.getUserEmail())) {
	    	 Map<String, String> response = new HashMap<>();
	         response.put("errorMessage", "Email address already exists. Please try with a different email.");
	         return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
	    } else {
	    	userDto.setUserRole(userRole);
	        UserDTO registeredUser = userService.registerUser(userDto);
	        return ResponseEntity.status(HttpStatus.CREATED).body(registeredUser);
	    }
	}
	
	
	 @PostMapping(path="userlogin")
	    public ResponseEntity<?> userLogin(@RequestBody UserDTO userDto) {
		 try 
		 {
//			 if (userDto.getUserEmail().equals("admin@gmail.com") && userDto.getUserPassword().equals("Admin@123")) 
			 if(userDto.getUserRole().equals("SELLER"))
			 {
			 }
			 if(!userService.isEmailExist(userDto.getUserEmail())) {
				 return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid Email or Password");
			 }
			 UserDTO user=userService.userLogin(userDto.getUserEmail());
			 if(!passwordEncoder.matches(userDto.getUserPassword(), user.getUserPassword()))
			 {
				 return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid Email or Password");
			 }
			 return new ResponseEntity<UserDTO>(user,HttpStatus.OK);
		 }
		 catch (Exception e) {
			return  ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An Error occured");
		}
	    }
	 
	 //update Password
	    @PutMapping(path="updatepassword")
	    public ResponseEntity<String> setNewPassword(@RequestParam String userEmail, @RequestParam String newPassword) throws JsonProcessingException {
	    	userService.updatePassword(userEmail, newPassword);
	        Map<String, String> response=new HashMap<>();
	        response.put("message", "password OK");
	        ObjectMapper objectMapper=new ObjectMapper();
	        String responseBody=objectMapper.writeValueAsString(response);
	        return new ResponseEntity<String>(responseBody, HttpStatus.OK);
	    }
	    
	    @PutMapping(path="updateProfile/{userId}")
		public ResponseEntity<Users> updateUserDetails(@PathVariable int userId,@RequestBody UserDTO userDto){
			
			return new ResponseEntity<Users>(userService.updateUserDetails(userId,userDto),HttpStatus.OK);
		}
	    
	    @GetMapping(path="/profile/{userId}")
		public ResponseEntity<UserDTO> getUserProfileDetails(@PathVariable int userId) {	
			return new ResponseEntity<UserDTO>(userService.getUserProfileById(userId),HttpStatus.OK);
		}
	    
	    @PutMapping("/blockUser/{userId}")
	    public ResponseEntity<Void> blockUser(@PathVariable int userId) {
	    	userService.blockUser(userId);
	        return new ResponseEntity<>(HttpStatus.OK);
	    }

	    @PutMapping("/unblockUser/{userId}")
	    public ResponseEntity<Void> unblockUser(@PathVariable int userId) {
	    	userService.unblockUser(userId);
	        return new ResponseEntity<>(HttpStatus.OK);
	    }
	    
	    

}
