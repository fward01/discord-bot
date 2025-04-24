const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('pokedex')
		.setDescription('Replies with pokemon data')
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
                const tester = response.data.sprites;
                const {'front_default': sprite} = tester
                var type2 
                const count = response.data.types.length
                console.log(count)
                if (count==2){
                    type2= response.data.types[1].type.name;
                }
                else{
                    type2="NaN"
                }
                const embed = {
                    title :`${name} Dex No: ${dexNo}`,
                    fields:[
                        {name:'Type 1', value:response.data.types[0].type.name, inline:true},
                        {name:'Type 2', value:type2, inline:true},
                        { name: '\u200B', value: '\u200B' },
                        {name:' Ability 1', value:response.data.abilities[0].ability.name, inline:true},
                        {name:' Ability 2', value:response.data.abilities[1].ability.name, inline:true}
                    ],                    
                    image:{
                        url:sprite
                    }
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