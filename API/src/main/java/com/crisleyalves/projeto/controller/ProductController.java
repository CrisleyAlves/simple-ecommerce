package com.crisleyalves.projeto.controller;

import java.util.Collections;

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

import com.crisleyalves.projeto.model.Order;
import com.crisleyalves.projeto.model.Product;
import com.crisleyalves.projeto.repository.OrderRepository;
import com.crisleyalves.projeto.repository.ProductRepository;
import com.crisleyalves.projeto.util.Messages;

@Controller
@RequestMapping("orders")
public class ProductController {
	
	Messages messages;
	
	@Autowired
	OrderRepository orderRepository;
	
	public ProductController(OrderRepository orderRepository) {
		this.orderRepository= orderRepository;
	}

	@RequestMapping(method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public ResponseEntity<?> listAll(){
		
		return new ResponseEntity<>(orderRepository.findAll(), HttpStatus.OK);
    }

	
	@RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<?> insert (@RequestBody Order order){
		Order saved = this.orderRepository.save(order);
		if(saved == null) {
			return new ResponseEntity<>(Collections.singletonMap("message", messages.getInsertError()), HttpStatus.BAD_REQUEST);
		}else {
			return new ResponseEntity<>(Collections.singletonMap("message", messages.getInsertSuccess()), HttpStatus.OK);
		}
    }	
	
	@RequestMapping(method = RequestMethod.PUT)
    public ResponseEntity<?> update (@RequestBody Order order){
		Order saved = this.orderRepository.save(order);
		if(saved == null) {
			return new ResponseEntity<>(Collections.singletonMap("message", messages.getUpdateError()), HttpStatus.BAD_REQUEST);
		}else {
			return new ResponseEntity<>(Collections.singletonMap("message", messages.getUpdateSuccess()), HttpStatus.OK);
		}
    }
	
	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<?> excluir(@PathVariable("id") Long id){
		this.orderRepository.deleteById(id);
		return new ResponseEntity<>(Collections.singletonMap("message", messages.getDeleteSuccess()), HttpStatus.OK);
    }

}
