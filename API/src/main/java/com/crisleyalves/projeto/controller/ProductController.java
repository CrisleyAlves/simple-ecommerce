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

import com.crisleyalves.projeto.model.Product;
import com.crisleyalves.projeto.repository.ProductRepository;
import com.crisleyalves.projeto.util.Messages;

@Controller
@RequestMapping("products")
public class ProductController {
	
Messages messages;
	
	@Autowired
	ProductRepository productRepository;
	
	public ProductController(ProductRepository productRepository) {
		this.productRepository= productRepository;
	}

	@RequestMapping(method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public ResponseEntity<?> listAll(Pageable pageable){
		return new ResponseEntity<>(productRepository.findAll(pageable), HttpStatus.OK);
    }
	
	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public ResponseEntity<?> getById(@PathVariable("id") Long id){		
		return new ResponseEntity<>(this.productRepository.findById(id), HttpStatus.OK);
    }
	
	//Don't know if it's the best way to filter info, however, it reaches the goal.	
	@RequestMapping( value="/filter", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public ResponseEntity<?> filter (@RequestBody Product filter){
		if(filter.getStock() == 0) {
			return new ResponseEntity<>(this.productRepository.findProductsByName(filter.getName()), HttpStatus.OK);
		}else if(filter.getStock() == 1) {
			return new ResponseEntity<>(this.productRepository.findProductsInDanger(filter.getName()), HttpStatus.OK);			
		}else if(filter.getStock() == 2 ) {
			return new ResponseEntity<>(this.productRepository.findProductsInWarning(filter.getName()), HttpStatus.OK);
		}else {
			return new ResponseEntity<>(this.productRepository.findProductsInOk(filter.getName()), HttpStatus.OK);
		}
		
    }

	
	@RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<?> insert (@RequestBody Product product){
		Product saved = this.productRepository.save(product);
		if(saved == null) {
			return new ResponseEntity<>(Collections.singletonMap("message", Messages.getInsertError()), HttpStatus.BAD_REQUEST);
		}else {
			return new ResponseEntity<>(Collections.singletonMap("message", Messages.getInsertSuccess()), HttpStatus.OK);
		}
    }	
	
	@RequestMapping(method = RequestMethod.PUT)
    public ResponseEntity<?> update (@RequestBody Product product){
		Product saved = this.productRepository.save(product);
		if(saved == null) {
			return new ResponseEntity<>(Collections.singletonMap("message", Messages.getUpdateError()), HttpStatus.BAD_REQUEST);
		}else {
			return new ResponseEntity<>(Collections.singletonMap("message", Messages.getUpdateSuccess()), HttpStatus.OK);
		}
    }
	
	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<?> excluir(@PathVariable("id") Long id){
		this.productRepository.deleteById(id);
		return new ResponseEntity<>(Collections.singletonMap("message", Messages.getDeleteSuccess()), HttpStatus.OK);
    }
}
