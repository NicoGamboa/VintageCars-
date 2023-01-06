package com.example.VintageCar.Service;

import com.example.VintageCar.Entities.Producto;
import com.example.VintageCar.Entities.Reserva;
import com.example.VintageCar.Entities.Usuario;
import com.example.VintageCar.Exception.BadRequestException;
import com.example.VintageCar.Exception.ResourceNotFoundException;
import com.example.VintageCar.Repository.ReservaRepository;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ReservaService {
    private final ReservaRepository reservaRepository;
    private final UsuarioService usuarioService;
    private final ProductoService productoService;
    private static final Logger logger = Logger.getLogger(Reserva.class);

    @Autowired
    public ReservaService(ReservaRepository reservaRepository, UsuarioService usuarioService, ProductoService productoService) {
        this.reservaRepository = reservaRepository;
        this.usuarioService = usuarioService;
        this.productoService = productoService;
    }

    public Reserva buscarReservaPorId(Long id) {
        logger.info("Buscando reserva id: " + id);
        Optional<Reserva> reserva = reservaRepository.findById(id);
        Reserva reserva1 = null;
        if (reserva.isPresent()) {
            reserva1 = reserva.get();
        }
        return reserva1;
    }

    public List<Reserva> buscarTodasReservas() {
        logger.info("Buscando todas las Reservas");
        return reservaRepository.findAll();
    }
    public List<Reserva> buscarTodasReservasPorProducto(Long id) {
        logger.info("Buscando todas las Reservas con producto id: "+id);
        return reservaRepository.findAllReservaByProducto_id(id);
    }
    public List<Reserva> buscarTodasReservasPorUsuario(Long id) {
        logger.info("Buscando todas las Reservas con usuario id: "+id);
        return reservaRepository.findAllReservaByUsuario_id(id);
    }

    public Reserva cargarReserva(Reserva reserva) throws BadRequestException, ResourceNotFoundException {
        logger.info("Verificamos que el usuario y producto existan");
        Usuario usuarioBuscado = usuarioService.buscarUsuarioPorId(reserva.getUsuario().getId());
        Producto productoBuscado = productoService.buscarProductoPorId(reserva.getProducto().getId());
        List<Reserva> reservas = reservaRepository.findReservasPorFechas(reserva.getInicioReserva(),reserva.getFinReserva(),reserva.getProducto().getId());
        if (usuarioBuscado!=null&&productoBuscado!=null) {
            logger.info("Verificamos que el producto no este reservado");
            if(reservas.size()!=0){
                throw new BadRequestException("Ya hay una reserva de este producto en la fecha seleccionada");
            }else {
                logger.info("Cargamos la reserva");
                reserva.setUsuario(usuarioBuscado);
                return reservaRepository.save(reserva);
            }
        }else {
            throw new BadRequestException("Usuario y/o producto no existen");
        }
    }

    public void eliminarReserva(Long id) throws ResourceNotFoundException {
        Reserva reserva = buscarReservaPorId(id);
        if (reserva != null) {
            logger.info("Lo encontramos, entonces lo eliminamos");
            reservaRepository.deleteById(id);
        } else {
            logger.error("No existe la reserva con id= " + id);
            throw new ResourceNotFoundException("No existe la reserva con id= " + id);
        }
    }

    public Reserva actualizarReserva(Reserva reserva) throws ResourceNotFoundException, BadRequestException {
        Reserva reserva1 = buscarReservaPorId(reserva.getId());
        if (reserva1 != null) {
            logger.info("Lo encontramos, entonces lo actualizamos");
            cargarReserva(reserva);
            return reserva;
        } else {
            logger.error("No existe la reserva con id= " + reserva.getId());
            throw new ResourceNotFoundException("No existe la reserva con id= " + reserva.getId());
        }
    }
}
