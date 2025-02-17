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
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.cybage.model.Books;
import com.cybage.model.Category;
import com.cybage.service.CategoryService;

@RestController
@CrossOrigin(origins="http://localhost:4200")
public class CategoryController {
	
	@Autowired
	private CategoryService categoryService;
	
	
	@PostMapping(path="addCategory")
	public ResponseEntity<Category> addCategory(@RequestBody Category category) {
		
		return new ResponseEntity<Category>(categoryService.addCategory(category), HttpStatus.CREATED);
	}
	
	@DeleteMapping("deleteCategory/{categoryId}")
	public ResponseEntity<String> deleteCategory(@PathVariable int categoryId) {
		
		categoryService.deleteCategory(categoryId);
		return new ResponseEntity<String>("Deleted Succesfully", HttpStatus.OK);
	}
	
	@GetMapping(path="getCategoryById/{categoryId}")
	public ResponseEntity<Category> getCategoryById(@PathVariable("categoryId") int categoryId) {
		Category category=categoryService.getCategoryById(categoryId);
		System.out.println(category);
		return new ResponseEntity<Category>(category,HttpStatus.OK);
		
	}
	
	@PutMapping(path="updateCategory/{categoryId}")
	public ResponseEntity<Category> updateCategoryDetails(@PathVariable int categoryId,@RequestBody Category category){
		
		return new ResponseEntity<Category>(categoryService.updateCategoryDetails(categoryId,category),HttpStatus.OK);
	}
	
	@GetMapping(path="categoryCount")
    public long getCount() {
        return categoryService.getCategoriesCount();
}
	
	

}
