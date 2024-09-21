package com.du.yiit.examReady.utils;
import com.du.yiit.examReady.config.OpenAIApiConfig;
import com.du.yiit.examReady.question.Question;
import com.du.yiit.examReady.question.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;

@Service
public class PromptService {
    private final OpenAIApiService openAIApiService;
    private final OpenAIApiConfig openAIApiConfig;
    private final QuestionService questionService;

    @Autowired
    public PromptService(OpenAIApiService openAIApiService, OpenAIApiConfig openAIApiConfig, QuestionService questionService) {
        this.openAIApiService = openAIApiService;
        this.openAIApiConfig = openAIApiConfig;
        this.questionService = questionService;

        // Ensure WebClient is set up
        this.openAIApiService.setOpenAIWebClient(openAIApiConfig.openAIWebClient());
    }
    public Mono<String> callOpenAIApi(String prompt, int questionSize){


        String message = "Hello, GPT! Generate "+questionSize+" MCQ questions from the given text. " +
                "Each question should have 4 options wit one correct answer. The correct answer field should be correctAnswer" +
                "Think like an examiner while setting the difficulty! Please provide the response strictly in JSON format without any additional text or formatting. "+
                "The JSON must not contain an array. rRather it itself should be in array format. "+
                "The options must not be an array, rather attributes of question like optionA, optionB. The correct answer should not be the value, rather the option."+
                "The text is : "+prompt;
        System.out.println(message);
        Mono<String> responseMono = openAIApiService.sendMessage(message);

        return responseMono
                .doOnSuccess(response -> {
                   // System.out.println("OpenAI's response: " + response);
                });
    }

    public Mono<Question[]> generateQuestions(String prompt, int questionSize,int exam_id){
        return callOpenAIApi(prompt, questionSize)
                .map(response -> {
                    //System.out.println("OpenAI's response: " + response);
                    return response; // Ensure this is clean JSON
                })
                .flatMap(json -> {
                    ObjectMapper objectMapper = new ObjectMapper();
                    try {
                        Question[] questions = objectMapper.readValue(json, Question[].class);
                        for(Question question:questions){
                            questionService.createQuestion(question,exam_id);
                        }
                        return Mono.just(questions);
                    } catch (Exception e) {
                        return Mono.error(e);
                    }
                });
    }

    }

