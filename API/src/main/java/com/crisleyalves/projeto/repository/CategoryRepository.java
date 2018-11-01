package com.crisleyalves.projeto.repository;

import org.springframework.data.repository.PagingAndSortingRepository;

import com.crisleyalves.projeto.model.Category;

public interface CategoryRepository extends PagingAndSortingRepository<Category, Long> {

}
