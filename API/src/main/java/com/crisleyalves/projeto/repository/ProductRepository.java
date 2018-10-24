package com.crisleyalves.projeto.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.crisleyalves.projeto.model.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {

}
