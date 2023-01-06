package com.example.VintageCar.Repository;

import com.example.VintageCar.Entities.Politica;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.RestController;

@RestController
public interface PoliticaRepository extends JpaRepository<Politica,Long> {
}
