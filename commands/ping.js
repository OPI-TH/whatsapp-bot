module.exports = {
    name: 'ping',
    run: async(client, message) => {
        return client.sendMessage(message.from, "Pong")
    }
}