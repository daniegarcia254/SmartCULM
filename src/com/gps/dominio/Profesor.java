package com.gps.dominio;

public class Profesor {
	private String nombre;
	private String primerApellido;
	private String segundoApellido;
	private String despacho;
	private String centro; 
	private String campus; 
	private String seccion; 
	private String extension;
	private String mail; 
	private String tutorias; 
	private String web;

	public Profesor(String nombre, String primerApellido, String segundoApellido, String despacho,
			 										String seccion, String extension, String mail, 
			 										 String centro, String campus, String tutorias, String web) {
		this.nombre = nombre;
		this.primerApellido = primerApellido;
		this.segundoApellido = segundoApellido;
		this.despacho = despacho; 
		this.seccion = seccion; 
		this.extension = extension;
		this.mail = mail; 
		this.tutorias = tutorias; 
		this.campus = campus; 
		this.centro = centro; 
		this.web = web;
	}
	
	public Profesor(String nombre, String primerApellido, String segundoApellido) {
		this.nombre = nombre;
		this.primerApellido = primerApellido;
		this.segundoApellido = segundoApellido;
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public String getPrimerApellido() {
		return primerApellido;
	}

	public void setPrimerApellido(String primerApellido) {
		this.primerApellido = primerApellido;
	}

	public String getSegundoApellido() {
		return segundoApellido;
	}

	public void setSegundoApellido(String segundoApellido) {
		this.segundoApellido = segundoApellido;
	}

	public String getDespacho() {
		return despacho;
	}

	public void setDespacho(String despacho) {
		this.despacho = despacho;
	}

	public String getSeccion() {
		return seccion;
	}

	public void setSeccion(String seccion) {
		this.seccion = seccion;
	}

	public String getExtension() {
		return extension;
	}

	public void setExtension(String extension) {
		this.extension = extension;
	}

	public String getMail() {
		return mail;
	}

	public void setMail(String mail) {
		this.mail = mail;
	}

	public String getTutorias() {
		return tutorias;
	}

	public void setTutorias(String tutorias) {
		this.tutorias = tutorias;
	}

	public String getCentro() {
		return centro;
	}

	public void setCentro(String centro) {
		this.centro = centro;
	}

	public String getCampus() {
		return campus;
	}

	public void setCampus(String campus) {
		this.campus = campus;
	}

	public String getWeb() {
		return web;
	}

	public void setWeb(String web) {
		this.web = web;
	}

}