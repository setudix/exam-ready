package com.du.yiit.examReady.utils;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class JwtTokenService {

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    public JwtTokenService(JwtTokenProvider jwtTokenProvider) {
        this.jwtTokenProvider = jwtTokenProvider;
    }

    public boolean validateToken(String token) {
        try {
//            Jwts.parser*()
            Jwts.parser().setSigningKey(jwtTokenProvider.getJwtSecret()).build().parseClaimsJws(token);
            return true; // Token is valid
        } catch (Exception e) {
            // Log the error or handle it as needed
            return false; // Token is invalid
        }
    }

    public String getUserIdFromToken(String token) {
        Claims claims = Jwts.parser()
                .setSigningKey(jwtTokenProvider.getJwtSecret())
                .build()
                .parseClaimsJws(token)
                .getBody();
        return (claims.getSubject()); // Assuming user ID is stored in the subject
    }
}
