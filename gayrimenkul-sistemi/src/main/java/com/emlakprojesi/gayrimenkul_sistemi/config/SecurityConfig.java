package com.emlakprojesi.gayrimenkul_sistemi.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(); // Şifreleri karmaşık hale getiren araç
    }



@Bean
public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    http
        .authorizeHttpRequests(auth -> auth
            .requestMatchers("/", "/kayit", "/css/**", "/js/**").permitAll() // Herkese açık sayfalar
            .requestMatchers("/ilan-ekle").hasRole("EMLAKCI") // Sadece emlakçılar girebilir
            .anyRequest().authenticated() // Diğer her şey için giriş şart
        )
        .formLogin(login -> login
            .loginPage("/giris") // Kendi giriş sayfamız (2. üye burayı tasarlayacak)
            .defaultSuccessUrl("/") // Giriş başarılıysa ana sayfaya git
            .permitAll()
        )
        .logout(logout -> logout.logoutSuccessUrl("/")); // Çıkış yapınca ana sayfaya git

    return http.build();
}
}