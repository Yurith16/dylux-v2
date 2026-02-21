
let handler = async (m, { conn, args, usedPrefix, command }) => {
   
let exa = `✳️ ${mssg.useCmd}
*${usedPrefix + command}*  [${mssg.type}] [${mssg.amount}] [@user]

📌 ${mssg.example} : 
*${usedPrefix + command}* coin 65 @${m.sender.split('@')[0]}

📍 ${mssg.transItem}
┌──────────────
▢ *diamond* = ${mssg.dmd} 💎
▢ *coin* = ${mssg.money} 🪙
└──────────────`

 if (!args[0] || !args[1] ) return m.reply(exa, null, { mentions: [m.sender] })
    
    let type = args[0].toLowerCase()
    let amount = parseInt(args[1])
    let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : args[2] ? (args[2].replace(/[@ .+-]/g, '') + '@s.whatsapp.net') : ''
    if (!who) return m.reply(`✳️ ${mssg.noMention}`)
    
    if (!['coin', 'diamond'].includes(type)) return m.reply(exa, null, { mentions: [m.sender] })
    
    if (isNaN(amount) || amount <= 1) throw `✳️ ${mssg.isNan}`
    
    let user = global.db.data.users[m.sender]
    let whoData = global.db.data.users[who]
    
    if (!whoData) return m.reply(`✳️ ${mssg.userDb}`)
    
    let currencyName = type === 'coin' ? `${mssg.money}` : `${mssg.dmd}`
    
    if (user[type] < amount) throw `✳️ *${currencyName}* ${mssg.payNan}`
    
    user[type] -= amount;
    whoData[type] += amount;
    
    m.reply(`✅ ${mssg.pay} \n\n*${amount}* *${currencyName}* ${mssg.to} @${who.split('@')[0]}.`, null, { mentions: [who] })
}
handler.help = ['transfer'].map(v => v + ' [tipo] [monto] [@tag]')
handler.tags = ['econ']
handler.command = ['payxp','paydi', 'transfer', 'darxp','dardi', 'pay']
handler.disabled = false

export default handler

