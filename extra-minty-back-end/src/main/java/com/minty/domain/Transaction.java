package com.minty.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.minty.domain.enumeration.TransactionCategory;
import com.minty.domain.enumeration.TransactionType;
import java.io.Serializable;
import java.time.ZonedDateTime;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Transaction.
 */
@Entity
@Table(name = "transaction")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Transaction implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "custom_category_name")
    private String customCategoryName;

    @Enumerated(EnumType.STRING)
    @Column(name = "type")
    private TransactionType type;

    @Column(name = "amount")
    private Double amount;

    @Enumerated(EnumType.STRING)
    @Column(name = "category")
    private TransactionCategory category;

    @Column(name = "date")
    private ZonedDateTime date;

    @Column(name = "description")
    private String description;

    @Column(name = "transfer_to_account_number")
    private Long transferToAccountNumber;

    @Column(name = "transfer_from_account_number")
    private Long transferFromAccountNumber;

    @ManyToOne
    @JsonIgnoreProperties(value = { "user", "transactions" }, allowSetters = true)
    private Budget budget;

    @ManyToOne
    @JsonIgnoreProperties(value = { "transactions", "user" }, allowSetters = true)
    private BankAccount bankAccount;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Transaction id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCustomCategoryName() {
        return this.customCategoryName;
    }

    public Transaction customCategoryName(String customCategoryName) {
        this.setCustomCategoryName(customCategoryName);
        return this;
    }

    public void setCustomCategoryName(String customCategoryName) {
        this.customCategoryName = customCategoryName;
    }

    public TransactionType getType() {
        return this.type;
    }

    public Transaction type(TransactionType type) {
        this.setType(type);
        return this;
    }

    public void setType(TransactionType type) {
        this.type = type;
    }

    public Double getAmount() {
        return this.amount;
    }

    public Transaction amount(Double amount) {
        this.setAmount(amount);
        return this;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }

    public TransactionCategory getCategory() {
        return this.category;
    }

    public Transaction category(TransactionCategory category) {
        this.setCategory(category);
        return this;
    }

    public void setCategory(TransactionCategory category) {
        this.category = category;
    }

    public ZonedDateTime getDate() {
        return this.date;
    }

    public Transaction date(ZonedDateTime date) {
        this.setDate(date);
        return this;
    }

    public void setDate(ZonedDateTime date) {
        this.date = date;
    }

    public String getDescription() {
        return this.description;
    }

    public Transaction description(String description) {
        this.setDescription(description);
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Long getTransferToAccountNumber() {
        return this.transferToAccountNumber;
    }

    public Transaction transferToAccountNumber(Long transferToAccountNumber) {
        this.setTransferToAccountNumber(transferToAccountNumber);
        return this;
    }

    public void setTransferToAccountNumber(Long transferToAccountNumber) {
        this.transferToAccountNumber = transferToAccountNumber;
    }

    public Long getTransferFromAccountNumber() {
        return this.transferFromAccountNumber;
    }

    public Transaction transferFromAccountNumber(Long transferFromAccountNumber) {
        this.setTransferFromAccountNumber(transferFromAccountNumber);
        return this;
    }

    public void setTransferFromAccountNumber(Long transferFromAccountNumber) {
        this.transferFromAccountNumber = transferFromAccountNumber;
    }

    public Budget getBudget() {
        return this.budget;
    }

    public void setBudget(Budget budget) {
        this.budget = budget;
    }

    public Transaction budget(Budget budget) {
        this.setBudget(budget);
        return this;
    }

    public BankAccount getBankAccount() {
        return this.bankAccount;
    }

    public void setBankAccount(BankAccount bankAccount) {
        this.bankAccount = bankAccount;
    }

    public Transaction bankAccount(BankAccount bankAccount) {
        this.setBankAccount(bankAccount);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Transaction)) {
            return false;
        }
        return id != null && id.equals(((Transaction) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Transaction{" +
            "id=" + getId() +
            ", customCategoryName='" + getCustomCategoryName() + "'" +
            ", type='" + getType() + "'" +
            ", amount=" + getAmount() +
            ", category='" + getCategory() + "'" +
            ", date='" + getDate() + "'" +
            ", description='" + getDescription() + "'" +
            ", transferToAccountNumber=" + getTransferToAccountNumber() +
            ", transferFromAccountNumber=" + getTransferFromAccountNumber() +
            "}";
    }
}
