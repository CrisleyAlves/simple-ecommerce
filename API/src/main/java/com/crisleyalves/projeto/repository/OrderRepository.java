package com.crisleyalves.projeto.repository;

import java.util.Calendar;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;

import com.crisleyalves.projeto.model.Order;

public interface OrderRepository extends PagingAndSortingRepository<Order, Long> {
	
	List<Order> findByUserCpf(String cpf);

	List<Order> findByStatusId(Long status);
	
	@Query("select o from Order o where o.date >= ?1 and o.date <= ?2")
	List<Order> findBetweenTwoDates(Calendar startDate, Calendar endDate);
	
	@Query("select o from Order o where o.date >= ?1 and o.date <= ?2 and o.status = ?3")
	List<Order> findBetweenTwoDatesAndStatus(Calendar startDate, Calendar endDate, Long status);
	
}
