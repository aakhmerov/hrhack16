package com.hrahck16.applications;

import org.glassfish.jersey.server.ResourceConfig;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;

import javax.ws.rs.ApplicationPath;

@Component
@Configuration
@ApplicationPath("api")
public class RestConfig extends ResourceConfig {

    public RestConfig() {
        packages("com.hrahck16.applications.controller");
    }

}
