package com.example.VintageCar.Service;


import com.example.VintageCar.Entities.Rol;
import com.example.VintageCar.Exception.ResourceNotFoundException;
import com.example.VintageCar.Repository.RolRepository;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RolService {
    private final RolRepository rolRepository;
    private static final Logger logger = Logger.getLogger(Rol.class);
    @Autowired
    public RolService(RolRepository rolRepository) {
        this.rolRepository = rolRepository;
    }

    public Rol guardarRol(Rol rol){
        logger.info("Agregando rol");
        return rolRepository.save(rol);
    }

    public Rol buscarRolPorId(Long id){
        logger.info("Buscando rol por id:" + id);
        Optional<Rol> rol = rolRepository.findById(id);
        Rol rol1=null;
        if(rol.isPresent()){
            rol1= rol.get();
        }
        return rol1;
    }
    public List<Rol> listarRoles() {
        logger.info("Buscando todas los roles");
        return rolRepository.findAll();
    }
    public void eliminarRol (Long id) throws ResourceNotFoundException {
        Rol rolAEliminar=buscarRolPorId(id);
        if(rolAEliminar != null){
            logger.error("Lo encontramos, entonces lo eliminamos, id:" +id);
            rolRepository.deleteById(id);
        }
        else{
            logger.error("No existe el rol con id:" + id);
            throw new ResourceNotFoundException("No existe la categoria con id:" + id);
        }
    }

    public Rol actualizarRol (Rol rol) throws ResourceNotFoundException {
        Rol rol1 = buscarRolPorId(rol.getId());
        if(rol1 != null){
            logger.info("Lo encontramos, entonces lo actualizamos" + rol.getId());
            guardarRol(rol);
            return rol;
        } else{
            logger.error("No existe el rol con id:" + rol.getId());
            throw new ResourceNotFoundException("No existe el rol con id:" + rol.getId());

        }
    }

}
