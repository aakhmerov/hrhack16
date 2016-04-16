package com.hrahck16.applications.tos;

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

    private boolean authorized = true;
    private String token = nextSessionId();

    public String nextSessionId() {
        return new BigInteger(130, new SecureRandom()).toString(32);
    }
}
