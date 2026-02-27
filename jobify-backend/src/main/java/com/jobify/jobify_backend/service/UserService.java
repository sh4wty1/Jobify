package com.jobify.jobify_backend.service;


import com.jobify.jobify_backend.dto.AdminUpdateUserRequest;
import com.jobify.jobify_backend.dto.CreateUserRequest;
import com.jobify.jobify_backend.dto.CvFileResponse;
import com.jobify.jobify_backend.dto.UpdateProfileRequest;
import com.jobify.jobify_backend.dto.UserResponse;
import com.jobify.jobify_backend.entity.Role;
import com.jobify.jobify_backend.entity.User;
import com.jobify.jobify_backend.repository.ApplicationRepository;
import com.jobify.jobify_backend.repository.JobRepository;
import com.jobify.jobify_backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final JobRepository jobRepository;
    private final ApplicationRepository applicationRepository;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public UserResponse createUser(CreateUserRequest request) {

        User user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.valueOf(request.getRole()))
                .build();

        User saved = userRepository.save(user);

        return toResponse(saved);
    }

    public List<UserResponse> getAllUsers() {
        return userRepository.findAll().stream()
                .map(this::toResponse)
                .toList();
    }

    public UserResponse getProfile(String email) {
        User user = userRepository.findByEmail(email).orElseThrow();
        return toResponse(user);
    }

    public UserResponse updateProfile(String email, UpdateProfileRequest request) {
        User user = userRepository.findByEmail(email).orElseThrow();

        if (request.getName() != null && !request.getName().isBlank()) {
            user.setName(request.getName());
        }

        user.setBio(request.getBio());
        user.setAvatarUrl(request.getAvatarUrl());

        return toResponse(userRepository.save(user));
    }

    public UserResponse uploadCv(String email, MultipartFile file) {
        User user = userRepository.findByEmail(email).orElseThrow();

        if (user.getRole() != Role.CANDIDATE) {
            throw new RuntimeException("Only candidates can upload CV");
        }

        try {
            user.setCvFileName(file.getOriginalFilename());
            user.setCvContentType(file.getContentType());
            user.setCvData(file.getBytes());
        } catch (IOException e) {
            throw new RuntimeException("Could not read CV file");
        }

        return toResponse(userRepository.save(user));
    }

    public CvFileResponse getMyCv(String email) {
        User user = userRepository.findByEmail(email).orElseThrow();

        if (user.getCvData() == null || user.getCvData().length == 0) {
            throw new RuntimeException("CV not found");
        }

        return CvFileResponse.builder()
                .data(user.getCvData())
                .fileName(user.getCvFileName() == null ? "cv.pdf" : user.getCvFileName())
                .contentType(user.getCvContentType() == null ? "application/octet-stream" : user.getCvContentType())
                .build();
    }

    public UserResponse updateUserByAdmin(Long userId, AdminUpdateUserRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (request.getName() != null && !request.getName().isBlank()) {
            user.setName(request.getName());
        }

        if (request.getEmail() != null && !request.getEmail().isBlank()) {
            user.setEmail(request.getEmail());
        }

        if (request.getRole() != null && !request.getRole().isBlank()) {
            user.setRole(Role.valueOf(request.getRole()));
        }

        user.setBio(request.getBio());
        user.setAvatarUrl(request.getAvatarUrl());

        return toResponse(userRepository.save(user));
    }

    public void deleteUserByAdmin(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        applicationRepository.deleteByCandidateId(userId);

        var userJobs = jobRepository.findByCompanyId(userId);
        for (var job : userJobs) {
            applicationRepository.deleteByJobId(job.getId());
        }
        jobRepository.deleteAll(userJobs);

        userRepository.delete(user);
    }

    private UserResponse toResponse(User user) {
        return UserResponse.builder()
                .id(user.getId())
                .name(user.getName())
                .email(user.getEmail())
                .role(user.getRole().name())
                .bio(user.getBio())
                .avatarUrl(user.getAvatarUrl())
                .hasCv(user.getCvData() != null && user.getCvData().length > 0)
                .cvFileName(user.getCvFileName())
                .build();
    }
}
