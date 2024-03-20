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
import com.ravenclaw.harmony.model.User;
import com.ravenclaw.harmony.model.enumerate.Role;
import com.ravenclaw.harmony.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.var;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final UserRepository repo; 

    public AuthenticationResponse register(RegisterRequest request) throws Exception {
        System.out.println(new Date(System.currentTimeMillis()));
   
        if (repo.existsByUsername(request.getUsername())) {
        	 return AuthenticationResponse.builder()
                     .message("Username already exists")
                     .build();
        	 }
        var user = User.builder()
                .name(request.getName())
                .type(request.getType())
                .username(request.getUsername())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(request.getRole())
                .dob(request.getDob())
                .gender(request.getGender())
                .state(request.getState())
                .description(request.getDescription())
                .isNewUser(true)
                .build();
        repo.save(user);
        int orgID = user.getOrgID();
        var jwtToken = jwtService.generateToken(user);
        boolean isnew=user.isNewUser();
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .isNewUser(isnew)
                .orgID(orgID)
                .role(request.getRole())
                .build();
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUsername(), request.getPassword()));
        System.out.println("apply");
        
        var user = repo.findByUsername(request.getUsername())
                .orElseThrow();
        int orgID = user.getOrgID();
        Role role=user.getRole();
        if(role==request.getRole())
        {
        	System.out.println(role+" success "+request.getRole());

        	user.setNewUser(false);
        	var jwtToken = jwtService.generateToken(user);
        	System.out.println(orgID);
        	return AuthenticationResponse.builder()
        			.token(jwtToken)
        			.orgID(orgID) 
        			.isNewUser(false)
        			.message("Login Successful")
                    .role(request.getRole())
        			.build();
        }
        return AuthenticationResponse.builder()
        		.message("Login Failed")
        		.build();
    }
    public void UpdateNewUser(boolean isNewUser)
    {
         var saveuser=User.builder()
         		.isNewUser(false)
         		.build();
         repo.save(saveuser);    }

	public User getUserById(Integer userId) {
        Optional<User> optionalUser = repo.findById(userId);

        if (optionalUser.isPresent()) {
            return optionalUser.get();
        } else {
            return null; 
        }

	}



}
