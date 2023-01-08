package com.minty.repository;

import com.minty.domain.Budget;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Budget entity.
 */
@Repository
public interface BudgetRepository extends JpaRepository<Budget, Long> {
    @Query("select budget from Budget budget where budget.user.login = ?#{principal.username}")
    List<Budget> findByUserIsCurrentUser();

    default Optional<Budget> findOneWithEagerRelationships(Long id) {
        return this.findOneWithToOneRelationships(id);
    }

    default List<Budget> findAllWithEagerRelationships() {
        return this.findAllWithToOneRelationships();
    }

    default Page<Budget> findAllWithEagerRelationships(Pageable pageable) {
        return this.findAllWithToOneRelationships(pageable);
    }

    @Query(
        value = "select distinct budget from Budget budget left join fetch budget.user",
        countQuery = "select count(distinct budget) from Budget budget"
    )
    Page<Budget> findAllWithToOneRelationships(Pageable pageable);

    @Query("select distinct budget from Budget budget left join fetch budget.user")
    List<Budget> findAllWithToOneRelationships();

    @Query("select budget from Budget budget left join fetch budget.user where budget.id =:id")
    Optional<Budget> findOneWithToOneRelationships(@Param("id") Long id);
}
