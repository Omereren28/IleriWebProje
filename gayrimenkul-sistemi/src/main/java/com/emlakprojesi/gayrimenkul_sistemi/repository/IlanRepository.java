package com.emlakprojesi.gayrimenkul_sistemi.repository;

import com.emlakprojesi.gayrimenkul_sistemi.model.Ilan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IlanRepository extends JpaRepository<Ilan, Long> {
    // Tüm ilanları listeleme, silme, ekleme metodları JpaRepository ile hazır geldi.
}