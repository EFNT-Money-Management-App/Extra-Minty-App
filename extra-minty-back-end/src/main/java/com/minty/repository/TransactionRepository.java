package com.minty.repository;

import com.minty.domain.Transaction;

import java.util.List;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Transaction entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    //custom
    List<Transaction> findByBankAccountId(Long bankAccountId);
    
    //custom 
    List<Transaction> findByBudgetId(Long budgetId);
}
