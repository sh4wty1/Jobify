package com.jobify.jobify_backend.dto;

import lombok.Data;

@Data
public class AdminUpdateUserRequest {
    private String name;
    private String email;
    private String role;
    private String bio;
    private String avatarUrl;
}
