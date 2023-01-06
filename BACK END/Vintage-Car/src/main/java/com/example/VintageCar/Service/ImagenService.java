package com.example.VintageCar.Service;

import com.example.VintageCar.Entities.Imagen;
import com.example.VintageCar.Exception.BadRequestException;
import com.example.VintageCar.Exception.ResourceNotFoundException;
import com.example.VintageCar.Repository.ImagenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import org.apache.log4j.Logger;

import java.util.List;
import java.util.Optional;

@Service
public class ImagenService {

    private final ImagenRepository imagenRepository;


    private static final Logger logger = Logger.getLogger(ImagenService.class);

    @Autowired
    public ImagenService(ImagenRepository imagenesRepository) {
        this.imagenRepository = imagenesRepository;
    }

    public Imagen buscarImagenPorID(Long id){
        logger.info("Buscando Imagen id: "+id);
        Optional<Imagen> imagen = imagenRepository.findById(id);
        Imagen imagen1 = null;
        if(imagen.isPresent()){
            imagen1=imagen.get();
        }
        return imagen1;
    }
    public List<Imagen> buscarTodasImagen(){
        logger.info("Buscando todas las imagenes");
        return imagenRepository.findAll();
    }

    public Imagen cargarImagen(Imagen imagen) {
        return imagenRepository.save(imagen);
    }
    public void eliminarImagen (Long id) throws ResourceNotFoundException {
        Imagen imagen = buscarImagenPorID(id);
        if (imagen!=null){
            logger.info("Lo encontramos, entonces lo eliminamos");
            imagenRepository.deleteById(id);
        }else {
            logger.error("No existe la imagen con id= " + id);
            throw new ResourceNotFoundException("No existe la imagen con id= "+id);
        }
    }
    public Imagen actualizarImagen (Imagen imagen) throws ResourceNotFoundException, BadRequestException {
        Imagen imagen1 = buscarImagenPorID(imagen.getId());
        if (imagen1!=null){
            logger.info("Lo encontramos, entonces lo actualizamos");
            cargarImagen(imagen);
            return imagen;
        }else {
            logger.error("No existe la imagen con id= " + imagen.getId());
            throw new ResourceNotFoundException("No existe la imagen con id= " +imagen.getId());
        }
    }
}
