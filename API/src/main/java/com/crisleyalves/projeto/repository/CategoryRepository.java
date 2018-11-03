package com.crisleyalves.projeto.repository;

import java.util.List;

import org.springframework.data.repository.PagingAndSortingRepository;

import com.crisleyalves.projeto.model.Category;

public interface CategoryRepository extends PagingAndSortingRepository<Category, Long> {
	
	List<Category> findByDescriptionContainingIgnoreCase(String description);

}
