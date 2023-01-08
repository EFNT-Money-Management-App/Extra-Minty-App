package com.minty.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.minty.domain.enumeration.Month;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Budget.
 */
@Entity
@Table(name = "budget")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Budget implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "spending_limit")
    private Double spendingLimit;

    @Column(name = "current_spending")
    private Double currentSpending;

    @Column(name = "name")
    private String name;

    @Enumerated(EnumType.STRING)
    @Column(name = "month_of_date")
    private Month monthOfDate;

    @Column(name = "budget_year")
    private Integer budgetYear;

    @ManyToOne
    private User user;

    @OneToMany(mappedBy = "budget")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "budget", "bankAccount" }, allowSetters = true)
    private Set<Transaction> transactions = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Budget id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Double getSpendingLimit() {
        return this.spendingLimit;
    }

    public Budget spendingLimit(Double spendingLimit) {
        this.setSpendingLimit(spendingLimit);
        return this;
    }

    public void setSpendingLimit(Double spendingLimit) {
        this.spendingLimit = spendingLimit;
    }

    public Double getCurrentSpending() {
        return this.currentSpending;
    }

    public Budget currentSpending(Double currentSpending) {
        this.setCurrentSpending(currentSpending);
        return this;
    }

    public void setCurrentSpending(Double currentSpending) {
        this.currentSpending = currentSpending;
    }

    public String getName() {
        return this.name;
    }

    public Budget name(String name) {
        this.setName(name);
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Month getMonthOfDate() {
        return this.monthOfDate;
    }

    public Budget monthOfDate(Month monthOfDate) {
        this.setMonthOfDate(monthOfDate);
        return this;
    }

    public void setMonthOfDate(Month monthOfDate) {
        this.monthOfDate = monthOfDate;
    }

    public Integer getBudgetYear() {
        return this.budgetYear;
    }

    public Budget budgetYear(Integer budgetYear) {
        this.setBudgetYear(budgetYear);
        return this;
    }

    public void setBudgetYear(Integer budgetYear) {
        this.budgetYear = budgetYear;
    }

    public User getUser() {
        return this.user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Budget user(User user) {
        this.setUser(user);
        return this;
    }

    public Set<Transaction> getTransactions() {
        return this.transactions;
    }

    public void setTransactions(Set<Transaction> transactions) {
        if (this.transactions != null) {
            this.transactions.forEach(i -> i.setBudget(null));
        }
        if (transactions != null) {
            transactions.forEach(i -> i.setBudget(this));
        }
        this.transactions = transactions;
    }

    public Budget transactions(Set<Transaction> transactions) {
        this.setTransactions(transactions);
        return this;
    }

    public Budget addTransaction(Transaction transaction) {
        this.transactions.add(transaction);
        transaction.setBudget(this);
        return this;
    }

    public Budget removeTransaction(Transaction transaction) {
        this.transactions.remove(transaction);
        transaction.setBudget(null);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Budget)) {
            return false;
        }
        return id != null && id.equals(((Budget) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Budget{" +
            "id=" + getId() +
            ", spendingLimit=" + getSpendingLimit() +
            ", currentSpending=" + getCurrentSpending() +
            ", name='" + getName() + "'" +
            ", monthOfDate='" + getMonthOfDate() + "'" +
            ", budgetYear=" + getBudgetYear() +
            "}";
    }
}
