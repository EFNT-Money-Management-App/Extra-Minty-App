package com.minty.service.mapper;

import com.minty.domain.Budget;
import com.minty.domain.User;
import com.minty.service.dto.BudgetDTO;
import com.minty.service.dto.UserDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Budget} and its DTO {@link BudgetDTO}.
 */
@Mapper(componentModel = "spring")
public interface BudgetMapper extends EntityMapper<BudgetDTO, Budget> {
    @Mapping(target = "user", source = "user", qualifiedByName = "userLogin")
    BudgetDTO toDto(Budget s);

    @Named("userLogin")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "login", source = "login")
    UserDTO toDtoUserLogin(User user);
}
