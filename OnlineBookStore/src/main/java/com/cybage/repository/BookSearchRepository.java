package com.cybage.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cybage.model.Books;


@Repository
public interface BookSearchRepository extends JpaRepository<Books, Long> {
	
	List<Books>searchBooksByBookNameContainingOrBookCategory(String bookName,String bookcategory);


}
