package com.hrahck16.applications.services;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.hrahck16.applications.domain.User;
import com.hrahck16.applications.tos.*;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import javax.servlet.http.Cookie;
import java.io.IOException;
import java.io.InputStream;
import java.util.HashMap;
import java.util.List;

/**
 * Created by aakhmerov on 16.04.16.
 */
@Component
public class UserService {
    private static final String TOKEN = "auth_token";
    private HashMap <String, AuthorizationTO> userSessions = new HashMap<String, AuthorizationTO>();

    private HashMap <String, User> users = new HashMap<String, User>();
    private HashMap <String, FeelingTO> userFeelings = new HashMap<String, FeelingTO>();
    private HashMap <String, List<FeedbackTO>> devisionFeedbacks = new HashMap<String, List<FeedbackTO>>();

    @PostConstruct
    public void init() {
        ObjectMapper om = new ObjectMapper();
        InputStream usersFile = this.getClass().getClassLoader().getResourceAsStream("data/users.json");
        try {
            List<User> loaded = om.readValue(usersFile,om.getTypeFactory().constructCollectionType(List.class,User.class));
            for (User user : loaded) {
                this.users.put(user.getUsername(),user);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public User findUser(AuthorizationTO authorizationTO) {
        return users.get(authorizationTO.getUsername());
    }

    public void processFeeling(FeelingTO feelingTO, Cookie[] cookies) {
        if (cookies != null) {
            for (Cookie c : cookies) {
                if (TOKEN.equals(c.getName())) {
                    this.userFeelings.put(c.getName()+"=" + c.getValue(), feelingTO);
                }
            }
        }
    }

    public AuthorizationTO getAuthorization(Cookie[] cookies) {
        AuthorizationTO result = null;
        if (cookies != null) {
            for (Cookie c : cookies) {
                if (TOKEN.equals(c.getName())) {
                    result = this.userSessions.get(c.getName()+"=" + c.getValue());
                }
            }
        }
        if (result == null) {
            result = new AuthorizationTO();
        }
        return result;
    }

    /**
     *
     * @param authorizationTO
     * @return
     */
    public AuthorizationTO authorize(AuthorizationTO authorizationTO) {
        User existing = this.findUser(authorizationTO);

        if (existing != null) {
            authorizationTO.setAuthorized(true);
            authorizationTO.setUser(existing);
        }
        this.userSessions.put(authorizationTO.getToken(),authorizationTO);
        return authorizationTO;
    }

    /**
     * Based on cookies identify current user and return Dashboard with statistics
     * representation to the teamlead
     * @param cookies
     * @return
     */
    public DashboardTO getDashboard(Cookie[] cookies) {
        DashboardTO result = new DashboardTO();
        AuthorizationTO currentUser = this.getAuthorization(cookies);
        int fedbacks = 0;
        List<FeedbackTO> feed = this.devisionFeedbacks.get(currentUser.getUser().getDivision());
        if (feed != null) {
            fedbacks = feed.size();
        }
        result.setTotalFeedbacks(fedbacks);
        return result;
    }

    public void processAnswers(List<AnswerTO> answers, Cookie[] cookies) {

    }
}
