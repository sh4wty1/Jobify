package com.jobify.jobify_backend.dto;

import lombok.Getter;

@Getter
public class CreateJobRequest {

    private String title;
    private String description;
    private String fullDescription;
}
