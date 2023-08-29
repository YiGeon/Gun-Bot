const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('룰렛')
    .setDescription('룰렛 돌리기'),
  async execute(interaction) {
    const slotItems = ['🍇', '🍉', '🍌', '🍎', '🍒', '🍓', '🍑'];
    const first = Math.floor(Math.random() * slotItems.length);
    const second = Math.floor(Math.random() * slotItems.length);
    const third = Math.floor(Math.random() * slotItems.length);


    await interaction.reply(`🎰 ${first} | ${second} | ${third} 🎰`);
  },
};
