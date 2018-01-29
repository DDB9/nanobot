const discord = require('discord.js');

// Token to log into the server.
// Tokens generated at: https://discordapp.com/developers/applications/me/395227173788581888
var token = "Mzk1MjI3MTczNzg4NTgxODg4.DSgnnQ.vlpN_oy4aPcxZpEW2lRjJP1ZqCc";

const client = new discord.Client();
const fs = require('fs');
client.quotes = require('./quotes.json');

client.on ("ready", () => {
    console.log('Nanobot updated.');
    client.user.setGame('>help');
});

// Prefix to call on the bot.
const prefix = ">";

client.on ("message", (message) => {

    message.content.toLowerCase();  // convert commands toLowerCase so simple typos don't matter.
    msg = message.content.toLowerCase();

    if (message.author.bot) return; // Ignore bots.

    if (msg.startsWith (prefix + 'help')) {
        message.reply("Sorry" + message.author.username + ", but I am still in pre-alpha. >help will become available during alpha when more features are available.\nFor help send a mail to: neongekko1@gmail.com.\nI'm sorry for the inconvenience...!" );
    }

    // Bot returns a random greeting if a user greets the bot.
    if (msg.startsWith (prefix + 'hello')) {
        var randomIndex = ['Hi!', 'Hello!', 'Hiya!'];
        let randomGreeting = Math.floor(Math.random() * randomIndex.length);
        message.reply(randomIndex[randomGreeting]);

    }
    // Bot returns a goodbye message if someone says it goodbye.
    if (msg.startsWith(prefix + "cya")) {
        message.reply ('See you later, buddy!');

    }
    // Bot returns Username + discriminator and ID of author.
    if (msg.startsWith (prefix + 'getid')) {
        message.channel.send ("Username: " + message.author.username + "#" + message.author.discriminator);
        message.channel.send ("User ID: " + message.author.id);

    }
    // But returns a picture of food with a user asks for it.
    if (msg.startsWith (prefix + 'food')) {
        var randomFood = ['./images/food1.jpg', './images/food2.jpg', './images/food3.jpg'];
        let foodMixer = Math.floor(Math.random() * randomFood.length);
        message.channel.send ('Gordon Ramsay would be proud', {files: [randomFood[foodMixer]]});
        // Don't forget to import the food images. Would'nt want to dissapoint papa Ramsay ;).
    }
    // Shows credits, might remove later.
    if (msg.startsWith (prefix + "credits")) {
        message.channel.send ('Nanobot made by NeonGekko. Profile picture by Ketoleperouch.\nVersion Number: 0.0.3 (Pre Alpha).\nFor Help or suggestions please send an E-mail to neongekko1@gmail.com.');
    }
    // Returns a fortune quote.
    if (msg.startsWith (prefix + "fortune")) {
        var fortuneStorage = ["You're hungry. If not, you will be hungry again in one hour.", "If you understand what you're doing, you're not learning.", "No one is perfect, neither are you.", "So live that you wouldn't be ashamed to sell the family parrot to the town gossip.\nYes."];
        var crystalBall = Math.floor(Math.random() * fortuneStorage.length);
        message.channel.send (fortuneStorage[crystalBall]);
        message.channel.send ('(More useless fortune quotes coming soon)');

    }
    // Bot saves quotes from users to quotes.json.
    if (msg.startsWith(prefix + "quote")) {
        slicedMsg = message.content.slice(7);

        client.quotes [message.author.username] = {
            quote: slicedMsg
        }

        fs.writeFile('./quotes.json', JSON.stringify(client.quotes, null, 4), err => {
            if (err) throw err;
            message.channel.send ('Quote saved...!'); 
        });

    }
    /*
    Bot gets quotes from the quotes.json database and returns the quote from a user. 
    Once a quote is already in the database and the user adds another quote, the current quote will be
    overwritten (Fix this!!).
    */
    if (msg.startsWith (prefix + 'getquote')) {
        var getQuote = client.quotes[message.author.username].quote;
        message.channel.send (message.author.username + " Once said: " + getQuote);
    }

    // Flips a 2-sided coin. Handy for solving tied arguments.
    if (msg.startsWith(prefix + "flipcoin")) {
        var coin = ["Heads!", {files: ["./images/coinh.png"]}, "Tails!", {files: ["./images/coint.png"]}];
        var flip = Math.floor(Math.random() * coin.length);
        message.channel.send(coin[flip]);
    } else if (msg.startsWith(prefix + "coinflip")) {
        message.reply("I think the command you are trying to access is: '>flipcoin' !");
    }

    // Returns the users avatar.
    if (msg.startsWith(prefix + "getavatar")){
        message.reply(message.author.avatarURL);
    }
    
    // Returns an invite link to add the bot to users servers.
    if (msg.startsWith(prefix + "invite")){
        message.channel.send("Spread my virus: https://discordapp.com/oauth2/authorize?client_id=395227173788581888&scope=bot&permissions=1610087547"); 
    }
});

client.on('guildMemberAdd', member => {
    var greetings = [`Welcome to the server ${member}!`, `Say hello to manliest man, ${member}!`, `My robot senses are tingling... It's ${member}!`, `Bleep bloop, fellow human ${member} has arrived.`];
    var randomizer = Math.floor(Math.random() * greetings.length);
    // Send the message to the right channel
    const welcomeChannel = member.guild.channels.find('entrance', 'member-log');
    // If the channel is not present in the server, do nothing.
    if (!welcomeChannel) return;
    message.channel.send(greetings[randomizer]);
});
// Logging into the server...
client.login(token);
