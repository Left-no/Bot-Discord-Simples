const Discord = require("discord.js");
const { commands } = require("npm");
const client = new Discord.Client(); 
const config = require("./config.json"); //AQUI TEM O PREFIXO E O TOKEN DO BOT



// ---------------------------------------------------------------------------HANDLER-----------------------------------------------------------------------------------
client.on('message', message => {
  if (message.author.bot) return;
  if (message.channel.type == 'dm') return;
  if (!message.content.toLowerCase().startsWith(config.prefix.toLowerCase())) return;
  if (message.content.startsWith(`<@!${client.user.id}>`) || message.content.startsWith(`<@${client.user.id}>`)) return;

 const args = message.content
     .trim().slice(config.prefix.length)
     .split(/ +/g);
 const command = args.shift().toLowerCase();

 try {
     const commandFile = require(`./commands/${command}.js`)
     commandFile.run(client, message, args);
 } catch (err) {
 console.error('Erro:' + err);
}
});
// AVISOS DO HANDLER
console.log (`O Handler está funcionando com sucesso!`)
// ---------------------------------------------------------------------------HANDLER-----------------------------------------------------------------------------------




// ---------------------------------------------------------------------------STATUS-----------------------------------------------------------------------------------
client.on("ready", () => {
  let activities = [
      `Utilize !help help para obter ajuda`,
      `Estou em ${client.guilds.cache.size} servidores!`,
      `Estou em ${client.channels.cache.size} canais!`,
      `Meu criador é ! Left#6218`
    ],
    i = 0;
  setInterval( () => client.user.setActivity(`${activities[i++ % activities.length]}`, {
        type: "WATCHING"
      }), 1000 * 60); 
  client.user
      .setStatus("dnd")
      .catch(console.error);
console.log("Estou Online!")
});
//AVISOS STATUS
console.log (`O Status foi definido com sucesso!`)
// ---------------------------------------------------------------------------STATUS-----------------------------------------------------------------------------------



// ---------------------------------------------------------------------------MENÇÃO-----------------------------------------------------------------------------------
client.on("message", message => {
  if (message.author.bot) return;
  if (message.channel.type == 'ferinha')
  return
  if(message.content == `<@${client.user.id}>` || message.content == `<@!${client.user.id}>`) {
  return message.channel.send(`🔮 | Olá ${message.author}, veja meus comandos com **${config.prefix}help**!`)
  }
  });
// ---------------------------------------------------------------------------MENÇÃO-----------------------------------------------------------------------------------

// ---------------------------------------------------------------------------COOLDOWN-----------------------------------------------------------------------------------
const cooldown = new Set();

module.exports = {
    name: "cooldown",
    author: "ferinha",

    run: async (client, message, args) => {

    let tempo_em_milisegundos = 5000; //Coloque o tempo em milisegundos (Obs: 1 segundo = Mil milisegundos)  

    if(cooldown.has(message.author.id)) {

//Coloque a mensagem de erro / cooldown aqui.

        message.channel.send(`${message.author} | Você precisa aguradar \`${tempo_em_milisegundos} milisegundos\` para utilizar este comando novamente!`).then(msg=>{msg.delete({timeout:5000})})

    } else {

// Coloque o script dentro dessa parte! (ELSE) |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||


        message.channel.send(`Olá **${message.author.username}**, se increva no canal.`) 


// Coloque o script dentro dessa parte! (ELSE) |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
// Script disponibilizado por FERINHA - https://discord.gg/PEdmSZzCAv

        cooldown.add(message.author.id);
        setTimeout(() => {
            cooldown.delete(message.author.id)
        }, `${tempo_em_milisegundos}`);
    }
}
}
// ---------------------------------------------------------------------------COOLDOWN-----------------------------------------------------------------------------------


client.login(config.token);