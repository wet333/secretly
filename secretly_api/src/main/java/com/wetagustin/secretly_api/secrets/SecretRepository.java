package com.wetagustin.secretly_api.secrets;

import com.wetagustin.secretly_api.projects.Project;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface SecretRepository extends JpaRepository<Secret, Integer> {
    List<Secret> findAllByProject(Project project);
}
