package com.cybage.DTO;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SubscriptionDTO {
	
	 private long subscriptionId;
	 private long userId;
	 private long bookId;
	 private String bookSeries;
	 

}
