package com.hrahck16.applications.tos;

import com.hrahck16.applications.domain.User;

import java.util.List;

/**
 * Created by aakhmerov on 16.04.16.
 */
public class FeedbackTO {
    private List<AnswerTO> answers;
    private User user;
    private boolean confirmed;
    private int categoryType;
    private int category;

    public int getCategory() {
        return category;
    }

    public void setCategory(int category) {
        this.category = category;
    }

    public int getCategoryType() {
        return categoryType;
    }

    public void setCategoryType(int categoryType) {
        this.categoryType = categoryType;
    }

    public boolean isConfirmed() {
        return confirmed;
    }

    public void setConfirmed(boolean confirmed) {
        this.confirmed = confirmed;
    }

    public void setAnswers(List<AnswerTO> answers) {
        this.answers = answers;
    }

    public List<AnswerTO> getAnswers() {
        return answers;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public User getUser() {
        return user;
    }
}
