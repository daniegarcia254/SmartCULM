package com.gps.bd.minos;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import com.gps.dominio.Curso;

public class RepositorioCurso {
	private Connection connection = null;
	private PreparedStatement preparedStatement = null;

	private List<Curso> crearCursosBuscador(ResultSet rs){
		ArrayList<Curso> list = new ArrayList<>();
		
		// Parsear el 'ResultSet'
		try{
			while (rs.next()){
				String idioma = rs.getString("idioma");
				String curso = rs.getString("curso");
				String profesor = rs.getString("nombre") + " " + rs.getString("apellido_1") + 
						" " + rs.getString("apellido_2");
				if (profesor.endsWith("null")){
					profesor = profesor.substring(0, profesor.indexOf("null"));
				}
				String horario = rs.getString("horario");
				String dias = rs.getString("dias");
				String aula = rs.getString("aula");
				String edificio = rs.getString("edificio");
				String tipoMatricula = rs.getString("tipo_matricula");
				
				// Creamos y añadimos el Curso a nuestra lista
				list.add(new Curso(idioma, curso, profesor, horario, dias, aula, edificio, tipoMatricula));
			}

		} catch (SQLException e){
			e.printStackTrace();
		}

		return list;
	}
	
	/*
	 * Devuelve el listado de cursos cuyas caracteristicas coinciden con los
	 * valores introducidos por parametro
	 */
	public List<Curso> getCursos(String centro, String campus, String tipoMatricula, String seccion,
			String profesor, String nivel, String dias, String aula, String edificio, String horario) {
		
		ResultSet rs = null;
		String selectSQL = "SELECT idioma,curso,nombre,apellido_1,apellido_2,horario,dias,aula,edificio,tipo_matricula"
				+ " FROM vw_grupos_curso WHERE 1=1";
		
		// Si el campo de la consulta no esta vacio lo introduce en la query
		if (centro.length() > 0) {
			if (centro.compareTo("Huesca")==0){
				selectSQL += " AND UPPER(translate(edificio, 'áéíóúÁÉÍÓÚ', 'aeiouAEIOU')) "
					+ "LIKE UPPER(translate('%huesca%', 'áéíóúÁÉÍÓÚ', 'aeiouAEIOU'))";
			} else if (centro.compareTo("Teruel")==0){
				selectSQL += " AND UPPER(translate(edificio, 'áéíóúÁÉÍÓÚ', 'aeiouAEIOU')) "
						+ "LIKE UPPER(translate('%teruel%', 'áéíóúÁÉÍÓÚ', 'aeiouAEIOU'))";
			} else {
				selectSQL += " AND UPPER(translate(edificio, 'áéíóúÁÉÍÓÚ', 'aeiouAEIOU')) "
						+ "NOT LIKE UPPER(translate('%huesca%', 'áéíóúÁÉÍÓÚ', 'aeiouAEIOU')) "
						+ "AND UPPER(translate(edificio, 'áéíóúÁÉÍÓÚ', 'aeiouAEIOU')) "
						+ "NOT LIKE UPPER(translate('%teruel%', 'áéíóúÁÉÍÓÚ', 'aeiouAEIOU'))";
			}
		}		
		if (campus.length() > 0) {
			selectSQL += " AND UPPER(translate(edificio, 'áéíóúÁÉÍÓÚ', 'aeiouAEIOU')) "
					+ "LIKE UPPER(translate(?, 'áéíóúÁÉÍÓÚ', 'aeiouAEIOU'))";
		}
		if (tipoMatricula.length() > 0) {
			selectSQL += "AND UPPER(translate(tipo_matricula, 'áéíóúÁÉÍÓÚ', 'aeiouAEIOU')) "
					+ "LIKE UPPER(translate(?, 'áéíóúÁÉÍÓÚ', 'aeiouAEIOU'))";
		}
		if (seccion.length() > 0) {
			selectSQL += " AND UPPER(translate(seccion, 'áéíóúÁÉÍÓÚ', 'aeiouAEIOU')) "
					+ "LIKE UPPER(translate(?, 'áéíóúÁÉÍÓÚ', 'aeiouAEIOU'))";
		}
		if (profesor.length() > 0) {
			if (profesor.split("-").length == 3){
				selectSQL += " AND UPPER(translate(nombre, 'áéíóúÁÉÍÓÚ', 'aeiouAEIOU')) "
						+ "LIKE UPPER(translate(?, 'áéíóúÁÉÍÓÚ', 'aeiouAEIOU')) "
						+ "AND UPPER(translate(apellido_1, 'áéíóúÁÉÍÓÚ', 'aeiouAEIOU')) "
						+ "LIKE UPPER(translate(?, 'áéíóúÁÉÍÓÚ', 'aeiouAEIOU')) "
						+ "AND UPPER(translate(apellido_2, 'áéíóúÁÉÍÓÚ', 'aeiouAEIOU')) "
						+ "LIKE UPPER(translate(?, 'áéíóúÁÉÍÓÚ', 'aeiouAEIOU'))";
			}else{
				selectSQL += " AND UPPER(translate(nombre, 'áéíóúÁÉÍÓÚ', 'aeiouAEIOU')) "
						+ "LIKE UPPER(translate(?, 'áéíóúÁÉÍÓÚ', 'aeiouAEIOU')) "
						+ "AND UPPER(translate(apellido_1, 'áéíóúÁÉÍÓÚ', 'aeiouAEIOU')) "
						+ "LIKE UPPER(translate(?, 'áéíóúÁÉÍÓÚ', 'aeiouAEIOU')) "
						+ "AND apellido_2 IS NULL";	
			}
		}
		if (nivel.length() > 0) {
			selectSQL += " AND UPPER(translate(idioma, 'áéíóúÁÉÍÓÚ', 'aeiouAEIOU')) "
					+ "LIKE UPPER(translate(?, 'áéíóúÁÉÍÓÚ', 'aeiouAEIOU'))";
		}
		if (dias.length() > 0) {
			selectSQL += " AND UPPER(translate(dias, 'áéíóúÁÉÍÓÚ', 'aeiouAEIOU')) "
					+ "LIKE UPPER(translate(?, 'áéíóúÁÉÍÓÚ', 'aeiouAEIOU'))";
		}
		if (aula.length() > 0) {
			selectSQL += " AND UPPER(translate(aula, 'áéíóúÁÉÍÓÚ', 'aeiouAEIOU')) "
					+ "LIKE UPPER(translate(?, 'áéíóúÁÉÍÓÚ', 'aeiouAEIOU'))";
		}
		if (edificio.length() > 0) {
			selectSQL += " AND UPPER(translate(edificio, 'áéíóúÁÉÍÓÚ', 'aeiouAEIOU')) "
					+ "LIKE UPPER(translate(?, 'áéíóúÁÉÍÓÚ', 'aeiouAEIOU'))";
		}
		if (horario.length() > 0) {
			selectSQL += " AND UPPER(translate(horario, 'áéíóúÁÉÍÓÚ', 'aeiouAEIOU')) "
					+ "LIKE UPPER(translate(?, 'áéíóúÁÉÍÓÚ', 'aeiouAEIOU'))";
		}
		
		try {			
			preparedStatement = connection.prepareStatement(selectSQL);
			int indexStatement = 1;		
			
			if (campus.length() > 0) {
				preparedStatement.setString(indexStatement, '%'+campus+'%');
				indexStatement++;
			}		
			if (tipoMatricula.length() > 0) {
				preparedStatement.setString(indexStatement, '%'+tipoMatricula+'%');
				indexStatement++;
			}		
			if (seccion.length() > 0) {
				preparedStatement.setString(indexStatement, '%'+seccion+'%');
				indexStatement++;
			}
			if (profesor.length() > 0) {
				String[] profPartes = profesor.split("-");
				preparedStatement.setString(indexStatement, '%'+profPartes[0]+'%');
				indexStatement++;
				preparedStatement.setString(indexStatement, '%'+profPartes[1]+'%');
				indexStatement++;
				if (profPartes.length == 3){
					preparedStatement.setString(indexStatement, '%'+profPartes[2]+'%');
					indexStatement++;
				}
			}
			if (nivel.length() > 0) {
				preparedStatement.setString(indexStatement, '%'+nivel+'%');
				indexStatement++;
			}		
			if (dias.length() > 0) {
				preparedStatement.setString(indexStatement, '%'+dias+'%');
				indexStatement++;
			}
			if (aula.length() > 0) {
				preparedStatement.setString(indexStatement, '%'+aula+'%');
				indexStatement++;
			}
			if (edificio.length() > 0) {
				preparedStatement.setString(indexStatement, '%'+edificio+'%');
				indexStatement++;
			}
			if (horario.length() > 0) {
				preparedStatement.setString(indexStatement, '%'+horario+'%');
				indexStatement++;
			}
			// Ejecutar select SQL statement
			rs = preparedStatement.executeQuery();

		} catch (SQLException e) {
			System.out.println(e.getMessage());
		}		
		// llamar a crearServicios que devuelve la lista de cursos
		return crearCursosBuscador(rs);
	}


	/*
	 * Abre una conexión con la Base de Datos.
	 */
	public void openDB(){
		
		connection = ConnectionManager.getConnection();
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
			} catch (SQLException e) {
				e.printStackTrace();
			}
		} 
	}
	
}
