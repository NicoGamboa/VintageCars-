package com.example.VintageCar.Controller;

import com.example.VintageCar.Entities.Categoria;
import com.example.VintageCar.Entities.Ciudad;
import com.example.VintageCar.Exception.ResourceNotFoundException;
import com.example.VintageCar.Service.CiudadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/ciudad")
public class CiudadController {
    private final CiudadService ciudadService;

    @Autowired
    public CiudadController(CiudadService ciudadService) {
        this.ciudadService = ciudadService;
    }

    @PostMapping
    public ResponseEntity<Ciudad> agregarciudad (@RequestBody Ciudad ciudad){
        ciudadService.guardarCiudad(ciudad);
        return ResponseEntity.ok(ciudad);
    }
    @GetMapping
    public ResponseEntity<List<Ciudad>> listarCiudades(){
        return ResponseEntity.ok(ciudadService.listarCiudades());
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<String> eliminarCiudad (@PathVariable Long id) throws ResourceNotFoundException {
        ciudadService.eliminarCiudad(id);
        return ResponseEntity.ok("Se borró la ciudad con id: "+id);
    }
    @PutMapping
    public ResponseEntity<String> actualizarCiudad(@RequestBody Ciudad ciudad) throws ResourceNotFoundException{
        ciudadService.actualizarCiudad(ciudad);
        return ResponseEntity.ok("Se actualizó la ciudad con id: "+ciudad.getId());
    }

}
