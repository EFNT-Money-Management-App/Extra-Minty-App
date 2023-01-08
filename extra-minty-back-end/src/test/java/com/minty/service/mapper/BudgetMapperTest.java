package com.minty.service.mapper;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class BudgetMapperTest {

    private BudgetMapper budgetMapper;

    @BeforeEach
    public void setUp() {
        budgetMapper = new BudgetMapperImpl();
    }
}
