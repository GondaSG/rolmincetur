package pe.gob.vuce.template;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.orm.jpa.HibernateJpaAutoConfiguration;
import org.springframework.context.annotation.Bean;
import javax.sql.DataSource;
import java.sql.SQLException;

@SpringBootApplication()
public class VuceTemplateTestApplication {

	//@Autowired
	//private static DataSource dataSource;

	@Value("${spring.jpa.properties.hibernate.dialect}")
	private static String HIBERNATE_DIALECT;

	@Value("${spring.jpa.show-sql}")
	private static String HIBERNATE_SHOW_SQL;

	public static void main(String[] args) throws SQLException {
		System.out.println("Inicio de Aplicación");
		SpringApplication.run(VuceTemplateTestApplication.class, args);
		System.out.println("Conexion " + HIBERNATE_SHOW_SQL + " Conexion2 " + HIBERNATE_DIALECT);
		System.out.println("Fin de Aplicación");
	}
	@Bean
    public ModelMapper modelMapper() {
        return new ModelMapper();
    }
}
