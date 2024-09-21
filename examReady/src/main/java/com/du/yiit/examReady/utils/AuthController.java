package com.du.yiit.examReady.utils;

import com.du.yiit.examReady.user.User;
import com.du.yiit.examReady.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtTokenProvider tokenProvider;

    public AuthController(UserService userService, JwtTokenProvider tokenProvider) {
        this.userService = userService;
        this.tokenProvider = tokenProvider;
    }

    @PostMapping("/social-login")
    public ResponseEntity<?> socialLogin(@RequestBody SocialLoginRequest loginRequest)
    {
        User user = userService.login(loginRequest);

        String token = tokenProvider.generateToken(user);

        return ResponseEntity.ok(new JwtAuthenticationResponse(token));
    }

    public static class JwtAuthenticationResponse {
        private String token;

        private final String tokenType = "Bearer";
        public JwtAuthenticationResponse(String token) {
            this.token = token;
        }

        public String getToken() {
            return token;
        }

        public void setToken(String token) {
            this.token = token;
        }

        public String getTokenType() {
            return tokenType;
        }
    }
}
