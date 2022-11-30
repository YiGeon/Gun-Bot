const { SlashCommandBuilder } = require('discord.js');
const { getWeather } = require('../modules/weather');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('weather')
    .setDescription('서울 오늘 날씨를 알려줍니다.'),
  async execute(interaction) {

    const result = getWeather();

    await interaction.reply(result);
  },
};

