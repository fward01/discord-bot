const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('stats')
		.setDescription('Replies with pokemon stats')
        .addStringOption(option =>
			option
				.setName('pokemon')
				.setDescription('name of pokemon')),        
        async execute(interaction) {
            await interaction.deferReply();
            const pokemon = interaction.options.getString('pokemon')
            const link = 'https://pokeapi.co/api/v2/pokemon/' + pokemon;
            try{
                const response = await axios.get(link);                
                const {'name':name, 'id':dexNo} = response.data;                                              
                const embed = {
                    title :`${name} Dex No: ${dexNo}`,
                    fields:[
                        {name:'Health', value:response.data.stats[0].base_stat, inline:true},
                        {name:'Speed', value:response.data.stats[5].base_stat, inline:true},
                        { name: '\u200B', value: '\u200B' },
                        {name:'Attack',value:response.data.stats[1].base_stat, inline:true},
                        {name:'Defense', value:response.data.stats[2].base_stat, inline:true},
                        { name: '\u200B', value: '\u200B' },
                        {name:'Special Attack', value:response.data.stats[3].base_stat, inline:true},
                        {name:'Special Defense', value:response.data.stats[4].base_stat, inline:true}
                    ],                                       
                }            
                await interaction.editReply({
                    embeds: [embed]
                });
            }
            catch(error){
                
                await interaction.editReply('Unable to reply')
            }
            
        },
 };