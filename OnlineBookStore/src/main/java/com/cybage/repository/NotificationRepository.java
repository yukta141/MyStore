package com.cybage.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.cybage.model.Notification;
import com.cybage.model.Subscription;
import com.cybage.model.Users;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Long>{

	List<Notification> findByUsersUserId(Long userId);
	List<Notification> findByBooksBookSeries(String bookSeries);
	List<Notification> findByUsersUserIdAndStatus(Long userId, String status);
//	List<Notification> findByUsersAndIsReadFalse(Users user);
	    Optional<Notification> findByUsersUserIdAndBooksBookId(@Param("userId") Long userId, @Param("bookId") Long bookId);
	
}
