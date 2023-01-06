package com.example.VintageCar.Repository;

import com.example.VintageCar.Entities.Producto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface ProductoRepository extends JpaRepository<Producto,Long> {


    List<Producto> findAllByCiudad_id (long id_ciudad);
    List<Producto> findAllByCategoria_id (long id_categoria);

    @Query(value = "SELECT * FROM productos WHERE (productos.id not in (SELECT producto_id FROM productos LEFT JOIN reservas ON productos.id=reservas.producto_id WHERE (reservas.inicio_reserva BETWEEN ?1 and ?2)  OR (reservas.fin_reserva  BETWEEN ?1 and ?2))) AND productos.ciudad_id LIKE ?3 group by productos.id ",nativeQuery = true)
    Optional<List<Producto>> findProductoPorFechasUbicacion(LocalDate fechaInicio, LocalDate fechaFinal, Long id);

    @Query(value = "SELECT * FROM productos WHERE (productos.id not in (SELECT producto_id FROM productos LEFT JOIN reservas ON productos.id=reservas.producto_id WHERE (reservas.inicio_reserva BETWEEN ?1 and ?2)  OR (reservas.fin_reserva  BETWEEN ?1 and ?2))) group by productos.id ",nativeQuery = true)
    Optional<List<Producto>> findProductoPorFechas(LocalDate fechaInicio, LocalDate fechaFinal);
}
