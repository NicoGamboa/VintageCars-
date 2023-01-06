package com.example.VintageCar.Controller;

import com.example.VintageCar.Entities.Categoria;
import com.example.VintageCar.Exception.ResourceNotFoundException;
import com.example.VintageCar.Service.CategoriaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/categorias")
public class CategoriaController {

    private final CategoriaService categoriaService;

    @Autowired
    public CategoriaController(CategoriaService categoriaService) {
        this.categoriaService = categoriaService;
    }

    @PostMapping
    public ResponseEntity<Categoria> agregarCategoria (@RequestBody Categoria categoria){
        categoriaService.agregarCategoria(categoria);
        return ResponseEntity.ok(categoria);
    }
    @GetMapping
    public ResponseEntity<List<Categoria>> listarCategorias(){
        return ResponseEntity.ok(categoriaService.listarCategorias());
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<String> eliminarCategoria (@PathVariable Long id) throws ResourceNotFoundException {
        categoriaService.eliminarCategoria(id);
        return ResponseEntity.ok("Se borró la categoria con id: "+id);
    }
    @PutMapping
    public ResponseEntity<String> actualizarCategoria(@RequestBody Categoria categoria) throws ResourceNotFoundException{
        categoriaService.actualizarCategoria(categoria);
        return ResponseEntity.ok("Se actualizó la categoria con id: "+categoria.getId());
    }

}
