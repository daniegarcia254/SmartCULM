package rest.smartculm;

import org.glassfish.jersey.server.ResourceConfig;
import org.eclipse.persistence.jaxb.rs.MOXyJsonProvider;
import org.jsoup.Jsoup;

public class ApplicationConfig extends ResourceConfig {

    public ApplicationConfig() {
    	register(SmartCulmService.class);
    	register(Jsoup.class);
		register(MOXyJsonProvider.class);
		register(CrossDomainFilter.class);
    }
}
