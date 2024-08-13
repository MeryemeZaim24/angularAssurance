package com.tarmiz.assurance.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "contrat")
public class Contrat {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String police;
    private LocalDate dateSignature;
    private LocalDate dateExpiration;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "assure_id")
    private Assure assure;

}
