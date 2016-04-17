package com.hrahck16.applications.services;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.hrahck16.applications.domain.User;
import com.hrahck16.applications.tos.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import javax.servlet.http.Cookie;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
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
    private HashMap <String, List<AnswerTO>> answers = new HashMap<String, List<AnswerTO>>();
    private HashMap <String, FeedbackTO> userFeedback = new HashMap<String, FeedbackTO>();

    private JavaMailSender javaMailSender = new JavaMailSenderImpl();

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
        AuthorizationTO auth = this.getAuthorization(cookies);
        if ( auth != null) {
            this.userFeelings.put(auth.getToken(),feelingTO);
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

    public void processAnswers(FeedbackTO feedback, Cookie[] cookies) {
        AuthorizationTO auth = this.getAuthorization(cookies);
        if (auth != null && !feedback.isConfirmed()) {
            feedback.setUser(auth.getUser());
            userFeedback.put(auth.getToken(), feedback);
            this.answers.put(auth.getToken(), feedback.getAnswers());
            if (this.devisionFeedbacks.get(auth.getUser().getDivision()) == null) {
                this.devisionFeedbacks.put(auth.getUser().getDivision(), new ArrayList<FeedbackTO>());
            }
            this.devisionFeedbacks.get(auth.getUser().getDivision()).add(feedback);
        } else  if (auth != null && feedback.isConfirmed()) {
//          this should update reference in both userFeedback and Division statistics
            this.userFeedback.get(auth.getToken()).setConfirmed(true);
            this.userFeedback.get(auth.getToken()).setEmail(feedback.getEmail());
            sendEmail(this.userFeedback.get(auth.getToken()));
        }
    }

    private void sendEmail(FeedbackTO feedbackTO) {
        MimeMessage mail = javaMailSender.createMimeMessage();
        try {
            MimeMessageHelper helper = new MimeMessageHelper(mail, true);
            helper.setTo("jan.c.drescher@googlemail.com");
            helper.setReplyTo("admin@voiceback.com");
            helper.setFrom("admin@voiceback.com");
            helper.setSubject("New Feedback");
            helper.setText("<html><body>" + feedbackTO.getEmail() + "</body></html>",true);
        } catch (MessagingException e) {
            e.printStackTrace();
        } finally {}
        javaMailSender.send(mail);
        //return helper;
    }


}
