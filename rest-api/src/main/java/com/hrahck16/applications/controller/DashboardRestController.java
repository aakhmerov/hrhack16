package com.hrahck16.applications.controller;

import com.hrahck16.applications.services.UserService;
import com.hrahck16.applications.tos.AuthorizationTO;
import com.hrahck16.applications.tos.DashboardTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

/**
 * Created by aakhmerov on 16.04.16.
 */
@Component
@Path("dashboard")
@EnableAutoConfiguration
public class DashboardRestController {
    @Autowired
    private UserService userService;

    @GET
    @Path("/")
    @Produces({ MediaType.APPLICATION_JSON })
    public DashboardTO checkUser(@Context HttpServletRequest request) {
        DashboardTO result = userService.getDashboard(request.getCookies());
        return result;
    }

}
