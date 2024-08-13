package com.tarmiz.assurance.service;

import com.tarmiz.assurance.model.Contrat;
import com.tarmiz.assurance.model.Assure;
import com.tarmiz.assurance.repository.ContratRepository;
import com.tarmiz.assurance.repository.AssureRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;















@Service
public class ContratService {

    @Autowired
    private ContratRepository contratRepository;

    @Autowired
    private AssureRepository assureRepository;


    @Autowired
    public ContratService(ContratRepository contratRepository) {
        this.contratRepository = contratRepository;
    }

    public List<Contrat> getAllContrats() {

        return contratRepository.findAll();
    }
    public Page<Contrat> getContrats(Pageable pageable) {
        return contratRepository.findAll(pageable);
    }


    public Optional<Contrat> getContratById(Long id) {

        return contratRepository.findById(id);
    }
    public List<Contrat> getContratsByAssureId(Long assureId) {
        return contratRepository.findByAssureId(assureId);
    }

    public Contrat saveContrat(Contrat contrat) {
        return contratRepository.save(contrat);
    }
    public void deleteContrat(Long id) {

        contratRepository.deleteById(id);
    }
    public List<Contrat> searchContrats(Long assureId, String police) {
        return contratRepository.findByAssureIdAndPoliceContaining(assureId, police);
    }
    public List<Contrat> getContratsByAssureIdAndExpirationDateBefore(Long assureId, LocalDate date) {
        return contratRepository.findByAssureIdAndDateExpirationBefore(assureId, date);
    }
    public List<Contrat> getContratsByAssureIdAndExpirationDateAfter(Long assureId, LocalDate date) {
        return contratRepository.findByAssureIdAndDateExpirationAfter(assureId, date);
    }
    public List<Contrat> getContratsByExpirationDateBefore(LocalDate date) {
        return contratRepository.findByDateExpirationBefore(date);
    }

    public List<Contrat> getContratsByExpirationDateAfter(LocalDate date) {
        return contratRepository.findByDateExpirationAfter(date);
    }
    public List<Contrat> getContratsExpiringAfter(String periodType, int amount) {
        LocalDate now = LocalDate.now();
        LocalDate startDate = now;
        LocalDate endDate;

        switch (periodType.toLowerCase()) {
            case "day":
                endDate = now.plusDays(amount);
                break;
            case "week":
                endDate = now.plusWeeks(amount);
                break;
            case "month":
                endDate = now.plusMonths(amount);
                break;
            default:
                throw new IllegalArgumentException("Invalid period type. Use 'day', 'week', or 'month'.");
        }

        return contratRepository.findByDateExpirationBetween(startDate, endDate);
    }
    public List<Contrat> searchContratsByPolice(String police) {
        return contratRepository.findByPoliceContaining(police);
    }







    public Contrat createContrat(Contrat contrat) {
        // Vérifier si l'assuré existe
        Assure assure = assureRepository.findById(contrat.getAssure().getId())
                .orElseThrow(() -> new RuntimeException("Assuré non trouvé"));
        contrat.setAssure(assure);
        return contratRepository.save(contrat);
    }



    public List<Contrat> getContratsSortedById(String sortOrder) {
        System.out.println("Sorting by ID: " + sortOrder);
        Sort sort = Sort.by(Sort.Order.by("id"));
        sort = sortOrder.equalsIgnoreCase("desc") ? sort.descending() : sort.ascending();
        return contratRepository.findAll(sort);
    }



    public List<Contrat> getContratsSortedByDateSignature(String sortOrder) {
        Sort sort = Sort.by(Sort.Order.by("dateSignature"));
        sort = sortOrder.equalsIgnoreCase("desc") ? sort.descending() : sort.ascending();
        return contratRepository.findAll(sort);
    }

    public List<Contrat> findAllSortedByDateExpiration(String sortOrder) {
        if ("desc".equalsIgnoreCase(sortOrder)) {
            return contratRepository.findAllByOrderByDateExpirationDesc();
        } else {
            return contratRepository.findAllByOrderByDateExpirationAsc();
        }
    }

    public List<Contrat> findAllSortedByPolice(String sortOrder) {
        if ("desc".equalsIgnoreCase(sortOrder)) {
            return contratRepository.findAllByOrderByPoliceDesc();
        } else {
            return contratRepository.findAllByOrderByPoliceAsc();
        }
    }


    public List<Contrat> findAllSortedById(String sortOrder) {
        if ("desc".equalsIgnoreCase(sortOrder)) {
            return contratRepository.findAllByOrderByIdDesc();
        } else {
            return contratRepository.findAllByOrderByIdAsc();
        }
    }


    public List<Contrat> getContratsSortedByAssureName(String sortOrder) {
        if ("desc".equalsIgnoreCase(sortOrder)) {
            return contratRepository.findAllByAssureNameDesc();
        } else {
            return contratRepository.findAllByAssureNameAsc();
        }
    }



    public List<Contrat> findAllSortedByAssureCin(String sortOrder) {
        if ("desc".equalsIgnoreCase(sortOrder)) {
            return contratRepository.findAllByAssureCinDesc();
        } else {
            return contratRepository.findAllByAssureCinAsc();
        }
    }




    public List<Contrat> findAllSortedByAssureNom(String sortOrder) {
        if ("desc".equalsIgnoreCase(sortOrder)) {
            return contratRepository.findAllByAssureNomDesc();
        } else {
            return contratRepository.findAllByAssureNomAsc();
        }
    }


    public List<Contrat> findAllSortedByAssureId(String sortOrder) {
        if ("desc".equalsIgnoreCase(sortOrder)) {
            return contratRepository.findAllByAssureIdDesc();
        } else {
            return contratRepository.findAllByAssureIdAsc();
        }
    }


//    public List<Contrat> findContratsByStatus(String status) {
//        if ("current".equalsIgnoreCase(status)) {
//            return contratRepository.findCurrentContrats();
//        } else if ("expired".equalsIgnoreCase(status)) {
//            return contratRepository.findExpiredContrats();
//        }
//        return List.of();
//    }


    public List<Contrat> getContratsByStatus(String status) {
        return contratRepository.findByStatus(status);
    }







}
