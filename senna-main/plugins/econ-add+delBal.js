
let handler = async (m, { conn, text, args, usedPrefix, command }) => {
  let who
  if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : false
  else who = m.chat

    let user = global.db.data.users[who]
    if (!who) throw `✳️ ${mssg.noMention}`
    if (!(who in global.db.data.users)) throw `✳️ ${mssg.userDb}`
  let txt = text.replace('@' + who.split`@`[0], '').trim() //monto añadir
  //let txt = args[1]  //monto añadir
  if (!txt) return m.reply(`✳️${mssg.useCmd}\n\n📌${mssg.example} : *${usedPrefix + command}* @${m.sender.split`@`[0]} 20`, null, { mentions: [m.sender] }) 
  if (isNaN(txt)) throw `🔢 ${mssg.noNum}`
  
  let adx = parseInt(txt) //monto
  if (adx < 1) throw '✳️ Mínimo es  *1*'
  let users = global.db.data.users 
  
 let type = (command).toLowerCase()
 
switch (type) {
	case 'addxp':
	case 'add-xp':
  users[who].exp += adx
  await m.reply(`≡ *XP Añadidos* 🆙
┌──────────────
▢ *Total:* +${adx}
└──────────────`)
 conn.fakeReply(m.chat, `▢ Recibiste \n\n *+${adx} XP*`, who, m.text)
 break
 case 'addcoin':
  users[who].bank += adx
  await m.reply(`≡ *COINS AÑADIDO* 🪙
┌──────────────
▢ *Total:* +${adx}
└──────────────`)
 conn.fakeReply(m.chat, `▢ Recibiste \n\n *+${adx} Coins*`, who, m.text)
 break 
 case 'adddi':
 case 'add-di':
 case 'adddiamond':
  users[who].diamond += adx
  await m.reply(`≡ *Diamantes Añadido* 💎
┌──────────────
▢ *Total:* +${adx}
└──────────────`)
 conn.fakeReply(m.chat, `▢ Recibiste \n\n *+${adx} Diamantes*`, who, m.text)
 break
 case 'delxp':
 case 'removexp':
 case 'del-xp':
  if (user.exp < adx) return m.reply(`❇️ @${who.split`@`[0]} No tiene *${adx} xp*`, null, { mentions: [who] })
   users[who].exp -= adx 
  await m.reply(`≡ *XP Removido* 🆙
┌──────────────
▢ *Total:* -${adx}
└──────────────`)
 break 
 case 'delcoin':
  //if (user.coin < adx) return m.reply(`❇️ @${who.split`@`[0]} No tiene *${adx} xp*`, null, { mentions: [who] })
   users[who].bank -= adx 
  await m.reply(`≡ *REMOVE COINS* 🪙
┌──────────────
▢ *Total:* -${adx}
└──────────────`)
 break
 case 'deldi':
 case 'removedi':
 case 'del-di':
  if (user.diamond < adx) return m.reply(`❇️ @${who.split`@`[0]} No tiene *${adx} Diamantes*`, null, { mentions: [who] })
  users[who].diamond -= adx 
  await m.reply(`≡ *Diamantes Removido* 💎
┌──────────────
▢ *Total:* -${adx}
└──────────────`)
 break 
 case 'addlvl':
  users[who].level += adx 
  await m.reply(`≡ *ADD LEVEL* ⬆️
┌──────────────
▢ *${mssg.total}:* +${adx}
└──────────────`)
 break 

 case 'removelvl':
  if (user.level < adx) return m.reply(`❇️ @${who.split`@`[0]} No tiene *${adx} Nivel*`, null, { mentions: [who] })
  users[who].level -= adx 
  await m.reply(`≡ *REMOVE LEVEL* 
┌──────────────
▢ *${mssg.total}:* -${adx}
└──────────────`)
 break 
 
 default:
 }
 
}
/*handler.help = ['add-xp', 'add-di', 'delxp', 'deldi']
handler.tags = ['econ']*/
handler.command = /^(delcoin|addcoin|addxp|add-xp|adddi|add-di|adddiamond|delxp|del-xp|del-di|deldi|removexp|removedi|addlvl|removelvl)$/i
handler.rowner = true

export default handler