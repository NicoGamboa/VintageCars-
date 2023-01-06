package com.example.VintageCar.Controller;

import com.example.VintageCar.Entities.Reserva;
import com.example.VintageCar.Exception.BadRequestException;
import com.example.VintageCar.Exception.ResourceNotFoundException;
import com.example.VintageCar.Service.ReservaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/reserva")
public class ReservaController {

    private final ReservaService reservaService;

    @Autowired
    public ReservaController(ReservaService reservaService) {
        this.reservaService = reservaService;
    }

    @PostMapping
    public ResponseEntity<Reserva> agregarReserva (@RequestBody Reserva reserva) throws BadRequestException, ResourceNotFoundException {
        reservaService.cargarReserva(reserva);
        return ResponseEntity.ok(reserva);
    }
    @GetMapping
    public ResponseEntity<List<Reserva>> listarReserva(){
        return ResponseEntity.ok(reservaService.buscarTodasReservas());
    }
    @GetMapping("producto_id/{id}")
    public ResponseEntity<List<Reserva>> listarReservaPorProducto(@PathVariable Long id){
        return ResponseEntity.ok(reservaService.buscarTodasReservasPorProducto(id));
    }
    @GetMapping("usuario_id/{id}")
    public ResponseEntity<List<Reserva>> listarReservaPorUsuario(@PathVariable Long id){
        return ResponseEntity.ok(reservaService.buscarTodasReservasPorUsuario(id));
    }
    @GetMapping("/{id}")
    public ResponseEntity<Reserva> buscarReservaPorId(@PathVariable Long id){
        return ResponseEntity.ok(reservaService.buscarReservaPorId(id));
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<String> eliminarReserva (@PathVariable Long id) throws ResourceNotFoundException {
        reservaService.eliminarReserva(id);
        return ResponseEntity.ok("Se borró la reserva con id: "+id);
    }
    @PutMapping
    public ResponseEntity<String> actualizarReserva(@RequestBody Reserva reserva) throws ResourceNotFoundException, BadRequestException {
        reservaService.actualizarReserva(reserva);
        return ResponseEntity.ok("Se actualizó la reserva con id: "+reserva.getId());
    }
}
