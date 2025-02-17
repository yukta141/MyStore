package com.cybage.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cybage.DTO.BookDTO;
import com.cybage.model.Books;
import com.cybage.service.BookCardsService;

@RestController
@CrossOrigin(origins="http://localhost:4200")
@RequestMapping("/")
public class BookCardsController {
	
	@Autowired
	private BookCardsService bookCardsService;

	
	@GetMapping("/getAllCards/{bookCategory}")
	public ResponseEntity<List<BookDTO>> getAllCards(@PathVariable String bookCategory) {
	    List<BookDTO> books = bookCardsService.showCardDetails(bookCategory);
	    return new ResponseEntity<>(books, HttpStatus.OK);
	}
	
	@GetMapping(path="/getSeries")
    public List<Books> getBooksWithSeries() {
        return bookCardsService.getBookSeries();
    }
	

}
