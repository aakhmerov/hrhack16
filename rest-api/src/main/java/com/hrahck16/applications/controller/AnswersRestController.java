package com.hrahck16.applications.controller;

import com.hrahck16.applications.services.UserService;
import com.hrahck16.applications.tos.AnswerTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.RequestBody;

import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;

/**
 * Created by aakhmerov on 16.04.16.
 */
@Component
@Path("answers")
@EnableAutoConfiguration
public class AnswersRestController {
    @Autowired
    private UserService userService;


    @POST
    @Path("/")
    @Produces({ MediaType.APPLICATION_JSON })
    @Consumes({ MediaType.APPLICATION_JSON })
    public Response processAnswers (@RequestBody List<AnswerTO> answers, @Context HttpServletRequest request) {
        userService.processAnswers(answers,request.getCookies());
        return Response.ok("ok").build();
    }
}
