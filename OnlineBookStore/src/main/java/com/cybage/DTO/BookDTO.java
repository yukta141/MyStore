package com.cybage.DTO;


import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BookDTO {
	
	private long bookId;
	private String bookName;
	private String bookAuthorName;
	private String bookDescription;
	private String bookCategory;
	private float  bookPrice;
	private String bookImage;
	private String bookSeries;
	private List<BookDTO> relatedBooks;

}
