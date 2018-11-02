package com.crisleyalves.projeto.model;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.Email;

import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;
import org.hibernate.validator.constraints.br.CPF;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

@Entity
@Table(name = "users")
@JsonIdentityInfo(
  generator = ObjectIdGenerators.PropertyGenerator.class, 
  property = "id")
public class User implements Serializable{
	
	@Id
    @SequenceGenerator(name = "seq_user", sequenceName = "seq_user_id", allocationSize = 1)
	@GeneratedValue(generator = "seq_user", strategy = GenerationType.SEQUENCE)
	@Column(name = "id")
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "email", length = 60)
    @Email(message = "INVALID EMAIL")
    private String email;
    
    @Column(name = "cpf", length = 11)
//    @CPF(message = "INVALID CPF")
    private String cpf;
    
    @Column(name = "birthday")
    @Temporal(TemporalType.TIMESTAMP)
    private Calendar birthday;
    
    @Column(name = "password")
    private String password = null;
    
    @Column(name = "cell_phone", length = 13)
    private String cellPhone;
    
    @Column(name = "landline_number", length = 13)
    private String landlineNumber;
    
    @Column(name = "photo", updatable = false)
    private String photo = null;
    
    @Column(name = "admin")
    private Boolean admin = false;
    
    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name="user_id", referencedColumnName="id")
    private List<Address> addressList;
    
    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name="user_id", referencedColumnName="id")
    List<Wish> wishList = new ArrayList<>();

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

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

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getCellPhone() {
		return cellPhone;
	}

	public void setCellPhone(String cellPhone) {
		this.cellPhone = cellPhone;
	}

	public String getLandlineNumber() {
		return landlineNumber;
	}

	public void setLandlineNumber(String landlineNumber) {
		this.landlineNumber = landlineNumber;
	}

	public Boolean getAdmin() {
		return admin;
	}

	public void setAdmin(Boolean admin) {
		this.admin = admin;
	}

	public String getPhoto() {
		return photo;
	}

	public void setPhoto(String photo) {
		this.photo = photo;
	}	

	public List<Wish> getWishList() {
		return wishList;
	}

	public List<Address> getAddressList() {
		return addressList;
	}

	public void setAddressList(List<Address> addressList) {
		this.addressList = addressList;
	}

	public void setWishList(List<Wish> wishList) {
		this.wishList = wishList;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		User other = (User) obj;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		return true;
	}

    
}
