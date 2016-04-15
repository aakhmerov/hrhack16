package com.hrahck16.applications.controller;

import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.stereotype.Component;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.core.Response;

@Component
@Path("status")
@EnableAutoConfiguration
public class StatusRestController {

    @GET
    @Path("ping")
    public Response ping() {
        return Response.ok("successful").build();
    }

}
