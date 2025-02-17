package com.cybage.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.cybage.DTO.BookDTO;
import com.cybage.model.Books;
import com.cybage.model.Orders;
import com.cybage.model.Users;
import com.cybage.service.BookService;

@RestController
@CrossOrigin(origins="http://localhost:4200")
public class BookController {
	
	@Autowired
	private BookService bookService;
	
	
	@PostMapping("addBook/{userId}")
	public ResponseEntity<Books> addBook(@RequestBody Books book, @PathVariable long userId) {
		
		return new ResponseEntity<Books>(bookService.addBook(book,userId), HttpStatus.CREATED);
	}
	
	@GetMapping(path="getAllBooks")
	public ResponseEntity<List<BookDTO>> getAllBooks() {
		
		return new ResponseEntity<List<BookDTO>>(bookService.getAllBooks(), HttpStatus.OK);
	}
	
	@DeleteMapping(path="deleteBook/{bookId}")
	public ResponseEntity<String> deleteBook(@PathVariable long bookId) {
		
		bookService.deleteBook(bookId);
		return new ResponseEntity<String>("Deleted Succesfully", HttpStatus.OK);
	}
	
	@GetMapping(path="getBookById/{bookId}")
	public ResponseEntity<BookDTO> getBookById(@PathVariable("bookId") long bookId) {
		BookDTO bookDTO=bookService.getBookById(bookId);
		System.out.println(bookDTO);
		return new ResponseEntity<BookDTO>(bookDTO,HttpStatus.OK);
		
	}
	
	@PutMapping(path="updateBook/{bookId}")
	public ResponseEntity<Books> updateBookDetails(@PathVariable long bookId,@RequestBody Books book){	
		return new ResponseEntity<Books>(bookService.updateBookDetails(bookId,book),HttpStatus.OK);
	}
	
	@GetMapping("bookcount")
    public ResponseEntity<Long> getBookssCount() {
        long count = bookService.getBooksCount();
        return new ResponseEntity<>(count, HttpStatus.OK);
    }
	
	@GetMapping(path="userCount")
    public ResponseEntity<Long> getUsersCount() {
        long userCount = bookService.getUsersCount();
        return new ResponseEntity<>(userCount, HttpStatus.OK);
    }
	
	@GetMapping(path="sellerCount")
    public ResponseEntity<Long> getSellerCount() {
        long userCount = bookService.getSellerCount();
        return new ResponseEntity<>(userCount, HttpStatus.OK);
    }
	
	@GetMapping("getAllUsers")
	public ResponseEntity<List<Users>> getAllUsers() {
		
		return new ResponseEntity<List<Users>>(bookService.getAllUsers(), HttpStatus.OK);
	}
	
	@GetMapping(path="getAllOrder")
	public ResponseEntity<List<Orders>> getAllOrder() {
		
		return new ResponseEntity<List<Orders>>(bookService.getAllOrders(), HttpStatus.OK);
	}
	
	 @GetMapping("/seller/{sellerId}")
	    public ResponseEntity<List<Books>> getBooksBySeller(@PathVariable Long sellerId) {
	        List<Books> books = bookService.getBooksBySeller(sellerId);
	        return ResponseEntity.ok(books);
	    }
	 
	 @GetMapping("/countBookBySeller/{userId}")
	    public ResponseEntity<Integer> countBooksBySeller(@PathVariable long userId) {
	        int count = bookService.countBooksByUserId(userId);
	        return ResponseEntity.ok(count);
	    }


}
