package com.example.VintageCar.Service;

import com.example.VintageCar.Entities.Politica;
import com.example.VintageCar.Exception.BadRequestException;
import com.example.VintageCar.Exception.ResourceNotFoundException;
import com.example.VintageCar.Repository.PoliticaRepository;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PoliticaService {

    private final PoliticaRepository politicaRepository;
    private static final Logger logger = Logger.getLogger(PoliticaService.class);

    @Autowired
    public PoliticaService(PoliticaRepository politicaRepository) {
        this.politicaRepository = politicaRepository;
    }

    public Politica buscarPoliticaPorID (Long id){
        logger.info("Buscando politica id: "+id);
        Optional<Politica> politica = politicaRepository.findById(id);
        Politica politica1 = null;
        if(politica.isPresent()){
            politica1=politica.get();
        }
        return politica1;
    }
    public List<Politica> buscarTodasPoliticas(){
        logger.info("Buscando todas las politicas");
        return politicaRepository.findAll();
    }

    public Politica cargarPolitica(Politica politica) {
        return politicaRepository.save(politica);
    }
    public void eliminarPolitica (Long id) throws ResourceNotFoundException {
        Politica politica = buscarPoliticaPorID(id);
        if (politica!=null){
            logger.info("Lo encontramos, entonces lo eliminamos");
            politicaRepository.deleteById(id);
        }else {
            logger.error("No existe la politica con id= " + id);
            throw new ResourceNotFoundException("No existe la politica con id= "+id);
        }
    }
    public Politica actualizarPolitica (Politica politica) throws ResourceNotFoundException, BadRequestException {
        Politica politica1 = buscarPoliticaPorID(politica.getId());
        if (politica1!=null){
            logger.info("Lo encontramos, entonces lo actualizamos");
            cargarPolitica(politica);
            return politica;
        }else {
            logger.error("No existe la politica con id= " + politica.getId());
            throw new ResourceNotFoundException("No existe la politica con id= " +politica.getId());
        }
    }
}
