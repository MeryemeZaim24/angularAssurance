package com.tarmiz.assurance.repository;

import com.tarmiz.assurance.model.Contrat;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


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

    Page<Contrat> findAll(Pageable pageable);


    List<Contrat> findAllByOrderByDateExpirationAsc();
    List<Contrat> findAllByOrderByDateExpirationDesc();


    List<Contrat> findAllByOrderByPoliceAsc();
    List<Contrat> findAllByOrderByPoliceDesc();




    List<Contrat> findAllByOrderByIdAsc();

    List<Contrat> findAllByOrderByIdDesc();







    @Query("SELECT c FROM Contrat c JOIN c.assure a ORDER BY a.nom ASC")
    List<Contrat> findAllByAssureNameAsc();

    @Query("SELECT c FROM Contrat c JOIN c.assure a ORDER BY a.nom DESC")
    List<Contrat> findAllByAssureNameDesc();





    @Query("SELECT c FROM Contrat c JOIN c.assure a ORDER BY a.cin ASC")
    List<Contrat> findAllByAssureCinAsc();

    @Query("SELECT c FROM Contrat c JOIN c.assure a ORDER BY a.cin DESC")
    List<Contrat> findAllByAssureCinDesc();




    @Query("SELECT c FROM Contrat c JOIN c.assure a ORDER BY a.nom ASC")
    List<Contrat> findAllByAssureNomAsc();

    @Query("SELECT c FROM Contrat c JOIN c.assure a ORDER BY a.nom DESC")
    List<Contrat> findAllByAssureNomDesc();





    @Query("SELECT c FROM Contrat c ORDER BY c.assure.id ASC")
    List<Contrat> findAllByAssureIdAsc();

    @Query("SELECT c FROM Contrat c ORDER BY c.assure.id DESC")
    List<Contrat> findAllByAssureIdDesc();





    @Query("SELECT c FROM Contrat c WHERE c.dateExpiration >= CURRENT_DATE")
    List<Contrat> findCurrentContrats();

    @Query("SELECT c FROM Contrat c WHERE c.dateExpiration < CURRENT_DATE")
    List<Contrat> findExpiredContrats();




    @Query("SELECT c FROM Contrat c WHERE " +
            "(:status = 'all' OR " +
            "(:status = 'current' AND c.dateExpiration > CURRENT_DATE) OR " +
            "(:status = 'expired' AND c.dateExpiration <= CURRENT_DATE))")
    List<Contrat> findByStatus(@Param("status") String status);






}
