package com.crisleyalves.projeto.repository;

import org.springframework.data.repository.PagingAndSortingRepository;

import com.crisleyalves.projeto.model.Highlight;

public interface HighlightRepository extends PagingAndSortingRepository<Highlight, Long> {

}
