package com.example.VintageCar.Service;

import com.example.VintageCar.Entities.Caracteristica;
import com.example.VintageCar.Exception.ResourceNotFoundException;
import com.example.VintageCar.Repository.CaracteristicaRepository;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
public class CaracteristicaService {

    private final CaracteristicaRepository caracteristicaRepository;
    private static final Logger logger = Logger.getLogger(CaracteristicaService.class);

    @Autowired
    public CaracteristicaService(CaracteristicaRepository caracteristicaRepository) {
        this.caracteristicaRepository = caracteristicaRepository;
    }

    public Caracteristica buscarCaracteristicaPorId(Long id){
        logger.info("Buscando caracteristica id: "+id);
        Optional<Caracteristica> caracteristica = caracteristicaRepository.findById(id);
        Caracteristica caracteristica1 = null;
        if(caracteristica.isPresent()){
            caracteristica1=caracteristica.get();
        }
        return caracteristica1;
    }

    public List<Caracteristica> buscarTodasCaracteristica (){
        logger.info("Buscando todas las Caracteristica");
        return caracteristicaRepository.findAll();
    }
    public Caracteristica cargarCaracteristica (Caracteristica caracteristica) {
        logger.info("Cargamos la caracteristica");
        return caracteristicaRepository.save(caracteristica);

    }
    public void eliminarCaracteristica (Long id) throws ResourceNotFoundException {
        Caracteristica caracteristica = buscarCaracteristicaPorId(id);
        if (caracteristica!=null){
            logger.info("Lo encontramos, entonces lo eliminamos");
            caracteristicaRepository.deleteById(id);
        }else {
            logger.error("No existe la caracteristica con id= " + id);
            throw new ResourceNotFoundException("No existe la caracteristica con id= "+id);
        }
    }
    public Caracteristica actualizarCaracteristica (Caracteristica caracteristica) throws ResourceNotFoundException{
        Caracteristica caracteristica1 = buscarCaracteristicaPorId(caracteristica.getId());
        if (caracteristica1!=null){
            logger.info("Lo encontramos, entonces lo actualizamos");
            cargarCaracteristica(caracteristica);
            return caracteristica;
        }else {
            logger.error("No existe la caracteristica con id= " + caracteristica.getId());
            throw new ResourceNotFoundException("No existe la caracteristica con id= " +caracteristica.getId());
        }
    }
}
