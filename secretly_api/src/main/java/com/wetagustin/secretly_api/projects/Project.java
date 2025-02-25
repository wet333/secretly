package com.wetagustin.secretly_api.projects;

import com.wetagustin.secretly_api.secrets.Secret;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Table(name = "projects")
public class Project {

    // Getters and Setters
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String name;

    /**
     * Each project can have multiple secrets.
     * CascadeType.ALL will ensure that operations like persist/delete
     * on Project propagate to its Secrets.
     * orphanRemoval = true helps remove any Secret that is no longer
     * referenced in this collection.
     */
    @OneToMany(
            mappedBy = "project",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private List<Secret> secrets = new ArrayList<>();

    public Project(String name) {
        this.name = name;
    }

    public Secret addSecret(String keyName, String value) {
        Secret secret = new Secret(keyName, value);
        secret.setProject(this);
        this.secrets.add(secret);
        return secret;
    }

    public void removeSecret(Secret secret) {
        if (secrets.remove(secret)) {
            secret.setProject(null);
        }
    }
}

