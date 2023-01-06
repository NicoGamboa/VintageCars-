package com.example.VintageCar.Service;

import com.example.VintageCar.Entities.Categoria;
import com.example.VintageCar.Exception.ResourceNotFoundException;
import com.example.VintageCar.Repository.CategoriaRepository;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoriaService {
    private final CategoriaRepository categoriaRepository;
    private static final Logger logger = Logger.getLogger(CategoriaService.class);

    @Autowired
    public CategoriaService(CategoriaRepository categoriaRepository) {
        this.categoriaRepository = categoriaRepository;
    }

    public Categoria agregarCategoria(Categoria categoria){
        logger.info("Agregando categoria");
        return categoriaRepository.save(categoria);
    }
    public List<Categoria> listarCategorias (){
        logger.info("Buscando todas las categorias");
        return categoriaRepository.findAll();
    }
    public Categoria buscarCategoriaPorId(Long id){
        logger.info("Buscando Categoria id: "+id);
        Optional<Categoria> categoria = categoriaRepository.findById(id);
        Categoria categoria1 = null;
        if(categoria.isPresent()){
            categoria1=categoria.get();
        }
        return categoria1;
    }
    public void eliminarCategoria (Long id) throws ResourceNotFoundException {
        Categoria categoria = buscarCategoriaPorId(id);
        if (categoria!=null){
            logger.info("Lo encontramos, entonces lo eliminamos");
            categoriaRepository.deleteById(id);
        }else {
            logger.error("No existe la categoria con id= " + id);
            throw new ResourceNotFoundException("No existe la categoria con id= "+id);
        }
    }
    public Categoria actualizarCategoria (Categoria categoria) throws ResourceNotFoundException{
        Categoria categoria1 = buscarCategoriaPorId(categoria.getId());
        if (categoria1!=null){
            logger.info("Lo encontramos, entonces lo actualizamos");
            agregarCategoria(categoria);
            return categoria;
        }else {
            logger.error("No existe la categoria con id= " + categoria.getId());
            throw new ResourceNotFoundException("No existe la categoria con id= " + categoria.getId());
        }
    }
}
