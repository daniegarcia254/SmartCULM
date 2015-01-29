package com.gps.dominio;

public class Noticia {
	private int id;
	private String fecha;
	private String descripcion;
	private String uri;
	
	public Noticia(String fecha, String descripcion, String uri) {
		this.fecha = fecha;
		this.descripcion = descripcion;
		this.uri = uri;
	}
	
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}
	
	public String getFecha() {
		return fecha;
	}

	public void setFecha(String fecha) {
		this.fecha = fecha;
	}

	public String getDescripcion() {
		return descripcion;
	}

	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}

	public String getUri() {
		return uri;
	}

	public void setUri(String uri) {
		this.uri = uri;
	}
	
		
}
