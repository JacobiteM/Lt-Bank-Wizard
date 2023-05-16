import 'dotenv/config';
import Eris from 'eris';

//Boot strapping is top tier
const bot = new Eris(process.env.DISCORD_TOKEN);
//Global currentDate
var currentDate = new Date();

/**
 * Create the app commands on startup
 */
bot.on("ready", async () => {

  //Create bank reforge slash-command
  await bot.createCommand({
    name: 'rf',
    description: 'Bank Reforge Request',
    type: 1,
    options: [{
        name: 'reforger-pid',
        description: 'Reforger Player ID',
        type: 4,
        required: true,
      },
      {
        name: 'reforger-player-name',
        description: 'The reforger real name on char card',
        type: 3,
        required: true,
      },
      {
        name: 'item-id',
        description: 'Item ID to be checked',
        type: 4,
        required: true,
      },
      {
        name: 'notes',
        description: 'Any notes for the office',
        type: 3,
        required: false,
      },
    ],
  })

  //Create tutor slash-command
  await bot.createCommand({
    name: 'tutor',
    description: 'Tutor Skill',
    type: 1,
    options: [{
        name: 'tutor-pid',
        description: 'The tutor player id',
        type: 4,
        required: true,
      },
      {
        name: 'student-player-name',
        description: 'The student real name on char card',
        type: 3,
        required: true,
      },
      {
        name: 'student-pid',
        description: 'The student player id',
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

  //Create oathsworn slash-command
  await bot.createCommand({
    name: 'oathsworn',
    description: 'Oathswear a target',
    type: 1,
    options: [{
        name: 'target-pid',
        description: 'The player ID of the oath target',
        type: 4,
        required: true,
      },
      {
        name: 'faction',
        description: 'The name of a faction, i.e Lions',
        type: 3,
        required: false,
        choices: [
            { name: "Bears", value: "Bears" },
            { name: "Dragons", value: "Dragons" },
            { name: "Gryphons", value: "Gryphons" },
            { name: "Harts", value: "Harts" },
            { name: "Jackals", value: "Jackals" },
            { name: "Lions", value: "Lions" },
            { name: "Tarantulas", value: "Tarantulas" },
            { name: "Unicorns", value: "Unicorns" },
            { name: "Vipers", value: "Vipers" },
            { name: "Wolves", value: "Wolves" },
        ]
      },
      {
        name: 'guild',
        description: 'The name of a guild, i.e Scouts',
        type: 3,
        required: false,
        choices: [
            { name: "Alchemists", value: "Alchemists" },
            { name: "Armourers", value: "Armourers" },
            { name: "Bank", value: "Bank" },
            { name: "Bards", value: "Bards" },
            { name: "Casino", value: "Casino" },
            { name: "Corrupters", value: "Corrupters" },
            { name: "Healers", value: "Healers" },
            { name: "Incantors", value: "Incantors" },
            { name: "Mages", value: "Mages" },
            { name: "Militia", value: "Militia" },
            { name: "Rangers", value: "Rangers" },
            { name: "Scouts", value: "Scouts" },
            { name: "Watchers", value: "Watchers" },
            { name: "Library", value: "Library" },
        ]
      },
    ],
  })
});

/**
 * Wait for and respond to slash command interactions from users when they arrive
 */
bot.on("interactionCreate", async interaction => {
    
    //Received a bank reforge request slash command
    if (interaction.data.name == "rf") {
      var reforgeDiscordJobNumber = 0;
      //Get number of messages in the Reforge Channel
      reforgeDiscordJobNumber = await getTodaysMessageCountFromChannel('1105934473327026196');
      //Increment by one for this interaction
      reforgeDiscordJobNumber += 1;

      currentDate = new Date();
      //Return a bank reforge message to channel based optional field 'Notes'
      if (interaction.data.options[3] === undefined) {
        return interaction.createMessage(
          "Date: " + currentDate.toLocaleDateString() +
          ",\n# - " + reforgeDiscordJobNumber +
          ",\nReforger PID: " + interaction.data.options[0].value +
          ",\nReforger Player Name: " + interaction.data.options[1].value +
          ",\nItem ID: " + interaction.data.options[2].value);
      } else {
        return interaction.createMessage(
          "Date: " + currentDate.toLocaleDateString() +
          ",\n# - " + reforgeDiscordJobNumber +
          ",\nReforger PID: " + interaction.data.options[0].value +
          ",\nReforger Player Name: " + interaction.data.options[1].value +
          ",\nItem ID: " + interaction.data.options[2].value + 
          ",\nNotes: " + interaction.data.options[3].value);
      }
    };

    //Received a tutor request slash command
    if (interaction.data.name == "tutor") {
      //Return a tutor message to channel
      return interaction.createMessage(
        "Tutor PID: " + interaction.data.options[0].value + 
        ",\nStudent Player Name: " + interaction.data.options[1].value +
        ",\nStudent PID: " + interaction.data.options[2].value +
        ",\nSkill: " + interaction.data.options[3].value);
    };

    //Received an oathsworn request slash command
    if (interaction.data.name == "oathsworn") {

      if (interaction.data.options[1] === undefined && interaction.data.options[2] === undefined) {
        await interaction.createMessage({
          content: "Please provide either a faction or a guild.",
          flags: 64 //EPHEMERAL Flag, Only user will see this
        });
        return;
      } else if (interaction.data.options[1] != undefined && interaction.data.options[2] != undefined) {
        await interaction.createMessage({
          content: "You can't oathswear a person to both a faction and a guild in one command",
          flags: 64 //EPHEMERAL Flag, Only user will see this
        });
        return;
      } else if (interaction.data.options[1] === undefined) {
        //Return an guild message to channel
        return interaction.createMessage(
        "Target PID: " + interaction.data.options[0].value + 
        ",\n" + interaction.data.options[2].value);
      } else if (interaction.data.options[2] === undefined) {
        //Return a faction message to channel
        return interaction.createMessage(
        "Target PID: " + interaction.data.options[0].value + 
        ",\n" + interaction.data.options[1].value);
      }
    };
});

/**
 * Handle app errors
 */
bot.on("error", (err) => {
  console.log(err);
  if (err.code === 1006) {
    console.log("Caught 1006, discord disconnected. Eris should have re-connected the bot.");
  }
});

/**
 * This function serves as a way to not have a persistent job number stored in the app
 * by getting the daily message count for a channel directly from Discord
 * 
 * This needs to be asynchronous otherwise parts of other functions will occur before Discord has responded
 */
async function getTodaysMessageCountFromChannel(channelID) {
  var startTime = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 0, 0, 0).getTime();
  var endTime = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 23, 59, 59, 999).getTime();
  const channel = await bot.getChannel(channelID);
  var messageCount = 0;

  await getMessageCount(channel, startTime, endTime).then(count => {
    messageCount = count;
  }).catch(err => {
    console.error(err);
  });
  return messageCount;
};

/**
 * Get a collection of Discord messages using a channel ID, startTime and endTime
 * Then return the length of that collection
 */
async function getMessageCount(channel, startTime, endTime) {
  return new Promise(async (resolve, reject) => {
    await channel.getMessages({after: startTime, before: endTime, limit:2000}).then(messages => {
      const filteredMessages = messages.filter((message) => !message.messageReference);
      const count = filteredMessages.length;
      resolve(count);
    }).catch(err => {
      reject(err);
    });
  });
};

bot.connect();

