package com.gps.scrapping.culm;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

import com.gps.dominio.Incidencia;
import com.gps.dominio.Noticia;

public class Scrapper {
	private static String URI_INCIDENCIAS = "http://culm.unizar.es/incidencias";
	private static String URI_NOTICIAS = "http://culm.unizar.es/noticias?page=";
	
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
		String descr = elemIncidencia.text();
		if (descr.startsWith("- ")){
			descr = descr.substring(1);
		}
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
			if (!uri.contains("https://")){
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
	
}
