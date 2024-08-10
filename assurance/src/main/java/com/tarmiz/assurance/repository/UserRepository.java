package com.tarmiz.assurance.repository;

import com.tarmiz.assurance.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository <User,String> {
    User findByUserId(String userId);




}
