package com.ravenclaw.harmony.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.ravenclaw.harmony.dto.EventResponseDTO;
import com.ravenclaw.harmony.dto.UserDTO;
import com.ravenclaw.harmony.model.Event;
import com.ravenclaw.harmony.model.User;
import com.ravenclaw.harmony.repository.EventRepository;
import com.ravenclaw.harmony.repository.UserRepository;


@Service
public class VolunteerService {
	   @Autowired
	    private EventRepository eventRepository;
	    @Autowired
	    private UserRepository userRepository;
	    public ResponseEntity<List<EventResponseDTO>> getEventsEnrolledByVolunteer(Integer volunteerID) {
	        User volunteer = userRepository.findById(volunteerID).orElse(null);

	        if (volunteer == null) {
	            return ResponseEntity.notFound().build();
	        }

	        List<Event> enrolledEvents = volunteer.getEvents();

	        List<EventResponseDTO> responseDTOs = enrolledEvents.stream()
	                .map(this::mapEventToEventResponseDTO)
	                .collect(Collectors.toList());

	        return ResponseEntity.ok(responseDTOs);
	    }
	    public ResponseEntity<String> updateIsNewUserFlag(Integer userId) {
	        User user = userRepository.findById(userId).orElse(null);

	        if (user == null) {
	            return ResponseEntity.notFound().build();
	        }

	        // Set isNewUser to false
	        user.setNewUser(false);
	        userRepository.save(user);

	        return ResponseEntity.ok("isNewUser flag updated successfully.");
	    }
	    public List<EventResponseDTO> getAllEventResponseDTOs() {
	        List<Event> events = getAllEvents();

	        return events.stream()
	                .map(event -> {
	                    EventResponseDTO responseDTO = new EventResponseDTO();
	                    responseDTO.setEventID(event.getEventID());
	                    responseDTO.setName(event.getName());
	                    responseDTO.setEventDate(event.getEventDate());
	                    responseDTO.setAddress(event.getAddress());
	                    responseDTO.setType(event.getType());
	                    responseDTO.setDescription(event.getDescription());
	                    responseDTO.setOrganizer(mapUserToUserDTO(event.getOrganizer()));
	                    return responseDTO;
	                })
	                .collect(Collectors.toList());
	    }

	    public List<EventResponseDTO> getEventsByOrgIDs(Integer orgID) {
	        List<Event> events = getEventsByOrgID(orgID);

	        return events.stream()
	                .map(event -> {
	                    EventResponseDTO responseDTO = new EventResponseDTO();
	                    responseDTO.setEventID(event.getEventID());
	                    responseDTO.setName(event.getName());
	                    responseDTO.setType(event.getType());
	                    responseDTO.setDescription(event.getDescription());
	                    responseDTO.setAddress(event.getAddress());
	                    responseDTO.setOrganizer(mapUserToUserDTO(event.getOrganizer()));
	                    responseDTO.setEventDate(event.getEventDate());
	                    return responseDTO;
	                })
	                .collect(Collectors.toList());
	    }
	    public EventResponseDTO getEventResponseDTO(Integer eventID) {
	        Event event = getEventById(eventID);

	        EventResponseDTO responseDTO = new EventResponseDTO();
	        responseDTO.setEventID(event.getEventID());
	        responseDTO.setName(event.getName());
	        responseDTO.setType(event.getType());
	        responseDTO.setDescription(event.getDescription());
	        responseDTO.setOrganizer(mapUserToUserDTO(event.getOrganizer()));
	        responseDTO.setEventDate(event.getEventDate());
	        responseDTO.setAddress(event.getAddress());
	        return responseDTO;
	    }
	    public ResponseEntity<Void> unenrollVolunteerFromEvent(Integer eventID, Integer volunteerID) {
	        Event event = eventRepository.findById(eventID).orElse(null);
	        User volunteer = userRepository.findById(volunteerID).orElse(null);

	        if (event == null || volunteer == null) {
	            return ResponseEntity.notFound().build();
	        }

	        if (!event.getVolunteers().contains(volunteer)) {
	            return ResponseEntity.status(HttpStatus.CONFLICT).build(); 
	        }

	        event.getVolunteers().remove(volunteer);
	        eventRepository.save(event);

	        return ResponseEntity.ok().build();
	    }
	    public ResponseEntity<String> enrollVolunteerInEvent(Integer eventID, Integer volunteerID) {
	        Event event = eventRepository.findById(eventID).orElse(null);
	        User volunteer = userRepository.findById(volunteerID).orElse(null);

	        if (event == null || volunteer == null) {
	            return ResponseEntity.notFound().build();
	        }
	        if (event.getVolunteers().contains(volunteer)) {
	            return ResponseEntity.ok().body("Volunteer is already enrolled in the event.");
	        }
	        event.getVolunteers().add(volunteer);
	        eventRepository.save(event);

	        return ResponseEntity.ok().build();
	    }
	    public Event createEvent(Event event) {
	        return eventRepository.save(event);
	    }

	    public Event getEventById(Integer eventId) {
	        Optional<Event> eventOptional = eventRepository.findById(eventId);
	        return eventOptional.orElse(null);
	    }

	    public List<Event> getAllEvents() {
	        return eventRepository.findAll();
	    }

	    public Event updateEvent(Event event) {
	        return eventRepository.save(event);
	    }

	    public void deleteEvent(Integer eventId) {
	        eventRepository.deleteById(eventId);
	    }

		public List<Event> getEventsByOrgID(Integer orgID) {
			// TODO Auto-generated method stub
	        return eventRepository.findByOrganizer_OrgID(orgID);
		}
	    private UserDTO mapUserToUserDTO(User user) {
	        if (user == null) {
	            return null; 
	        }

	        UserDTO userDTO = new UserDTO();
	        userDTO.setOrgID(user.getOrgID());
	        userDTO.setName(user.getName());
	        userDTO.setType(user.getType());
	        return userDTO;
	    }
	    private EventResponseDTO mapEventToEventResponseDTO(Event event) {
	        EventResponseDTO responseDTO = new EventResponseDTO();
	        responseDTO.setEventID(event.getEventID());
	        responseDTO.setName(event.getName());
	        responseDTO.setType(event.getType());
	        responseDTO.setDescription(event.getDescription());
	        responseDTO.setAddress(event.getAddress());
	        responseDTO.setOrganizer(mapUserToUserDTO(event.getOrganizer()));
	        responseDTO.setEventDate(event.getEventDate());

	        return responseDTO;
	    }

}
