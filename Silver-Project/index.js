const { token } = require("./config.json");
const { Client, Collection, MessageEmbed } = require("discord.js");
const { readdirSync } = require("fs");
const { join } = require("path");
const { TOKEN, default_prefix } = require("./util/Util");
const discord = require("discord.js"); 
const client = new discord.Client({
  disableEveryone: true 
});

client.commands = new discord.Collection();
client.prefix = default_prefix;
client.queue = new Map();
client.aliases = new discord.Collection();
const cooldowns = new Collection();

/**
 * Client Events 1
 */
client.on("ready", () => {
  console.log(`${client.user.username} ready!`);
  client.user.setActivity(`RaeiZers r/help`, { type: "PLAYING" });
});
client.on("warn", (info) => console.log(info));
client.on("error", console.error);


/**client.on("ready", async () => {
  console.log(`ready!`);
  client.user
    .setActivity(`Servers : ${await client.guilds.cache.size} | Users : ${await client.users.cache.size}`, { type: "PLAYING" })
    .catch(error => console.log(error));
});*/

["command", "events"].forEach(handler => {
  require(`./handlers/${handler}`)(client);
});


client.login(TOKEN);