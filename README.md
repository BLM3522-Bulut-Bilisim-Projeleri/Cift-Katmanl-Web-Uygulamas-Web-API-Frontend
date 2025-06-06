# Çift Katmanlı Web Uygulaması (Support Ticket System)

Bu proje, bir şirketin bilgi işlem departmanının çalışanlardan gelen destek taleplerini yönetebileceği bir sistem olarak tasarlanmıştır. Uygulama React (frontend), Spring Boot (backend) ve PostgreSQL (veritabanı) teknolojilerini kullanır. AWS EC2 üzerinde dağıtımı gerçekleştirilmiştir.
## Youtube
https://youtu.be/EyBI3W_OHvs

## 🚀 Özellikler

- Destek talebi oluşturma, listeleme, silme ve düzenleme
- Taleplerin durumu: Beklemede, Çözülüyor, Tamamlandı
- Durum güncelleme özelliği
- Talep filtreleme
- Kullanıcı dostu arayüz (React)
- RESTful API ile frontend-backend entegrasyonu
- Hibernate ile veritabanı tablolarının otomatik oluşturulması

## 🧱 Kullanılan Teknolojiler

- Backend: Java (Spring Boot)
- Frontend: React + Vite
- Veritabanı: PostgreSQL 17
- Sunucu: AWS EC2 (Amazon Linux 2023)
- Diğer: Hibernate, Axios, Tailwind CSS

## 📁 Proje Yapısı

```
Cift-Katmanl-Web-Uygulamas-Web-API-Frontend/
│
├── backend/                # Spring Boot projesi
│   ├── src/main/java/com/example/backend/
│   │   ├── entity/
│   │   ├── controller/
│   │   ├── repository/
│   ├── application.properties
│
├── Frontend/frontend/     # React projesi
│   ├── src/components/
│   │   ├── TicketForm.jsx
│   │   ├── TicketList.jsx
│   ├── .env
│   ├── package.json
│   ├── vite.config.js
│
├── baslat.sh              # Tüm sistemi başlatan bash betiği
```

## ⚙️ Kurulum

### 1. PostgreSQL Başlatma
```bash
sudo -u postgres /usr/bin/pg_ctl -D /var/lib/pgsql/17/data -l /var/lib/pgsql/17/logfile start
```

### 2. Backend Başlatma
```bash
cd backend
./mvnw spring-boot:run
```

### 3. Frontend Başlatma
```bash
cd Frontend/frontend
npm install
npm run dev -- --host
```

## 🔄 Tüm Sistemi Otomatik Başlatmak İçin
```bash
chmod +x baslat.sh
./baslat.sh
```

## 📦 .env Dosyası İçeriği (Frontend)
`.env` dosyasını `Frontend/frontend` dizinine koyun:
```
VITE_API_URL=http://<sunucu_ip_adresi>:8080
```

## 📌 Notlar
- EC2 güvenlik grubunda 8080 (backend) ve 5174 (frontend) portları açılmalıdır.
- Veritabanı bağlantı bilgileri `application.properties` dosyasında tanımlanmalıdır.

## 👤 Geliştirici
Ömer Doğan
