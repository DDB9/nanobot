const discord = require('discord.js');

// Token to log into the server.
// Tokens generated at: https://discordapp.com/developers/applications/me/395227173788581888
var token = "Mzk1MjI3MTczNzg4NTgxODg4.DScOMw.0DR0oIjF61dvnOaRdWJAB7CPaEU";

const client = new discord.Client();

client.on ("ready", () => {
    console.log('Ready!');
    client.user.setGame('>help');
});

// Prefix to call on the bot.
const prefix = ">";

client.on ("message", (message) => {

    if (message.author.bot) return;

    // Bot returns a random greeting if a user greets the bot.
    if (message.content.startsWith (prefix + 'hello')) {
        var randomIndex = ['Hi!', 'Hello!', 'Hiya!'];
        let randomGreeting = Math.floor(Math.random() * randomIndex.length);
        message.reply(randomIndex[randomGreeting]);

    }
    // Bot returns a goodbye message if someone says it goodbye.
    if (message.content.startsWith (prefix + 'cya')) {
        message.reply ('See you later, buddy!');

    }
    // Bot returns Username + discriminator and ID of author.
    if (message.content.startsWith (prefix + 'getid')) {
        message.channel.send ("Username: " + message.author.username + "#" + message.author.discriminator);
        message.channel.send ("User ID: " + message.author.id);

    }
    // But returns a picture of food with a user asks for it.
    if (message.content.startsWith (prefix + 'food')) {
        var randomFood = ['./images/food1.jpg', './images/food2.png', './images/food3.jpg'];
        let foodMixer = Math.floor(Math.random() * randomFood.length);
        message.channel.send ('Gordon Ramsey would be proud', {files: [randomFood[foodMixer]]});

    }
    // Shows credits, might remove later.
    if (message.content.startsWith (prefix + "credits")) {
        message.channel.send ('Nanobot made by NeonGekko. Profile picture by Ketoleperouch.');

    }


});

// Logging into the server...
client.login(token);
