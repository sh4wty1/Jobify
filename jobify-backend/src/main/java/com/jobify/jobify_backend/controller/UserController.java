package com.jobify.jobify_backend.controller;


import com.jobify.jobify_backend.dto.AdminUpdateUserRequest;
import com.jobify.jobify_backend.dto.CreateUserRequest;
import com.jobify.jobify_backend.dto.UpdateProfileRequest;
import com.jobify.jobify_backend.dto.UserResponse;
import com.jobify.jobify_backend.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

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
