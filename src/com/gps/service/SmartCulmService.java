package com.gps.service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import com.google.gson.Gson;
import com.gps.bd.minos.RepositorioCurso;
import com.gps.bd.minos.RepositorioProfesores;
import com.gps.dominio.Curso;
import com.gps.dominio.Examen;
import com.gps.dominio.Noticia;
import com.gps.dominio.Incidencia;
import com.gps.dominio.Profesor;
import com.gps.scrapping.culm.Scrapper;


@Path("/smartculm-service")
public class SmartCulmService {
	
	/**
	 * Devuelve el listado de incidencias que aparecen en la página web del Centro 
	 * Universitario de Lenguas Modernas.
	 * 
	 * @return lista de incidencias del CUML
	 */
	@Path("/incidencias")
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public String getIncidencias() {
		
		Scrapper scrapper = new Scrapper();
		Gson gson = new Gson();
		List<Incidencia> incidencias = null;
		List<String> incidenciasError = null;
		
		try{
			incidencias = scrapper.getIncidencias();
			
			if (incidencias == null){
				incidenciasError = new ArrayList<String>();
				incidenciasError.add("No hay incidencias");
				return gson.toJson(incidenciasError);
			}
					
			String response = gson.toJson(incidencias);
			return response;
			
		} catch (IOException e){
			System.err.println(e);
			incidenciasError = new ArrayList<String>();
			incidenciasError.add("Jaunt Scrapping library Error");
			return gson.toJson(incidenciasError);
			
		}
	}
	
	@Path("/noticias")
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public String getNoticias() {
		
		Scrapper scrapper = new Scrapper();
		Gson gson = new Gson();
		List<Noticia> noticias = null;
		List<String> noticiasError = null;
		
		try{
			noticias = scrapper.getNoticias();
				
			String response = gson.toJson(noticias);
			
			return response;
		
		} catch (IOException e){
			System.err.println(e);
			noticiasError = new ArrayList<String>();
			noticiasError.add("Jaunt Scrapping library Error");
			return gson.toJson(noticiasError);
			
		}
	}
	
	@Path("/examenesJunio")
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public String getExamenesJunio() {
		
		Scrapper scrapper = new Scrapper();
		Gson gson = new Gson();
		List<Examen> examenes = null;
		List<String> examenesError = null;
		
		try{
			examenes = scrapper.getExamenes(0);
				
			String response = gson.toJson(examenes);
			
			return response;
		
		} catch (IOException e){
			System.err.println(e);
			examenesError = new ArrayList<String>();
			examenesError.add("Jaunt Scrapping library Error");
			return gson.toJson(examenesError);
			
		}
	}
	
	@Path("/examenesSeptiembre")
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public String getExamenesSeptiembre() {
		
		Scrapper scrapper = new Scrapper();
		Gson gson = new Gson();
		List<Examen> examenes = null;
		List<String> examenesError = null;
		
		try{
			examenes = scrapper.getExamenes(1);
				
			String response = gson.toJson(examenes);
			
			return response;
		
		} catch (IOException e){
			System.err.println(e);
			examenesError = new ArrayList<String>();
			examenesError.add("Jaunt Scrapping library Error");
			return gson.toJson(examenesError);
			
		}
	}
	
	@Path("/profesores")
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	public String getProfesores(String json) {

		List<Profesor> profesores = null; 
		Gson gson = new Gson();
		Profesor prof = gson.fromJson(json, Profesor.class);
		RepositorioProfesores repoProf = new RepositorioProfesores(); 
		repoProf.openDB(); 
		String nombre = prof.getNombre();
		String apellido1 = prof.getPrimerApellido();
		String apellido2 = prof.getSegundoApellido();
		String centro =	prof.getCentro();	
		String campus = prof.getCampus(); 
		String seccion = prof.getSeccion(); 

		if (nombre.compareTo("all")==0){
			profesores = repoProf.getAllProfesores();
		} else {
			if(nombre.length()==0){
				nombre="";
			}
			if(apellido1.length()==0){
				apellido1="";
			}
			if(apellido2.length()==0){
				apellido2="";
			}
			if(centro.length()==0){
				centro="";
			}
			if(campus.length()==0){
				campus="";
			}
			if(seccion.length()==0){
				seccion="";
			}
			profesores = repoProf.getProfesores(nombre, apellido1, apellido2, centro, campus, seccion);
		}
		repoProf.closeDB(); 
		return gson.toJson(profesores);
	}
	
	@Path("/horarios")
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	public String getHorarios(String json) {
		
		Gson gson = new Gson();
		Curso curso = gson.fromJson(json, Curso.class);
		String response = "";
		
		if (curso != null){
			RepositorioCurso rc = new RepositorioCurso();
			rc.openDB();
			
			if (curso.getHorario().compareTo("-----------")==0){
				curso.setHorario("");
			}
			
			List<Curso> cursos = rc.getCursos(curso.getCentro(), curso.getCampus(), curso.getTipoMatricula(), 
					curso.getSeccion(), curso.getProfesor(), curso.getNivel(), curso.getDias(),
					curso.getAula(), curso.getEdificio(), curso.getHorario());
			
			gson = new Gson();
			response = gson.toJson(cursos);
		} else {
			response = "[{}]";
		}
		
		return response;
	}

} 