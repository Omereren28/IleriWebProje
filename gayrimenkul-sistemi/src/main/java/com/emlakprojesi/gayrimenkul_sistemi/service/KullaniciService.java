package com.emlakprojesi.gayrimenkul_sistemi.service;

import com.emlakprojesi.gayrimenkul_sistemi.model.Kullanici;
import com.emlakprojesi.gayrimenkul_sistemi.repository.KullaniciRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class KullaniciService {

    private final KullaniciRepository kullaniciRepository;
    private final PasswordEncoder passwordEncoder;

    public KullaniciService(KullaniciRepository kullaniciRepository, PasswordEncoder passwordEncoder) {
        this.kullaniciRepository = kullaniciRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public void kaydet(Kullanici kullanici) {
        // Şifreyi veritabanına gitmeden önce şifreliyoruz!
        String sifreliSifre = passwordEncoder.encode(kullanici.getSifre());
        kullanici.setSifre(sifreliSifre);
        
        // Varsayılan rol atayalım (Eğer seçilmemişse)
        if (kullanici.getRol() == null) {
            kullanici.setRol("ROLE_MUSTERI");
        }
        
        kullaniciRepository.save(kullanici);
    }
}