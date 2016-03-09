package com.gps.service;

import org.eclipse.persistence.jaxb.rs.MOXyJsonProvider;
import javax.ws.rs.ApplicationPath;
import javax.ws.rs.core.Application;
import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;
import org.jsoup.Jsoup;

@ApplicationPath("/")
public class ApplicationConfig extends Application {

    public Set<Class<?>> getClasses() {
        return new HashSet<Class<?>>(Arrays.asList(SmartCulmService.class,Jsoup.class,CrossDomainFilter.class,MOXyJsonProvider.class));
    }
}
