package com.gps.dominio;

public class Examen {
	
	private boolean profesor;
	private String asignatura;
	private String URI;

	public Examen(boolean profesor, String asignatura, String URI){
		this.profesor = profesor;
		this.asignatura = asignatura;
		this.URI = URI;
	}
	
	public boolean getProfesor() {
		return profesor;
	}

	public void setProfesor(boolean profesor) {
		this.profesor = profesor;
	}
	
	public String getAsignatura() {
		return asignatura;
	}

	public void setAsignatura(String asignatura) {
		this.asignatura = asignatura;
	}

	public String getURI() {
		return URI;
	}

	public void setURI(String uRI) {
		URI = uRI;
	}

}