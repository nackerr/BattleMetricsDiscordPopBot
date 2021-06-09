const fetch = require('node-fetch');
const Discord = require('discord.js');

const client = new Discord.Client();
const config = { serverID: YOUR_BM_SERVER_ID, token: "YOUR_BOT_TOKEN" }
const API_URL = 'https://api.battlemetrics.com/servers/';

client.on("ready", () => {
    console.log(`${client.user.username} is ready!`);
    client.user.setActivity("Connecting...", { type: "WATCHING"});

    client.setInterval(() => {
        fetch(`${API_URL}${config.serverID}`).then(res => res.text()).then(body => {
            try {
                theJSON = JSON.parse(body);
                currentPlayers = theJSON.data.attributes.players;
                currentMaxPlayers = theJSON.data.attributes.maxPlayers;
                currentQueue = theJSON.data.attributes.details.rust_queued_players;

                if (currentQueue && currentQueue > 1) {
                    client.user.setActivity(`${currentPlayers}/${currentMaxPlayers} Players (${currentQueue} Queued)`, { type: "WATCHING"});
                } else {
                    client.user.setActivity(`${currentPlayers}/${currentMaxPlayers} Players`, { type: "WATCHING"});
                }
            } catch (e) {
                console.log(e);
                return;
            }
        });
    }, 5000);
});

if (config.token == '') return console.log('Token is empty!');
client.login(config.token);