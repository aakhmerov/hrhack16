package com.hrahck16.applications.controller;

import com.hrahck16.applications.domain.User;
import com.hrahck16.applications.services.UserService;
import com.hrahck16.applications.tos.AuthorizationTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.RequestBody;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.*;

import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.HashMap;

/**
 * Created by aakhmerov on 16.04.16.
 */
@Component
@Path("authentication")
@EnableAutoConfiguration
public class AuthenticationRestController {

    @Autowired
    private UserService userService;

    private HashMap <String, AuthorizationTO> userSessions = new HashMap<String, AuthorizationTO>();

    @GET
    @Path("/")
    @Produces({ MediaType.APPLICATION_JSON })
    public AuthorizationTO checkUser(@Context HttpServletRequest request) {
        AuthorizationTO result = new AuthorizationTO();
        if (request.getCookies() != null) {
            for (Cookie c : request.getCookies()) {
                System.out.println(c.getName());
            }
        }
        return result;
    }

    @POST
    @Path("/")
    @Produces({ MediaType.APPLICATION_JSON })
    @Consumes({ MediaType.APPLICATION_JSON })
    public AuthorizationTO authorize(@RequestBody AuthorizationTO authorizationTO) {
        User existing = userService.findUser(authorizationTO);

        if (existing != null) {
            authorizationTO.setAuthorized(true);
            authorizationTO.setUser(existing);
        }
        this.userSessions.put(authorizationTO.getToken(),authorizationTO);
        return authorizationTO;
    }
}
