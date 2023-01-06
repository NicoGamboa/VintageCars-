package com.example.VintageCar.Entities;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "productos")
public class Producto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String titulo;
    private String descripcion;
    private String img_principal;
    private Double latitud;
    private Double longitud;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "categoria_id", referencedColumnName = "id")
    private Categoria categoria;

    @OneToMany(mappedBy = "producto",cascade = CascadeType.ALL)
    private Set<Imagen> imagenes = new HashSet<>();

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "ciudad_id", referencedColumnName = "id")
    private Ciudad ciudad;


    @ManyToMany(cascade = {CascadeType.MERGE})
    @JoinTable(name = "producto_caracteristica",
            joinColumns =  @JoinColumn( name="id_producto") ,
            inverseJoinColumns =  @JoinColumn(name = "id_caracteristica")
    )
    Set<Caracteristica> caracteristicas= new HashSet<>();

    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(name = "id_politicas",referencedColumnName = "id")
    private Politica politica;
    @OneToMany(mappedBy = "producto",cascade = CascadeType.ALL)
    @JsonIgnore
    private Set<Reserva> reservas = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public Categoria getCategoria() {
        return categoria;
    }

    public String getImg_principal() {
        return img_principal;
    }

    public void setImg_principal(String img_principal) {
        this.img_principal = img_principal;
    }

    public Set<Imagen> getImagenes() {
        return imagenes;
    }

    public void setImagenes(Set<Imagen> imagenes) {
        this.imagenes = imagenes;
    }

    public Ciudad getCiudad() {
        return ciudad;
    }

    public Politica getPolitica() {
        return politica;
    }

    public void setCategoria(Categoria categoria) {
        this.categoria = categoria;
    }

    public void setCiudad(Ciudad ciudad) {
        this.ciudad = ciudad;
    }

    public void setCaracteristicas(Set<Caracteristica> caracteristicas) {
        this.caracteristicas = caracteristicas;
    }

    public void setPolitica(Politica politica) {
        this.politica = politica;
    }

    public Set<Caracteristica> getCaracteristicas() {
        return caracteristicas;
    }
    public Set<Reserva> getReservas() {
        return reservas;
    }

    public void setReservas(Set<Reserva> reservas) {
        this.reservas = reservas;
    }

    public Double getLatitud() {
        return latitud;
    }

    public void setLatitud(Double latitud) {
        this.latitud = latitud;
    }

    public Double getLongitud() {
        return longitud;
    }

    public void setLongitud(Double longitud) {
        this.longitud = longitud;
    }
}