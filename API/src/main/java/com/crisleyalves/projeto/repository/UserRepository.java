package com.crisleyalves.projeto.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.crisleyalves.projeto.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
	
	User findByEmailAndPassword(String email, String password);
}
