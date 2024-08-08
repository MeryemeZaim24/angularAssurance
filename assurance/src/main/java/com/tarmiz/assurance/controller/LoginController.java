package com.tarmiz.assurance.controller;

import com.tarmiz.assurance.model.User;
import com.tarmiz.assurance.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "http://localhost:4200")
public class LoginController {
    @Autowired
    private UserRepository repository;

    @PostMapping("/login")public ResponseEntity<?> loginUser(@RequestBody User userData){
        System.out.println(userData);    User user=repository.findByUserId(userData.getUserId());
        if (user.getPassword().equals(userData.getPassword()))        return  ResponseEntity.ok(user);
        return (ResponseEntity<?>) ResponseEntity.internalServerError();}
}
