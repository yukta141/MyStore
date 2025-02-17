package com.cybage.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CartItemDTO {
	    private Long id;
	    private Long bookId;
	    private int quantity;
}
