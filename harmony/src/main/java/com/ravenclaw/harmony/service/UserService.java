package com.ravenclaw.harmony.service;

import org.springframework.stereotype.Service;

import com.ravenclaw.harmony.dto.UserResponseDto;

@Service
public interface UserService {

    UserResponseDto getAllUser();

}
