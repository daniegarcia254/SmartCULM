package rest.smartculm.dominio;

public class Curso {
	
	private String centro;
	private String campus;
	private String idioma;
	private String profesor;
	private String nivel;
	private String horario;
	private String dias;
	private String estado;	
	private String curso;
	private String seccion;
	private String aula;
	private String edificio;
	private String tipoMatricula;
	private String profeCompletoJson;

	//Constructor para crear Curso con los parametros de busqueda del formulario de la GUI
	public Curso(String centro, String campus, String tipoMatricula, String seccion,
			String profesor, String nivel, String dias, String aula, String edificio, String horario) {
		this.centro = centro;
		this.campus = campus;
		this.tipoMatricula = tipoMatricula;
		this.seccion = seccion;
		this.profesor = profesor;
		this.nivel = nivel;
		this.dias = dias;
		this.aula = aula;
		this.edificio = edificio;
		this.horario = horario;
	}
	
	
	//Constructor para crear Curso para devolver a la app como resultado de una consulta SQL
	public Curso(String idioma, String curso, String profesor, String horario, 
			String dias, String aula, String edificio, String tipoMatricula) {
		this.idioma = idioma;
		this.curso = curso;
		this.profesor = profesor;
		this.horario = horario;
		this.dias = dias;
		this.aula = aula;
		this.edificio = edificio;
		this.tipoMatricula = tipoMatricula;
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


	public String getIdioma() {
		return idioma;
	}


	public void setIdioma(String idioma) {
		this.idioma = idioma;
	}


	public String getProfesor() {
		return profesor;
	}


	public void setProfesor(String profesor) {
		this.profesor = profesor;
	}


	public String getNivel() {
		return nivel;
	}


	public void setNivel(String nivel) {
		this.nivel = nivel;
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


	public String getEstado() {
		return estado;
	}


	public void setEstado(String estado) {
		this.estado = estado;
	}


	public String getCurso() {
		return curso;
	}


	public void setCurso(String curso) {
		this.curso = curso;
	}


	public String getSeccion() {
		return seccion;
	}


	public void setSeccion(String seccion) {
		this.seccion = seccion;
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


	public String getTipoMatricula() {
		return tipoMatricula;
	}


	public void setTipoMatricula(String tipoMatricula) {
		this.tipoMatricula = tipoMatricula;
	}


	public String getProfeCompletoJson() {
		return profeCompletoJson;
	}
	
	public void setProfeCompletoJson(String profeCompletoJson) {
		this.profeCompletoJson = profeCompletoJson;
	}
}
