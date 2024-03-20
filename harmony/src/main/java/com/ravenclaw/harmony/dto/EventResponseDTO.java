package com.ravenclaw.harmony.dto;

import java.time.LocalDate;
import java.util.List;

import com.ravenclaw.harmony.model.User;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class EventResponseDTO {
    private Integer eventID;
    private String name;
    private String type;
    private String description;
    private String address;
    private LocalDate eventDate;
    private List<String> images; 
    private UserDTO organizer; 

}