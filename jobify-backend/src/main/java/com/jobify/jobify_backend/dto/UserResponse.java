package com.jobify.jobify_backend.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserResponse {

    private Long id;
    private String name;
    private String email;
    private String role;
    private String bio;
    private String avatarUrl;
    private Boolean hasCv;
    private String cvFileName;
}
