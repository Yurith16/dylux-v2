
let handler = async (m, { conn, usedPrefix, command, args }) => {
  
  m.reply(`
┌───⊷ *${mssg.shop.toUpperCase()}* ⊶
▢ _01_ - ${mssg.dmd} = 200🪙
▢ _02_ - ${mssg.prem} =  1h 50💎  (1d 800💎)
└────────────── 

${mssg.shopMsg} *${usedPrefix}buy* <ID> <${mssg.amount}>

📌${mssg.example}:
*${usedPrefix}buy* 01 20
*${usedPrefix}buy* 02 1h
  `, null, fwc)
}
handler.help = ['shop']
handler.tags = ['econ']
handler.command = ['shop', 'tienda'] 

export default handler
