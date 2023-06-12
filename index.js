const wa = require('whatsapp-web.js')
const fs = require('fs');
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
  require('./script/notif.js').run(client)
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