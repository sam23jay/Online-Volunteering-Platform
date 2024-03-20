package com.ravenclaw.harmony.config;

import com.ravenclaw.harmony.model.enumerate.Role;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthenticationResponse {
private String token;
private int orgID;
private boolean isNewUser;
private String message;
private String name;
private Role role;
private boolean isRated;
}
