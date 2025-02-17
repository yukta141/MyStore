package com.cybage.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cybage.model.Books;
import com.cybage.model.Category;


@Repository
public interface CategoryRepository extends JpaRepository<Category, Long>{
	
	Category findById(int Id);
	 

}
