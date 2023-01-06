package com.example.VintageCar.Controller;

import com.example.VintageCar.Entities.Caracteristica;
import com.example.VintageCar.Exception.ResourceNotFoundException;
import com.example.VintageCar.Service.CaracteristicaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/caracteristica")
public class CaracteristicaController {

    private final CaracteristicaService caracteristicaService;

    @Autowired
    public CaracteristicaController(CaracteristicaService caracteristicaService) {
        this.caracteristicaService = caracteristicaService;
    }

    @PostMapping
    public ResponseEntity<Caracteristica> agregarCaracteristica (@RequestBody Caracteristica caracteristica){
        caracteristicaService.cargarCaracteristica(caracteristica);
        return ResponseEntity.ok(caracteristica);
    }
    @GetMapping
    public ResponseEntity<List<Caracteristica>> listarCaracteristicas(){
        return ResponseEntity.ok(caracteristicaService.buscarTodasCaracteristica());
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<String> eliminarCaracteristica (@PathVariable Long id) throws ResourceNotFoundException {
        caracteristicaService.eliminarCaracteristica(id);
        return ResponseEntity.ok("Se borró la caracteristica con id: "+id);
    }
    @PutMapping
    public ResponseEntity<String> actualizarCaracteristica(@RequestBody Caracteristica caracteristica) throws ResourceNotFoundException {
        caracteristicaService.actualizarCaracteristica(caracteristica);
        return ResponseEntity.ok("Se actualizó la caracteristica con id: "+caracteristica.getId());
    }
}
