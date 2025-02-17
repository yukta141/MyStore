package com.cybage.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cybage.model.Books;
import com.cybage.repository.BookSearchRepository;

@Service
public class BookSearchService {

	@Autowired
	private final BookSearchRepository bookSearchRepository;

   
    public BookSearchService(BookSearchRepository bookSearchRepository) {
        this.bookSearchRepository = bookSearchRepository;
    }

    public List<Books> searchBooksByName(String bookname) {
        return bookSearchRepository.searchBooksByBookNameContainingOrBookCategory(bookname,bookname);
    }
}
