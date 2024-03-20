package com.ravenclaw.harmony.controller;
import org.springframework.web.bind.annotation.CrossOrigin;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.ravenclaw.harmony.dto.EventRequestDTO;
import com.ravenclaw.harmony.dto.EventResponseDTO;
import com.ravenclaw.harmony.dto.UserDTO;
import com.ravenclaw.harmony.service.EventService;


import java.util.List;

@RestController
@RequestMapping("/api/ev")
@PreAuthorize("hasRole('ADMIN')")
public class EventController {

    @Autowired
    private EventService eventService;
   
  
    @GetMapping("/volunteers/{eventID}")
    @PreAuthorize("hasAuthority('admin:read')")
    public ResponseEntity<List<UserDTO>> getVolunteersByEventID(@PathVariable Integer eventID) {
        List<UserDTO> volunteers = eventService.getVolunteersByEventID(eventID);

        return ResponseEntity.ok(volunteers);
    }
    @PostMapping("/post")
    @PreAuthorize("hasAuthority('admin:create')")
    public ResponseEntity<EventResponseDTO> createEvent(@RequestBody EventRequestDTO eventRequestDTO) {
        EventResponseDTO responseDTO = eventService.createEvent(eventRequestDTO);


        return ResponseEntity.ok(responseDTO);
    }


    @GetMapping("/get/{eventID}")
    @PreAuthorize("hasAuthority('admin:read')")
    public ResponseEntity<EventResponseDTO> getEvent(@PathVariable Integer eventID) {
        EventResponseDTO responseDTO = eventService.getEvent(eventID);


        return ResponseEntity.ok(responseDTO);
    }
    @GetMapping("/getByOrgID/{orgID}")
    @PreAuthorize("hasAuthority('admin:read')")
    public ResponseEntity<List<EventResponseDTO>> getEventsByOrgIDs(@PathVariable Integer orgID) {
        List<EventResponseDTO> responseDTOs = eventService.getEventsByOrgIDs(orgID);


        return ResponseEntity.ok(responseDTOs);
    }


    @GetMapping("/get")
    @PreAuthorize("hasAuthority('admin:read')")
    public ResponseEntity<List<EventResponseDTO>> getAllEvents() {
        List<EventResponseDTO> responseDTOs = eventService.getAllEventsAsResponseDTOs();


        return ResponseEntity.ok(responseDTOs);
    }

    @PutMapping("/put/{eventID}")
    public ResponseEntity<EventResponseDTO> updateEvent(@PathVariable Integer eventID, @RequestBody EventRequestDTO eventRequestDTO) {
        EventResponseDTO responseDTO = eventService.updateEvent(eventID, eventRequestDTO);

        return ResponseEntity.ok(responseDTO);
    }


    @DeleteMapping("/del/{eventID}")
    public ResponseEntity<Void> deleteEvent(@PathVariable Integer eventID) {
        eventService.deleteEvent(eventID);

        return ResponseEntity.noContent().build();
    }
    @GetMapping("/enrolledEvents/{volunteerID}")
    @PreAuthorize("hasAuthority('admin:read')")
    public ResponseEntity<List<EventResponseDTO>> getEventsEnrolledByVolunteer(@PathVariable Integer volunteerID) {
        List<EventResponseDTO> responseDTOs = eventService.getEventsEnrolledByVolunteer(volunteerID);

        if (responseDTOs.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(responseDTOs);
    }
    

}
