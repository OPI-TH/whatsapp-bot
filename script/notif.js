const ngrok = require('@ngrok/ngrok')
const express = require("express")
const bodyParser = require('body-parser')

module.exports = {
    run: async(client) => {
        ngrok.connect({proto:'http', addr: 3000, authtoken: '2QyVJN4Quy3ClOTIVU8xMeqqDjY_2dv4JK9c428aNMxBdWrpW'}).then((url) => {
            console.log(`Webhook Link : ${url}`);
          });
          const app = express()
          const PORT = 3000
        // Tell express to use body-parser's JSON parsing
        // Start express on the defined port
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
            Ini Adalah Pesan Otomatis. Terimakasih`
        
            console.log(pesan)// Call your action on the request here 
            
            client.sendMessage('6282142968885@c.us',pesan);
            client.sendMessage('6285234438685@c.us',pesan);
            res.status(200).end()
          })
    }
}