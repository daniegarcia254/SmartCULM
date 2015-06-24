package rest.smartculm.dominio;

public class Examen {
	
	private boolean esProfesor;
	private String asignatura;
	private String URI;

	public Examen(boolean esProfesor, String asignatura, String URI){
		this.esProfesor = esProfesor;
		this.asignatura = asignatura;
		this.URI = URI;
	}
	
	public boolean getEsProfesor() {
		return esProfesor;
	}

	public void setEsProfesor(boolean esProfesor) {
		this.esProfesor = esProfesor;
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