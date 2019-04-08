package com.metrica.pojos;

import javax.persistence.*;

@Entity(name="baraja")
public class Baraja {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	private String nombre;
	private Integer cantidadCartas;
	private String marca;
	
	public String getMarca() {
		return marca;
	}

	public void setMarca(String marca) {
		this.marca = marca;
	}

	public Integer getCantidadCartas() {
		return cantidadCartas;
	}

	public void setCantidadCartas(Integer cantidadCartas) {
		this.cantidadCartas = cantidadCartas;
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public Baraja() {
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

}
