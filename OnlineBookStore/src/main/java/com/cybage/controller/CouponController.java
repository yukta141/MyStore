package com.cybage.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.cybage.model.Coupon;
import com.cybage.service.CouponService;

@RestController
@CrossOrigin(origins="http://localhost:4200")
public class CouponController {
	
	@Autowired
	private CouponService couponService;
	
	@PostMapping(path="addCoupon")
	public ResponseEntity<Coupon> addCoupon(@RequestBody Coupon coupons){
		return new ResponseEntity<Coupon>(couponService.addCoupons(coupons),HttpStatus.CREATED);
	}
	
	
	@GetMapping(path="getCoupons")
	public ResponseEntity<List<Coupon>>getAllCoupon(){
		return new ResponseEntity<List<Coupon>>(couponService.getAllCoupon(),HttpStatus.OK);
	}
	
	@DeleteMapping(path="deleteCoupon/{couponId}")
	public ResponseEntity<String> deleteCoupon(@PathVariable long couponId) {
		
		couponService.deleteCoupon(couponId);
		return new ResponseEntity<String>("Deleted Succesfully", HttpStatus.OK);
	}

}
