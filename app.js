import 'dotenv/config';
import Eris from 'eris';

const bot = new Eris(process.env.DISCORD_TOKEN);

bot.on('ready', () => {
  console.log('Bot is ready!');
});

bot.on("ready", async () => {
  await bot.createCommand({
    name: 'tests',
    description: 'Basic command',
    type: 1,
    options: [{
        name: 'itemid',
        description: 'lol',
        type: 4,
        required: true,
      },
      {
        name: 'itemdesc',
        description: 'lol',
        type: 3,
        required: true,
      },
    ],
  })
});

bot.on("interactionCreate", interaction => {
  if (typeof interaction === 'object') {
    if (interaction.data.name == "tests") {
      return interaction.createMessage("<@&937379340549783622>" + ", \n Item ID: " + interaction.data.options[0].value + ", \n Item Desc: " + interaction.data.options[1].value);
    };
  };
});

bot.connect();

