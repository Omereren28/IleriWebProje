package com.emlakprojesi.gayrimenkul_sistemi.service;

import com.emlakprojesi.gayrimenkul_sistemi.model.Kullanici;
import com.emlakprojesi.gayrimenkul_sistemi.repository.KullaniciRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class VeriYuklemeServisi implements CommandLineRunner {

    private final KullaniciRepository kullaniciRepository;
    private final PasswordEncoder passwordEncoder;

    public VeriYuklemeServisi(KullaniciRepository kullaniciRepository, PasswordEncoder passwordEncoder) {
        this.kullaniciRepository = kullaniciRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) throws Exception {
        if (kullaniciRepository.count() == 0) {
            Kullanici admin = new Kullanici();
            admin.setAd("Admin");
            admin.setSoyad("Emlak");
            admin.setEmail("admin@test.com");
            admin.setSifre(passwordEncoder.encode("123456"));
            admin.setRol("ROLE_EMLAKCI");
            kullaniciRepository.save(admin);
            System.out.println("Sisteme test kullanıcısı eklendi: admin@test.com / 123456");
        }
    }
}