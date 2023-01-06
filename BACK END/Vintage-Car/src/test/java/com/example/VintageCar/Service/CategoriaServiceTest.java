package com.example.VintageCar.Service;

import com.example.VintageCar.Entities.Categoria;
import com.example.VintageCar.Exception.ResourceNotFoundException;
import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
@SpringBootTest
class CategoriaServiceTest {

/*    @Autowired
    private CategoriaService categoriaService;

    @Test
    @Order(1)
    void agregarCategoria() {
        Categoria categoria = new Categoria();
        categoria.setTitulo("Deportivo");
        categoria.setDescripcion("Muuy bueno");
        categoria.setUrl_imagen("www.hola");
        Categoria categoriaGuardada = categoriaService.agregarCategoria(categoria);
        assertEquals(1,categoriaGuardada.getId());
    }

    @Test
    @Order(2)
    void listarCategorias() {
        List<Categoria> categoriasBuscadas = categoriaService.listarCategorias();
        assertNotNull(categoriasBuscadas);

    }

    @Test
    void eliminarCategoria() throws ResourceNotFoundException {
        categoriaService.eliminarCategoria(1L);
        Categoria categoriaBuscada = categoriaService.buscarCategoriaPorId(1L);
        assertNull(categoriaBuscada);
    }

    @Test
    @Order(3)
    void actualizarCategoria() throws ResourceNotFoundException {
        Categoria categoria = new Categoria();
        categoria.setId(1L);
        categoria.setTitulo("Deportivo1");
        categoria.setDescripcion("Muuy bueno");
        categoria.setUrl_imagen("www.hola");
        categoriaService.actualizarCategoria(categoria);
        Categoria categoriaBuscada = categoriaService.buscarCategoriaPorId(1L);
        assertEquals(categoria.getTitulo(),categoriaBuscada.getTitulo());

    }*/
}