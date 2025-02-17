package com.cybage.repository;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.cybage.model.Books;


@Repository
public interface BookCardsRepository extends JpaRepository<Books, Long> {

	List<Books> findByBookCategory(String bookCategory);
	List<Books> findByBookSeriesIsNotNull();
	  @Query("SELECT b FROM Books b WHERE b.bookSeries = :bookSeries ORDER BY b.bookId DESC")
	    List<Books> findLatestBookBySeries(@Param("bookSeries") String bookSeries, Pageable pageable);
	  Books findTopByBookSeriesOrderByBookIdDesc(String bookSeries);
	

}
