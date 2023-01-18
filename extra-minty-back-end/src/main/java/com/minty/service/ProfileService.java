package com.minty.service;

import com.minty.domain.BankAccount;
import com.minty.domain.Profile;
import com.minty.repository.ProfileRepository;
import com.minty.service.dto.BankAccountDTO;
import com.minty.service.dto.ProfileDTO;
import com.minty.service.mapper.BankAccountMapper;
import com.minty.service.mapper.ProfileMapper;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Profile}.
 */
@Service
@Transactional
public class ProfileService {

    private final Logger log = LoggerFactory.getLogger(ProfileService.class);

    private final ProfileRepository profileRepository;

    private final ProfileMapper profileMapper;
    
    @Autowired
    private BankAccountService bankAccountService;
    @Autowired
    private BankAccountMapper bankAccountMapper;

    public ProfileService(ProfileRepository profileRepository, ProfileMapper profileMapper) {
        this.profileRepository = profileRepository;
        this.profileMapper = profileMapper;
    }

    /**
     * Save a profile.
     *
     * @param profileDTO the entity to save.
     * @return the persisted entity.
     */
    public ProfileDTO save(ProfileDTO profileDTO) {
        log.debug("Request to save Profile : {}", profileDTO);
        Profile profile = profileMapper.toEntity(profileDTO);
        profile = profileRepository.save(profile);
        return profileMapper.toDto(profile);
    }
    //CUSTOM -TROY LINE 67
    /**
     * Update a profile.
     *
     * @param profileDTO the entity to save.
     * @return the persisted entity.
     */
    public ProfileDTO update(ProfileDTO profileDTO) {
        log.debug("Request to update Profile : {}", profileDTO);
        Profile profile = profileMapper.toEntity(profileDTO);
        updatePeppermintPoints(profile.getId());
        profile = profileRepository.save(profile);
        return profileMapper.toDto(profile);
    }

    /**
     * Partially update a profile.
     *
     * @param profileDTO the entity to update partially.
     * @return the persisted entity.
     */
    public Optional<ProfileDTO> partialUpdate(ProfileDTO profileDTO) {
        log.debug("Request to partially update Profile : {}", profileDTO);

        return profileRepository
            .findById(profileDTO.getId())
            .map(existingProfile -> {
                profileMapper.partialUpdate(existingProfile, profileDTO);

                return existingProfile;
            })
            .map(profileRepository::save)
            .map(profileMapper::toDto);
    }

    /**
     * Get all the profiles.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<ProfileDTO> findAll() {
        log.debug("Request to get all Profiles");
        return profileRepository.findAll().stream().map(profileMapper::toDto).collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get all the profiles with eager load of many-to-many relationships.
     *
     * @return the list of entities.
     */
    public Page<ProfileDTO> findAllWithEagerRelationships(Pageable pageable) {
        return profileRepository.findAllWithEagerRelationships(pageable).map(profileMapper::toDto);
    }

    /**
     * Get one profile by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<ProfileDTO> findOne(Long id) {
        log.debug("Request to get Profile : {}", id);
        return profileRepository.findOneWithEagerRelationships(id).map(profileMapper::toDto);
    }

    @Transactional(readOnly = true)
    public Optional<ProfileDTO> findOneForUser(Long id) {
        log.debug("Request to get Profile for User: {}", id);
        return profileRepository.findOneByUserId(id).map(profileMapper::toDto);
    }

    @Transactional(readOnly = true)
    public Optional<ProfileDTO> findOneForCurrentUser() {
        log.debug("Request to get Profile for User: {}");
        return profileRepository.findByUserIsCurrentUser().map(profileMapper::toDto);
    }


    /**
     * Delete the profile by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete Profile : {}", id);
        profileRepository.deleteById(id);
    }

    //CUSTOM

    // public void updatePeppermintPoints(Long id){
    //     log.debug("Request to update peppermint points for a profile.");
    //     ProfileDTO profileDTO = findOne(id).get();
    //     Profile profile = profileMapper.toEntity(profileDTO);
    //     //get the savings bank accounts of the user
    //     List<BankAccountDTO> list = bankAccountService.findAllSavingsBankAccountsForUser();
    //     // get the balance of all savings accounts, then add them together
    //     List<BankAccount> entities = list.stream().map(bankAccountMapper::toEntity).collect(Collectors.toCollection(LinkedList::new));
    //     Double totalPeppermints = entities.stream().map(BankAccount::getBalance).reduce(0.00, Double::sum);
    //     // peppermint points is equal to that
    //     profile.setPeppermintPoints(totalPeppermints.intValue());
    //     profileRepository.save(profile);
    // }

    //transaction the thing that changes the balance (get the dto, change to entity)
    //bank account, the thing we are changing the field of (grab from repository by finding it )

    //savings bank accounts, the thing that changes the peppermint points (get entities of all bank accounts in a list)
    //profile, the thing we are changing the field of (grab from repository by id and must be an entity to be able to grab the peppermints)

    // public void updatePeppermintPoints(Long id){
    //     log.debug("Request to update peppermint points for a profile");
    //     List<BankAccountDTO> list = bankAccountService.findAllSavingsBankAccountsForUser();
    //     //get the balance of all savings accounts, then add them together
    //     List<BankAccount> entities = list.stream().map(bankAccountMapper::toEntity).collect(Collectors.toCollection(LinkedList::new));
    //     Double totalPeppermints = entities.stream().map(BankAccount::getBalance).reduce(0.00, Double::sum);
    //     Profile profile = profileRepository.findOneByUserId(id).get();
    //     profile.setPeppermintPoints(totalPeppermints.intValue());
    //     profileRepository.save(profile);
    // }

    // public void updatePeppermintPoints(Long id){
    //     log.debug("Request to update peppermint points for a profile");
    //     List<BankAccount> entities = bankAccountService.findAllForUser().stream().map(bankAccountMapper::toEntity).collect(Collectors.toCollection(LinkedList::new));
    //     List<Double> list =  entities.stream().map(BankAccount.getBalance).collect(Collectors.toCollection(LinkedList::new));
    // }
}
