package com.crisleyalves.projeto.controller;

import java.util.Collections;


import org.springframework.data.domain.Pageable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;


import com.crisleyalves.projeto.model.Order;
import com.crisleyalves.projeto.repository.OrderRepository;
import com.crisleyalves.projeto.util.Messages;
import com.crisleyalves.projeto.filter.OrderFilterModel;

@Controller
@RequestMapping("orders")
public class OrderController {
	
Messages messages;
	
	@Autowired
	OrderRepository orderRepository;
	
	public OrderController(OrderRepository orderRepository) {
		this.orderRepository= orderRepository;
	}

	@RequestMapping(method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public ResponseEntity<?> listAll(Pageable pageable){		
		return new ResponseEntity<>(orderRepository.findAll(pageable), HttpStatus.OK);
    }
	
	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public ResponseEntity<?> getById(@PathVariable("id") Long id){		
		return new ResponseEntity<>(this.orderRepository.findById(id), HttpStatus.OK);
    }
	
	//Don't know if it's the best way to filter info, however, it reaches the goal.	
	@RequestMapping( value="/filter", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public ResponseEntity<?> filter (@RequestBody OrderFilterModel filter){		
		if(filter.getCpf().length() == 11) {
			return new ResponseEntity<>(this.orderRepository.findByUserCpf(filter.getCpf()), HttpStatus.OK);
		}else if(filter.getStatus() != 0 && filter.getStartDate() != null && filter.getEndDate() != null) {
			return new ResponseEntity<>(this.orderRepository.findBetweenTwoDatesAndStatus(filter.getStartDate(),  filter.getEndDate(), filter.getStatus()), HttpStatus.OK);
		} else if(filter.getStatus() != 0) {
			return new ResponseEntity<>(this.orderRepository.findByStatusId(filter.getStatus()), HttpStatus.OK);
		}else {
			return new ResponseEntity<>(this.orderRepository.findBetweenTwoDates(filter.getStartDate(),  filter.getEndDate()), HttpStatus.OK);
		}				
    }

	
	@RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<?> insert (@RequestBody Order order){
		Order saved = this.orderRepository.save(order);
		if(saved == null) {
			return new ResponseEntity<>(Collections.singletonMap("message", Messages.getInsertError()), HttpStatus.BAD_REQUEST);
		}else {
			return new ResponseEntity<>(Collections.singletonMap("message", Messages.getInsertSuccess()), HttpStatus.OK);
		}
    }	
	
	@RequestMapping(method = RequestMethod.PUT)
    public ResponseEntity<?> update (@RequestBody Order order){
		Order saved = this.orderRepository.save(order);
		if(saved == null) {
			return new ResponseEntity<>(Collections.singletonMap("message", Messages.getUpdateError()), HttpStatus.BAD_REQUEST);
		}else {
			return new ResponseEntity<>(Collections.singletonMap("message", Messages.getUpdateSuccess()), HttpStatus.OK);
		}
    }
	
	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<?> excluir(@PathVariable("id") Long id){
		this.orderRepository.deleteById(id);
		return new ResponseEntity<>(Collections.singletonMap("message", Messages.getDeleteSuccess()), HttpStatus.OK);
    }

}
