const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('룰렛')
    .setDescription('룰렛 돌리기'),
  async execute(interaction) {
    const slotItems = ['🍇', '🍉', '🍌', '🍎', '🍒', '🍓', '🍑'];

    const slot1 = slotItems[Math.floor(Math.random() * slotItems.length)];
    const slot2 = slotItems[Math.floor(Math.random() * slotItems.length)];
    const slot3 = slotItems[Math.floor(Math.random() * slotItems.length)];

    await interaction.reply(`🎰 ${slot1} | ${slot2} | ${slot3} 🎰`);
  },
};
