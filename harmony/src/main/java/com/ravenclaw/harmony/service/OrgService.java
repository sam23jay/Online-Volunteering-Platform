package com.ravenclaw.harmony.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ravenclaw.harmony.model.User;
import com.ravenclaw.harmony.repository.OrgRepository;

@Service
public class OrgService {

    @Autowired
    private OrgRepository userRepository;

    public User createUser(User user) {
        return userRepository.save(user);
    }

    public User getUserById(Integer userId) {
        return userRepository.findById(userId).orElse(null);
    }

    public void deleteUser(Integer userId) {
        userRepository.deleteById(userId);
    }
}
