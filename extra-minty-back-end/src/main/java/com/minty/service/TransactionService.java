package com.minty.service;

import com.fasterxml.jackson.databind.annotation.JsonAppend.Attr;
import com.minty.domain.BankAccount;
import com.minty.domain.Budget;
import com.minty.domain.Transaction;
import com.minty.domain.enumeration.TransactionType;
import com.minty.repository.BankAccountRepository;
import com.minty.repository.BudgetRepository;
import com.minty.repository.TransactionRepository;
import com.minty.service.dto.TransactionDTO;
import com.minty.service.mapper.BankAccountMapper;
import com.minty.service.mapper.TransactionMapper;

import java.time.Duration;
import java.time.Instant;
import java.util.Comparator;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Transaction}.
 */
@Service
@Transactional
public class TransactionService {

    private final Logger log = LoggerFactory.getLogger(TransactionService.class);
    
    private final TransactionRepository transactionRepository;

    private final TransactionMapper transactionMapper;

    @Autowired
    private BankAccountService bankAccountService;

    @Autowired
    private BudgetRepository budgetRepository;

    @Autowired
    private BankAccountRepository bankAccountRepository;

    public TransactionService(TransactionRepository transactionRepository, TransactionMapper transactionMapper) {
        this.transactionRepository = transactionRepository;
        this.transactionMapper = transactionMapper;
    }

    /**
     * Save a transaction.
     *
     * @param transactionDTO the entity to save.
     * @return the persisted entity.
     */
    public TransactionDTO save(TransactionDTO transactionDTO) {
        log.debug("Request to save Transaction : {}", transactionDTO);
        Transaction transaction = transactionMapper.toEntity(transactionDTO);
        transaction = transactionRepository.save(transaction);
        //CUSTOM
        handleTransfers(transaction);
        if(!transaction.getType().equals(TransactionType.TRANSFER)){
            updateAccountBalance(transaction.getId());
            updateBudgetCurrentSpending(transaction.getId());
        }
        
        return transactionMapper.toDto(transaction);
    }

    /**
     * Update a transaction.
     *
     * @param transactionDTO the entity to save.
     * @return the persisted entity.
     */
    // public TransactionDTO update(TransactionDTO transactionDTO) {
    //     log.debug("Request to update Transaction : {}", transactionDTO);
    //     Transaction transaction = transactionMapper.toEntity(transactionDTO);
    //     transaction = transactionRepository.save(transaction);
    //     // custom
    //     // transactionBudgetUpdate(transaction.getId());
    //     return transactionMapper.toDto(transaction);
    // }

    public TransactionDTO update(TransactionDTO transactionDTO) {
        log.debug("Request to update Transaction : {}", transactionDTO);
        Transaction transaction = transactionMapper.toEntity(transactionDTO);
        updatePrevAccountBalanceWithTransactionUpdate(transaction.getId());
        updatePrevBudgetCurrentSpending(transaction.getId());

        transaction = transactionRepository.save(transaction);
        // custom
        // transaction.getBudget().setCurrentSpending(transaction.getBudget().getCurrentSpending() + transaction.getAmount());
        // budgetRepository.save(transaction.getBudget());
        updateAccountBalance(transaction.getId());
        updateBudgetCurrentSpending(transaction.getId());
        return transactionMapper.toDto(transaction);
    }

    /**
     * Partially update a transaction.
     *
     * @param transactionDTO the entity to update partially.
     * @return the persisted entity.
     */
    public Optional<TransactionDTO> partialUpdate(TransactionDTO transactionDTO) {
        log.debug("Request to partially update Transaction : {}", transactionDTO);

        return transactionRepository
            .findById(transactionDTO.getId())
            .map(existingTransaction -> {
                transactionMapper.partialUpdate(existingTransaction, transactionDTO);

                return existingTransaction;
            })
            .map(transactionRepository::save)
            .map(transactionMapper::toDto);
    }

    /**
     * Get all the transactions.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<TransactionDTO> findAll() {
        log.debug("Request to get all Transactions");
        return transactionRepository.findAll().stream().map(transactionMapper::toDto).collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one transaction by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<TransactionDTO> findOne(Long id) {
        log.debug("Request to get Transaction : {}", id);
        return transactionRepository.findById(id).map(transactionMapper::toDto);
    }
    //CUSTOM
    /**
     * 
     * @param id
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<TransactionDTO> findAllForBankAccount(Long id) {
        log.debug("Request to get all Transactions for BankAccount");
        return transactionRepository.findByBankAccountId(id).stream()
        .sorted(Comparator.comparing(Transaction::getDate).reversed())
        .map(transactionMapper::toDto).collect(Collectors.toCollection(LinkedList::new));
    }
    //CUSTOM
    /**
     * 
     * @param bankAccounts list of users bank accounts
     * @return Mapping of the transaction to total amount by transcation.
     */
    @Transactional(readOnly = true)
    public Map<String, Double> findTransactionCategoryTotals(List<BankAccount> bankAccounts){
        List<Transaction> userTransactions = new LinkedList<>();
        for (BankAccount bankAccount : bankAccounts) {
            userTransactions.addAll(transactionRepository.findByBankAccountId(bankAccount.getId()));
        }
        Instant thirtyDaysAgo = Instant.now().minus(Duration.ofDays(30));
        return userTransactions.stream()
            .filter(t -> t.getDate().toInstant().isAfter(thirtyDaysAgo))
            .filter(t -> t.getType().equals(TransactionType.WITHDRAW))
            .collect(Collectors.groupingBy((t -> t.getCategory().toString()), Collectors.summingDouble(Transaction::getAmount)));
    }
    

    @Transactional(readOnly = true)
    public List<TransactionDTO> findAllForBudget(Long id) {
        log.debug("Request to get all Transactions for BankAccount");
        return transactionRepository.findByBudgetId(id).stream().map(transactionMapper::toDto).collect(Collectors.toCollection(LinkedList::new));
    }

    

    /**
     * Delete the transaction by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete Transaction : {}", id);
        updateAccountBalanceWithTransactionDelete(id);
        updateBudgetCurrentSpendingWithTransactionDelete(id);
        transactionRepository.deleteById(id);
    }
    //CUSTOM
    public void updateAccountBalance(Long id) {
        log.debug("Request to update bank account via transaction");
        TransactionDTO transactionDTO = findOne(id).get();
        Transaction transaction = transactionMapper.toEntity(transactionDTO);
        BankAccount bankAccount = bankAccountRepository.findById(transaction.getBankAccount().getId()).get();
        if(transaction.getType() == TransactionType.WITHDRAW){
            bankAccount.setBalance(bankAccount.getBalance() - transaction.getAmount());
            bankAccountRepository.save(bankAccount);
        } else if (transaction.getType() == TransactionType.DEPOSIT){
            bankAccount.setBalance(bankAccount.getBalance() + transaction.getAmount());
            bankAccountRepository.save(bankAccount);
        }
    }

    public void updateAccountBalanceWithTransactionDelete(Long id) {
        log.debug("Request to update bank account balance via transaction when transaction is deleted");
        Transaction transaction = transactionRepository.findById(id).get();
        BankAccount bankAccount = bankAccountRepository.findById(transaction.getBankAccount().getId()).get();
        if(transaction.getBudget() != null){
            if(transaction.getType() == TransactionType.DEPOSIT){
                bankAccount.setBalance(bankAccount.getBalance() - transaction.getAmount());
                bankAccountRepository.save(bankAccount);
        } else if(transaction.getType() == TransactionType.WITHDRAW){
            bankAccount.setBalance(bankAccount.getBalance() + transaction.getAmount());
            bankAccountRepository.save(bankAccount);
        }
        }
    }

    public void updatePrevAccountBalanceWithTransactionUpdate(Long id) {
        log.debug("Request to update acct balance via transaction when transaction is updated before it's updated");
        TransactionDTO transactionDTO = findOne(id).get();
        Transaction transaction = transactionMapper.toEntity(transactionDTO);
        Transaction transactionOgFromDB = transactionRepository.findById(transaction.getId()).get();
        BankAccount bankAccount = bankAccountRepository.findById(transactionOgFromDB.getBankAccount().getId()).get();
        if(bankAccount != transaction.getBankAccount()){
            if(transactionOgFromDB.getType() == TransactionType.DEPOSIT){
            transactionOgFromDB.getBankAccount().setBalance(bankAccount.getBalance() - transaction.getAmount());
            bankAccountRepository.save(bankAccount);
        } else if(transactionOgFromDB.getType() == TransactionType.WITHDRAW){
            transactionOgFromDB.getBankAccount().setBalance(bankAccount.getBalance() + transaction.getAmount());
            bankAccountRepository.save(bankAccount);
        }
        }
    }

    public void updateBudgetCurrentSpending(Long id) {
        log.debug("Request to update budget via transaction");
        TransactionDTO transactionDTO = findOne(id).get();
        Transaction transaction = transactionMapper.toEntity(transactionDTO);
        if(transaction.getBudget() == null) return;
        Budget budget = budgetRepository.findById(transaction.getBudget().getId()).get();
        if(transaction.getType() == TransactionType.WITHDRAW){
            budget.setCurrentSpending(budget.getCurrentSpending() + transaction.getAmount());
            budgetRepository.save(budget);
        } else if (transaction.getType() == TransactionType.DEPOSIT){
            //budget.setCurrentSpending(budget.getCurrentSpending() - transaction.getAmount());
            capBudgetCurrentSpendingAboveZero(transaction);
            budgetRepository.save(budget);
        }
    }

    public void updatePrevBudgetCurrentSpending(Long id) {
        log.debug("Request to update budget current spending via transaction when transaction is updated before it's updated");
        TransactionDTO transactionDTO = findOne(id).get();
        Transaction transaction = transactionMapper.toEntity(transactionDTO);
        Transaction transactionOgFromDB = transactionRepository.findById(transaction.getId()).get();
        if(transactionOgFromDB.getBudget() != null){
            if(transactionOgFromDB.getType() == TransactionType.DEPOSIT){
            transactionOgFromDB.getBudget().setCurrentSpending(transactionOgFromDB.getBudget().getCurrentSpending() + transaction.getAmount());
            budgetRepository.save(transactionOgFromDB.getBudget());
        } else if(transactionOgFromDB.getType() == TransactionType.WITHDRAW){
            //transactionOgFromDB.getBudget().setCurrentSpending(transactionOgFromDB.getBudget().getCurrentSpending() - transaction.getAmount());
            capBudgetCurrentSpendingAboveZero(transactionOgFromDB);
            budgetRepository.save(transactionOgFromDB.getBudget());
        }
        }
    }

    public Transaction capBudgetCurrentSpendingAboveZero(Transaction t){
        Budget budget = budgetRepository.findById(t.getBudget().getId()).get();
        // System.out.println(budget);
        try {
            if(budget.getCurrentSpending() < t.getAmount()){
                budget.setSpendingLimit(budget.getSpendingLimit() + Math.abs(budget.getCurrentSpending() - t.getAmount()));
                budget.setCurrentSpending(0.0);
                budgetRepository.save(budget);
            } 
            // budget limit + |CS - transaction amount| 
            else t.getBudget().setCurrentSpending(t.getBudget().getCurrentSpending() - t.getAmount());
            budgetRepository.save(budget);
        } catch (Exception e) {
            // TODO: handle exception
            System.out.println(budget);
        }
        // if(budget.getCurrentSpending() < t.getAmount()){
        //     budget.setSpendingLimit(budget.getSpendingLimit() + Math.abs(budget.getCurrentSpending() - t.getAmount()));
        //     budget.setCurrentSpending(0.0);
        //     budgetRepository.save(budget);
        // } 
        // // budget limit + |CS - transaction amount| 
        // else t.getBudget().setCurrentSpending(t.getBudget().getCurrentSpending() - t.getAmount());
        // budgetRepository.save(budget);
        return t;
    }

    public void updateBudgetCurrentSpendingWithTransactionDelete(Long id) {
        log.debug("Request to update budget current spending via transaction when transaction is deleted");
        Transaction transaction = transactionRepository.findById(id).get();
        if(transaction.getBudget() != null){
            if(transaction.getType() == TransactionType.DEPOSIT){
            transaction.getBudget().setCurrentSpending(transaction.getBudget().getCurrentSpending() + transaction.getAmount());
            budgetRepository.save(transaction.getBudget());
        } else if(transaction.getType() == TransactionType.WITHDRAW){
            capBudgetCurrentSpendingAboveZero(transaction);
            budgetRepository.save(transaction.getBudget());
        }
        }
    }
    public void handleTransfers(Transaction t){
        if(t.getType().equals(TransactionType.TRANSFER)) bankAccountService.updateBankAccountsBalancesForTransfer(t);
    }

}
