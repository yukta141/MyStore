package com.cybage.service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.TreeSet;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cybage.model.Books;
import com.cybage.model.Category;
import com.cybage.repository.CategoryRepository;

@Service
public class CategoryService {

	
	@Autowired
	private CategoryRepository categoryRepository;
	
	@Autowired
	private ModelMapper modelMapper;
	
	public Category addCategory(Category category) {
		return categoryRepository.save(category);
	} 
	
	public List<Category> getAllCategory() {	
		return categoryRepository.findAll();
	}
	

	public void deleteCategory(long categoryId)
	{
		categoryRepository.deleteById(categoryId);
	}
	
	public Category getCategoryById(int categoryId) {
		Category category=categoryRepository.findById(categoryId);
		
		return modelMapper.map(category,Category.class) ;
		
	}

	public Category updateCategoryDetails(long categoryId,Category category) {
		Category oldCategory= categoryRepository.findById(categoryId).get();
		
		if(category.getCategoryName()!=null) 
			oldCategory.setCategoryName(category.getCategoryName());
	
		if(category.getCategoryImage()!=null) 
			oldCategory.setCategoryImage(category.getCategoryImage());
		
		return categoryRepository.save(oldCategory);
	}
	
	public long getCategoriesCount() {
        return categoryRepository.count();
    }	
	
	

}
