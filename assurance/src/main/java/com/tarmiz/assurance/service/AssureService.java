package com.tarmiz.assurance.service;

import com.tarmiz.assurance.model.Assure;
import com.tarmiz.assurance.model.Contrat;
import com.tarmiz.assurance.repository.AssureRepository;
import com.tarmiz.assurance.repository.ContratRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AssureService {

    @Autowired
    private AssureRepository assureRepository;

    @Autowired
    private ContratRepository contratRepository;
    public List<Assure> findAll() {
        return assureRepository.findAll();
    }
    public Optional<Assure> findById(Long id) {
        return assureRepository.findById(id);
    }

    public Assure save(Assure assure) {
        return assureRepository.save(assure);
    }

    public Assure update(Long id, Assure assureDetails) {
        Optional<Assure> assureOptional = assureRepository.findById(id);

        if (assureOptional.isPresent()) {
            Assure assure = assureOptional.get();
            assure.setNom(assureDetails.getNom());
            assure.setPrenom(assureDetails.getPrenom());
            assure.setCin(assureDetails.getCin());
            assure.setDateNaissance(assureDetails.getDateNaissance());
            return assureRepository.save(assure);
        } else {
            throw new RuntimeException("Assure not found with id " + id); // Throw an exception
        }
    }
    public void deleteById(Long id) {
        assureRepository.deleteById(id);
    }


    public List<Contrat> getContratsByAssureId(Long assureId) {
        return contratRepository.findByAssureId(assureId);
    }
    public List<Assure> searchAssures(String keyword) {
        return assureRepository.findByNomContainingOrPrenomContaining(keyword, keyword);
    }

//    public List<Assure> filterAssuresByCin(String cin) {
//        return assureRepository.findByCin(cin);
//    }





    public Assure createAssure(Assure assure) {
        return assureRepository.save(assure);
    }

    public Assure getAssureById(Long id) {
        return assureRepository.findById(id).orElse(null);
    }



    // Autres méthodes pour créer, mettre à jour, supprimer des assurés et des contrats
}
