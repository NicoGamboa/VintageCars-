package com.example.VintageCar.Repository;

import com.example.VintageCar.Entities.Ciudad;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CiudadRepository  extends JpaRepository<Ciudad, Long> {
}
