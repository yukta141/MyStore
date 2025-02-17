package com.cybage.service;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cybage.DTO.BookDTO;
import com.cybage.model.Books;
import com.cybage.model.Orders;
import com.cybage.model.Users;
import com.cybage.repository.BookRepository;
import com.cybage.repository.OrderRepository;
import com.cybage.repository.UserRepository;

@Service
public class BookService {
	
	@Autowired
	private BookRepository bookRepository;

	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private ModelMapper modelMapper;
	
	@Autowired
	private OrderRepository orderRepository;
	
	
public Books addBook(Books book, long userId) {
	
	Users user = userRepository.findByUserId(userId);
			if (user == null) {
		        throw new RuntimeException("User not found with ID: " + userId);
		    }

	  book.setUser(user);
		
		return bookRepository.save(book);
	}
	
	public List<BookDTO> getAllBooks() {
		
		return bookRepository.findAll().stream().map(book->modelMapper
				.map(book,BookDTO.class)).collect(Collectors.toList());
	}
	
	public void deleteBook(long bookId)
	{
		bookRepository.deleteById(bookId);
	}
	
	public BookDTO getBookById(long bookId) {
		Books book=bookRepository.findByBookId(bookId);
		
		return modelMapper.map(book,BookDTO.class) ;	
	}
	
	
	public Books updateBookDetails(long bookId,Books book) {
		Books oldBook= bookRepository.findById(bookId).get();
		
		if(book.getBookName()!=null) 
			oldBook.setBookName(book.getBookName());
		
		if(book.getBookDescription()!=null) 
			oldBook.setBookDescription(book.getBookDescription());
		
		if(book.getBookAuthorName()!=null) 
			oldBook.setBookAuthorName(book.getBookAuthorName());
		
		if(book.getBookCategory()!=null) 
			oldBook.setBookCategory(book.getBookCategory());
		
		if(book.getBookPrice()!=0) 
			oldBook.setBookPrice(book.getBookPrice());
		
		if(book.getBookImage()!=null) 
			oldBook.setBookImage(book.getBookImage());
		
		
		return bookRepository.save(oldBook);
	}
	
	public long getBooksCount() {
		return bookRepository.count();
	}
	
	public long getUsersCount() {
		return userRepository.countByUserRole("USER");
	}
	
	public long getSellerCount() {
		return userRepository.countByUserRole("SELLER");
	}
	
	public List<Users> getAllUsers() {	
		return userRepository.findAll();
	}
	
	public List<Orders> getAllOrders() {
	        return orderRepository.findAll();
	}
	
	public List<Books> getBooksBySeller(Long sellerId) {
        return bookRepository.findByUser_UserId(sellerId);
    }
	
	public int countBooksByUserId(long userId) {
        return bookRepository.countByUser_UserId(userId);
    }
}
