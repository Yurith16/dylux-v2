 
import { sticker } from '../lib/sticker.js'
import axios from 'axios'
let handler = async (m, { conn, text }) => {
   
   let teks = text ? text : m.quoted && m.quoted.text ? m.quoted.text : ''
   if (!teks) return m.reply(`✳️ ${mssg.notext}`)
   if (teks.length > 300) return m.reply('✳️ El texto es muy largo! máximo 300 caracteres')
   let who = m.quoted ? m.quoted.sender : m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
   let pp = await conn.profilePictureUrl(who, 'image').catch(_ => 'https://i.imgur.com/whjlJSf.jpg')
   let name = conn.getName(who)
   
   const obj = {
      "type": "quote",
      "format": "png",
      "backgroundColor": "#000000",
      "width": 512,
      "height": 768,
      "scale": 2,
      "messages": [{
         "entities": [],
         "avatar": true,
         "from": {
            "id": 1,
            "name": name,
            "photo": {
               "url": pp
            }
         },
         "text": teks,
         "replyMessage": {}
      }]
   }
   const json = await axios.post('https://quote.btch.bz/generate', obj, {
      headers: {
         'Content-Type': 'application/json'
      }
   })
   const buffer = Buffer.from(json.data.result.image, 'base64')
   let stiker = await sticker(buffer, false, global.packname, global.author)
    if (stiker) return conn.sendFile(m.chat, stiker, 'Quotly.webp', '', m)
}

handler.help = ['quotly']
handler.tags = ['sticker']
handler.command = ['qc', 'quoted', 'quotly']

export default handler
