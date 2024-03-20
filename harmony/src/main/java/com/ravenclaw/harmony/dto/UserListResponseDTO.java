package com.ravenclaw.harmony.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserListResponseDTO {
	 private Integer id;
	    private String username;
	    private String description;
	    private String name;
}
