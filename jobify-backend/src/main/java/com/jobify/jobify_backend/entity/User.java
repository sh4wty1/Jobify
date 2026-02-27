package com.jobify.jobify_backend.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(length = 1000)
    private String bio;

    @Column(name = "avatar_url", length = 1200)
    private String avatarUrl;

    @Column(name = "cv_file_name", length = 500)
    private String cvFileName;

    @Column(name = "cv_content_type", length = 200)
    private String cvContentType;

    @Lob
    @Column(name = "cv_data")
    private byte[] cvData;

    @Enumerated(EnumType.STRING)
    private Role role;
}
