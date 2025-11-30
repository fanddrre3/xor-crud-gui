XOR CRUD GUI — Stream XOR Encryption (Node.js + MySQL)

Program ini merupakan implementasi sederhana proses CRUD (Create, Read, Update, Delete) dengan menggunakan Node Js dan database MySQL dan mekanisme kriptografi simetris Stream XOR.
Setiap data name dan email akan dienkripsi sebelum disimpan ke database, dan didekripsi ketika ditampilkan kembali ke pengguna.

Aplikasi dilengkapi GUI berbasis HTML/CSS/JS yang berfungsi sebagai antarmuka pengguna.


A. Fitur

- CRUD data user (name, email)

- Enkripsi data menggunakan Stream XOR

- Dekripsi otomatis saat membaca data

- Antarmuka GUI sederhana

- Backend API berbasis Node.js + Express

- Database MySQL

B. Cara Instalasi
1. Clone Repository
git clone https://github.com/fanddrre3/xor-crud-gui.git
cd xor-crud-gui

2. Install Dependencies
npm install

3. Buat Database MySQL

Masuk ke MySQL, lalu jalankan:

CREATE DATABASE xor_db;

USE xor_db;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name TEXT,
    email TEXT
);


Atau import file dump.sql yang tersedia.

4. Sesuaikan Konfigurasi Database

Edit file db.js sesuai dengan username/password MySQL:

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "xor_db"
});

5. Menjalankan Aplikasi

Jalankan perintah:

npm start


Jika tidak ada error, server akan berjalan di:

http://localhost:3000


Buka URL tersebut di browser.


C. Penjelasan Singkat Enkripsi Stream XOR

Aplikasi ini menggunakan metode enkripsi simetris:

cipher = plaintext XOR key
plaintext = cipher XOR key


Metode ini sederhana, cepat, dan dipakai untuk simulasi pengenalan kriptografi dasar.

File yang menangani enkripsi:

xor.js

D. Endpoints API
Method	Endpoint	Deskripsi
GET	/users	Mengambil semua user
POST	/users	Membuat user baru
PUT	/users/:id	Update user
DELETE	/users/:id	Hapus user

Semua data disimpan dalam bentuk dienkripsi.
