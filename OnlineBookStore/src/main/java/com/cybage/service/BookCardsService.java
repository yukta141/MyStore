package com.cybage.service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.TreeSet;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cybage.DTO.BookDTO;
import com.cybage.model.Books;
import com.cybage.repository.BookCardsRepository;

@Service
public class BookCardsService {
	
	@Autowired
	private BookCardsRepository bookCardsRepository;

	@Autowired
	private ModelMapper modelMapper;


	public List<BookDTO> showCardDetails(String bookCategory) {
	    List<Books> books = bookCardsRepository.findByBookCategory(bookCategory);
	    return books.stream()
	                   .map(book -> modelMapper.map(book, BookDTO.class))
	                   .collect(Collectors.toList());
	}
	
	public List<Books> getBookSeries() {
		 List<Books> books = bookCardsRepository.findByBookSeriesIsNotNull();
	        Map<String, Books> bookMap = books.stream()
	            .collect(Collectors.toMap(
	                Books::getBookSeries,
	                book -> book,
	                (existing, replacement) -> existing.getBookId() < replacement.getBookId() ? existing : replacement
	            ));

	        return new ArrayList<>(bookMap.values());
    }
	

}
