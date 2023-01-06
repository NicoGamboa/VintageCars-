package com.example.VintageCar.Controller;

import com.example.VintageCar.Entities.Imagen;
import com.example.VintageCar.Entities.Politica;
import com.example.VintageCar.Exception.BadRequestException;
import com.example.VintageCar.Exception.ResourceNotFoundException;
import com.example.VintageCar.Service.PoliticaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/politica")
public class PoliticaController {

    private final PoliticaService politicaService;

    @Autowired
    public PoliticaController(PoliticaService politicaService) {
        this.politicaService = politicaService;
    }

    @PostMapping
    public ResponseEntity<Politica> agregarPolitica (@RequestBody Politica politica) {
        politicaService.cargarPolitica(politica);
        return ResponseEntity.ok(politica);
    }
    @GetMapping
    public ResponseEntity<List<Politica>> listarPoliticas(){
        return ResponseEntity.ok(politicaService.buscarTodasPoliticas());
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<String> eliminarPolitica (@PathVariable Long id) throws ResourceNotFoundException {
        politicaService.eliminarPolitica(id);
        return ResponseEntity.ok("Se borró la politica con id: "+id);
    }
    @PutMapping
    public ResponseEntity<String> actualizarPolitica(@RequestBody Politica politica) throws ResourceNotFoundException, BadRequestException {
        politicaService.actualizarPolitica(politica);
        return ResponseEntity.ok("Se actualizó la politica con id: "+politica.getId());
    }
}
