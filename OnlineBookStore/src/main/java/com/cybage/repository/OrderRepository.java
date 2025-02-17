package com.cybage.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.cybage.DTO.CategoryDTO;
import com.cybage.model.Books;
import com.cybage.model.Orders;

public interface OrderRepository extends JpaRepository<Orders, Long>{

	List<Orders> findByUserUserId(int userId);
	 @Query("SELECT new com.cybage.DTO.CategoryDTO(b.bookCategory, COUNT(o.book.bookId)) " +
	           "FROM Orders o JOIN o.book b " +
	           "GROUP BY b.bookCategory " +
	           "ORDER BY COUNT(o.book.bookId) DESC")
	    List<CategoryDTO> findTopSellingCategories();
	 
	 List<Orders> findByBookUserUserId(Long sellerId);
	 long countByBook_User_UserId(long sellerId);
	 
	 List<Orders> findByPlacedDateBetween(LocalDate startDate, LocalDate endDate);
	 
	 
	 @Query("SELECT o FROM Orders o WHERE o.book.user.userId = :userId AND o.placedDate BETWEEN :startDate AND :endDate")
	 List<Orders> findByUserAndPlacedDateBetween(
	     @Param("userId") Long userId,
	     @Param("startDate") LocalDate startDate,
	     @Param("endDate") LocalDate endDatez
	 );
	 
	       
	    @Query("SELECT o FROM Orders o WHERE MONTH(o.placedDate) = :month AND YEAR(o.placedDate) = :year")
	    List<Orders> findOrdersByMonthAndYear(@Param("month") int month, @Param("year") int year);

	    @Query("SELECT MONTH(o.placedDate) AS month, SUM(o.totalAmount) AS revenue " +
	    	       "FROM Orders o " +
	    	       "GROUP BY MONTH(o.placedDate)")
	    	List<Object[]> calculateMonthlyRevenue();

	    	
	    	
	    	
	    	@Query("SELECT o.book.user.userName AS sellerName, COUNT(o.orderId) AS orderCount " +
	    		       "FROM Orders o " +
	    		       "WHERE o.book.user.userRole = 'seller' " +
	    		       "GROUP BY o.book.user.userName")
	    		List<Object[]> getOrdersBySeller();


}
