package com.example.VintageCar.Service;

import com.example.VintageCar.Entities.Imagen;
import com.example.VintageCar.Entities.Politica;
import com.example.VintageCar.Entities.Producto;
import com.example.VintageCar.Exception.BadRequestException;
import com.example.VintageCar.Exception.ResourceNotFoundException;
import com.example.VintageCar.Repository.ProductoRepository;
import com.example.VintageCar.Repository.ReservaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import org.apache.log4j.Logger;

import java.time.LocalDate;
import java.util.*;

@Service
public class ProductoService {

    private final ProductoRepository productoRepository;

    private final CategoriaService categoriaService;

    private final CiudadService ciudadService;
    private final PoliticaService politicaService;
    private final ReservaRepository reservaRepository;
    private final ImagenService imagenService;


    private static final Logger logger = Logger.getLogger(ProductoService.class);
    @Autowired
    public ProductoService(ProductoRepository productoRepository, CategoriaService categoriaService, CiudadService ciudadService, PoliticaService politicaService, ReservaRepository reservaRepository, ImagenService imagenService) {
        this.productoRepository = productoRepository;
        this.categoriaService = categoriaService;
        this.ciudadService = ciudadService;
        this.politicaService = politicaService;
        this.reservaRepository = reservaRepository;
        this.imagenService = imagenService;
    }

    public Producto buscarProductoPorId(Long id) throws ResourceNotFoundException{
        logger.info("Buscando Producto id: "+id);
        Optional<Producto> producto = productoRepository.findById(id);
        Producto producto1 = null;
        if(producto.isPresent()){
            return producto1=producto.get();
        }else {
            throw new ResourceNotFoundException("Usuario no encontrado");
        }
    }
    public Long buscarIdDeCiudad (String ciudad) throws BadRequestException {
        String ciudad1 = ciudad.toUpperCase();
        Long id = null;
        logger.info("Verificando la provincia " + ciudad1);
        if (ciudad1.equals("CATAMARCA")) {
            return id = 1L;
        } else if (ciudad1.equals("BUENOS AIRES")) {
            return id = 2L;
        } else if (ciudad1.equals("ROSARIO")) {
            return id = 3L;

        } else if (ciudad1.equals("CORDOBA")) {
            return id = 4L;

        } else if (ciudad1.equals("MENDOZA")) {
            return id = 5L;

        } else {
            throw new BadRequestException("Provincia invalida");
        }
    }

    public List<Producto> buscarTodosProductos (){
        logger.info("Buscando todos los productos");
        return productoRepository.findAll();
    }
    public Producto cargarProducto (Producto producto) throws BadRequestException {
        logger.info("Verificamos si existen la categoria, la ciudad ");
        Producto productoCargar = new Producto();
        if(categoriaService.buscarCategoriaPorId(producto.getCategoria().getId())!=null&&ciudadService.buscarCiudadPorId(producto.getCiudad().getId())!=null){
            logger.info("La categoria y la ciudad  existen, entonces cargamos el producto");
            Politica politica = politicaService.cargarPolitica(producto.getPolitica());
            producto.setPolitica(politica);
            HashSet<Imagen> imagenes = new HashSet<>();
            productoCargar =  productoRepository.save(producto);
            for (Imagen imagen:
                    producto.getImagenes()) {
                imagen.setProducto(producto);
                Imagen imagenCargar = imagenService.cargarImagen(imagen);
                imagenes.add(imagenCargar);
            }
            return productoCargar;
        }else {
            logger.error("La categoria y/o la ciudad y/o politicas no existe");
            throw new BadRequestException("La categoria y/o la ciudad y/o politicas no existe");
        }
    }
    public void eliminarProducto (Long id) throws ResourceNotFoundException {
        Producto producto = buscarProductoPorId(id);
        if (producto!=null){
            logger.info("Lo encontramos, entonces lo eliminamos");
            productoRepository.deleteById(id);
        }else {
            logger.error("No existe el producto con id= " + id);
            throw new ResourceNotFoundException("No existe el producto con id= "+id);
        }
    }
    public Producto actualizarProducto (Producto producto) throws ResourceNotFoundException, BadRequestException {
        Producto producto1 = buscarProductoPorId(producto.getId());
        if (producto1!=null){
            logger.info("Lo encontramos, entonces lo actualizamos");
            //cargarProducto(producto);
            return producto;
        }else {
            logger.error("No existe el producto con id= " + producto.getId());
            throw new ResourceNotFoundException("No existe el producto con id= " +producto.getId());
        }
    }
    public List<Producto> buscarProductosPorCuidad (String ciudad) throws BadRequestException {
        Long id = buscarIdDeCiudad(ciudad);
        return productoRepository.findAllByCiudad_id(id);
    }
    public List<Producto> buscarProductosPorCategoria (Long id)  {
        logger.info("Filtrando por categoria con id: "+id);
        return productoRepository.findAllByCategoria_id(id);

    }
    public Optional<List<Producto>> buscarProductosPorFechas (LocalDate fechaInicio, LocalDate fechaFinal)  {
        logger.info("Filtrando por fechas");
        return productoRepository.findProductoPorFechas(fechaInicio,fechaFinal);

    }
    public Optional<List<Producto>> buscarProductoPorFechasUbicacion (LocalDate fechaInicio, LocalDate fechaFinal, String ciudad) throws BadRequestException {
        logger.info("Buscando por fechas y ubicacion");
        String ciudad1 = ciudad.toUpperCase();
        logger.info("Verificando la provincia " + ciudad1);
        Long id = buscarIdDeCiudad(ciudad);
        return productoRepository.findProductoPorFechasUbicacion(fechaInicio,fechaFinal,id);
    }
}