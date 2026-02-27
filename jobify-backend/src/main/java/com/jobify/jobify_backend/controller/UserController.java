package com.jobify.jobify_backend.controller;


import com.jobify.jobify_backend.dto.AdminUpdateUserRequest;
import com.jobify.jobify_backend.dto.CreateUserRequest;
import com.jobify.jobify_backend.dto.UpdateProfileRequest;
import com.jobify.jobify_backend.dto.UserResponse;
import com.jobify.jobify_backend.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping
    public UserResponse createUser(@RequestBody @Valid CreateUserRequest request) {
        return userService.createUser(request);
    }

    @GetMapping("/me")
    public UserResponse getMyProfile(Authentication authentication) {
        return userService.getProfile(authentication.getName());
    }

    @PutMapping("/me")
    public UserResponse updateMyProfile(
            Authentication authentication,
            @RequestBody UpdateProfileRequest request
    ) {
        return userService.updateProfile(authentication.getName(), request);
    }

    @PostMapping(value = "/me/cv", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @PreAuthorize("hasRole('CANDIDATE')")
    public UserResponse uploadMyCv(
            Authentication authentication,
            @RequestPart("file") MultipartFile file
    ) {
        return userService.uploadCv(authentication.getName(), file);
    }

    @GetMapping("/me/cv")
    @PreAuthorize("hasRole('CANDIDATE')")
    public ResponseEntity<byte[]> downloadMyCv(Authentication authentication) {
        var cv = userService.getMyCv(authentication.getName());

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + cv.getFileName() + "\"")
                .contentType(MediaType.parseMediaType(cv.getContentType()))
                .body(cv.getData());
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public List<UserResponse> getUsers() {
        return userService.getAllUsers();
    }

    @PutMapping("/{userId}")
    @PreAuthorize("hasRole('ADMIN')")
    public UserResponse updateUserByAdmin(
            @PathVariable Long userId,
            @RequestBody AdminUpdateUserRequest request
    ) {
        return userService.updateUserByAdmin(userId, request);
    }

    @DeleteMapping("/{userId}")
    @PreAuthorize("hasRole('ADMIN')")
    public void deleteUserByAdmin(@PathVariable Long userId) {
        userService.deleteUserByAdmin(userId);
    }
}
