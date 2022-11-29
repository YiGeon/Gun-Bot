const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('유지상')
    .setDescription('Provides information about the user.'),
  async execute(interaction) {
    // interaction.user is the object representing the User who ran the command
    // interaction.member is the GuildMember object, which represents the user in the specific guild

    const words = ['바보', '천재', '해삼', '말미잘'];

    // random word from words array
    const word = words[Math.floor(Math.random() * words.length)];

    await interaction.reply(`유지상은 ${word}입니다.`);
  },
};

