package com.tarmiz.assurance.controller;

import com.tarmiz.assurance.model.Contrat;
import com.tarmiz.assurance.service.ContratService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.tarmiz.assurance.repository.ContratRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/contrats")
@CrossOrigin(origins = "http://localhost:4200")
public class ContratController {

    @Autowired
    private ContratService contratService;

    @Autowired
    private ContratRepository ContratRepository;

    @Autowired
    public ContratController(ContratService contratService) {
        this.contratService = contratService;
    }
    @GetMapping
    public ResponseEntity<List<Contrat>> getAllContrats() {
        List<Contrat> contrats = contratService.getAllContrats();
        return ResponseEntity.ok(contrats);
    }
    @GetMapping("/{id}")
    public ResponseEntity<Contrat> getContratById(@PathVariable Long id) {
        Optional<Contrat> contrat = contratService.getContratById(id);
        return contrat.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
    @GetMapping("/assure/{assureId}")
    public ResponseEntity<List<Contrat>> getContratsByAssureId(@PathVariable Long assureId) {
        List<Contrat> contrats = contratService.getContratsByAssureId(assureId);
        return ResponseEntity.ok(contrats);
    }


    @PostMapping
    public Contrat createContrat(@RequestBody Contrat contrat) {
        return contratService.createContrat(contrat);
    }
    @PutMapping("/{id}")
    public ResponseEntity<Contrat> updateContrat(@PathVariable Long id, @RequestBody Contrat contrat) {
        if (!contratService.getContratById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        contrat.setId(id);
        Contrat updatedContrat = contratService.saveContrat(contrat);
        return ResponseEntity.ok(updatedContrat);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteContrat(@PathVariable Long id) {
        if (!contratService.getContratById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        contratService.deleteContrat(id);
        return ResponseEntity.noContent().build();
    }
    @GetMapping("/filter")
    public ResponseEntity<List<Contrat>> filterContrats(
            @RequestParam(required = false) Long assureId,
            @RequestParam(required = false) String status) {
        List<Contrat> contrats;
        if ("expired".equals(status)) {
            if (assureId != null) {
                contrats = contratService.getContratsByAssureIdAndExpirationDateBefore(assureId, LocalDate.now());
            } else {
                contrats = contratService.getContratsByExpirationDateBefore(LocalDate.now());
            }
        } else if ("current".equals(status)) {
            if (assureId != null) {
                contrats = contratService.getContratsByAssureIdAndExpirationDateAfter(assureId, LocalDate.now());
            } else {
                contrats = contratService.getContratsByExpirationDateAfter(LocalDate.now());
            }
        } else {
            if (assureId != null) {
                contrats = contratService.getContratsByAssureId(assureId);
            } else {
                contrats = contratService.getAllContrats();
            }
        }
        return ResponseEntity.ok(contrats);
    }
    @GetMapping("/filterByDateRange")
    public List<Contrat> getContratsByDateRange(
            @RequestParam("startDate") String startDateStr,
            @RequestParam("endDate") String endDateStr) {

        LocalDate startDate = LocalDate.parse(startDateStr);
        LocalDate endDate = LocalDate.parse(endDateStr);
        return ContratRepository.findByDateSignatureBetweenAndDateExpirationBetween(startDate, endDate, startDate, endDate);
    }
    @GetMapping("/filterByExpiration")
    public ResponseEntity<List<Contrat>> getContratsExpiringAfter(@RequestParam String periodType) {
        List<Contrat> contrats;

        try {
            contrats = contratService.getContratsExpiringAfter(periodType, 1);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(null); // Retourner une réponse 400 Bad Request si le periodType est invalide
        }

        return ResponseEntity.ok(contrats);
    }
    @GetMapping("/searchByPolice")
    public ResponseEntity<List<Contrat>> searchContratsByPolice(@RequestParam String police) {
        List<Contrat> contrats = contratService.searchContratsByPolice(police);
        return ResponseEntity.ok(contrats);
    }





    // Autres endpoints pour gérer les contrats
}
