package com.du.yiit.examReady.utils;

import com.du.yiit.examReady.user.User;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class JwtTokenProvider {

    @Value("${app.jwtSecret}")
    private String jwtSecret;

    public String getJwtSecret() {
        return jwtSecret;
    }

    public void setJwtSecret(String jwtSecret) {
        this.jwtSecret = jwtSecret;
    }

    public Long getJwtExpirationMs() {
        return jwtExpirationMs;
    }

    public void setJwtExpirationMs(Long jwtExpirationMs) {
        this.jwtExpirationMs = jwtExpirationMs;
    }

    public String getAppName() {
        return appName;
    }

    public void setAppName(String appName) {
        this.appName = appName;
    }

    @Value("${app.jwtExpirationMs}")
    private Long jwtExpirationMs;

    @Value("${spring.application.name}")
    private String appName;

    public JwtTokenProvider() {
    }

    public String generateToken(User user) {

        Date now = new Date();
        return Jwts.builder()
                .claim("name", user.getName())
                .claim("email", user.getEmail())
                .claim("provider", user.getProvider())
                .subject(user.getId().toString())
                .issuer(appName)
                .issuedAt(now)
                .expiration(new Date(now.getTime() + jwtExpirationMs))
                .notBefore(now)
                .signWith(SignatureAlgorithm.HS512, jwtSecret)
                .compact();

    }
}
