package com.emlakprojesi.gayrimenkul_sistemi.model;

import jakarta.persistence.*;
import lombok.Data;
import java.util.List;

@Entity
@Table(name = "kullanicilar")
@Data
public class Kullanici {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String ad;
    private String soyad;

    @Column(unique = true, nullable = false)
    private String email;

    private String sifre;
    private String telefon;
    private String rol; // ROLE_EMLAKCI veya ROLE_MUSTERI

    // Bir kullanıcının birden fazla ilanı olabilir
    @OneToMany(mappedBy = "olusturanKullanici")
    private List<Ilan> ilanlar;
}