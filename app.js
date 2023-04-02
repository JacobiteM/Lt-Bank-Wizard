import 'dotenv/config';
import Eris from 'eris';

//Boot strapping is top tier
const bot = new Eris(process.env.DISCORD_TOKEN);

//What commands do we provide
bot.on("ready", async () => {
  //Hello, is this this on?
  console.log('Bot is ready!');

  //wait for bank reforge slash-command
  await bot.createCommand({
    name: 'rf',
    description: 'Bank Reforge Request',
    type: 1,
    options: [{
        name: 'item-id',
        description: 'lol',
        type: 4,
        required: true,
      },
      {
        name: 'item-desc',
        description: 'lol',
        type: 3,
        required: true,
      },
    ],
  })

  //wait for tutor slash-command
  await bot.createCommand({
    name: 'tutor',
    description: 'Tutor Skill',
    type: 1,
    options: [{
        name: 'tutor-pid',
        description: 'The source of tutor player id',
        type: 4,
        required: true,
      },
      {
        name: 'player-name',
        description: 'The targets real name',
        type: 3,
        required: true,
      },
      {
        name: 'tutee-pid',
        description: 'The targets player id',
        type: 4,
        required: true,
      },
      {
        name: 'skill',
        description: 'The skill to be tutored',
        type: 3,
        required: true,
      },
    ],
  })
});

//handle interactions from users
bot.on("interactionCreate", interaction => {
    //Received a bank reforge request slash command
    if (interaction.data.name == "rf") {
      return interaction.createMessage(
            "<@&937379340549783622>" + 
            ",\nItem ID: " + interaction.data.options[0].value + 
            ",\nItem Desc: " + interaction.data.options[1].value);
    };

    //Receieved a tutor request slash command
    if (interaction.data.name == "tutor") {
      return interaction.createMessage(
            "Tutor PID: " + interaction.data.options[0].value + 
            ",\nPlayer Name: " + interaction.data.options[1].value +
            ",\nTutee PID: " + interaction.data.options[2].value +
            ",\nSkill: " + interaction.data.options[3].value);
    };
});

bot.connect();

