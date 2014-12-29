package com.gps.bd.minos;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import com.gps.dominio.Curso;
import com.gps.dominio.Lugar;
import com.gps.dominio.Profesor;

public class RepositorioCurso {
	private Connection connection = null;
	private PreparedStatement preparedStatement = null;

	private List<Curso> crearCursos(ResultSet rs){
		ArrayList<Curso> list = new ArrayList<Curso>();
		
		// Parsear el 'ResultSet'
		try{

			while (rs.next()){
				String idioma = rs.getString("idioma");
				int curso = rs.getInt("curso");
				String seccion = rs.getString("seccion");
				String horario = rs.getString("horario");
				String dias = rs.getString("dias");

				String aula = rs.getString("aula");
				String edificio = rs.getString("edificio");
				Lugar lugar = new Lugar(aula, edificio);

				String nombre = rs.getString("nombre");
				String primerApellido = rs.getString("apellido_1");
				String segundoApellido = rs.getString("apellido_2");
				Profesor profesor = new Profesor(nombre, primerApellido, segundoApellido);

				String tipoMatricula = rs.getString("tipo_matricula");
				
				// Creamos y añadimos el Curso a nuestra lista
				list.add(new Curso(idioma, curso, seccion, horario, dias, lugar, profesor, tipoMatricula));
			}

		} catch (SQLException e){
			e.printStackTrace();
		}

		return list;
	}

	public List<Curso> getCursos(String idioma){
		ResultSet rs = null;
		String selectSQL = "SELECT * FROM vw_grupos_curso WHERE seccion = ?";

		try {
			preparedStatement = connection.prepareStatement(selectSQL);
			preparedStatement.setString(1, idioma.toUpperCase());

			// Ejecutar select SQL statement
			rs = preparedStatement.executeQuery();

		} catch (SQLException e) {

			System.out.println(e.getMessage());

		}
		
		// llamar a crearServicios que devuelve la lista de cursos
		return crearCursos(rs);
	}

	/*
	 * Abre una conexión con la Base de Datos.
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
	 * Cierra la conexión con la Base de Datos, si la había.
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
