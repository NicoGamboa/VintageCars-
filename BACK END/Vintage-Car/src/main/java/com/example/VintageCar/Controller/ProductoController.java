package com.example.VintageCar.Controller;

import com.example.VintageCar.Entities.Imagen;
import com.example.VintageCar.Entities.Producto;
import com.example.VintageCar.Exception.BadRequestException;
import com.example.VintageCar.Exception.ResourceNotFoundException;
import com.example.VintageCar.Service.ProductoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/producto")
public class ProductoController {


    private final ProductoService productoService;

    @Autowired
    public ProductoController(ProductoService productoService) {
        this. productoService =  productoService;
    }


    //    @PreAuthorize("hasRole('ADMIN')"
    @PostMapping
    public ResponseEntity<Producto> cargarProducto (@RequestBody Producto producto) throws BadRequestException {
        productoService.cargarProducto(producto);
        return ResponseEntity.ok(producto);
    }
    @GetMapping
    public ResponseEntity<List<Producto>> buscarTodosProductos(){
        return ResponseEntity.ok(productoService.buscarTodosProductos());
    }
    @GetMapping("/{id}")
    public ResponseEntity<Producto> buscarProductoPorId(@PathVariable Long id) throws ResourceNotFoundException {
        return ResponseEntity.ok(productoService.buscarProductoPorId(id));
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<String> eliminarProducto (@PathVariable Long id) throws ResourceNotFoundException {
        productoService.eliminarProducto(id);
        return ResponseEntity.ok("Se borró el producto con id: "+id);
    }
    @PutMapping
    public ResponseEntity<String> actualizarProducto(@RequestBody Producto producto) throws ResourceNotFoundException, BadRequestException {
        productoService.actualizarProducto(producto);
        return ResponseEntity.ok("Se actualizó el producto con id: "+producto.getId());
    }

    @GetMapping("/id_ciudad/{ciudad}")
    public ResponseEntity<List<Producto>> buscarProductosPorCiudad(@PathVariable String ciudad) throws BadRequestException {
        return ResponseEntity.ok(productoService.buscarProductosPorCuidad(ciudad));
    }
    @GetMapping("/id_categoria/{id}")
    public ResponseEntity<List<Producto>> buscarProductosPorCategoria(@PathVariable Long id) {
        return ResponseEntity.ok(productoService.buscarProductosPorCategoria(id));
    }
    @GetMapping("id_ciudad/{ciudad}/fechainicio/{fechaInicio}/fechafin/{fechaFin}")
    public ResponseEntity <List<Producto>> buscarProductoPorUbicacionYFechas (@PathVariable String ciudad, @PathVariable String fechaInicio,@PathVariable String fechaFin) throws BadRequestException {
        LocalDate fechaInicio1 = LocalDate.parse(fechaInicio);
        LocalDate fechaFin1 = LocalDate.parse(fechaFin);
        Optional<List<Producto>> productosBuscados =productoService.buscarProductoPorFechasUbicacion(fechaInicio1,fechaFin1,ciudad);
        return productosBuscados.map(ResponseEntity::ok).orElseGet(()->ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }
    @GetMapping("fechainicio/{fechaInicio}/fechafin/{fechaFin}")
    public ResponseEntity <List<Producto>> buscarProductoPorYFechas ( @PathVariable String fechaInicio,@PathVariable String fechaFin) {
        LocalDate fechaInicio1 = LocalDate.parse(fechaInicio);
        LocalDate fechaFin1 = LocalDate.parse(fechaFin);
        Optional<List<Producto>> productosBuscados =productoService.buscarProductosPorFechas(fechaInicio1,fechaFin1);
        return productosBuscados.map(ResponseEntity::ok).orElseGet(()->ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }
}
