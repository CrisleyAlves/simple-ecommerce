package com.crisleyalves.projeto.repository;

import java.util.Calendar;
import java.util.Date;

public class UserRepositoryFilter {
	
	private String cpf;
	private Calendar birthday;
	
	public String getCpf() {
		return cpf;
	}
	
	public void setCpf(String cpf) {
		this.cpf = cpf;
	}
	
	public Calendar getBirthday() {
		return birthday;
	}
	
	public void setBirthday(Calendar birthday) {
		this.birthday = birthday;
	}

}
