package com.gps.scrapping.culm;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

import com.gps.dominio.Examen;
import com.gps.dominio.Incidencia;
import com.gps.dominio.Noticia;

public class Scrapper {
	private static String URI_INCIDENCIAS = "http://culm.unizar.es/incidencias";
	private static String URI_NOTICIAS = "http://culm.unizar.es/noticias?page=";
	private static String URI_EXAMENESJUNIO = "http://culm.unizar.es/convocatorias/convocatoria-junio";
	private static String URI_EXAMENESSEPTIEMBRE = "http://culm.unizar.es/convocatorias/convocatoria-septiembre";
	
	public Scrapper(){
	}
	
	/* INCIDENCIAS */
	
	/**
	 * Devuelve un objeto (propio de la librería del Web Scrapping) que contiene el listado
	 * de las incidencias que se encuentran en la página de incidencias del CULM.
	 * @return incidencias del CULM
	 * @throws IOException 
	 */
	private Elements scrapIncidencias() throws IOException {
		
		Document doc  = Jsoup.connect(URI_INCIDENCIAS).get();
		Elements incidencias = doc.getElementsByClass("field-items").get(0).getElementsByTag("p");

		return incidencias;
	}
	
	/**
	 * Devuelve el objeto Noticia correspondiente del objeto Element 'elemNoticia' (propio de
	 * la librería de Web Scrapping).
	 * @param elemNoticia
	 * @return Noticia
	 */
	private Incidencia getIncidencia(Element elemIncidencia, int id) {	
		
		String descr = elemIncidencia.html();
		
		Incidencia incidencia = new Incidencia(id, descr);
		
		return incidencia;		
	}
	
	/**
	 * Devuelve el listado de incidencias a partir del objeto Elements 'incidencias' 
	 * (propio de la librería de Web Scrapping).
	 * @param incidencias
	 * @return lista de incidencias
	 */
	private List<Incidencia> getListaIncidencias(Elements incidencias) {
		ArrayList<Incidencia> listaIncidencias = new ArrayList<Incidencia>();
		
		int id = 0;
		
		for(Element incidencia : incidencias) {
			
			if ( incidencia.text().length() > 1 ) { // evitar párrafos vacíos
				listaIncidencias.add( getIncidencia(incidencia, id) );
				id++;
			}
		}
		return listaIncidencias;
	}
	
	/**
	 * Devuelve una lista con todas las incidencias que aparecen en la página web del CULM.
	 * @return listado de incidencias
	 * @throws IOException 
	 * @throws JauntException 
	 * @throws NullPointerException 
	 */
	public List<Incidencia> getIncidencias() throws IOException {
		Elements incidencias = scrapIncidencias();
		if (incidencias==null){
			return null;
		} else {
			return getListaIncidencias( incidencias );
		}
		
	}
	
	
	
	/* NOTICIAS */
	
	/**
	 * Devuelve un objeto (propio de la librería del Web Scrapping) que contiene el listado
	 * de las noticias que se encuentran en la página número 'page' de Noticias del CULM.
	 * @param page
	 * @return noticias de la página 'page'
	 * @throws IOException 
	 */
	private Elements scrapNoticias(int page) throws IOException {

		Document doc  = Jsoup.connect(URI_NOTICIAS+page).get();
		Elements noticias = doc.getElementsByClass("view-content").get(0).getElementsByClass("listado-noticias-page");

		return noticias;
	}
	
	/**
	 * Devuelve el objeto Noticia correspondiente del objeto Element 'elemNoticia' (propio de
	 * la librería de Web Scrapping).
	 * @param elemNoticia
	 * @return Noticia
	 */
	private List<Noticia> getNoticias(Element elemNoticia) {
		ArrayList<Noticia> listaNoticias = new ArrayList<Noticia>();

		String fecha = elemNoticia.firstElementSibling().text();
		
		String[] parts = fecha.split("/");
		fecha = parts[2]+"-"+parts[1]+"-"+parts[0];
		
		Elements links = elemNoticia.getElementsByTag("ul").get(0).getElementsByTag("li");
		
		for ( Element link : links ) {
			
			Element ahref = link.getElementsByTag("div").get(0).getElementsByTag("a").get(0);
				
			String uri = ahref.attr("href");
			if (!uri.contains("http")){
				uri = "http://culm.unizar.es" + uri;
			}
			String description = ahref.text();
			
			Noticia noticia = new Noticia(fecha, description, uri);

			listaNoticias.add(noticia);
		}
		return listaNoticias;
		
	}
	
	/**
	 * Devuelve una lista con todas las noticias que aparecen en la página web del CULM.
	 * @return listado de noticias
	 * @throws IOException 
	 * @throws JauntException 
	 * @throws NullPointerException 
	 */
	public List<Noticia> getNoticias() throws IOException {
		ArrayList<Noticia> listaNoticias = new ArrayList<Noticia>();

		int page = 0, id = 0;
		Elements noticias = scrapNoticias(page);

		while ( noticias.size() > 0 ) {

			for(Element noticia : noticias) {
				List<Noticia> listaAux = getNoticias(noticia);
				
				for(Noticia noticiaAux : listaAux) {
					noticiaAux.setId(id);
					listaNoticias.add( noticiaAux );
					id++;
				}
			}
			page++;			
			noticias = scrapNoticias(page);
		}
		
		return listaNoticias;
		
	}
	
	
	/**
	 * Devuelve un objeto (propio de la librería del Web Scrapping) que contiene el listado
	 * de los examenes que se encuentran en la página examenes del CULM.
	 * @param option te muestra si la petición es de exámenes de Junio(=0) ó Septiembre(=1)
	 * @return examenes
	 */
	private Elements scrapExamenes(int option, boolean prof) {
		
		switch (option){
		case 0://Junio
			try {
				Document doc  = Jsoup.connect(URI_EXAMENESJUNIO).get();	
				
				//Si no hay enlaces para los exámenes, no se continua con el scraping
				if (doc.getElementsByClass("field-items").get(0).getElementsByTag("a").size() > 0){
					//Examenes por profesor
					if (prof){
						return doc.getElementsByTag("field-items").get(0).getElementsByTag("p");
						
					//Exámenes	
					} else {
						return doc.getElementsByTag("field-items").get(0).getElementsByTag("li");
					}
				} else {
					return null;
				}
			} catch (Exception e) {
				System.err.println(e);			
				return null;

			}
			
		case 1://Septiembre
			try {
				Document doc  = Jsoup.connect(URI_EXAMENESSEPTIEMBRE).get();	
				
				//Si no hay enlaces para los exámenes, no se continua con el scraping
				if (doc.getElementsByClass("field-items").get(0).getElementsByTag("a").size() > 0){
					Elements examenesLists = doc.getElementsByClass("field-items").get(0).getElementsByTag("ul");
					//Examenes por profeso
					if (prof){
						return examenesLists.get(1).getElementsByTag("li");

					//Exámenes	
					} else {
						return examenesLists.get(0).getElementsByTag("li").get(0).getElementsByTag("p");
					}
				} else {
					return null;
				}
			} catch (Exception e) {
				System.err.println(e);			
				return null;
			}
		}
		return null;
	}
	
	/**
	 * 
	 * 
	 * @param elemExamen
	 * @param prof
	 * @return
	 */
	private Examen getExamen(Element elemExamen, boolean prof) {
		
		if (elemExamen.html().startsWith("<a href")){
			Element ahref = elemExamen.getElementsByTag("a").get(0);
				
			String uri = ahref.attr("href");
			if (!uri.contains("http")){
				uri = "http://culm.unizar.es" + uri;
			}
			
			String asignatura = elemExamen.text();
			
			Examen examen = new Examen(prof, asignatura, uri);
			
			return examen;
			
		} else {
			return null;
		}
		
	}
	
	/**
	 * Devuelve una lista con todos los links a convocatorias de exámenes
	 *  que aparecen en la página web del CULM.
	 *  
	 * @return listado de noticias
	 */
	public List<Examen> getExamenes(int opcion)throws IOException {
		ArrayList<Examen> listaExamenes = new ArrayList<Examen>();

		Elements examenes = scrapExamenes(opcion,false);		//Scraping para examenes
		Elements examenesProf = scrapExamenes(opcion, true);	//Scraping para examenes por profesor
		
		//Examenes 
		if (examenes != null){
			for(Element examen : examenes) {

				if ( examen.text().length() > 1 ) { // evitar párrafos vacíos
					Examen ex = getExamen(examen,false);
					if (ex != null){
						listaExamenes.add(ex);
					}
				}
			}
		}
		
		//Exámenes por profesores
		if (examenesProf != null){
			for(Element examen : examenesProf) {

				if ( examen.text().length() > 1 ) { // evitar párrafos vacíos
					Examen ex = getExamen(examen,true);
					if (ex != null){
						listaExamenes.add(ex);
					}
				}
			}
		}

		return listaExamenes;
	}
}
