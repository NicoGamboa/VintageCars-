package com.example.VintageCar.Repository;

import com.example.VintageCar.Entities.Producto;
import com.example.VintageCar.Entities.Reserva;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface ReservaRepository extends JpaRepository<Reserva,Long> {
    @Query(value = "SELECT * FROM reservas WHERE ((reservas.inicio_reserva BETWEEN ?1 and ?2) OR (reservas.fin_reserva  BETWEEN ?1 and ?2))  AND reservas.producto_id LIKE ?3 GROUP BY reservas.id ",nativeQuery = true)
    List<Reserva> findReservasPorFechas(LocalDate fechaInicio, LocalDate fechaFinal,Long id);

    List<Reserva> findAllReservaByProducto_id (Long id);
    List<Reserva> findAllReservaByUsuario_id (Long id);
}
