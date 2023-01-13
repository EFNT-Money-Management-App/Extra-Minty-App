package com.minty.service;

import com.minty.domain.Budget;
import com.minty.repository.BudgetRepository;
import com.minty.service.dto.BudgetDTO;
import com.minty.service.mapper.BudgetMapper;
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
 * Service Implementation for managing {@link Budget}.
 */
@Service
@Transactional
public class BudgetService {

    private final Logger log = LoggerFactory.getLogger(BudgetService.class);

    private final BudgetRepository budgetRepository;

    private final BudgetMapper budgetMapper;

    public BudgetService(BudgetRepository budgetRepository, BudgetMapper budgetMapper) {
        this.budgetRepository = budgetRepository;
        this.budgetMapper = budgetMapper;
    }

    /**
     * Save a budget.
     *
     * @param budgetDTO the entity to save.
     * @return the persisted entity.
     */
    public BudgetDTO save(BudgetDTO budgetDTO) {
        log.debug("Request to save Budget : {}", budgetDTO);
        Budget budget = budgetMapper.toEntity(budgetDTO);
        budget = budgetRepository.save(budget);
        return budgetMapper.toDto(budget);
    }

    /**
     * Update a budget.
     *
     * @param budgetDTO the entity to save.
     * @return the persisted entity.
     */
    public BudgetDTO update(BudgetDTO budgetDTO) {
        log.debug("Request to update Budget : {}", budgetDTO);
        Budget budget = budgetMapper.toEntity(budgetDTO);
        budget = budgetRepository.save(budget);
        return budgetMapper.toDto(budget);
    }

    /**
     * Partially update a budget.
     *
     * @param budgetDTO the entity to update partially.
     * @return the persisted entity.
     */
    public Optional<BudgetDTO> partialUpdate(BudgetDTO budgetDTO) {
        log.debug("Request to partially update Budget : {}", budgetDTO);

        return budgetRepository
            .findById(budgetDTO.getId())
            .map(existingBudget -> {
                budgetMapper.partialUpdate(existingBudget, budgetDTO);

                return existingBudget;
            })
            .map(budgetRepository::save)
            .map(budgetMapper::toDto);
    }

    /**
     * Get all the budgets.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<BudgetDTO> findAll() {
        log.debug("Request to get all Budgets");
        return budgetRepository.findAll().stream().map(budgetMapper::toDto).collect(Collectors.toCollection(LinkedList::new));
    }

    @Transactional
    public List<BudgetDTO> findAllForUser(){
        log.debug("Request to get all Budgets for current user");
        return budgetRepository.findByUserIsCurrentUser().stream().map(budgetMapper::toDto).collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get all the budgets with eager load of many-to-many relationships.
     *
     * @return the list of entities.
     */
    public Page<BudgetDTO> findAllWithEagerRelationships(Pageable pageable) {
        return budgetRepository.findAllWithEagerRelationships(pageable).map(budgetMapper::toDto);
    }

    /**
     * Get one budget by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<BudgetDTO> findOne(Long id) {
        log.debug("Request to get Budget : {}", id);
        return budgetRepository.findOneWithEagerRelationships(id).map(budgetMapper::toDto);
    }

    /**
     * Delete the budget by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete Budget : {}", id);
        budgetRepository.deleteById(id);
    }
}
