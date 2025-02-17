package com.cybage.DTO;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CartDTO {
    private Long id;
    private Long userId;
    private List<CartItemDTO> items;
    private double totalPrice;

}
