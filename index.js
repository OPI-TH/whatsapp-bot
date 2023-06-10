const wa = require('whatsapp-web.js')
const fs = require('fs');
const express = require("express")
const bodyParser = require('body-parser')
const qrcode = require('qrcode-terminal');

const client = new wa.Client({
  puppeteer: {
		args: ['--no-sandbox'],
	},
  authStrategy: new wa.LocalAuth({ clientId: "client-one" })
})

const prefix = 'v!'

client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
  console.log('Client is ready!');
  const app = express()
  const PORT = 3000
// Tell express to use body-parser's JSON parsing
  app.use(bodyParser.json())
// Start express on the defined port
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
    Ini Adalah Pesan Otomatis. Terimakasih`

    console.log(pesan)// Call your action on the request here 
    
    client.sendMessage('6282142968885@c.us',pesan);
    client.sendMessage('6285234438685@c.us',pesan);
    res.status(200).end()
  })
})
  let commands = new Map()
  const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

  for(const file of commandFiles) {
    const commandFile = require(`./commands/${file}`)
    commands.set(commandFile.name, commandFile);
  }
  console.log(commands)
  
  client.on('message', async message => {
    if(!message.body.toLowerCase().startsWith(prefix)) return;
    const args = message.body.slice(prefix.length).trim().split(/ +/g);
    let cmd = args.shift()
    let command = commands.get(cmd)
    if(!command) return;
        try {
          command.run(client, message, args);
        } catch (error) {
          console.error(error);
          message.reply('Error, Mohon laporkan ke pengembang !');
        }
    })
  // Responding is important
  client.initialize();

  // Initialize express and define a port