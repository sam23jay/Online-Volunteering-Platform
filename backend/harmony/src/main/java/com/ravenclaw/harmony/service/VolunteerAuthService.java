package com.ravenclaw.harmony.service;

import java.util.Date;
import java.util.Optional;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.ravenclaw.harmony.config.AuthenticationResponse;
import com.ravenclaw.harmony.dto.AuthenticationRequest;
import com.ravenclaw.harmony.dto.RegisterRequest;
import com.ravenclaw.harmony.model.Volunteer;
import com.ravenclaw.harmony.model.enumerate.Role;
import com.ravenclaw.harmony.repository.VolunteerRepository;

import lombok.RequiredArgsConstructor;
import lombok.var;

@Service
@RequiredArgsConstructor
public class VolunteerAuthService {
    private final PasswordEncoder passwordEncoder; 
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final VolunteerRepository repo;

    public AuthenticationResponse register(RegisterRequest request) {
        System.out.println(new Date(System.currentTimeMillis()));
        var user = Volunteer.builder()
                .name(request.getName())
                .username(request.getUsername())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.USER)
                .dob(request.getDob())
                .gender(request.getGender())
                .state(request.getState())
                .description(request.getDescription())
                .build();
        repo.save(user);

        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {

    	System.out.println("apply");
        var user = repo.findByUsername(request.getUsername())
                .orElseThrow();
        int orgID = user.getVolID();
        var jwtToken = jwtService.generateToken(user);
        System.out.println(orgID);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .orgID(orgID) 
                .build();

    }

	public Volunteer getUserById(Integer userId) {
        Optional<Volunteer> optionalUser = repo.findById(userId);

        if (optionalUser.isPresent()) {
            return optionalUser.get();
        } else {
            return null;
        }

	}



}
