package com.gps.dominio;

public class Curso {
	private String idioma;
	private int curso;
	private String seccion;
	private String horario;
	private String dias;
	private Lugar lugar;
	private Profesor profesor;
	private String tipoMatricula;

	public Curso(String idioma, int curso, String seccion, String horario,
			String dias, Lugar lugar, Profesor profesor, String tipoMatricula) {
		this.idioma = idioma;
		this.curso = curso;
		this.seccion = seccion;
		this.horario = horario;
		this.dias = dias;
		this.lugar = lugar;
		this.profesor = profesor;
		this.tipoMatricula = tipoMatricula;
	}

	public String getIdioma() {
		return idioma;
	}

	public void setIdioma(String idioma) {
		this.idioma = idioma;
	}

	public int getCurso() {
		return curso;
	}

	public void setCurso(int curso) {
		this.curso = curso;
	}

	public String getSeccion() {
		return seccion;
	}

	public void setSeccion(String seccion) {
		this.seccion = seccion;
	}

	public String getHorario() {
		return horario;
	}

	public void setHorario(String horario) {
		this.horario = horario;
	}

	public String getDias() {
		return dias;
	}

	public void setDias(String dias) {
		this.dias = dias;
	}

	public Lugar getLugar() {
		return lugar;
	}

	public void setLugar(Lugar lugar) {
		this.lugar = lugar;
	}

	public Profesor getProfesor() {
		return profesor;
	}

	public void setProfesor(Profesor profesor) {
		this.profesor = profesor;
	}

	public String getTipoMatricula() {
		return tipoMatricula;
	}

	public void setTipoMatricula(String tipoMatricula) {
		this.tipoMatricula = tipoMatricula;
	}
}
