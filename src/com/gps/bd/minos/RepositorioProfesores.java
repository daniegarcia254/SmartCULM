package com.gps.bd.minos;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import com.gps.dominio.Profesor;

public class RepositorioProfesores {
	private Connection connection = null;
	private PreparedStatement preparedStatement = null;
	
	
	private List<Profesor> crearProfesores(ResultSet rs){
		ArrayList<Profesor> list = new ArrayList<Profesor>();
			// Parsear el 'ResultSet'
		
		try{
			while (rs.next()){
				String nombre = rs.getString("nombre");
				String primerApellido = rs.getString("apellido_1");
				String segundoApellido = rs.getString("apellido_2");
				String despacho = rs.getString("despacho");
				String seccion = rs.getString("seccion");
				String extension = rs.getString("extension");
				String mail = rs.getString("email");
				String tutorias = rs.getString("tutorias");
				String centro = rs.getString("centro");
				String campus = rs.getString("campus");
				String web = rs.getString("web");
				Profesor profesor = new Profesor(nombre, primerApellido, segundoApellido, despacho,
							seccion, extension, mail,centro, campus, tutorias, web);
				list.add(profesor);
			}

		} catch (SQLException e){
			e.printStackTrace();
		}
		return list; 
	}
	
	
	public List<Profesor> getProfesores(String name, String apellido1, String apellido2, 
											String centro, String campus, String seccion){
		ResultSet rs = null;
		boolean anterior = false; 
		String selectSQL = "SELECT nombre, apellido_1, apellido_2, despacho,"
				+ " seccion, extension, email, tutorias, centro, campus, web FROM vw_profesores_curso WHERE ";
		int[] indice = new int [6];
		int cuenta = 1; 
		if(name!=""){
			selectSQL += "UPPER(translate(nombre, '·ÈÌÛ˙¡…Õ”⁄', 'aeiouAEIOU')) "
					+ "LIKE UPPER(translate(?, '·ÈÌÛ˙¡…Õ”⁄', 'aeiouAEIOU')) ";
			anterior = true;
			indice[0] = cuenta;
			cuenta++;
		}
		if(apellido1!=""){
			if (anterior){
				selectSQL += "AND ";
			}
			selectSQL += "UPPER(translate(apellido_1, '·ÈÌÛ˙¡…Õ”⁄', 'aeiouAEIOU')) "
					+ "LIKE UPPER(translate(?, '·ÈÌÛ˙¡…Õ”⁄', 'aeiouAEIOU')) ";
			anterior = true;
			indice[1] = cuenta;
			cuenta++;
		}
		if(apellido2!=""){
			if (anterior){
				selectSQL += "AND ";
			}
			selectSQL += "UPPER(translate(apellido_2, '·ÈÌÛ˙¡…Õ”⁄', 'aeiouAEIOU')) "
					+ "LIKE UPPER(translate(?, '·ÈÌÛ˙¡…Õ”⁄', 'aeiouAEIOU')) ";
			anterior = true;
			indice[2] = cuenta;
			cuenta++;
		}
		if(centro!=""){
			if (anterior){
				selectSQL += "AND ";
			}
			selectSQL += "centro = ? ";
			anterior = true;
			indice[3] = cuenta;
			cuenta++;
		}
		if(campus!=""){
			if (anterior){
				selectSQL += "AND ";
			}
			selectSQL += "campus = ? ";
			anterior = true;
			indice[4] = cuenta;
			cuenta++;
		}
		if(seccion!=""){
			if (anterior){
				selectSQL += "AND ";
			}
			selectSQL += "UPPER(translate(seccion, '·ÈÌÛ˙¡…Õ”⁄', 'aeiouAEIOU')) "
					+ "LIKE UPPER(translate(?, '·ÈÌÛ˙¡…Õ”⁄', 'aeiouAEIOU'))";
			indice[5] = cuenta;
			cuenta++;
		}
		
		
		if(cuenta ==1){
			String[] temp = selectSQL.split("WHERE");
			selectSQL = temp[0];
			System.out.println("No argumentos de query");
		}
			
		System.out.println("Query: "+ selectSQL);
		try {
			preparedStatement = connection.prepareStatement(selectSQL);
			if(name!=""){
				preparedStatement.setString(indice[0], '%'+name+'%');
			}
			if(apellido1!=""){
				preparedStatement.setString(indice[1], '%'+apellido1+'%');
			}
			if(apellido2!=""){
				preparedStatement.setString(indice[2], '%'+apellido2+'%');
			}
			if(centro!=""){
				preparedStatement.setString(indice[3], centro);
			}
			if(campus!=""){
				preparedStatement.setString(indice[4], campus);
			}
			if(seccion!=""){
				preparedStatement.setString(indice[5], '%'+seccion+'%');
			}

			// Ejecutar select SQL statement
			rs = preparedStatement.executeQuery();

		} catch (SQLException e) {

			System.out.println(e.getMessage());

		}
		
		// llamar a crearServicios que devuelve la lista de cursos
		return crearProfesores(rs);
	
		
	}
	
	public List<Profesor> getAllProfesores(){
		ResultSet rs = null;
		ArrayList<Profesor> listProf = new ArrayList<Profesor>();
		
		String selectSQL = "SELECT (nombre || '-' || apellido_1 || '-' || apellido_2) as profesor "
				+ "FROM vw_profesores_curso order by nombre asc";
		
		try {
			preparedStatement = connection.prepareStatement(selectSQL);
			// Ejecutar select SQL statement
			rs = preparedStatement.executeQuery();
			
			while (rs.next()){
				String[] profPartes = rs.getString("profesor").split("-");
				Profesor prof;
				if (profPartes.length == 2){
					prof = new Profesor(profPartes[0], profPartes[1], "");
				} else {
					prof = new Profesor(profPartes[0], profPartes[1], profPartes[2]);
				}
				listProf.add(prof);
			}

		} catch (SQLException e) {
			System.out.println(e.getMessage());
		}
		
		return listProf;
		
	}
	
	/*
	 * Abre una conexiÛn con la Base de Datos.
	 */
	public void openDB(){
		
		connection = ConnectionManager.getConnection();

		if ( connection != null ) {
			System.out.println("Connected succesfully");
		} else {
			System.out.println("Failed to make connection");
		}

	}

	/*
	 * Cierra la conexiÛn con la Base de Datos, si la habÌa.
	 */
	public void closeDB(){
		if ( preparedStatement!=null ){
			try {
				preparedStatement.close();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
		if ( connection != null ) {
			try {
				connection.close();
				System.out.println("Connection closed");
			} catch (SQLException e) {
				e.printStackTrace();
			}
		} 
	}

}