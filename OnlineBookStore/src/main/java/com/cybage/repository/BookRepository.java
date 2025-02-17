package com.cybage.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.cybage.model.Books;




@Repository
public interface BookRepository extends JpaRepository<Books, Long> {
	
	Books findByBookId(long bookId);
	List<Books> findByUser_UserId(Long userId); 
	int countByUser_UserId(long userId);
	 
	 

	

}
