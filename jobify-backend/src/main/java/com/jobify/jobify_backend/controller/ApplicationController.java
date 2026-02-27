package com.jobify.jobify_backend.controller;

import com.jobify.jobify_backend.dto.ApplicationResponse;
import com.jobify.jobify_backend.dto.ApplyRequest;
import com.jobify.jobify_backend.entity.Application;
import com.jobify.jobify_backend.service.ApplicationService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/applications")
@RequiredArgsConstructor
public class ApplicationController {

    private final ApplicationService applicationService;

    @PostMapping
    @PreAuthorize("hasRole('CANDIDATE')")
    public void apply(@RequestBody ApplyRequest request,
                      Authentication authentication) {
        applicationService.apply(request.getJobId(), authentication.getName());
    }

    @GetMapping("/job/{jobId}")
    @PreAuthorize("hasRole('COMPANY')")
    public List<ApplicationResponse> getApplications(
            @PathVariable Long jobId,
            Authentication authentication) {

        return applicationService.getByJob(jobId, authentication.getName());
    }

    @GetMapping("/my-applications")
    @PreAuthorize("hasRole('CANDIDATE')")
    public List<Application> myApplications(Authentication auth) {
        return applicationService.getByCandidate(auth.getName());
    }
}
