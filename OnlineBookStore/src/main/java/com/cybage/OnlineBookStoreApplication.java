package com.cybage;

import org.modelmapper.ModelMapper;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@SpringBootApplication
@EnableScheduling
public class OnlineBookStoreApplication {

	public static void main(String[] args) {
		SpringApplication.run(OnlineBookStoreApplication.class, args);
	}
	
	@Bean
	ModelMapper modelMapper() {
		
		return new ModelMapper();
	}

	@Bean
	public static BCryptPasswordEncoder passwordEncoder()
	{
		return new BCryptPasswordEncoder();
	}

}
