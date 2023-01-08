package com.minty.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.minty.IntegrationTest;
import com.minty.domain.Budget;
import com.minty.domain.enumeration.Month;
import com.minty.repository.BudgetRepository;
import com.minty.service.BudgetService;
import com.minty.service.dto.BudgetDTO;
import com.minty.service.mapper.BudgetMapper;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import javax.persistence.EntityManager;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link BudgetResource} REST controller.
 */
@IntegrationTest
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
class BudgetResourceIT {

    private static final Double DEFAULT_SPENDING_LIMIT = 1D;
    private static final Double UPDATED_SPENDING_LIMIT = 2D;

    private static final Double DEFAULT_CURRENT_SPENDING = 1D;
    private static final Double UPDATED_CURRENT_SPENDING = 2D;

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final Month DEFAULT_MONTH_OF_DATE = Month.JANUARY;
    private static final Month UPDATED_MONTH_OF_DATE = Month.FEBRUARY;

    private static final Integer DEFAULT_BUDGET_YEAR = 1;
    private static final Integer UPDATED_BUDGET_YEAR = 2;

    private static final String ENTITY_API_URL = "/api/budgets";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private BudgetRepository budgetRepository;

    @Mock
    private BudgetRepository budgetRepositoryMock;

    @Autowired
    private BudgetMapper budgetMapper;

    @Mock
    private BudgetService budgetServiceMock;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restBudgetMockMvc;

    private Budget budget;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Budget createEntity(EntityManager em) {
        Budget budget = new Budget()
            .spendingLimit(DEFAULT_SPENDING_LIMIT)
            .currentSpending(DEFAULT_CURRENT_SPENDING)
            .name(DEFAULT_NAME)
            .monthOfDate(DEFAULT_MONTH_OF_DATE)
            .budgetYear(DEFAULT_BUDGET_YEAR);
        return budget;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Budget createUpdatedEntity(EntityManager em) {
        Budget budget = new Budget()
            .spendingLimit(UPDATED_SPENDING_LIMIT)
            .currentSpending(UPDATED_CURRENT_SPENDING)
            .name(UPDATED_NAME)
            .monthOfDate(UPDATED_MONTH_OF_DATE)
            .budgetYear(UPDATED_BUDGET_YEAR);
        return budget;
    }

    @BeforeEach
    public void initTest() {
        budget = createEntity(em);
    }

    @Test
    @Transactional
    void createBudget() throws Exception {
        int databaseSizeBeforeCreate = budgetRepository.findAll().size();
        // Create the Budget
        BudgetDTO budgetDTO = budgetMapper.toDto(budget);
        restBudgetMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(budgetDTO)))
            .andExpect(status().isCreated());

        // Validate the Budget in the database
        List<Budget> budgetList = budgetRepository.findAll();
        assertThat(budgetList).hasSize(databaseSizeBeforeCreate + 1);
        Budget testBudget = budgetList.get(budgetList.size() - 1);
        assertThat(testBudget.getSpendingLimit()).isEqualTo(DEFAULT_SPENDING_LIMIT);
        assertThat(testBudget.getCurrentSpending()).isEqualTo(DEFAULT_CURRENT_SPENDING);
        assertThat(testBudget.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testBudget.getMonthOfDate()).isEqualTo(DEFAULT_MONTH_OF_DATE);
        assertThat(testBudget.getBudgetYear()).isEqualTo(DEFAULT_BUDGET_YEAR);
    }

    @Test
    @Transactional
    void createBudgetWithExistingId() throws Exception {
        // Create the Budget with an existing ID
        budget.setId(1L);
        BudgetDTO budgetDTO = budgetMapper.toDto(budget);

        int databaseSizeBeforeCreate = budgetRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restBudgetMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(budgetDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Budget in the database
        List<Budget> budgetList = budgetRepository.findAll();
        assertThat(budgetList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllBudgets() throws Exception {
        // Initialize the database
        budgetRepository.saveAndFlush(budget);

        // Get all the budgetList
        restBudgetMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(budget.getId().intValue())))
            .andExpect(jsonPath("$.[*].spendingLimit").value(hasItem(DEFAULT_SPENDING_LIMIT.doubleValue())))
            .andExpect(jsonPath("$.[*].currentSpending").value(hasItem(DEFAULT_CURRENT_SPENDING.doubleValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].monthOfDate").value(hasItem(DEFAULT_MONTH_OF_DATE.toString())))
            .andExpect(jsonPath("$.[*].budgetYear").value(hasItem(DEFAULT_BUDGET_YEAR)));
    }

    @SuppressWarnings({ "unchecked" })
    void getAllBudgetsWithEagerRelationshipsIsEnabled() throws Exception {
        when(budgetServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restBudgetMockMvc.perform(get(ENTITY_API_URL + "?eagerload=true")).andExpect(status().isOk());

        verify(budgetServiceMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({ "unchecked" })
    void getAllBudgetsWithEagerRelationshipsIsNotEnabled() throws Exception {
        when(budgetServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restBudgetMockMvc.perform(get(ENTITY_API_URL + "?eagerload=false")).andExpect(status().isOk());
        verify(budgetRepositoryMock, times(1)).findAll(any(Pageable.class));
    }

    @Test
    @Transactional
    void getBudget() throws Exception {
        // Initialize the database
        budgetRepository.saveAndFlush(budget);

        // Get the budget
        restBudgetMockMvc
            .perform(get(ENTITY_API_URL_ID, budget.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(budget.getId().intValue()))
            .andExpect(jsonPath("$.spendingLimit").value(DEFAULT_SPENDING_LIMIT.doubleValue()))
            .andExpect(jsonPath("$.currentSpending").value(DEFAULT_CURRENT_SPENDING.doubleValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME))
            .andExpect(jsonPath("$.monthOfDate").value(DEFAULT_MONTH_OF_DATE.toString()))
            .andExpect(jsonPath("$.budgetYear").value(DEFAULT_BUDGET_YEAR));
    }

    @Test
    @Transactional
    void getNonExistingBudget() throws Exception {
        // Get the budget
        restBudgetMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingBudget() throws Exception {
        // Initialize the database
        budgetRepository.saveAndFlush(budget);

        int databaseSizeBeforeUpdate = budgetRepository.findAll().size();

        // Update the budget
        Budget updatedBudget = budgetRepository.findById(budget.getId()).get();
        // Disconnect from session so that the updates on updatedBudget are not directly saved in db
        em.detach(updatedBudget);
        updatedBudget
            .spendingLimit(UPDATED_SPENDING_LIMIT)
            .currentSpending(UPDATED_CURRENT_SPENDING)
            .name(UPDATED_NAME)
            .monthOfDate(UPDATED_MONTH_OF_DATE)
            .budgetYear(UPDATED_BUDGET_YEAR);
        BudgetDTO budgetDTO = budgetMapper.toDto(updatedBudget);

        restBudgetMockMvc
            .perform(
                put(ENTITY_API_URL_ID, budgetDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(budgetDTO))
            )
            .andExpect(status().isOk());

        // Validate the Budget in the database
        List<Budget> budgetList = budgetRepository.findAll();
        assertThat(budgetList).hasSize(databaseSizeBeforeUpdate);
        Budget testBudget = budgetList.get(budgetList.size() - 1);
        assertThat(testBudget.getSpendingLimit()).isEqualTo(UPDATED_SPENDING_LIMIT);
        assertThat(testBudget.getCurrentSpending()).isEqualTo(UPDATED_CURRENT_SPENDING);
        assertThat(testBudget.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testBudget.getMonthOfDate()).isEqualTo(UPDATED_MONTH_OF_DATE);
        assertThat(testBudget.getBudgetYear()).isEqualTo(UPDATED_BUDGET_YEAR);
    }

    @Test
    @Transactional
    void putNonExistingBudget() throws Exception {
        int databaseSizeBeforeUpdate = budgetRepository.findAll().size();
        budget.setId(count.incrementAndGet());

        // Create the Budget
        BudgetDTO budgetDTO = budgetMapper.toDto(budget);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restBudgetMockMvc
            .perform(
                put(ENTITY_API_URL_ID, budgetDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(budgetDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Budget in the database
        List<Budget> budgetList = budgetRepository.findAll();
        assertThat(budgetList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchBudget() throws Exception {
        int databaseSizeBeforeUpdate = budgetRepository.findAll().size();
        budget.setId(count.incrementAndGet());

        // Create the Budget
        BudgetDTO budgetDTO = budgetMapper.toDto(budget);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restBudgetMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(budgetDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Budget in the database
        List<Budget> budgetList = budgetRepository.findAll();
        assertThat(budgetList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamBudget() throws Exception {
        int databaseSizeBeforeUpdate = budgetRepository.findAll().size();
        budget.setId(count.incrementAndGet());

        // Create the Budget
        BudgetDTO budgetDTO = budgetMapper.toDto(budget);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restBudgetMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(budgetDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Budget in the database
        List<Budget> budgetList = budgetRepository.findAll();
        assertThat(budgetList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateBudgetWithPatch() throws Exception {
        // Initialize the database
        budgetRepository.saveAndFlush(budget);

        int databaseSizeBeforeUpdate = budgetRepository.findAll().size();

        // Update the budget using partial update
        Budget partialUpdatedBudget = new Budget();
        partialUpdatedBudget.setId(budget.getId());

        partialUpdatedBudget
            .spendingLimit(UPDATED_SPENDING_LIMIT)
            .currentSpending(UPDATED_CURRENT_SPENDING)
            .name(UPDATED_NAME)
            .budgetYear(UPDATED_BUDGET_YEAR);

        restBudgetMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedBudget.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedBudget))
            )
            .andExpect(status().isOk());

        // Validate the Budget in the database
        List<Budget> budgetList = budgetRepository.findAll();
        assertThat(budgetList).hasSize(databaseSizeBeforeUpdate);
        Budget testBudget = budgetList.get(budgetList.size() - 1);
        assertThat(testBudget.getSpendingLimit()).isEqualTo(UPDATED_SPENDING_LIMIT);
        assertThat(testBudget.getCurrentSpending()).isEqualTo(UPDATED_CURRENT_SPENDING);
        assertThat(testBudget.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testBudget.getMonthOfDate()).isEqualTo(DEFAULT_MONTH_OF_DATE);
        assertThat(testBudget.getBudgetYear()).isEqualTo(UPDATED_BUDGET_YEAR);
    }

    @Test
    @Transactional
    void fullUpdateBudgetWithPatch() throws Exception {
        // Initialize the database
        budgetRepository.saveAndFlush(budget);

        int databaseSizeBeforeUpdate = budgetRepository.findAll().size();

        // Update the budget using partial update
        Budget partialUpdatedBudget = new Budget();
        partialUpdatedBudget.setId(budget.getId());

        partialUpdatedBudget
            .spendingLimit(UPDATED_SPENDING_LIMIT)
            .currentSpending(UPDATED_CURRENT_SPENDING)
            .name(UPDATED_NAME)
            .monthOfDate(UPDATED_MONTH_OF_DATE)
            .budgetYear(UPDATED_BUDGET_YEAR);

        restBudgetMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedBudget.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedBudget))
            )
            .andExpect(status().isOk());

        // Validate the Budget in the database
        List<Budget> budgetList = budgetRepository.findAll();
        assertThat(budgetList).hasSize(databaseSizeBeforeUpdate);
        Budget testBudget = budgetList.get(budgetList.size() - 1);
        assertThat(testBudget.getSpendingLimit()).isEqualTo(UPDATED_SPENDING_LIMIT);
        assertThat(testBudget.getCurrentSpending()).isEqualTo(UPDATED_CURRENT_SPENDING);
        assertThat(testBudget.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testBudget.getMonthOfDate()).isEqualTo(UPDATED_MONTH_OF_DATE);
        assertThat(testBudget.getBudgetYear()).isEqualTo(UPDATED_BUDGET_YEAR);
    }

    @Test
    @Transactional
    void patchNonExistingBudget() throws Exception {
        int databaseSizeBeforeUpdate = budgetRepository.findAll().size();
        budget.setId(count.incrementAndGet());

        // Create the Budget
        BudgetDTO budgetDTO = budgetMapper.toDto(budget);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restBudgetMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, budgetDTO.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(budgetDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Budget in the database
        List<Budget> budgetList = budgetRepository.findAll();
        assertThat(budgetList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchBudget() throws Exception {
        int databaseSizeBeforeUpdate = budgetRepository.findAll().size();
        budget.setId(count.incrementAndGet());

        // Create the Budget
        BudgetDTO budgetDTO = budgetMapper.toDto(budget);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restBudgetMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(budgetDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Budget in the database
        List<Budget> budgetList = budgetRepository.findAll();
        assertThat(budgetList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamBudget() throws Exception {
        int databaseSizeBeforeUpdate = budgetRepository.findAll().size();
        budget.setId(count.incrementAndGet());

        // Create the Budget
        BudgetDTO budgetDTO = budgetMapper.toDto(budget);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restBudgetMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(budgetDTO))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the Budget in the database
        List<Budget> budgetList = budgetRepository.findAll();
        assertThat(budgetList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteBudget() throws Exception {
        // Initialize the database
        budgetRepository.saveAndFlush(budget);

        int databaseSizeBeforeDelete = budgetRepository.findAll().size();

        // Delete the budget
        restBudgetMockMvc
            .perform(delete(ENTITY_API_URL_ID, budget.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Budget> budgetList = budgetRepository.findAll();
        assertThat(budgetList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
