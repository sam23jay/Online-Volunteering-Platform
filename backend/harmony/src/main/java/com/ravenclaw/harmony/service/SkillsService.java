package com.ravenclaw.harmony.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.ravenclaw.harmony.model.User;
import com.ravenclaw.harmony.repository.UserRepository;

@Service
public class SkillsService {

    private final UserRepository userRepository;

    @Autowired
    public SkillsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public void updateUserSkills(Integer userId, String skill1, String skill2, String skill3) {
        User user = userRepository.findById(userId).orElse(null);

        if (user != null) {
            user.setSkill1(skill1);
            user.setSkill2(skill2);
            user.setSkill3(skill3);
            userRepository.save(user);
        }
    }

    public String[] getUserSkills(Integer userId) {
        User user = userRepository.findById(userId).orElse(null);

        if (user != null) {
            return new String[]{user.getSkill1(), user.getSkill2(), user.getSkill3()};
        } else {
            return null;
        }
    }
}
