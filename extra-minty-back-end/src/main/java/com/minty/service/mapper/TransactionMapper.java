package com.minty.service.mapper;

import com.minty.domain.BankAccount;
import com.minty.domain.Budget;
import com.minty.domain.Transaction;
import com.minty.service.dto.BankAccountDTO;
import com.minty.service.dto.BudgetDTO;
import com.minty.service.dto.TransactionDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Transaction} and its DTO {@link TransactionDTO}.
 */
@Mapper(componentModel = "spring")
public interface TransactionMapper extends EntityMapper<TransactionDTO, Transaction> {
    @Mapping(target = "budget", source = "budget", qualifiedByName = "budgetId")
    @Mapping(target = "bankAccount", source = "bankAccount", qualifiedByName = "bankAccountId")
    TransactionDTO toDto(Transaction s);

    @Named("budgetId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    BudgetDTO toDtoBudgetId(Budget budget);

    @Named("bankAccountId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    BankAccountDTO toDtoBankAccountId(BankAccount bankAccount);
}
