package com.jobify.jobify_backend.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ApplicationResponse {

    private Long id;
    private String candidateName;
    private String candidateEmail;
    private String status;
}
