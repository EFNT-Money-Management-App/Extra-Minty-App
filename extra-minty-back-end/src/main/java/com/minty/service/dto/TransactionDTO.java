package com.minty.service.dto;

import com.minty.domain.enumeration.TransactionCategory;
import com.minty.domain.enumeration.TransactionType;
import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.Objects;

/**
 * A DTO for the {@link com.minty.domain.Transaction} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class TransactionDTO implements Serializable {

    private Long id;

    private String customCategoryName;

    private TransactionType type;

    private Double amount;

    private TransactionCategory category;

    private ZonedDateTime date;

    private String description;

    private Long transferToAccountNumber;

    private Long transferFromAccountNumber;

    private BudgetDTO budget;

    private BankAccountDTO bankAccount;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCustomCategoryName() {
        return customCategoryName;
    }

    public void setCustomCategoryName(String customCategoryName) {
        this.customCategoryName = customCategoryName;
    }

    public TransactionType getType() {
        return type;
    }

    public void setType(TransactionType type) {
        this.type = type;
    }

    public Double getAmount() {
        return amount;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }

    public TransactionCategory getCategory() {
        return category;
    }

    public void setCategory(TransactionCategory category) {
        this.category = category;
    }

    public ZonedDateTime getDate() {
        return date;
    }

    public void setDate(ZonedDateTime date) {
        this.date = date;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Long getTransferToAccountNumber() {
        return transferToAccountNumber;
    }

    public void setTransferToAccountNumber(Long transferToAccountNumber) {
        this.transferToAccountNumber = transferToAccountNumber;
    }

    public Long getTransferFromAccountNumber() {
        return transferFromAccountNumber;
    }

    public void setTransferFromAccountNumber(Long transferFromAccountNumber) {
        this.transferFromAccountNumber = transferFromAccountNumber;
    }

    public BudgetDTO getBudget() {
        return budget;
    }

    public void setBudget(BudgetDTO budget) {
        this.budget = budget;
    }

    public BankAccountDTO getBankAccount() {
        return bankAccount;
    }

    public void setBankAccount(BankAccountDTO bankAccount) {
        this.bankAccount = bankAccount;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof TransactionDTO)) {
            return false;
        }

        TransactionDTO transactionDTO = (TransactionDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, transactionDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "TransactionDTO{" +
            "id=" + getId() +
            ", customCategoryName='" + getCustomCategoryName() + "'" +
            ", type='" + getType() + "'" +
            ", amount=" + getAmount() +
            ", category='" + getCategory() + "'" +
            ", date='" + getDate() + "'" +
            ", description='" + getDescription() + "'" +
            ", transferToAccountNumber=" + getTransferToAccountNumber() +
            ", transferFromAccountNumber=" + getTransferFromAccountNumber() +
            ", budget=" + getBudget() +
            ", bankAccount=" + getBankAccount() +
            "}";
    }
}
