package com.jobify.jobify_backend.service;

import com.jobify.jobify_backend.dto.CreateJobRequest;
import com.jobify.jobify_backend.dto.JobResponse;
import com.jobify.jobify_backend.entity.Job;
import com.jobify.jobify_backend.entity.User;
import com.jobify.jobify_backend.repository.ApplicationRepository;
import com.jobify.jobify_backend.repository.JobRepository;
import com.jobify.jobify_backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class JobService {

    private final JobRepository jobRepository;
    private final UserRepository userRepository;
    private final ApplicationRepository applicationRepository;

    public JobResponse createJob(CreateJobRequest request, String email) {

        User company = userRepository.findByEmail(email)
                .orElseThrow();

        Job job = Job.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .fullDescription(request.getFullDescription())
                .company(company)
                .build();

        Job saved = jobRepository.save(job);

        return toResponse(saved);
    }

    public List<JobResponse> getAllJobs() {
        return jobRepository.findAll().stream()
                .map(this::toResponse)
                .toList();
    }

    public JobResponse getJobById(Long jobId) {
        Job job = jobRepository.findById(jobId)
                .orElseThrow(() -> new RuntimeException("Job not found"));

        return toResponse(job);
    }

    public List<JobResponse> getByCompany(String email) {
        User company = userRepository.findByEmail(email).orElseThrow();
        return jobRepository.findByCompanyId(company.getId())
                .stream()
                .map(this::toResponse)
                .toList();
    }

    public void deleteJobByAdmin(Long jobId) {
        Job job = jobRepository.findById(jobId)
                .orElseThrow(() -> new RuntimeException("Job not found"));

        applicationRepository.deleteByJobId(jobId);
        jobRepository.delete(job);
    }

    private JobResponse toResponse(Job job) {
        return JobResponse.builder()
                .id(job.getId())
                .title(job.getTitle())
                .description(job.getDescription())
                .fullDescription(job.getFullDescription())
                .companyName(job.getCompany().getName())
                .build();
    }
}
