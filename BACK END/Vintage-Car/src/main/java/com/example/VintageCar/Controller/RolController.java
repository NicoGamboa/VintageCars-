package com.example.VintageCar.Controller;

import com.example.VintageCar.Entities.Rol;
import com.example.VintageCar.Exception.ResourceNotFoundException;
import com.example.VintageCar.Service.RolService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/rol")
public class RolController {

    private final RolService rolService;

    @Autowired
    public RolController(RolService rolService) {
        this.rolService = rolService;
    }

    @PostMapping
    public ResponseEntity<Rol>agregarRol(@RequestBody Rol rol){
        rolService.guardarRol(rol);
        return ResponseEntity.ok(rol);
    }

    @GetMapping
    public ResponseEntity<List<Rol>> listarRol(){
        return ResponseEntity.ok(rolService.listarRoles());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Rol> buscarRolPorId(@PathVariable Long id){
        return ResponseEntity.ok(rolService.buscarRolPorId(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> eliminarRol(@PathVariable Long id) throws ResourceNotFoundException {
        rolService.eliminarRol(id);
        return ResponseEntity.ok("Se borró el rol con id:" + id);
    }

    @PutMapping
    public ResponseEntity<String> actualizarRol(@RequestBody Rol rol) throws ResourceNotFoundException {
        rolService.actualizarRol(rol);
        return ResponseEntity.ok("Se actualizó el rol con id:" + rol);
    }
}
