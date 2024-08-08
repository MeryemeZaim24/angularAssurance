package com.tarmiz.assurance.controller;

import com.tarmiz.assurance.model.Assure;
import com.tarmiz.assurance.model.Contrat;
import com.tarmiz.assurance.service.AssureService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/assures")
@CrossOrigin(origins = "http://localhost:4200")
public class AssureController {

    @Autowired
    private AssureService assureService;


    @GetMapping
    public List<Assure> getAllAssures() {
        return assureService.findAll();
    }



    @GetMapping("/{id}")
    public Assure getAssureById(@PathVariable Long id) {
        return assureService.getAssureById(id);
    }


    @PostMapping
    public Assure createAssure(@RequestBody Assure assure) {
        return assureService.createAssure(assure);
    }
    @PutMapping("/{id}")
    public ResponseEntity<Assure> updateAssure(@PathVariable Long id, @RequestBody Assure assureDetails) {
        return assureService.findById(id)
                .map(assure -> ResponseEntity.ok(assureService.update(id, assureDetails)))
                .orElse(ResponseEntity.notFound().build());
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAssure(@PathVariable Long id) {
        assureService.deleteById(id);
        return ResponseEntity.noContent().build();
    }



    @GetMapping("/{id}/contrats")
    public List<Contrat> getContratsByAssureId(@PathVariable Long id) {
        return assureService.getContratsByAssureId(id);
    }
    @GetMapping("/search")
    public List<Assure> searchAssures(@RequestParam String keyword) {
        return assureService.searchAssures(keyword);
    }




}
