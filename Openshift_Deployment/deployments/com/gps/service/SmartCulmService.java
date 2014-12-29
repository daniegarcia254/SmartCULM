package com.gps.service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import com.google.gson.Gson;
import com.gps.dominio.Examen;
import com.gps.dominio.Noticia;
import com.gps.dominio.Incidencia;
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

} 