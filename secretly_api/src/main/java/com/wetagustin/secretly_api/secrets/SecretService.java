package com.wetagustin.secretly_api.secrets;

import com.wetagustin.secretly_api.global.EncryptionUtils;
import com.wetagustin.secretly_api.projects.Project;
import com.wetagustin.secretly_api.projects.ProjectRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Service
public class SecretService {

    private final SecretRepository secretRepository;
    private final ProjectRepository projectRepository;
    private EncryptionUtils encryptionUtils;

    public SecretService(
            SecretRepository secretRepository, ProjectRepository projectRepository, EncryptionUtils encryptionUtils
    ) {
        this.secretRepository = secretRepository;
        this.projectRepository = projectRepository;
        this.encryptionUtils = encryptionUtils;
    }

    public List<SecretDTO> findAllByProject(String projectName) {
        Project project = projectRepository.findByName(projectName);
        List<Secret> secrets = secretRepository.findAllByProject(project);
        List<SecretDTO> secretDTOs = new ArrayList<>();

        for (Secret secret : secrets) {
            secretDTOs.add(SecretDTO.builder()
                    .projectName(project.getName())
                    .keyName(secret.getKeyName())
                    .value(secret.getValue())
                    .build()
            );
        }
        return secretDTOs;
    }

    public Project addSecretToProject(String projectName, SecretDTO secretDTO) {
        if (projectName == null) {
            throw new IllegalArgumentException("Project name cannot be null");
        }
        if (secretDTO == null) {
            throw new IllegalArgumentException("Secret data cannot be null");
        }

        Project project = projectRepository.findByName(projectName);
        if (project == null) {
            throw new EntityNotFoundException("Project not found with name: " + projectName);
        }

        project.addSecret(secretDTO.getKeyName(), secretDTO.getValue());
        return projectRepository.save(project);
    }

    public Project updateSecretFromProject(String projectName, String secretName, SecretDTO secretDTO) {
        if (projectName == null) {
            throw new IllegalArgumentException("Project name cannot be null");
        }
        if (secretName == null) {
            throw new IllegalArgumentException("Secret key name cannot be null");
        }
        if (secretDTO == null) {
            throw new IllegalArgumentException("Secret data cannot be null");
        }
        if (secretDTO.getKeyName() == null || secretDTO.getValue() == null) {
            throw new IllegalArgumentException("Secret update key and value cannot be null");
        }

        Project project = projectRepository.findByName(projectName);
        if (project == null) {
            throw new EntityNotFoundException("Project not found with name: " + projectName);
        }
        if (project.hasSecret(secretDTO.getKeyName())) {
            throw new IllegalArgumentException("Secret already exists");
        }

        if (project.hasSecret(secretName)) {
            for (Secret secret : project.getSecrets()) {
                if (secret.getKeyName().equals(secretName)) {
                    secret.setKeyName(secretDTO.getKeyName());
                    secret.setValue(secretDTO.getValue());
                    break;
                }
            }
            return projectRepository.save(project);
        } else {
            throw new EntityNotFoundException(
                    "Secret with name " + secretName + " not found in project "  + projectName
            );
        }
    }

    public Project deleteSecretFromProject(String projectName, String secretKey) {
        if (projectName == null) {
            throw new IllegalArgumentException("Project name cannot be null");
        }
        if (secretKey == null) {
            throw new IllegalArgumentException("Secret key cannot be null");
        }

        Project project = projectRepository.findByName(projectName);
        if (project == null) {
            throw new EntityNotFoundException("Project not found with name: " + projectName);
        }

        if (!project.hasSecret(secretKey)) {
            throw new IllegalArgumentException("Secret with key '" + secretKey + "' not found in project");
        }
        project.removeSecret(secretKey);
        return projectRepository.save(project);
    }
}
