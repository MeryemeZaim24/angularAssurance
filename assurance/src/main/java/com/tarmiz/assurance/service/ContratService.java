package com.tarmiz.assurance.service;

import com.tarmiz.assurance.model.Contrat;
import com.tarmiz.assurance.model.Assure;
import com.tarmiz.assurance.repository.ContratRepository;
import com.tarmiz.assurance.repository.AssureRepository;
import org.springframework.beans.factory.annotation.Autowired;
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



}
