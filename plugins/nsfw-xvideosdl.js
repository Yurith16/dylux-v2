
import fetch from 'node-fetch'
import fg from 'senna-fg'
let handler = async (m, {conn, text, usedPrefix, command }) => {
    let chat = global.db.data.chats[m.chat]
    if (!chat.nsfw) throw `🚫 ${mssg.gpNsfw(usedPrefix)}`
    let user = global.db.data.users[m.sender].age
    //if (user < 17) throw `❎ ${mssg.nsfwAge}`
    if (!text) throw `✳️ ${mssg.searchTo('xvideos.com', usedPrefix, command)}`
   m.react(rwait)

   if (text.includes('http://') || text.includes('https://')) {
        if (!text.includes('xvideos.com')) return m.reply(`❎ ${mssg.noLink('xvideos.com')}`)

        try {     
            let xv = await fg.xvideosdl(text)
            conn.sendFile(m.chat, xv.url_dl, xv.title + '.mp4', `
≡  *XVIDEOS DL*
                
*📌${mssg.title}*: ${xv.title}
*👍Likes* : ${xv.likes}
`.trim(), m, false, { asDocument: chat.useDocument })
    m.react(done)
    } catch (e) {
        m.reply(`🔴 ${mssg.error}`)
    }
    } else {

    try {
    let res = await fg.xvideosSearch(text)
    let fgg = res.map((v, i) => `📌 *${mssg.title}* : ${v.title}\n⌚ *${mssg.duration}:* ${v.duration}\n*🔗${mssg.link}:* ${v.url}\n`).join('─────────────────\n\n') 
    m.reply(fgg)
    } catch (e) {
    m.reply(`🔴 ${mssg.error}`, null, fwc)
     } 
    }

}
handler.help = ['xvideos'] 
handler.tags = ['nsfw', 'prem']
handler.command = ['xvideossearch', 'xvideo', 'xvideos', 'xvideodl'] 
//handler.diamond = 5
handler.group = true
handler.premium = true
handler.register = true

export default handler
