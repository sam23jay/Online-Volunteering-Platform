package com.ravenclaw.harmony.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import com.ravenclaw.harmony.service.SkillsService;

@RestController
@RequestMapping("/api/skills")
@PreAuthorize("hasRole('USER')")
public class SkillController {

    private final SkillsService skillsService;

    @Autowired
    public SkillController(SkillsService skillsService) {
        this.skillsService = skillsService;
    }

    @PostMapping("/update/{userId}")
    @PreAuthorize("hasAuthority('user:create')")
    public ResponseEntity<String> updateSkills(@PathVariable Integer userId, @RequestBody String skills) {
        System.out.println("working");
        try {
            String[] skillArray = skills.split(",");

            if (skillArray.length != 3) {
                return ResponseEntity.badRequest().body("Exactly three skills are required.");
            }

            skillsService.updateUserSkills(userId, skillArray[0], skillArray[1], skillArray[2]);
            return ResponseEntity.ok("Skills updated successfully");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error updating skills");
        }
    }

    @GetMapping("/get/{userId}")
    @PreAuthorize("hasAuthority('user:read')")
    public ResponseEntity<String[]> getSkills(@PathVariable Integer userId) {
        String[] userSkills = skillsService.getUserSkills(userId);

        if (userSkills != null) {
            return ResponseEntity.ok(userSkills);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @GetMapping("/get")
    @PreAuthorize("hasAuthority('user:read')")
    public String readfrom() {
        return "read";
    }
}
