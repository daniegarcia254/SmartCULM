package bd.minos;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class ConnectionManager {
	private static String url = "jdbc:oracle:thin:@//155.210.14.15:1521/minos.oracle";    
	private static String driverName = "oracle.jdbc.driver.OracleDriver";   
	private static String username = "movil";   
	private static String password = "AppMovil14";
	private static Connection con;

	public static Connection getConnection() {
		try {
			
			Class.forName(driverName);
			
			try {
				con = DriverManager.getConnection(url, username, password);
			} catch (SQLException ex) {
					System.out.println("Error al crear la conexión con la Base de Datos [Minos]."); 
			}
			
		} catch (ClassNotFoundException ex) {
			System.out.println("Driver no encontrado."); 
		}
		return con;
	}
}