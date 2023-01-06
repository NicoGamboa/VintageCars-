package com.example.VintageCar.Service;

import com.example.VintageCar.Entities.Ciudad;
import com.example.VintageCar.Exception.ResourceNotFoundException;
import com.example.VintageCar.Repository.CiudadRepository;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CiudadService {
    private final CiudadRepository ciudadRepository;

    private static final Logger logger= Logger.getLogger(CiudadService.class);
    @Autowired
    public CiudadService(CiudadRepository ciudadRepository) {
        this.ciudadRepository = ciudadRepository;
    }
    public Ciudad guardarCiudad(Ciudad ciudad){
        logger.info("Agregando ciudad");
        return ciudadRepository.save(ciudad);
    }
    public Ciudad buscarCiudadPorId(Long id){
        logger.info("Buscando ciudad por id: "+id);
        Optional<Ciudad> ciudad = ciudadRepository.findById(id);
        Ciudad ciudad1 = null;
        if (ciudad.isPresent()){
            ciudad1=ciudad.get();
        }
        return ciudad1;
    }
    public List<Ciudad>listarCiudades(){
        logger.info("Buscando todas las ciudades");
        return ciudadRepository.findAll();
    }
    public void eliminarCiudad (Long id) throws ResourceNotFoundException {
        Ciudad ciudadAEliminar= buscarCiudadPorId(id);
        if (ciudadAEliminar!= null){
            logger.error("Lo encontramos, entonces lo eliminamos, id: "+id);
            ciudadRepository.deleteById(id);
        }
        else {
            logger.error("No existe la ciudad con id: "+id);
            throw new ResourceNotFoundException("No existe la categoria con id: "+id);
        }
    }
    public Ciudad actualizarCiudad (Ciudad ciudad) throws ResourceNotFoundException{
        Ciudad ciudad1 = buscarCiudadPorId(ciudad.getId());
        if(ciudad1!= null) {
            logger.info("Lo encontramos, entonces lo actualizamos" + ciudad.getId());
            guardarCiudad(ciudad);
            return ciudad;
        }else{
            logger.error("No existe la ciudad con id: "+ciudad.getId());
            throw new ResourceNotFoundException("No existe la ciudad con id: "+ciudad.getId());

        }

    }
}
