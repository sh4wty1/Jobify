package com.jobify.jobify_backend.service;

import com.jobify.jobify_backend.dto.CreateJobRequest;
import com.jobify.jobify_backend.dto.JobResponse;
import com.jobify.jobify_backend.entity.Job;
import com.jobify.jobify_backend.entity.User;
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

    public JobResponse createJob(CreateJobRequest request, String email) {

        User company = userRepository.findByEmail(email)
                .orElseThrow();

        Job job = Job.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .company(company)
                .build();

        Job saved = jobRepository.save(job);

        return JobResponse.builder()
                .id(saved.getId())
                .title(saved.getTitle())
                .description(saved.getDescription())
                .companyName(saved.getCompany().getName())
                .build();
    }

    public List<JobResponse> getAllJobs() {
        return jobRepository.findAll().stream()
                .map(job -> JobResponse.builder()
                        .id(job.getId())
                        .title(job.getTitle())
                        .description(job.getDescription())
                        .companyName(job.getCompany().getName())
                        .build())
                .toList();
    }

    public List<Job> getByCompany(String email) {
        User company = userRepository.findByEmail(email).orElseThrow();
        return jobRepository.findByCompanyId(company.getId());
    }
}
