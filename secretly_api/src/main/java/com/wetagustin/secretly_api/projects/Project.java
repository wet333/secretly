package com.wetagustin.secretly_api.projects;

import com.fasterxml.jackson.annotation.JsonManagedReference;
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

    public Boolean hasSecret(String secretKey) {
        for (Secret secret : secrets) {
            if (secret.getKeyName().equals(secretKey)) {
                return true;
            }
        }
        return false;
    }

    public Secret addSecret(String keyName, String value) {
        Secret secret = new Secret(keyName, value);
        secret.setProject(this);
        this.secrets.add(secret);
        return secret;
    }

    public Secret removeSecret(String keyName) {
        Secret deletedSecret = null;

        for (Secret secret : this.secrets) {
            if (secret.getKeyName().equals(keyName)) {
                deletedSecret = secret;
                break;
            }
        }

        if (deletedSecret == null) {
            throw new EntityNotFoundException("Secret not found with name " + keyName);
        }

        this.secrets.remove(deletedSecret);
        return deletedSecret;
    }
}

