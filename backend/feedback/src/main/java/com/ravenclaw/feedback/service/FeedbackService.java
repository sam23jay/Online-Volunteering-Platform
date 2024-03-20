package com.ravenclaw.feedback.service;

import java.util.List;

import com.ravenclaw.feedback.dto.FeedbackRequest;
import com.ravenclaw.feedback.dto.FeedbackResponse;

public interface FeedbackService {

    boolean saveFeedback(FeedbackRequest request);

    List<FeedbackResponse> getFeedbacks();

}