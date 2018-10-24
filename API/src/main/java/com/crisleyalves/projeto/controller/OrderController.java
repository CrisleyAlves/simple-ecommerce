package com.crisleyalves.projeto.controller;

import java.util.Collections;

import org.hibernate.Hibernate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.crisleyalves.projeto.model.Product;
import com.crisleyalves.projeto.repository.ProductRepository;
import com.crisleyalves.projeto.util.Messages;

@Controller
@RequestMapping("products")
public class OrderController {
	
	Messages messages;
	
	@Autowired
	ProductRepository productRepository;
	
	public OrderController(ProductRepository productRepository) {
		this.productRepository= productRepository;
	}

	@RequestMapping(method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public ResponseEntity<?> listAll(){
		return new ResponseEntity<>(productRepository.findAll(), HttpStatus.OK);
    }

	
	@RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<?> insert (@RequestBody Product product){
		Product saved = this.productRepository.save(product);
		if(saved == null) {
			return new ResponseEntity<>(Collections.singletonMap("message", messages.getInsertError()), HttpStatus.BAD_REQUEST);
		}else {
			return new ResponseEntity<>(Collections.singletonMap("message", messages.getInsertSuccess()), HttpStatus.OK);
		}
    }	
	
	@RequestMapping(method = RequestMethod.PUT)
    public ResponseEntity<?> update (@RequestBody Product product){
		Product saved = this.productRepository.save(product);
		if(saved == null) {
			return new ResponseEntity<>(Collections.singletonMap("message", messages.getUpdateError()), HttpStatus.BAD_REQUEST);
		}else {
			return new ResponseEntity<>(Collections.singletonMap("message", messages.getUpdateSuccess()), HttpStatus.OK);
		}
    }
	
	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<?> excluir(@PathVariable("id") Long id){
		this.productRepository.deleteById(id);
		return new ResponseEntity<>(Collections.singletonMap("message", messages.getDeleteSuccess()), HttpStatus.OK);
    }

}
