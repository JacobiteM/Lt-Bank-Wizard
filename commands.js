import 'dotenv/config';
import {InstallGlobalCommands } from './utils.js';

//This class is *needed*

function createCommandChoices() {
  const choices = getRPSChoices();
  const commandChoices = [];

  for (let choice of choices) {
    commandChoices.push({
      name: capitalize(choice),
      value: choice.toLowerCase(),
    });
  }

  return commandChoices;
}

const ALL_COMMANDS = [];

InstallGlobalCommands(process.env.APP_ID, ALL_COMMANDS);