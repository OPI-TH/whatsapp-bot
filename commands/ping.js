module.exports = {
    name: 'ping',
    run: async(client, message) => {
        return await client.sendText(message.from, "Pong")
    }
}