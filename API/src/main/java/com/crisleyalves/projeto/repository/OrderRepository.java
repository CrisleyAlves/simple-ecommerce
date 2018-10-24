package com.crisleyalves.projeto.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.crisleyalves.projeto.model.Order;

public interface OrderRepository extends JpaRepository<Order, Long> {

}
