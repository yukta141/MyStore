package com.cybage.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cybage.model.Books;
import com.cybage.service.BookSearchService;

@RestController
@RequestMapping("/")
@CrossOrigin(origins="http://localhost:4200")
public class BookSearchController {
	
	@Autowired
	private BookSearchService bookSearchService;
	
	 @GetMapping("/search/{bookname}")
	    public List<Books> searchBooks(@PathVariable("bookname") String bookName) {
	        return bookSearchService.searchBooksByName(bookName);
	    }

}
