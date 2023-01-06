package com.example.VintageCar.Controller;

//import com.example.VintageCar.Email.EmailService;
import com.example.VintageCar.Entities.Usuario;
import com.example.VintageCar.Exception.ResourceNotFoundException;
import com.example.VintageCar.Service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@RequestMapping("/usuario")
public class UsuarioController {
    private final UsuarioService usuarioService;
    @Autowired
    public UsuarioController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    @Value("${frontEndUrl}")
    private String frontendUrl;
    @PostMapping
    public ResponseEntity<Usuario> agregarUsuario(@RequestBody Usuario usuario,HttpServletRequest request) throws Exception {
        usuarioService.cargarUsuario(usuario,frontendUrl);
        return ResponseEntity.status(201).body(usuario);
    }

    @GetMapping
    public ResponseEntity<List<Usuario>>listarUsuario(){
        return ResponseEntity.ok(usuarioService.buscarTodasUsuarios());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Usuario> buscarUsuarioPorId(@PathVariable Long id){
        return ResponseEntity.ok(usuarioService.buscarUsuarioPorId(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> eliminarUsuario(@PathVariable Long id) throws ResourceNotFoundException {
        usuarioService.eliminarUsuario(id);
        return ResponseEntity.ok("Se borró el usuario con id"+ id);
    }
    @PostMapping("/verify")
    public String verifyUser(@Param("code") String code) {
        if (usuarioService.verify(code)) {
            return "verify_success";
        } else {
            return "verify_fail";
        }
    }
}
