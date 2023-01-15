package com.minty.repository;

import com.minty.domain.Profile;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Profile entity.
 */
@Repository
public interface ProfileRepository extends JpaRepository<Profile, Long> {
    default Optional<Profile> findOneWithEagerRelationships(Long id) {
        return this.findOneWithToOneRelationships(id);
    }

    default List<Profile> findAllWithEagerRelationships() {
        return this.findAllWithToOneRelationships();
    }

    default Page<Profile> findAllWithEagerRelationships(Pageable pageable) {
        return this.findAllWithToOneRelationships(pageable);
    }

    @Query(
        value = "select distinct profile from Profile profile left join fetch profile.user",
        countQuery = "select count(distinct profile) from Profile profile"
    )
    Page<Profile> findAllWithToOneRelationships(Pageable pageable);

    @Query("select distinct profile from Profile profile left join fetch profile.user")
    List<Profile> findAllWithToOneRelationships();

    @Query("select profile from Profile profile left join fetch profile.user where profile.id =:id")
    Optional<Profile> findOneWithToOneRelationships(@Param("id") Long id);
    //CUSTOM
    Optional<Profile> findOneByUserId(Long userId);

    //custom
    @Query("select profile from Profile profile where profile.user.login = ?#{principal.username}")
    Optional<Profile> findByUserIsCurrentUser();
}
