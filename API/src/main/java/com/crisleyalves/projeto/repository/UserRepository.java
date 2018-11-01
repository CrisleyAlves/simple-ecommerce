package com.crisleyalves.projeto.repository;

import java.util.Calendar;

import java.util.List;

import org.springframework.data.repository.PagingAndSortingRepository;

import com.crisleyalves.projeto.model.User;

public interface UserRepository extends PagingAndSortingRepository<User, Long> {
	
	//ADMIN LOGIN - Only admins are going to have password
	User findByEmailAndPassword(String email, String password);
	
	//USER LOGIN - Login through CPF and Birthday
	User findByCpfAndBirthday(String cpf, Calendar birthday);
	
	//ADM USER - Filtering user by CPF
	public List<User> findByCpf( String cpf);
	
	//ADM USER - Filtering user by BIRTHDAY
	public List<User> findByBirthday(Calendar birthday);
	

	
	
	
}
