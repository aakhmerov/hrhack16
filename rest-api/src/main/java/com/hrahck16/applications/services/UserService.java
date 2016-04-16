package com.hrahck16.applications.services;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.hrahck16.applications.domain.User;
import com.hrahck16.applications.tos.AuthorizationTO;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.io.IOException;
import java.io.InputStream;
import java.util.HashMap;
import java.util.List;

/**
 * Created by aakhmerov on 16.04.16.
 */
@Component
public class UserService {

    private HashMap <String, User> users = new HashMap<String, User>();

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
}
