from flask import Flask, jsonify, request
import os

app = Flask(__name__)

# Simulasi daftar perangkat terhubung
devices = [
    {"nama": "HP Pelanggan", "ip": "192.168.1.10", "mac": "AA:BB:CC:DD:EE:FF"},
    {"nama": "Laptop Pelanggan", "ip": "192.168.1.15", "mac": "11:22:33:44:55:66"},
]

@app.route('/get_devices')
def get_devices():
    return jsonify(devices)

@app.route('/block_device', methods=['POST'])
def block_device():
    data = request.json
    mac = data.get("mac")

    # Jalankan perintah blokir ARP spoofing (butuh akses root)
    os.system(f"sudo arptables -A INPUT -m mac --mac-source {mac} -j DROP")
    os.system(f"sudo arptables -A OUTPUT -m mac --mac-source {mac} -j DROP")

    return jsonify({"message": "Perangkat diblokir!"})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
