
import fetch from 'node-fetch'
let handler = async (m, { conn, text, args }) => {
	
  if (!text) throw `✳️ ${mssg.noUsername}`
  
  try {  	
  let pon = await fetch(global.API('fgmods', '/api/search/ttstalk', { username: args[0] }, 'apikey'))
    let res = await pon.json()
    
  let txt = `
┌──「 *TIKTOK STALK* 
▢ *🔖${mssg.name}:* ${res.result.name}
▢ *🔖${mssg.username}:* ${res.result.username}
▢ *👥${mssg.followers}:* ${res.result.followers}
▢ *🫂${mssg.follows}:* ${res.result.following}
▢ *📌${mssg.desc}:* ${res.result.bio}
▢ *🔗${mssg.link}:* https://tiktok.com/@${res.result.username}
└────────────`
  await conn.sendFile(m.chat, res.result.avatar, 'tt.png', txt, m, null, fwc)
} catch {
  m.reply(`✳️ ${mssg.error}`)
}

}
handler.help = ['tiktokstalk']
handler.tags = ['dl']
handler.command = /^t(tstalk|iktokstalk)$/i

export default handler
