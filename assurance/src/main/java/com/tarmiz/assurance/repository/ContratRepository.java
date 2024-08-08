package com.tarmiz.assurance.repository;

import com.tarmiz.assurance.model.Contrat;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface ContratRepository extends JpaRepository<Contrat, Long> {
    List<Contrat> findByAssureId(Long assureId);





    List<Contrat> findByAssureIdAndPoliceContaining(Long assureId , String police);

    List<Contrat> findByAssureIdAndDateExpirationBefore(Long assureId, LocalDate date);

    List<Contrat> findByAssureIdAndDateExpirationAfter(Long assureId, LocalDate date);







    List<Contrat> findByDateExpirationBefore(LocalDate date);


    List<Contrat> findByDateExpirationAfter(LocalDate date);


    List<Contrat> findByDateSignatureBetweenAndDateExpirationBetween(LocalDate startSignature, LocalDate endSignature, LocalDate startExpiration, LocalDate endExpiration);
    List<Contrat> findByDateExpirationBetween(LocalDate startDate, LocalDate endDate);



    List<Contrat> findByPoliceContaining(String police);














}
