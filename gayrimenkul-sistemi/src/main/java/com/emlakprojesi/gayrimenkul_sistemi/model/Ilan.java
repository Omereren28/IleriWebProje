package com.emlakprojesi.gayrimenkul_sistemi.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "ilanlar")
@Data
public class Ilan {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String baslik;
    @Column(length = 1000)
    private String aciklama;
    private Double fiyat;
    private String sehir;
    private Integer metrekare;
    private String ilanTipi; // Satılık / Kiralık

    // İlanın bir sahibi olmalı
    @ManyToOne
    @JoinColumn(name = "kullanici_id")
    private Kullanici olusturanKullanici;
}