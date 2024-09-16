package com.du.yiit.examReady.test;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
public class TestingController {
    @RequestMapping("/user")
    public Principal user(Principal user){
        return user;
    }
}
