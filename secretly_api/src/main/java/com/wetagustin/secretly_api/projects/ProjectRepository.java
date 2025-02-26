package com.wetagustin.secretly_api.projects;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjectRepository extends JpaRepository<Project, Integer> {
    Project findByName(String projectName);
    void deleteByName(String projectName);
}
