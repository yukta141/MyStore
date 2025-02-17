package com.cybage.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.cybage.DTO.BookDTO;
import com.cybage.service.BookDetailService;

@RestController
@CrossOrigin(origins="http://localhost:4200")
@RequestMapping("/")
public class BookDetailController {
	
	@Autowired
	private BookDetailService bookDetailService;
	
	 @GetMapping("/showBookbyId")
	    public ResponseEntity<BookDTO> showBookById(@RequestParam("bid") long bid) {
		 BookDTO books = bookDetailService.getBookDetails(bid);
	        return new ResponseEntity<>(books, HttpStatus.OK);
	    }
	 
	 @GetMapping("series/{id}")
	    public ResponseEntity<BookDTO> getBookSeriesDetails(@PathVariable("id") long bookId) {
	        BookDTO bookDTO = bookDetailService.getSeriesDetails(bookId);
	        return ResponseEntity.ok(bookDTO);
	    }

}
