module.exports = {
   name: "online",
   description: "botun aktif olup çalıştığını gösterir",
   options: [], apply: async (client, interaction) => {
 
  interaction.reply({ content: ":white_check_mark: | Bot başarıyla çalışıyor" });
     
   }
}
