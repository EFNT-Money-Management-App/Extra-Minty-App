package com.minty.service.mapper;

import com.minty.domain.BankAccount;
import com.minty.domain.User;
import com.minty.service.dto.BankAccountDTO;
import com.minty.service.dto.UserDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link BankAccount} and its DTO {@link BankAccountDTO}.
 */
@Mapper(componentModel = "spring")
public interface BankAccountMapper extends EntityMapper<BankAccountDTO, BankAccount> {
    @Mapping(target = "user", source = "user", qualifiedByName = "userLogin")
    BankAccountDTO toDto(BankAccount s);

    @Named("userLogin")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "login", source = "login")
    UserDTO toDtoUserLogin(User user);
}
