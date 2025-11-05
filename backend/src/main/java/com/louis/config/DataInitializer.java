package com.louis.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    @Override
    public void run(String... args) throws Exception {
        // No initialization needed! The database is populated by SQL.
        System.out.println("DataInitializer skipped: using SQL-populated database.");
    }
}
