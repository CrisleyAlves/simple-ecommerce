package com.crisleyalves.projeto.model;

import java.util.Calendar;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "highlights")
public class Highlight {
	
	@Id
    @SequenceGenerator(name = "seq_highlight", sequenceName = "seq_highlight_id", allocationSize = 1)
	@GeneratedValue(generator = "seq_highlight", strategy = GenerationType.SEQUENCE)
	@Column(name = "id")
	private Long id;
	
	@ManyToOne(fetch = FetchType.EAGER)
	private Product product;
	
	@Column(name = "initial_date", updatable = false)
    @Temporal(TemporalType.TIMESTAMP)
    @NotNull
    private Calendar initialDate;
	
	@Column(name = "final_date", updatable = false)
    @Temporal(TemporalType.TIMESTAMP)
    @NotNull
    private Calendar finalDate;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Product getProduct() {
		return product;
	}

	public void setProduct(Product product) {
		this.product = product;
	}

	public Calendar getInitialDate() {
		return initialDate;
	}

	public void setInitialDate(Calendar initialDate) {
		this.initialDate = initialDate;
	}

	public Calendar getFinalDate() {
		return finalDate;
	}

	public void setFinalDate(Calendar finalDate) {
		this.finalDate = finalDate;
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
		Highlight other = (Highlight) obj;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		return true;
	}

}
