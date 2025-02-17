package com.cybage.schedular;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;

import com.cybage.service.RevenueService;

public class RevenueScheduler {

	 @Autowired
	    private RevenueService revenueCalculationService;

	    @Scheduled(cron = "0 0 1 * * ?") 
	    public void scheduleRevenueCalculation() {
	        revenueCalculationService.calculateAndSaveMonthlyRevenue();
	    }
}
