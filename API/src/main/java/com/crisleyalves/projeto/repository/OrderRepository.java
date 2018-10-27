package com.crisleyalves.projeto.repository;

import java.util.Calendar;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.crisleyalves.projeto.model.Order;

public interface OrderRepository extends JpaRepository<Order, Long> {
	
	List<Order> findByUserCpf(String cpf);

	List<Order> findByStatus(Integer status);
	
	@Query("select o from Order o where o.date >= ?1 and o.date <= ?2")
	List<Order> findBetweenTwoDates(Calendar startDate, Calendar endDate);
	
	@Query("select o from Order o where o.date >= ?1 and o.date <= ?2 and o.status = ?3")
	List<Order> findBetweenTwoDatesAndStatus(Calendar startDate, Calendar endDate, Integer status);
	
}
