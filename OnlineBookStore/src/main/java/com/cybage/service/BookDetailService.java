package com.cybage.service;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cybage.DTO.BookDTO;
import com.cybage.model.Books;
import com.cybage.repository.BookDetailRepository;

@Service
public class BookDetailService {

	@Autowired
	private BookDetailRepository bookDetailRepository;
	
	@Autowired
	private ModelMapper modelMapper;
	
	public BookDTO getBookDetails(long bookId) {
        Books book = bookDetailRepository.findById(bookId)
                                           .orElseThrow(() -> new RuntimeException("Book not found with id: " + bookId));
        return modelMapper.map(book, BookDTO.class);
    }

//	public BookDTO getSeriesDetails(long bookId) {
//		Books book = bookDetailRepository.findById(bookId)
//				                             .orElseThrow(()-> new RuntimeException("Book not found with id: " + bookId));
//		return modelMapper.map(book, BookDTO.class);
//	}
	
	public BookDTO getSeriesDetails(long bookId) {
	    Books book = bookDetailRepository.findById(bookId)
	                                     .orElseThrow(() -> new RuntimeException("Book not found with id: " + bookId));
	    
	    List<Books> relatedBooks = bookDetailRepository.findByBookSeriesOrderByBookIdAsc(book.getBookSeries());
	    List<BookDTO> relatedBookDTOs = relatedBooks.stream()
	                                                .map(b -> modelMapper.map(b, BookDTO.class))
	                                                .collect(Collectors.toList());

	    BookDTO bookDTO = modelMapper.map(book, BookDTO.class);
	    bookDTO.setRelatedBooks(relatedBookDTOs);

	    return bookDTO;
	}
}
