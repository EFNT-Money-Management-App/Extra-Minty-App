package com.minty.service;

import com.minty.domain.BankAccount;
import com.minty.domain.Transaction;
import com.minty.domain.enumeration.BankAccountType;
import com.minty.repository.BankAccountRepository;
import com.minty.service.dto.BankAccountDTO;
import com.minty.service.mapper.BankAccountMapper;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link BankAccount}.
 */
@Service
@Transactional
public class BankAccountService {

    private final Logger log = LoggerFactory.getLogger(BankAccountService.class);

    private final BankAccountRepository bankAccountRepository;

    private final BankAccountMapper bankAccountMapper;

    public BankAccountService(BankAccountRepository bankAccountRepository, BankAccountMapper bankAccountMapper) {
        this.bankAccountRepository = bankAccountRepository;
        this.bankAccountMapper = bankAccountMapper;
    }


//  --------------------------------------- JHIPSTER GENERATED ---------------------------------------------------
//  --------------------------------------- JHIPSTER GENERATED ---------------------------------------------------
//  --------------------------------------- JHIPSTER GENERATED ---------------------------------------------------
    /**
     * Save a bankAccount.
     *
     * @param bankAccountDTO the entity to save.
     * @return the persisted entity.
     */
    public BankAccountDTO save(BankAccountDTO bankAccountDTO) {
        log.debug("Request to save BankAccount : {}", bankAccountDTO);
        BankAccount bankAccount = bankAccountMapper.toEntity(bankAccountDTO);
        bankAccount = bankAccountRepository.save(bankAccount);
        return bankAccountMapper.toDto(bankAccount);
    }

    /**
     * Update a bankAccount.
     *
     * @param bankAccountDTO the entity to save.
     * @return the persisted entity.
     */
    public BankAccountDTO update(BankAccountDTO bankAccountDTO) {
        log.debug("Request to update BankAccount : {}", bankAccountDTO);
        BankAccount bankAccount = bankAccountMapper.toEntity(bankAccountDTO);
        bankAccount = bankAccountRepository.save(bankAccount);
        return bankAccountMapper.toDto(bankAccount);
    }

    /**
     * Partially update a bankAccount.
     *
     * @param bankAccountDTO the entity to update partially.
     * @return the persisted entity.
     */
    public Optional<BankAccountDTO> partialUpdate(BankAccountDTO bankAccountDTO) {
        log.debug("Request to partially update BankAccount : {}", bankAccountDTO);

        return bankAccountRepository
            .findById(bankAccountDTO.getId())
            .map(existingBankAccount -> {
                bankAccountMapper.partialUpdate(existingBankAccount, bankAccountDTO);

                return existingBankAccount;
            })
            .map(bankAccountRepository::save)
            .map(bankAccountMapper::toDto);
    }

    /**
     * Get all the bankAccounts.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<BankAccountDTO> findAll() {
        log.debug("Request to get all BankAccounts");
        return bankAccountRepository.findAll().stream().map(bankAccountMapper::toDto).collect(Collectors.toCollection(LinkedList::new));
    }

    //CUSTOM
    @Transactional(readOnly = true)
    public List<BankAccountDTO> findAllForUser() {
        log.debug("Request to get all BankAccounts");
        return bankAccountRepository.findByUserIsCurrentUser().stream().map(bankAccountMapper::toDto).collect(Collectors.toCollection(LinkedList::new));
    }

    //CUSTOM -TROY
    // @Transactional(readOnly = true)
    // public List<BankAccountDTO> findAllSavingsBankAccountsForUser(){
    //     log.debug("Request to get all savings accounts");
    //     return bankAccountRepository.findByUserIsCurrentUser().stream().filter(bankAccount -> bankAccount.getType().equals(BankAccountType.SAVINGS)).collect(Collectors.toCollection(LinkedList::new));
    // }
    
    /**
     * Get all the bankAccounts with eager load of many-to-many relationships.
     *
     * @return the list of entities.
     */
    public Page<BankAccountDTO> findAllWithEagerRelationships(Pageable pageable) {
        return bankAccountRepository.findAllWithEagerRelationships(pageable).map(bankAccountMapper::toDto);
    }

    /**
     * Get one bankAccount by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<BankAccountDTO> findOne(Long id) {
        log.debug("Request to get BankAccount : {}", id);
        return bankAccountRepository.findOneWithEagerRelationships(id).map(bankAccountMapper::toDto);
    }

    /**
     * Delete the bankAccount by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete BankAccount : {}", id);
        bankAccountRepository.deleteById(id);
    }

    //CUSTOM
    public List<BankAccount> updateBankAccountsBalancesForTransfer(Transaction t){
        BankAccount from = bankAccountRepository.findByAccountNumber(t.getTransferFromAccountNumber()).get();
        BankAccount to = bankAccountRepository.findByAccountNumber(t.getTransferToAccountNumber()).get();
        if(from != null && to != null){
           from.setBalance(from.getBalance() - t.getAmount());
           to.setBalance(to.getBalance() + t.getAmount());
           bankAccountRepository.save(from);
           bankAccountRepository.save(to);
        }
        List<BankAccount> updates = new LinkedList<>();
        updates.add(from);
        updates.add(to);
        return updates;
    }
}
