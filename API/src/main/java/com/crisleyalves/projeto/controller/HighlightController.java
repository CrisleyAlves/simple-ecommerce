package com.crisleyalves.projeto.controller;

import org.springframework.data.domain.Pageable;
import java.util.Collections;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.crisleyalves.projeto.model.Highlight;
import com.crisleyalves.projeto.repository.HighlightRepository;
import com.crisleyalves.projeto.util.Messages;

@Controller
@RequestMapping("highlights")
public class HighlightController {
	
	@Autowired
	HighlightRepository highlightRepository;
	
	public HighlightController(HighlightRepository highlightRepository) {
		this.highlightRepository = highlightRepository;
	}

	@RequestMapping(method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public ResponseEntity<?> listAll(Pageable pageable){
		return new ResponseEntity<>(highlightRepository.findAll(pageable), HttpStatus.OK);
    }
	
	@RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<?> insert (@RequestBody Highlight highlight){
		Highlight saved = this.highlightRepository.save(highlight);
		if(saved == null) {
			return new ResponseEntity<>(Collections.singletonMap("message", Messages.getInsertError()), HttpStatus.BAD_REQUEST);
		}else {
			return new ResponseEntity<>(Collections.singletonMap("message", Messages.getInsertSuccess()), HttpStatus.OK);
		}
    }	
	
	@RequestMapping(method = RequestMethod.PUT)
    public ResponseEntity<?> update (@RequestBody Highlight highlight){
		Highlight saved = this.highlightRepository.save(highlight);
		if(saved == null) {
			return new ResponseEntity<>(Collections.singletonMap("message", Messages.getUpdateError()), HttpStatus.BAD_REQUEST);
		}else {
			return new ResponseEntity<>(Collections.singletonMap("message", Messages.getUpdateSuccess()), HttpStatus.OK);
		}
    }
}
