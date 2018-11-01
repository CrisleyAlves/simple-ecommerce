package com.crisleyalves.projeto.controller;

import org.springframework.data.domain.Pageable;
import java.util.Collections;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.crisleyalves.projeto.model.Category;
import com.crisleyalves.projeto.repository.CategoryRepository;
import com.crisleyalves.projeto.util.Messages;

@Controller
@RequestMapping("categories")
public class CategoryController {
	
Messages messages;
	
	@Autowired
	CategoryRepository categoryRepository;
	
	public CategoryController(CategoryRepository categoryRepository) {
		this.categoryRepository = categoryRepository;
	}

	@RequestMapping(method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public ResponseEntity<?> listAll(Pageable pageable){
		return new ResponseEntity<>(categoryRepository.findAll(pageable), HttpStatus.OK);
    }
	
	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public ResponseEntity<?> getById(@PathVariable("id") Long id){		
		return new ResponseEntity<>(this.categoryRepository.findById(id), HttpStatus.OK);
    }
	
	@RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<?> insert (@RequestBody Category category){
		Category saved = this.categoryRepository.save(category);
		if(saved == null) {
			return new ResponseEntity<>(Collections.singletonMap("message", messages.getInsertError()), HttpStatus.BAD_REQUEST);
		}else {
			return new ResponseEntity<>(Collections.singletonMap("message", messages.getInsertSuccess()), HttpStatus.OK);
		}
    }	
	
	@RequestMapping(method = RequestMethod.PUT)
    public ResponseEntity<?> update (@RequestBody Category category){
		Category saved = this.categoryRepository.save(category);
		if(saved == null) {
			return new ResponseEntity<>(Collections.singletonMap("message", messages.getUpdateError()), HttpStatus.BAD_REQUEST);
		}else {
			return new ResponseEntity<>(Collections.singletonMap("message", messages.getUpdateSuccess()), HttpStatus.OK);
		}
    }
	
	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<?> excluir(@PathVariable("id") Long id){
		this.categoryRepository.deleteById(id);
		return new ResponseEntity<>(Collections.singletonMap("message", messages.getDeleteSuccess()), HttpStatus.OK);
    }
}
