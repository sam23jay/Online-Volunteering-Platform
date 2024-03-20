package com.ravenclaw.harmony.dto;

import java.time.LocalDate;

import com.ravenclaw.harmony.model.enumerate.Role;

import lombok.AllArgsConstructor;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequest {
    private String name;
    private String type;
    private String username;
    private String password;
    private String description;
    private String state;
    private LocalDate dob;
    private String gender;
    private Role role;
}
