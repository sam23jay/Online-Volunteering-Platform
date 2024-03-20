package com.ravenclaw.harmony.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ravenclaw.harmony.model.User;

@Repository
public interface UserRepository extends JpaRepository<User,Integer>{
    Optional<User> findByUsername(String email);

	boolean existsByUsername(String username);
    
}
