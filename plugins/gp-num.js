
let handler = async (m, { conn, args, participants }) => {
    if (!args[0] || isNaN(args[0])) return m.reply(`✳️ ${mssg.preNan}`)
    let prefix = args[0].replace(/[+]/g, '')
    let gpUser = participants.map(u => u.id).filter(v => v !== conn.user.jid && v.startsWith(prefix))
    if (gpUser.length === 0) return m.reply(`✳️ ${mssg.gpNanPre} +${prefix}`)
    let mentionList = gpUser.map(v => `▢ @${v.replace(/@.+/, '')}`).join('\n')
    m.reply(`
≡ *${mssg.userPref} +${prefix}*

▢ ${mssg.total} : *${gpUser.length}*
┌───
${mentionList}
└──────────────`, null, {mentions: gpUser })
}
handler.help = ['num <54>']
handler.tags = ['group']
handler.command = ['num'] 
handler.admin = true
handler.owner = false
  
export default handler
  
