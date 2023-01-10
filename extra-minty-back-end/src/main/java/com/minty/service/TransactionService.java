package com.minty.service;

import com.minty.domain.BankAccount;
import com.minty.domain.Transaction;
import com.minty.domain.enumeration.TransactionType;
import com.minty.repository.TransactionRepository;
import com.minty.service.dto.TransactionDTO;
import com.minty.service.mapper.BankAccountMapper;
import com.minty.service.mapper.TransactionMapper;

import java.time.Duration;
import java.time.Instant;
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
        return transactionMapper.toDto(transaction);
    }

    /**
     * Update a transaction.
     *
     * @param transactionDTO the entity to save.
     * @return the persisted entity.
     */
    public TransactionDTO update(TransactionDTO transactionDTO) {
        log.debug("Request to update Transaction : {}", transactionDTO);
        Transaction transaction = transactionMapper.toEntity(transactionDTO);
        transaction = transactionRepository.save(transaction);
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
        return transactionRepository.findByBankAccountId(id).stream().map(transactionMapper::toDto).collect(Collectors.toCollection(LinkedList::new));
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
        transactionRepository.deleteById(id);
    }
}
