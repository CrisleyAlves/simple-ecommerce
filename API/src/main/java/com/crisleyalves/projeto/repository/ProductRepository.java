package com.crisleyalves.projeto.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;

import com.crisleyalves.projeto.model.Product;

public interface ProductRepository extends PagingAndSortingRepository<Product, Long> {
	
	@Query("select p from Product p where UPPER(p.name)  LIKE CONCAT('%',UPPER(?1),'%') and p.stock > 0")
	public List<Product> findProductsByName (String name);
	
	@Query("select p from Product p where UPPER(p.name)  LIKE CONCAT('%',UPPER(?1),'%') and p.stock <= 10")
	public List<Product> findProductsInDanger(String name);
	
	@Query("select p from Product p where UPPER(p.name)  LIKE CONCAT('%',UPPER(?1),'%') and p.stock > 10 and p.stock <= 50")
	public List<Product> findProductsInWarning(String name);
	
	@Query("select p from Product p where UPPER(p.name)  LIKE CONCAT('%',UPPER(?1),'%') and p.stock > 50")
	public List<Product> findProductsInOk(String name);

}
