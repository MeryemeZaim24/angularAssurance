package com.tarmiz.assurance.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Table(name = "loginUser")
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data

public class User {
    @Id
    private String userId;
    private String password;
}
