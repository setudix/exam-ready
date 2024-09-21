package com.du.yiit.examReady.utils;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.List;

@Service
public class OpenAIApiService {

    public WebClient openAIWebClient;

    public void setOpenAIWebClient(WebClient openAIWebClient) {
        this.openAIWebClient = openAIWebClient;
    }

    public OpenAIApiService(WebClient openAIWebClient) {
        this.openAIWebClient = openAIWebClient;
    }


    public Mono<String> sendMessage(String message) {
        OpenAIRequest request = new OpenAIRequest(
                "gpt-4o",
                List.of(new Message("user", message))
        );
        return openAIWebClient.post()
                .bodyValue(request)
                .retrieve()
                .bodyToMono(OpenAIResponse.class)
                // Extract the message content from the first choice and return as Mono<String>
                .doOnSuccess(response -> {
                    System.out.println("Raw response: " + response.choices.get(0).message.content);
                })
                .map(response -> response.choices.get(0).message.content);
    }

    // Request body to be sent to the OpenAI API
    private static class OpenAIRequest {
        @JsonProperty("model")
        private final String model;
        @JsonProperty("messages")
        private final List<Message> messages;

        public OpenAIRequest(String model, List<Message> messages) {
            this.model = model;
            this.messages = messages;
        }
    }

    private static class Message {
        @JsonProperty("role")
        private final String role;
        @JsonProperty("content")
        private final List<MessageContent> content;

        public Message(String role, String text) {
            this.role = role;
            this.content = List.of(new MessageContent("text", text));
        }
    }

    // Message content class to handle message content as text
    private static class MessageContent {
        @JsonProperty("type")
        private final String type;
        @JsonProperty("text")
        private final String text;

        public MessageContent(String type, String text) {
            this.type = type;
            this.text = text;
        }
    }

    // The response object returned by the OpenAI API
    private static class OpenAIResponse {
        @JsonProperty("choices")
        private List<ResponseChoice> choices;
    }

    // Response choice object with the message containing the assistant's response
    private static class ResponseChoice {
        @JsonProperty("message")
        private ResponseMessage message;
    }

    // The message object containing the assistant's response
    private static class ResponseMessage {
        @JsonProperty("role")
        private String role;
        @JsonProperty("content")
        private String content;
    }
}

