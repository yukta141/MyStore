package com.cybage.DTO;

import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class NotificationDTO {
	private long notificationId;
	private long userId;
	private long bookId;
	private String bookName;
	private String message;
	private String bookSeries;
    private String status;

}
