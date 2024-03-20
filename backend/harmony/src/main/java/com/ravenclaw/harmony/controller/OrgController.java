package com.ravenclaw.harmony.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.ravenclaw.harmony.dto.OrgResponseDTO;
import com.ravenclaw.harmony.model.User;
import com.ravenclaw.harmony.service.OrgService;

@RestController
@RequestMapping("/org")
public class OrgController {

    @Autowired
    private OrgService userService;


    @GetMapping("/{userId}")
    public ResponseEntity<OrgResponseDTO> getUser(@PathVariable Integer userId) {
        User user = userService.getUserById(userId);

        OrgResponseDTO responseDTO = new OrgResponseDTO();
        responseDTO.setId(user.getOrgID());
        responseDTO.setName(user.getName());
        responseDTO.setType(user.getType());

        return ResponseEntity.ok(responseDTO);
    }

    @DeleteMapping("/{userId}")
    public ResponseEntity<Void> deleteUser(@PathVariable Integer userId) {
        userService.deleteUser(userId);

        return ResponseEntity.noContent().build();
    }
}
