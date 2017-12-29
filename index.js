const discord = require('discord.js');

// Token to log into the server
// Tokens generated at https://discordapp.com/developers/applications/me/395227173788581888
var token = "token here";

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
    // Bot returns a random food image if the user asks for it (More food images will come later).
    if (message.content.startsWith (prefix + 'food')) {
        var randomFood = ['./images/food1.jpg', './images/food2.png', './images/food3.jpg'];
        let foodMixer = Math.floor(Math.random() * randomFood.length);
        message.channel.send ('Gordon Ramsey would be proud', {files: [randomFood[foodMixer]]});

    }
});

client.login(token);
