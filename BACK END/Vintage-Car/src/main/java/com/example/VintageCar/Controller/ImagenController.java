package com.example.VintageCar.Controller;

import com.example.VintageCar.Entities.Imagen;
import com.example.VintageCar.Exception.BadRequestException;
import com.example.VintageCar.Exception.ResourceNotFoundException;
import com.example.VintageCar.Service.ImagenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/imagen")
public class ImagenController {

    private final ImagenService imagenService;

    @Autowired
    public ImagenController(ImagenService imagenService) {
        this.imagenService = imagenService;
    }

    @PostMapping
    public ResponseEntity<Imagen> agregarImagen (@RequestBody Imagen imagen) {
        imagenService.cargarImagen(imagen);
        return ResponseEntity.ok(imagen);
    }
    @GetMapping
    public ResponseEntity<List<Imagen>> listarImagenes(){
        return ResponseEntity.ok(imagenService.buscarTodasImagen());
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<String> eliminarImagen (@PathVariable Long id) throws ResourceNotFoundException {
        imagenService.eliminarImagen(id);
        return ResponseEntity.ok("Se borró la imagen con id: "+id);
    }
    @PutMapping
    public ResponseEntity<String> actualizarImagen(@RequestBody Imagen imagen) throws ResourceNotFoundException, BadRequestException {
        imagenService.actualizarImagen(imagen);
        return ResponseEntity.ok("Se actualizó la imagen con id: "+imagen.getId());
    }
}
