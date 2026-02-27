package com.jobify.jobify_backend.controller;

import com.jobify.jobify_backend.dto.CreateJobRequest;
import com.jobify.jobify_backend.dto.JobResponse;
import com.jobify.jobify_backend.service.JobService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/jobs")
@RequiredArgsConstructor
public class JobController {

    private final JobService jobService;

    @PreAuthorize("hasRole('COMPANY')")
    @PostMapping
    public JobResponse createJob(
            @RequestBody @Valid CreateJobRequest request,
            Authentication authentication
    ) {
        return jobService.createJob(request, authentication.getName());
    }

    @GetMapping
    public List<JobResponse> getJobs() {
        return jobService.getAllJobs();
    }

    @GetMapping("/{jobId}")
    public JobResponse getJobById(@PathVariable Long jobId) {
        return jobService.getJobById(jobId);
    }

    @GetMapping("/my-jobs")
    @PreAuthorize("hasRole('COMPANY')")
    public List<JobResponse> getMyJobs(Authentication authentication) {
        return jobService.getByCompany(authentication.getName());
    }
}
