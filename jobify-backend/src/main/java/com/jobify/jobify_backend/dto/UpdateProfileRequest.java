package com.jobify.jobify_backend.dto;

import lombok.Data;

@Data
public class UpdateProfileRequest {
    private String name;
    private String bio;
    private String avatarUrl;
}
