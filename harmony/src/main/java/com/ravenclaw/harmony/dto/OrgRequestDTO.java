package com.ravenclaw.harmony.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class OrgRequestDTO {
    private String name;
    private String type;
    private String username;
    private String password;
}
