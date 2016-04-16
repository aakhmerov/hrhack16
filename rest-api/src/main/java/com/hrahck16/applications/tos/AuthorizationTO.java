package com.hrahck16.applications.tos;

import com.hrahck16.applications.domain.User;
import lombok.Data;

import javax.xml.bind.annotation.XmlRootElement;
import java.math.BigInteger;
import java.security.SecureRandom;

/**
 * Created by aakhmerov on 16.04.16.
 */
@XmlRootElement
@Data
public class AuthorizationTO {

    private boolean authorized ;
    private String token = nextSessionId();
    private String username;
    private String password;
    private User user;

    public String nextSessionId() {
        return new BigInteger(130, new SecureRandom()).toString(32);
    }

    public boolean isAuthorized() {
        return authorized;
    }

    public void setAuthorized(boolean authorized) {
        this.authorized = authorized;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
