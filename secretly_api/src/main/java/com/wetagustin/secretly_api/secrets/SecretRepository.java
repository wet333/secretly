package com.wetagustin.secretly_api.secrets;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface SecretRepository extends JpaRepository<Secret, Integer> {
    Optional<Secret> findByKeyNameAndProject_Name(String keyName, String projectName);
    List<Secret> findByProject_Name(String projectName);
}
