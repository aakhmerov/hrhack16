package com.hrahck16.applications.controller;

import com.hrahck16.applications.tos.AuthorizationTO;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.stereotype.Component;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

/**
 * Created by aakhmerov on 16.04.16.
 */
@Component
@Path("authentication")
@EnableAutoConfiguration
public class AuthenticationRestController {

    @GET
    @Path("/")
    @Produces({ MediaType.APPLICATION_JSON })
    public AuthorizationTO authorize() {
        AuthorizationTO authorizationTO = new AuthorizationTO ();
        return authorizationTO;
    }
}
