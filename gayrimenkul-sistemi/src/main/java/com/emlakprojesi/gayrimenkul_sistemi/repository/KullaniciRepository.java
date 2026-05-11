package com.emlakprojesi.gayrimenkul_sistemi.repository;

import com.emlakprojesi.gayrimenkul_sistemi.model.Kullanici;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface KullaniciRepository extends JpaRepository<Kullanici, Long> {
    // İleride email ile kullanıcı bulmak için 3. üye burayı kullanacak:
    Kullanici findByEmail(String email);
}