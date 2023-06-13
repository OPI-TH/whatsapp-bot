const express = require("express")
const bodyParser = require('body-parser')

module.exports = {
    run: async(client) => {
          const app = express()
          const PORT = 3000
          app.use(bodyParser.json())
          app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`))
          
          app.use(bodyParser.json())
          app.post("/", (req, res) => {
            const pesan = `Pendaftaran Fesban Sukses Dengan : 
            Nama Grup : ${req.body['Nama Group']} 
            Nama Pimpinan : ${req.body['Nama Pimpinan/Pendamping']} 
            Nomer Telepon/Whatsapp : ${req.body['Nomor Telepon/Whatsapp']}
            Daftar Nama Peserta : ${req.body['Nama Peserta']}
            Dari Instansi : ${req.body['Asal Instansi']}
            Kota/Kabupaten : ${req.body['Kota/Kabupaten']} 
            Kecamatan : ${req.body.Kecamatan}
            Desa : ${req.body.Desa}
            Alamat : ${req.body.Alamat}
            Foto KTP : https://drive.google.com/open?id=${req.body["Foto KTP Pimpinan/Pendamping"][0]}
            Ini Adalah Pesan Otomatis. Terimakasih`
        
            console.log(pesan)// Call your action on the request here 
            console.log(req.body)
            
            client.sendMessage('6282142968885@c.us',pesan);
            client.sendMessage('6285234438685@c.us',pesan);
            res.status(200).end()
          })
    }
}