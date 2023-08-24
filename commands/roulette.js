const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('룰렛')
    .setDescription('룰렛 돌리기'),
  async execute(interaction) {
    // interaction.user is the object representing the User who ran the command
    // interaction.member is the GuildMember object, which represents the user in the specific guild

    // random 1~9
    const first = Math.floor(Math.random() * 9) + 1;
    const second = Math.floor(Math.random() * 9) + 1;
    const third = Math.floor(Math.random() * 9) + 1;


    await interaction.reply(`🎰 ${first} | ${second} | ${third} 🎰`);
  },
};

