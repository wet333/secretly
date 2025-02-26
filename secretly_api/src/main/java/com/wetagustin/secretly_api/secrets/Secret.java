package com.wetagustin.secretly_api.secrets;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.wetagustin.secretly_api.projects.Project;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(
        name = "secrets",
        uniqueConstraints = {
                @UniqueConstraint(
                        name = "uniq_secret_per_project",
                        columnNames = {"key_name", "project_id"}
                )
        }
)
public class Secret {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String keyName;
    private String value;   // Must be encrypted

    /**
     * Each secret is associated with a single project.
     * LAZY fetching is typically preferred for collections and
     * references to avoid unnecessary data retrieval.
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "project_id")
    private Project project;

    public Secret(String keyName, String value) {
        this.keyName = keyName;
        this.value = value;
    }
}
