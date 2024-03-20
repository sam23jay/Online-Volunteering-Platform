package com.ravenclaw.harmony.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ravenclaw.harmony.model.Volunteer;

@Repository
public interface VolunteerRepository extends JpaRepository<Volunteer, Integer> {

	Optional<Volunteer> findByUsername(String username);

}
