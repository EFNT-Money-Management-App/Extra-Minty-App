package com.minty.service.dto;

import com.minty.domain.enumeration.Month;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link com.minty.domain.Budget} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class BudgetDTO implements Serializable {

    private Long id;

    private Double spendingLimit;

    private Double currentSpending;

    private String name;

    private Month monthOfDate;

    private Integer budgetYear;

    private UserDTO user;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Double getSpendingLimit() {
        return spendingLimit;
    }

    public void setSpendingLimit(Double spendingLimit) {
        this.spendingLimit = spendingLimit;
    }

    public Double getCurrentSpending() {
        return currentSpending;
    }

    public void setCurrentSpending(Double currentSpending) {
        this.currentSpending = currentSpending;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Month getMonthOfDate() {
        return monthOfDate;
    }

    public void setMonthOfDate(Month monthOfDate) {
        this.monthOfDate = monthOfDate;
    }

    public Integer getBudgetYear() {
        return budgetYear;
    }

    public void setBudgetYear(Integer budgetYear) {
        this.budgetYear = budgetYear;
    }

    public UserDTO getUser() {
        return user;
    }

    public void setUser(UserDTO user) {
        this.user = user;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof BudgetDTO)) {
            return false;
        }

        BudgetDTO budgetDTO = (BudgetDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, budgetDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "BudgetDTO{" +
            "id=" + getId() +
            ", spendingLimit=" + getSpendingLimit() +
            ", currentSpending=" + getCurrentSpending() +
            ", name='" + getName() + "'" +
            ", monthOfDate='" + getMonthOfDate() + "'" +
            ", budgetYear=" + getBudgetYear() +
            ", user=" + getUser() +
            "}";
    }
}
