package com.minty.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.minty.IntegrationTest;
import com.minty.domain.BankAccount;
import com.minty.domain.enumeration.BankAccountType;
import com.minty.repository.BankAccountRepository;
import com.minty.service.BankAccountService;
import com.minty.service.dto.BankAccountDTO;
import com.minty.service.mapper.BankAccountMapper;
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
 * Integration tests for the {@link BankAccountResource} REST controller.
 */
@IntegrationTest
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
class BankAccountResourceIT {

    private static final Double DEFAULT_BALANCE = 1D;
    private static final Double UPDATED_BALANCE = 2D;

    private static final Long DEFAULT_ACCOUNT_NUMBER = 1L;
    private static final Long UPDATED_ACCOUNT_NUMBER = 2L;

    private static final Long DEFAULT_ROUTING_NUMBER = 1L;
    private static final Long UPDATED_ROUTING_NUMBER = 2L;

    private static final String DEFAULT_BANK_NAME = "AAAAAAAAAA";
    private static final String UPDATED_BANK_NAME = "BBBBBBBBBB";

    private static final BankAccountType DEFAULT_TYPE = BankAccountType.CHECKING;
    private static final BankAccountType UPDATED_TYPE = BankAccountType.SAVINGS;

    private static final String ENTITY_API_URL = "/api/bank-accounts";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private BankAccountRepository bankAccountRepository;

    @Mock
    private BankAccountRepository bankAccountRepositoryMock;

    @Autowired
    private BankAccountMapper bankAccountMapper;

    @Mock
    private BankAccountService bankAccountServiceMock;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restBankAccountMockMvc;

    private BankAccount bankAccount;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static BankAccount createEntity(EntityManager em) {
        BankAccount bankAccount = new BankAccount()
            .balance(DEFAULT_BALANCE)
            .accountNumber(DEFAULT_ACCOUNT_NUMBER)
            .routingNumber(DEFAULT_ROUTING_NUMBER)
            .bankName(DEFAULT_BANK_NAME)
            .type(DEFAULT_TYPE);
        return bankAccount;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static BankAccount createUpdatedEntity(EntityManager em) {
        BankAccount bankAccount = new BankAccount()
            .balance(UPDATED_BALANCE)
            .accountNumber(UPDATED_ACCOUNT_NUMBER)
            .routingNumber(UPDATED_ROUTING_NUMBER)
            .bankName(UPDATED_BANK_NAME)
            .type(UPDATED_TYPE);
        return bankAccount;
    }

    @BeforeEach
    public void initTest() {
        bankAccount = createEntity(em);
    }

    @Test
    @Transactional
    void createBankAccount() throws Exception {
        int databaseSizeBeforeCreate = bankAccountRepository.findAll().size();
        // Create the BankAccount
        BankAccountDTO bankAccountDTO = bankAccountMapper.toDto(bankAccount);
        restBankAccountMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(bankAccountDTO))
            )
            .andExpect(status().isCreated());

        // Validate the BankAccount in the database
        List<BankAccount> bankAccountList = bankAccountRepository.findAll();
        assertThat(bankAccountList).hasSize(databaseSizeBeforeCreate + 1);
        BankAccount testBankAccount = bankAccountList.get(bankAccountList.size() - 1);
        assertThat(testBankAccount.getBalance()).isEqualTo(DEFAULT_BALANCE);
        assertThat(testBankAccount.getAccountNumber()).isEqualTo(DEFAULT_ACCOUNT_NUMBER);
        assertThat(testBankAccount.getRoutingNumber()).isEqualTo(DEFAULT_ROUTING_NUMBER);
        assertThat(testBankAccount.getBankName()).isEqualTo(DEFAULT_BANK_NAME);
        assertThat(testBankAccount.getType()).isEqualTo(DEFAULT_TYPE);
    }

    @Test
    @Transactional
    void createBankAccountWithExistingId() throws Exception {
        // Create the BankAccount with an existing ID
        bankAccount.setId(1L);
        BankAccountDTO bankAccountDTO = bankAccountMapper.toDto(bankAccount);

        int databaseSizeBeforeCreate = bankAccountRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restBankAccountMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(bankAccountDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the BankAccount in the database
        List<BankAccount> bankAccountList = bankAccountRepository.findAll();
        assertThat(bankAccountList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllBankAccounts() throws Exception {
        // Initialize the database
        bankAccountRepository.saveAndFlush(bankAccount);

        // Get all the bankAccountList
        restBankAccountMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(bankAccount.getId().intValue())))
            .andExpect(jsonPath("$.[*].balance").value(hasItem(DEFAULT_BALANCE.doubleValue())))
            .andExpect(jsonPath("$.[*].accountNumber").value(hasItem(DEFAULT_ACCOUNT_NUMBER.intValue())))
            .andExpect(jsonPath("$.[*].routingNumber").value(hasItem(DEFAULT_ROUTING_NUMBER.intValue())))
            .andExpect(jsonPath("$.[*].bankName").value(hasItem(DEFAULT_BANK_NAME)))
            .andExpect(jsonPath("$.[*].type").value(hasItem(DEFAULT_TYPE.toString())));
    }

    @SuppressWarnings({ "unchecked" })
    void getAllBankAccountsWithEagerRelationshipsIsEnabled() throws Exception {
        when(bankAccountServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restBankAccountMockMvc.perform(get(ENTITY_API_URL + "?eagerload=true")).andExpect(status().isOk());

        verify(bankAccountServiceMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({ "unchecked" })
    void getAllBankAccountsWithEagerRelationshipsIsNotEnabled() throws Exception {
        when(bankAccountServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restBankAccountMockMvc.perform(get(ENTITY_API_URL + "?eagerload=false")).andExpect(status().isOk());
        verify(bankAccountRepositoryMock, times(1)).findAll(any(Pageable.class));
    }

    @Test
    @Transactional
    void getBankAccount() throws Exception {
        // Initialize the database
        bankAccountRepository.saveAndFlush(bankAccount);

        // Get the bankAccount
        restBankAccountMockMvc
            .perform(get(ENTITY_API_URL_ID, bankAccount.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(bankAccount.getId().intValue()))
            .andExpect(jsonPath("$.balance").value(DEFAULT_BALANCE.doubleValue()))
            .andExpect(jsonPath("$.accountNumber").value(DEFAULT_ACCOUNT_NUMBER.intValue()))
            .andExpect(jsonPath("$.routingNumber").value(DEFAULT_ROUTING_NUMBER.intValue()))
            .andExpect(jsonPath("$.bankName").value(DEFAULT_BANK_NAME))
            .andExpect(jsonPath("$.type").value(DEFAULT_TYPE.toString()));
    }

    @Test
    @Transactional
    void getNonExistingBankAccount() throws Exception {
        // Get the bankAccount
        restBankAccountMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingBankAccount() throws Exception {
        // Initialize the database
        bankAccountRepository.saveAndFlush(bankAccount);

        int databaseSizeBeforeUpdate = bankAccountRepository.findAll().size();

        // Update the bankAccount
        BankAccount updatedBankAccount = bankAccountRepository.findById(bankAccount.getId()).get();
        // Disconnect from session so that the updates on updatedBankAccount are not directly saved in db
        em.detach(updatedBankAccount);
        updatedBankAccount
            .balance(UPDATED_BALANCE)
            .accountNumber(UPDATED_ACCOUNT_NUMBER)
            .routingNumber(UPDATED_ROUTING_NUMBER)
            .bankName(UPDATED_BANK_NAME)
            .type(UPDATED_TYPE);
        BankAccountDTO bankAccountDTO = bankAccountMapper.toDto(updatedBankAccount);

        restBankAccountMockMvc
            .perform(
                put(ENTITY_API_URL_ID, bankAccountDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(bankAccountDTO))
            )
            .andExpect(status().isOk());

        // Validate the BankAccount in the database
        List<BankAccount> bankAccountList = bankAccountRepository.findAll();
        assertThat(bankAccountList).hasSize(databaseSizeBeforeUpdate);
        BankAccount testBankAccount = bankAccountList.get(bankAccountList.size() - 1);
        assertThat(testBankAccount.getBalance()).isEqualTo(UPDATED_BALANCE);
        assertThat(testBankAccount.getAccountNumber()).isEqualTo(UPDATED_ACCOUNT_NUMBER);
        assertThat(testBankAccount.getRoutingNumber()).isEqualTo(UPDATED_ROUTING_NUMBER);
        assertThat(testBankAccount.getBankName()).isEqualTo(UPDATED_BANK_NAME);
        assertThat(testBankAccount.getType()).isEqualTo(UPDATED_TYPE);
    }

    @Test
    @Transactional
    void putNonExistingBankAccount() throws Exception {
        int databaseSizeBeforeUpdate = bankAccountRepository.findAll().size();
        bankAccount.setId(count.incrementAndGet());

        // Create the BankAccount
        BankAccountDTO bankAccountDTO = bankAccountMapper.toDto(bankAccount);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restBankAccountMockMvc
            .perform(
                put(ENTITY_API_URL_ID, bankAccountDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(bankAccountDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the BankAccount in the database
        List<BankAccount> bankAccountList = bankAccountRepository.findAll();
        assertThat(bankAccountList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchBankAccount() throws Exception {
        int databaseSizeBeforeUpdate = bankAccountRepository.findAll().size();
        bankAccount.setId(count.incrementAndGet());

        // Create the BankAccount
        BankAccountDTO bankAccountDTO = bankAccountMapper.toDto(bankAccount);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restBankAccountMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(bankAccountDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the BankAccount in the database
        List<BankAccount> bankAccountList = bankAccountRepository.findAll();
        assertThat(bankAccountList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamBankAccount() throws Exception {
        int databaseSizeBeforeUpdate = bankAccountRepository.findAll().size();
        bankAccount.setId(count.incrementAndGet());

        // Create the BankAccount
        BankAccountDTO bankAccountDTO = bankAccountMapper.toDto(bankAccount);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restBankAccountMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(bankAccountDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the BankAccount in the database
        List<BankAccount> bankAccountList = bankAccountRepository.findAll();
        assertThat(bankAccountList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateBankAccountWithPatch() throws Exception {
        // Initialize the database
        bankAccountRepository.saveAndFlush(bankAccount);

        int databaseSizeBeforeUpdate = bankAccountRepository.findAll().size();

        // Update the bankAccount using partial update
        BankAccount partialUpdatedBankAccount = new BankAccount();
        partialUpdatedBankAccount.setId(bankAccount.getId());

        partialUpdatedBankAccount.balance(UPDATED_BALANCE).accountNumber(UPDATED_ACCOUNT_NUMBER).bankName(UPDATED_BANK_NAME);

        restBankAccountMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedBankAccount.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedBankAccount))
            )
            .andExpect(status().isOk());

        // Validate the BankAccount in the database
        List<BankAccount> bankAccountList = bankAccountRepository.findAll();
        assertThat(bankAccountList).hasSize(databaseSizeBeforeUpdate);
        BankAccount testBankAccount = bankAccountList.get(bankAccountList.size() - 1);
        assertThat(testBankAccount.getBalance()).isEqualTo(UPDATED_BALANCE);
        assertThat(testBankAccount.getAccountNumber()).isEqualTo(UPDATED_ACCOUNT_NUMBER);
        assertThat(testBankAccount.getRoutingNumber()).isEqualTo(DEFAULT_ROUTING_NUMBER);
        assertThat(testBankAccount.getBankName()).isEqualTo(UPDATED_BANK_NAME);
        assertThat(testBankAccount.getType()).isEqualTo(DEFAULT_TYPE);
    }

    @Test
    @Transactional
    void fullUpdateBankAccountWithPatch() throws Exception {
        // Initialize the database
        bankAccountRepository.saveAndFlush(bankAccount);

        int databaseSizeBeforeUpdate = bankAccountRepository.findAll().size();

        // Update the bankAccount using partial update
        BankAccount partialUpdatedBankAccount = new BankAccount();
        partialUpdatedBankAccount.setId(bankAccount.getId());

        partialUpdatedBankAccount
            .balance(UPDATED_BALANCE)
            .accountNumber(UPDATED_ACCOUNT_NUMBER)
            .routingNumber(UPDATED_ROUTING_NUMBER)
            .bankName(UPDATED_BANK_NAME)
            .type(UPDATED_TYPE);

        restBankAccountMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedBankAccount.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedBankAccount))
            )
            .andExpect(status().isOk());

        // Validate the BankAccount in the database
        List<BankAccount> bankAccountList = bankAccountRepository.findAll();
        assertThat(bankAccountList).hasSize(databaseSizeBeforeUpdate);
        BankAccount testBankAccount = bankAccountList.get(bankAccountList.size() - 1);
        assertThat(testBankAccount.getBalance()).isEqualTo(UPDATED_BALANCE);
        assertThat(testBankAccount.getAccountNumber()).isEqualTo(UPDATED_ACCOUNT_NUMBER);
        assertThat(testBankAccount.getRoutingNumber()).isEqualTo(UPDATED_ROUTING_NUMBER);
        assertThat(testBankAccount.getBankName()).isEqualTo(UPDATED_BANK_NAME);
        assertThat(testBankAccount.getType()).isEqualTo(UPDATED_TYPE);
    }

    @Test
    @Transactional
    void patchNonExistingBankAccount() throws Exception {
        int databaseSizeBeforeUpdate = bankAccountRepository.findAll().size();
        bankAccount.setId(count.incrementAndGet());

        // Create the BankAccount
        BankAccountDTO bankAccountDTO = bankAccountMapper.toDto(bankAccount);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restBankAccountMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, bankAccountDTO.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(bankAccountDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the BankAccount in the database
        List<BankAccount> bankAccountList = bankAccountRepository.findAll();
        assertThat(bankAccountList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchBankAccount() throws Exception {
        int databaseSizeBeforeUpdate = bankAccountRepository.findAll().size();
        bankAccount.setId(count.incrementAndGet());

        // Create the BankAccount
        BankAccountDTO bankAccountDTO = bankAccountMapper.toDto(bankAccount);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restBankAccountMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(bankAccountDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the BankAccount in the database
        List<BankAccount> bankAccountList = bankAccountRepository.findAll();
        assertThat(bankAccountList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamBankAccount() throws Exception {
        int databaseSizeBeforeUpdate = bankAccountRepository.findAll().size();
        bankAccount.setId(count.incrementAndGet());

        // Create the BankAccount
        BankAccountDTO bankAccountDTO = bankAccountMapper.toDto(bankAccount);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restBankAccountMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(bankAccountDTO))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the BankAccount in the database
        List<BankAccount> bankAccountList = bankAccountRepository.findAll();
        assertThat(bankAccountList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteBankAccount() throws Exception {
        // Initialize the database
        bankAccountRepository.saveAndFlush(bankAccount);

        int databaseSizeBeforeDelete = bankAccountRepository.findAll().size();

        // Delete the bankAccount
        restBankAccountMockMvc
            .perform(delete(ENTITY_API_URL_ID, bankAccount.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<BankAccount> bankAccountList = bankAccountRepository.findAll();
        assertThat(bankAccountList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
