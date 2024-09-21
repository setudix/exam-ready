package com.du.yiit.examReady.test;

import com.du.yiit.examReady.user.User;
import com.du.yiit.examReady.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

@Service
public class Oauth2UserService extends DefaultOAuth2UserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User oauth2User = super.loadUser(userRequest);

        String id = oauth2User.getAttribute("id");
        User user = userRepository.findById(id)
                .orElseGet(() -> {
                    User newUser = new User();
                    newUser.setId(id);
                    newUser.setEmail(oauth2User.getAttribute("email"));
                    newUser.setName(oauth2User.getAttribute("name"));
                    newUser.setProvider(oauth2User.getAttribute("provider"));
                    return userRepository.save(newUser);
                });

        return new DefaultOAuth2User(
                oauth2User.getAuthorities(),
                oauth2User.getAttributes(),
                "email"
        );
    }
}