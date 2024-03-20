package com.ravenclaw.harmony.dto;
import com.ravenclaw.harmony.model.enumerate.Role;

import lombok.AllArgsConstructor;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthenticationRequest {

	private String username;
	private String password;
	private Role role;
}
