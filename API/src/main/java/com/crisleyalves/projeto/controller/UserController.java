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

import com.crisleyalves.projeto.model.Product;
import com.crisleyalves.projeto.model.User;
import com.crisleyalves.projeto.repository.ProductRepository;
import com.crisleyalves.projeto.repository.UserRepository;
import com.crisleyalves.projeto.util.Messages;

@Controller
@RequestMapping("users")
public class UserController {
	
	Messages messages;
	
	@Autowired
	UserRepository userRepository;
	
	public UserController(UserRepository userRepository) {
		this.userRepository= userRepository;
	}

	@RequestMapping(method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public ResponseEntity<?> listAll(){		
		return new ResponseEntity<>(userRepository.findAll(), HttpStatus.OK);
    }

	
	@RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<?> insert (@RequestBody User user){
		User saved = this.userRepository.save(user);
		if(saved == null) {
			return new ResponseEntity<>(Collections.singletonMap("message", messages.getInsertError()), HttpStatus.BAD_REQUEST);
		}else {
			return new ResponseEntity<>(Collections.singletonMap("message", messages.getInsertSuccess()), HttpStatus.CREATED);
		}
    }	
	
	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public ResponseEntity<?> getById(@PathVariable("id") Long id){		
		return new ResponseEntity<>(this.userRepository.findById(id), HttpStatus.OK);
    }
	
	@RequestMapping(method = RequestMethod.PUT)
    public ResponseEntity<?> update (@RequestBody User user){
		User saved = this.userRepository.save(user);
		if(saved == null) {
			return new ResponseEntity<>(Collections.singletonMap("message", messages.getUpdateError()), HttpStatus.BAD_REQUEST);
		}else {
			return new ResponseEntity<>(Collections.singletonMap("message", messages.getUpdateSuccess()), HttpStatus.OK);
		}
    }
	
	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<?> excluir(@PathVariable("id") Long id){
		this.userRepository.deleteById(id);
		return new ResponseEntity<>(Collections.singletonMap("message", messages.getDeleteSuccess()), HttpStatus.OK);
    }
	
	@RequestMapping(value = "/login", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public ResponseEntity<?> login(@RequestBody User user){
		User logged = this.userRepository.findByEmailAndPassword(user.getEmail(), user.getPassword());
		if(logged != null) {
			return new ResponseEntity<>( logged, HttpStatus.OK);
		}else {
			return new ResponseEntity<>( Collections.singletonMap("message", messages.getLoginError()), HttpStatus.NOT_FOUND);
		}
    }

}
