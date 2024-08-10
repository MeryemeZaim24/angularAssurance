package com.tarmiz.assurance.repository;

import com.tarmiz.assurance.model.Assure;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AssureRepository extends JpaRepository<Assure, Long> {
    List<Assure> findByNomContainingOrPrenomContaining(String nom, String prenom);
//    List<Assure> findByCin(String cin);




    List<Assure> findAllByOrderByCinAsc();

    List<Assure> findAllByOrderByCinDesc();
}
