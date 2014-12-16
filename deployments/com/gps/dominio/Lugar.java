package com.gps.dominio;

public class Lugar {
	private String aula;
	private String edificio;

	public Lugar(String aula, String edificio) {
		this.aula = aula;
		this.edificio = edificio;
	}

	public String getAula() {
		return aula;
	}

	public void setAula(String aula) {
		this.aula = aula;
	}

	public String getEdificio() {
		return edificio;
	}

	public void setEdificio(String edificio) {
		this.edificio = edificio;
	}


}
