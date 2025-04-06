const express = require("express");
const path = require("path");
const os = require("os");
const livereload = require("livereload");
const connectLivereload = require("connect-livereload");

const app = express();

// **1. Setup Livereload**
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, "public"));

app.use(connectLivereload());

// **2. Atur folder "public" sebagai tempat file HTML & aset statis**
app.use(express.static(path.join(__dirname, "public")));

// **3. Rute utama untuk menampilkan halaman utama**
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// **4. Cari alamat IP lokal agar bisa diakses di HP**
function getLocalIP() {
    const interfaces = os.networkInterfaces();
    for (let iface in interfaces) {
        for (let addr of interfaces[iface]) {
            if (addr.family === "IPv4" && !addr.internal) {
                return addr.address;
            }
        }
    }
    return "localhost";
}

const PORT = 3000;
const LOCAL_IP = getLocalIP();

// **5. Jalankan server**
app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
    console.log(`Akses dari HP: http://${LOCAL_IP}:${PORT}`);
});

// **6. Reload halaman saat ada perubahan file**
liveReloadServer.server.once("connection", () => {
    setTimeout(() => {
        liveReloadServer.refresh("/");
    }, 100);
});
