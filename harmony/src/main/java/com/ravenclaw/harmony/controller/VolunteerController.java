package com.ravenclaw.harmony.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ravenclaw.harmony.dto.EventResponseDTO;
import com.ravenclaw.harmony.service.VolunteerService;

@RestController
@RequestMapping("/api/vol")
@PreAuthorize("hasRole('USER')")
public class VolunteerController {
    @Autowired
    private VolunteerService volunteerService;

    @PostMapping("/enroll/{eventID}/{volunteerID}")
    @PreAuthorize("hasAuthority('user:create')")
    public ResponseEntity<String> enrollVolunteerInEvent(@PathVariable Integer eventID, @PathVariable Integer volunteerID) {
        return volunteerService.enrollVolunteerInEvent(eventID, volunteerID);

    }
    
    @DeleteMapping("/unenroll/{eventID}/{volunteerID}")
    @PreAuthorize("hasAuthority('user:delete')")
    public ResponseEntity<Void> unenrollVolunteerFromEvent(@PathVariable Integer eventID, @PathVariable Integer volunteerID) {
        ResponseEntity<Void> responseEntity = volunteerService.unenrollVolunteerFromEvent(eventID, volunteerID);

        return responseEntity;
    }


    @GetMapping("/get/{eventID}")
    @PreAuthorize("hasAuthority('user:read')")
    public ResponseEntity<EventResponseDTO> getEvent(@PathVariable Integer eventID) {  
    	EventResponseDTO responseDTO = volunteerService.getEventResponseDTO(eventID);


    return ResponseEntity.ok(responseDTO);
    }
    @GetMapping("/getByOrgID/{orgID}")
    @PreAuthorize("hasAuthority('user:read')")
    public ResponseEntity<List<EventResponseDTO>> getEventsByOrgIDs(@PathVariable Integer orgID) {
    	   List<EventResponseDTO> responseDTOs = volunteerService.getEventsByOrgIDs(orgID);


           return ResponseEntity.ok(responseDTOs);
    }

    @GetMapping("/get")
    @PreAuthorize("hasAuthority('user:read')")
    public ResponseEntity<List<EventResponseDTO>> getAllEvents() {
    	List<EventResponseDTO> responseDTOs = volunteerService.getAllEventResponseDTOs();


        return ResponseEntity.ok(responseDTOs);
    }

    @PutMapping("/updateIsNewUser/{userId}")
    @PreAuthorize("hasAuthority('user:update')")
    public ResponseEntity<String> updateIsNewUserFlag(@PathVariable Integer userId) {
        ResponseEntity<String> responseEntity = volunteerService.updateIsNewUserFlag(userId);

        return responseEntity;
       
    }

    
    @GetMapping("/enrolledEvents/{volunteerID}")
    @PreAuthorize("hasAuthority('user:read')")
    public ResponseEntity<List<EventResponseDTO>> getEventsEnrolledByVolunteer(@PathVariable Integer volunteerID) {
        ResponseEntity<List<EventResponseDTO>> responseEntity = volunteerService.getEventsEnrolledByVolunteer(volunteerID);

        return responseEntity;
    }
    
    




}
