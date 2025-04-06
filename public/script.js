function fetchDevices() {
    fetch('/get_devices')
        .then(response => response.json())
        .then(data => {
            let table = document.getElementById("deviceTable");
            table.innerHTML = "";

            data.forEach(device => {
                let row = `<tr>
                    <td>${device.nama}</td>
                    <td>${device.ip}</td>
                    <td>${device.mac}</td>
                    <td><button onclick="blockDevice('${device.mac}')">Blokir</button></td>
                </tr>`;
                table.innerHTML += row;
            });
        });
}

function blockDevice(mac) {
    fetch('/block_device', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mac: mac })
    }).then(() => alert("Perangkat diblokir!"));
}

// Ambil data perangkat setiap 5 detik
setInterval(fetchDevices, 5000);
