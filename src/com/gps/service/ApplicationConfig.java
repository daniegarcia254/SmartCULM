package com.gps.service;

import org.glassfish.jersey.server.ResourceConfig;
import org.jsoup.Jsoup;

public class ApplicationConfig extends ResourceConfig {

    public ApplicationConfig() {
    	register(CrossDomainFilter.class);
    	register(SmartCulmService.class);
    	register(Jsoup.class);
    }
}
