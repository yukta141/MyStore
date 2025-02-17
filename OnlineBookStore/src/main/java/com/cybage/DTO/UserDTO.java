package com.cybage.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDTO {

	private long userId;
	private String userName;
	private String userEmail;
	private String userContactNumber;	
	private String userPassword;
	private String userAddress;
	private String userRole;
	private boolean blocked=false;
}
