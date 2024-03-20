package com.ravenclaw.harmony.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.ravenclaw.harmony.dto.EventRequestDTO;
import com.ravenclaw.harmony.dto.EventResponseDTO;
import com.ravenclaw.harmony.dto.UserDTO;
import com.ravenclaw.harmony.model.Event;
import com.ravenclaw.harmony.model.User;
import com.ravenclaw.harmony.repository.EventRepository;
import com.ravenclaw.harmony.repository.UserRepository;

import jakarta.persistence.EntityNotFoundException;

import java.io.IOException;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class EventService {

    @Autowired
    private EventRepository eventRepository;
    @Autowired
   private UserRepository userRepository;

    @Transactional
    public void uploadImages(Integer eventId, MultipartFile profileImage, MultipartFile dImage1, MultipartFile dImage2, MultipartFile dImage3) throws IOException {
        Event event = eventRepository.findById(eventId).orElseThrow(() -> new EntityNotFoundException	("Event not found"));

        if (profileImage != null && !profileImage.isEmpty()) {
            byte[] profileImageData = profileImage.getBytes();
            event.setProfileImage(profileImageData);
        }

   
        eventRepository.save(event);
    }
    public List<EventResponseDTO> getAllEventsAsResponseDTOs() {
        List<Event> events = eventRepository.findAll();

        return events.stream()
                .map(this::mapEventToEventResponseDTO)
                .collect(Collectors.toList());
    }
    public List<EventResponseDTO> getEventsEnrolledByVolunteer(Integer volunteerID) {
        User volunteer = userRepository.findById(volunteerID).orElse(null);

        if (volunteer == null) {
            return Collections.emptyList();
        }

        List<Event> enrolledEvents = volunteer.getEvents();

        List<EventResponseDTO> responseDTOs = enrolledEvents.stream()
                .map(this::mapEventToEventResponseDTO)
                .collect(Collectors.toList());

        return responseDTOs;
    }
    public EventResponseDTO updateEvent(Integer eventID, EventRequestDTO eventRequestDTO) {
        Event existingEvent = eventRepository.findById(eventID).orElse(null);

        if (existingEvent == null) {
            return null;
        }

        existingEvent.setName(eventRequestDTO.getName());
        existingEvent.setType(eventRequestDTO.getType());
        existingEvent.setDescription(eventRequestDTO.getDescription());
        existingEvent.setAddress(eventRequestDTO.getAddress());
        existingEvent.setEventDate(eventRequestDTO.getEventDate());

        Event updatedEvent = eventRepository.save(existingEvent);

        EventResponseDTO responseDTO = mapEventToEventResponseDTO(updatedEvent);

        return responseDTO;
    }
    public List<EventResponseDTO> getEventsByOrgIDs(Integer orgID) {
        List<Event> events = getEventsByOrgID(orgID);

        List<EventResponseDTO> responseDTOs = events.stream()
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
        return responseDTOs;
    }
    public EventResponseDTO getEvent(Integer eventID) {
        Event event = eventRepository.findById(eventID).orElse(null);

        if (event == null) {
            return null;
        }

        EventResponseDTO responseDTO = new EventResponseDTO();
        responseDTO.setEventID(event.getEventID());
        responseDTO.setName(event.getName());
        responseDTO.setType(event.getType());
        responseDTO.setDescription(event.getDescription());
        responseDTO.setOrganizer(mapUserToUserDTO(event.getOrganizer()));

        return responseDTO;
    }
    public List<UserDTO> getVolunteersByEventID(Integer eventID) {
        Event event = eventRepository.findById(eventID).orElse(null);

        if (event == null) {
            return Collections.emptyList();
        }

        List<UserDTO> volunteers = event.getVolunteers().stream()
                .map(this::mapUserToUserDTO)
                .collect(Collectors.toList());

        return volunteers;
    }
    public EventResponseDTO createEvent(EventRequestDTO eventRequestDTO) {
        User organizer = userRepository.findById(eventRequestDTO.getOrganizer().getOrgID()).orElse(null);

        Event event = new Event();
        event.setName(eventRequestDTO.getName());
        event.setType(eventRequestDTO.getType());
        event.setDescription(eventRequestDTO.getDescription());
        event.setOrganizer(organizer);
        event.setAddress(eventRequestDTO.getAddress());
        event.setEventDate(eventRequestDTO.getEventDate());
        event.setSkill(eventRequestDTO.getSkill());
        Event createdEvent = eventRepository.save(event);

        EventResponseDTO responseDTO = new EventResponseDTO();
        responseDTO.setEventID(createdEvent.getEventID());
        responseDTO.setName(createdEvent.getName());
        responseDTO.setType(createdEvent.getType());
        responseDTO.setDescription(createdEvent.getDescription());
        responseDTO.setAddress(createdEvent.getAddress());
        responseDTO.setEventDate(createdEvent.getEventDate());
        responseDTO.setOrganizer(mapUserToUserDTO(createdEvent.getOrganizer()));

        return responseDTO;
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
        userDTO.setGender(user.getGender());
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
