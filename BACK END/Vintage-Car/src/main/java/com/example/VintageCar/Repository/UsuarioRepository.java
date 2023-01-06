package com.example.VintageCar.Repository;

import com.example.VintageCar.Entities.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    Optional<Usuario> findUsuarioByEmail(String email);

    @Query(value ="SELECT * FROM usuarios where codigo_verificacion = ?1",nativeQuery = true)
    Usuario encontarUsuarioPorCodigoVerificacion(String code);
}
