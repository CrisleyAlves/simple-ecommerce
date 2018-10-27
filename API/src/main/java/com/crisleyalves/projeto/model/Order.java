package com.crisleyalves.projeto.model;

import java.io.Serializable;
import java.util.Calendar;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

@Entity
@Table(name = "orders")
@JsonIdentityInfo(
  generator = ObjectIdGenerators.PropertyGenerator.class, 
  property = "id")
public class Order implements Serializable{
	
	@Id
    @SequenceGenerator(name = "seq_order", sequenceName = "seq_order_id", allocationSize = 1)
	@GeneratedValue(generator = "seq_order", strategy = GenerationType.SEQUENCE)
	@Column(name = "id")
    private Long id;
	
	@Column(name = "date", updatable = false)
    @Temporal(TemporalType.TIMESTAMP)
    @NotNull
    private Calendar date;
	
	@Column(name = "form_payment", length = 10, updatable = false)
    private String formPayment;
	
	@Column(name = "total_price", columnDefinition = "decimal(10,2)", updatable = false)
    @NotNull
    private Double totalPrice;
    
    @Column( name = "cep", length = 8 )
    private String cep;
    
    @Column( name = "address" )
    private String address;
    
    @Column( name = "additional_address" )
    private String additionalAddress;
    
    @Column( name = "city", length = 100 )
    private String city;
    
    @Column( name = "neightborhood", length = 100 )
    private String neightborhood;
    
    @ManyToOne(fetch = FetchType.EAGER)
    private User user;
    
    @Column( name = "status", length = 100 )
    private Integer status;
    
    @OneToOne(fetch = FetchType.LAZY, mappedBy = "order", cascade = CascadeType.ALL)
    @JoinColumn(name = "payment", updatable = false)
    private Payment payment;
    
    @OneToMany(cascade = CascadeType.PERSIST, orphanRemoval = true)
    @JoinColumn(name = "order_id")
    private List<OrderItem> orderItemList;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Calendar getDate() {
		return date;
	}

	public void setDate(Calendar date) {
		this.date = date;
	}

	public String getFormPayment() {
		return formPayment;
	}

	public void setFormPayment(String formPayment) {
		this.formPayment = formPayment;
	}

	public Double getTotalPrice() {
		return totalPrice;
	}

	public void setTotalPrice(Double totalPrice) {
		this.totalPrice = totalPrice;
	}

	public String getCep() {
		return cep;
	}

	public void setCep(String cep) {
		this.cep = cep;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getAdditionalAddress() {
		return additionalAddress;
	}

	public void setAdditionalAddress(String additionalAddress) {
		this.additionalAddress = additionalAddress;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getNeightborhood() {
		return neightborhood;
	}

	public void setNeightborhood(String neightborhood) {
		this.neightborhood = neightborhood;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public List<OrderItem> getOrderItemList() {
		return orderItemList;
	}

	public void setOrderItemList(List<OrderItem> orderItemList) {
		this.orderItemList = orderItemList;
	}

	public Payment getPayment() {
		return payment;
	}

	public void setPayment(Payment payment) {
		this.payment = payment;
	}

	public Integer getStatus() {
		return status;
	}

	public void setStatus(Integer status) {
		this.status = status;
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
		Order other = (Order) obj;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		return true;
	}

	
}
