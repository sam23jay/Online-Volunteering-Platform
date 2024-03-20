package com.ravenclaw.harmony.model;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.*;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.Objects;
import java.util.Set;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.ravenclaw.harmony.model.enumerate.Role;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "_user")
public class User implements UserDetails {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer orgID;
  private String name;
  private String type;
  private String username;
  private String password;
  private String gender;
  private LocalDate dob;
  private String state;
  private boolean isNewUser;
  private boolean isRated;
  @Column(name = "skill1")
  private String skill1;

  @Column(name = "skill2")
  private String skill2;

  @Column(name = "skill3")
  private String skill3;

  @Lob
  private String description;
  
  private List<String> images;

  @OneToMany(mappedBy = "organizer")
  private List<Event> organizedEvents;

  @ManyToMany(mappedBy = "volunteers")
  private List<Event> events = new ArrayList<>();
  @Enumerated(EnumType.STRING)
  private Role role;

  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    return role.getAuthoritites();
  }

  @Override
  public String getPassword() {
    return password;
  }

  @Override
  public String getUsername() {
    return username;
  }

  @Override
  public boolean isAccountNonExpired() {
    return true;
  }

  @Override
  public boolean isAccountNonLocked() {
    return true;
  }

  @Override
  public boolean isCredentialsNonExpired() {
    return true;
  }

  @Override
  public boolean isEnabled() {
    return true;
  }
  @Override
  public int hashCode() {
      return Objects.hash(orgID); // Use a unique identifier property
  }

  @Override
  public boolean equals(Object o) {
      if (this == o) return true;
      if (o == null || getClass() != o.getClass()) return false;
      User user = (User) o;
      return Objects.equals(orgID, user.orgID); // Use a unique identifier property
  }

}