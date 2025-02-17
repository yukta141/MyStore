package com.cybage.repository;

import java.time.LocalDate;
import java.time.YearMonth;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.cybage.DTO.MonthlyRevenueDTO;
import com.cybage.model.Revenue;

public interface RevenueRepository extends JpaRepository<Revenue, Integer>{

	
	 @Query("SELECT r.month, SUM(r.revenue) FROM Revenue r GROUP BY r.month ORDER BY r.month")
	    List<Object[]> findMonthlyRevenues();
	    
	    Optional<Revenue> findByMonth(LocalDate month);
//	    Optional<Revenue> findByUserIdAndMonth(Long userId, YearMonth month);
	    @Query("SELECT r.month, SUM(r.revenue) FROM Revenue r GROUP BY r.month ORDER BY r.month")
	    List<Object[]> getMonthlyRevenue();


}
