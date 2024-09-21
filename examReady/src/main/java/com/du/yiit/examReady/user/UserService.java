package com.du.yiit.examReady.test2;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User login(SocialLoginRequest loginRequest) {
        String id = loginRequest.getId();
        Optional<User> optionalUser = userRepository.findById(id);

        if (optionalUser.isEmpty()) {
            User user = new User(id, loginRequest.getName(), loginRequest.getEmail(), loginRequest.getProvider());
            userRepository.save(user);
            return user;
        }

        return optionalUser.get();
    }
}
