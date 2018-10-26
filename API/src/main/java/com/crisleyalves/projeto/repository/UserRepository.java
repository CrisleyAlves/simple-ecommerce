package com.crisleyalves.projeto.repository;

import java.util.Calendar;

import org.springframework.data.jpa.repository.JpaRepository;

import com.crisleyalves.projeto.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
	
	//ADMIN LOGIN - Only admins are going to have password
	User findByEmailAndPassword(String email, String password);
	
	//USER LOGIN - Login through CPF and Birthday
	User findByCpfAndBirthday(String cpf, Calendar birthday);
	
	//ADM USER - Filtering user by CPF
	public User findByCpf( String cpf);
	
	//ADM USER - Filtering user by BIRTHDAY
	public User findByBirthday(Calendar birthday);
	

	
	
	
}
