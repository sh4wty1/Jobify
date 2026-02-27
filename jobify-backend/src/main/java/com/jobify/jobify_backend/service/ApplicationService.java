package com.jobify.jobify_backend.service;

import com.jobify.jobify_backend.dto.ApplicationResponse;
import com.jobify.jobify_backend.entity.Application;
import com.jobify.jobify_backend.entity.ApplicationStatus;
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
public class ApplicationService {

    private final ApplicationRepository applicationRepository;
    private final UserRepository userRepository;
    private final JobRepository jobRepository;

    public void apply(Long jobId, String email) {

        User candidate = userRepository.findByEmail(email)
                .orElseThrow();

        Job job = jobRepository.findById(jobId)
                .orElseThrow();

        boolean alreadyApplied = applicationRepository
                .existsByCandidateIdAndJobId(candidate.getId(), jobId);

        if (alreadyApplied) {
            throw new RuntimeException("You already applied to this job");
        }

        Application application = Application.builder()
                .candidate(candidate)
                .job(job)
                .status(ApplicationStatus.PENDING)
                .build();

        applicationRepository.save(application);
    }

    public void updateStatus(Long applicationId, String status, String companyEmail) {

        User company = userRepository.findByEmail(companyEmail)
                .orElseThrow();

        Application application = applicationRepository.findById(applicationId)
                .orElseThrow(() -> new RuntimeException("Application not found"));

        if (!application.getJob().getCompany().getId().equals(company.getId())) {
            throw new RuntimeException("You are not allowed to update this application");
        }

        ApplicationStatus nextStatus;
        try {
            nextStatus = ApplicationStatus.valueOf(status.toUpperCase());
        } catch (IllegalArgumentException ex) {
            throw new RuntimeException("Invalid application status");
        }

        application.setStatus(nextStatus);
        applicationRepository.save(application);
    }

    public List<ApplicationResponse> getByJob(Long jobId, String email) {

        User company = userRepository.findByEmail(email)
                .orElseThrow();

        Job job = jobRepository.findById(jobId)
                .orElseThrow();

        // segurança extra: garantir que o job pertence à empresa
        if (!job.getCompany().getId().equals(company.getId())) {
            throw new RuntimeException("You are not allowed to view this job");
        }

        return applicationRepository.findByJobId(jobId)
                .stream()
                .map(app -> ApplicationResponse.builder()
                        .id(app.getId())
                        .candidateName(app.getCandidate().getName())
                        .candidateEmail(app.getCandidate().getEmail())
                        .status(app.getStatus().name())
                        .build())
                .toList();
    }

    public List<Application> getByCandidate(String email) {
        User candidate = userRepository.findByEmail(email).orElseThrow();
        return applicationRepository.findByCandidateId(candidate.getId());
    }
}
