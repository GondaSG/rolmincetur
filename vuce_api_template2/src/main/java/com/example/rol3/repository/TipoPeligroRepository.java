package com.example.rol3.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.rol3.domain.TipoPeligro;

@Repository
public interface TipoPeligroRepository extends JpaRepository<TipoPeligro, Integer>{

}
