package com.cybage.service;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cybage.model.Coupon;
import com.cybage.repository.CouponRepository;

@Service
public class CouponService {
	
	@Autowired
	private CouponRepository couponRepository;
	
	@Autowired
	private ModelMapper modelMapper;
	
	
	public Coupon addCoupons(Coupon coupons) {
		return couponRepository.save(coupons);
	}
	
	public List<Coupon> getAllCoupon() {
		return couponRepository.findAll();
	}
	
	public void deleteCoupon(long couponId)
	{
		couponRepository.deleteById(couponId);
	}
	

}
