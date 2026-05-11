package com.emlakprojesi.gayrimenkul_sistemi.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class AnaSayfaController {

    @GetMapping("/")
    public String anaSayfa() {
        return "index"; // index.html dosyasını arayacak
    }

    @GetMapping("/giris")
    public String girisSayfasi() {
        return "giris"; // giris.html dosyasını arayacak
    }
}