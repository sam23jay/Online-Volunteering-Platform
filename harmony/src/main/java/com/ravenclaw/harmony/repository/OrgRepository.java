package com.ravenclaw.harmony.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ravenclaw.harmony.model.Event;
import com.ravenclaw.harmony.model.User;

@Repository
public interface OrgRepository extends JpaRepository<User, Integer> {


}
