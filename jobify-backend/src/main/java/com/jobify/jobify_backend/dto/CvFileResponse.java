package com.jobify.jobify_backend.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CvFileResponse {
    private byte[] data;
    private String fileName;
    private String contentType;
}
