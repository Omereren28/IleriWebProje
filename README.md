# KTÜ İLERİ WEB PROGRAMLAMA - PROJE TESLİM RAPORU

## 1. Proje Tanımı ve Amacı

Bu çalışma, emlak sektöründeki ilan yönetim süreçlerini dijitalleştirmek amacıyla geliştirilen **Gayrimenkul Otomasyon Sistemi** projesidir.
Temel hedefimiz; kullanıcıların güvenli bir şekilde sisteme dahil olabildiği, emlakçıların ilanlarını kolayca yönetebildiği (ekleme, güncelleme, silme),
müşterilerin ise bu ilanlara erişebildiği modüler bir yapı kurmaktır. Proje sürecinde, profesyonel yazılım standartları olan katmanlı mimari ve 
güvenli veri yönetimi esas alınmıştır.

## 2. Kullanılan Teknolojiler ve Tercih Nedenleri

Projenin iskeletini oluştururken modern web ihtiyaçlarını karşılayan şu teknolojileri seçtik:

* **Java 17 & Spring Boot:** Kurumsal düzeyde güvenli ve hızlı bir geliştirme ortamı sunduğu için tercih edilmiştir.
* **Spring Security:** Kullanıcı yetkilendirme ve şifre güvenliğini manuel kod yazmak yerine sektör standardı bir yapıyla çözmek için kullanılmıştır.
* **MySQL & Spring Data JPA (Hibernate):** SQL sorgularıyla vakit kaybetmek yerine nesne yönelimli programlama (OOP) mantığıyla
*  veritabanı yönetimi sağlamak amacıyla seçilmiştir.
* **Thymeleaf:** Backend'den gelen verilerin HTML sayfalarına "server-side rendering" yöntemiyle güvenli bir şekilde aktarılması sağlanmıştır.
* **Bootstrap 5:** Projenin mobil uyumlu (responsive) ve modern bir görünüme sahip olması için tercih edilmiştir.

---

## 3. Mimari Yapı ve Teknik Geliştirme Süreci

### **A. Backend ve Veritabanı Tasarımı (1. Üye)**

Projenin temel yapı taşları şu aşamalardan geçerek kurgulanmıştır:

* **Entity İlişkileri:** `Kullanici` ve `Ilan` tabloları arasında `@OneToMany` ilişkisi kurulmuştur. Bu sayede her ilanın bir sahibi olması ve bir kullanıcının
   birden fazla ilan yönetebilmesi sağlanmıştır.
* **Güvenlik Katmanı:** Spring Security yapılandırılarak tüm şifreler **BCrypt** algoritması ile hashlenmiştir.
   Veritabanına asla açık metin şifre yazılmayarak sistem güvenliği en üst seviyeye çıkarılmıştır.
* **Veri Erişimi:** Repository katmanı üzerinden CRUD (Create, Read, Update, Delete) operasyonları modernize edilmiştir.

### **B. İş Mantığı ve Servis Katmanı (3. Üye)**

* Controller ve Repository arasındaki iletişimi sağlayan Service katmanı oluşturulmuştur.
* İlan verme, fiyat güncelleme ve kullanıcı kayıt mantığı bu katmanda doğrulanarak (validation) sisteme dahil edilmiştir.

### **C. Arayüz Tasarımı ve Entegrasyon (2. Üye)**

* Sistemin görsel yüzü Bootstrap kullanılarak tasarlanmıştır.
* Thymeleaf entegrasyonu sayesinde veritabanındaki ilanların ana sayfada dinamik kartlar şeklinde listelenmesi sağlanmıştır.

---

## 4. Ekip Görev Dağılımı ve Çalışma Modeli

| Geliştirici | Uzmanlık Alanı | Katkı Sağlanan Modüller |
| --- | --- | --- |
| **1. Üye (Sistem Mimarı)** | Backend & DB | Proje kurulumu, Veritabanı tasarımı, Spring Security yapılandırması. |
| **2. Üye (Frontend)** | UI/UX & Thymeleaf | HTML/CSS şablonları, Responsive tasarım, Dinamik veri gösterimi. |
| **3. Üye (Logic/Servis)** | Business Logic | İlan yönetimi servisleri, Controller endpoint yönetimi, Form validasyonları. |

---

## 5. Proje Sonuç Bildirgesi

Projenin başlangıcında planlanan tüm isterler (Kullanıcı kaydı, Giriş-Çıkış işlemleri, İlan ekleme/silme ve Rol tabanlı erişim) başarıyla tamamlanmıştır.
Çalışma boyunca **Git & GitHub** aktif olarak kullanılarak ekip içi kod senkronizasyonu sağlanmış ve versiyon çakışmaları yönetilmiştir.

Sonuç olarak; sadece çalışan bir kod değil, aynı zamanda mühendislik prensiplerine uygun, sürdürülebilir ve güvenli bir web uygulaması ortaya çıkarılmıştır.
Projenin tüm dosyaları ve veritabanı şeması sunuma hazır şekilde finalize edilmiştir.
