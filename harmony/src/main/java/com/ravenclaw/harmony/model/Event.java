package com.ravenclaw.harmony.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.*;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Objects;
import java.util.Set;

import com.ravenclaw.harmony.dto.UserDTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "event")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer eventID;
    private String name;
    private String type;
    private String address;
    private LocalDate eventDate; 
    private String skill;
    @Lob
    private String description;

    @Lob
    private byte[] profileImage; // Profile picture

    @Lob
    private byte[] dImage1;

    @Lob
    private byte[] dImage2;

    @Lob
    private byte[] dImage3;
    @ManyToOne
    private User organizer;
    @ManyToMany
    @JoinTable(
        name = "user_event",
        joinColumns = @JoinColumn(name = "event_id"),
        inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    private List<User> volunteers = new ArrayList<>();
    public Integer getOrganizerOrgID() {
        if (organizer != null) {
            return organizer.getOrgID();
        }
        return null; 
    }
    @Override
    public int hashCode() {
        return Objects.hashCode(eventID); 
    }

    
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Event event = (Event) o;
        return Objects.equals(eventID, event.eventID); 
    }

}
