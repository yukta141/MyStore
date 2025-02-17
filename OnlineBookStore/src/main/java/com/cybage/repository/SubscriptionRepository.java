package com.cybage.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.cybage.model.Subscription;
import com.cybage.model.Users;

@Repository
public interface SubscriptionRepository extends JpaRepository<Subscription, Long>{

	List<Subscription> findByUsersUserId(Long userId);
    List<Subscription> findByBooksBookSeries(String bookSeries);
    List<Subscription> findSubscriptionsByBooksBookSeries(String bookSeries);
    @Query("SELECT s.users FROM Subscription s WHERE s.books.bookSeries = :bookSeries")
    List<Users> findUsersByBookSeries(@Param("bookSeries") String bookSeries);
    boolean existsByUsersUserIdAndBooksBookSeries(Long userId, String bookSeries);


  
}
