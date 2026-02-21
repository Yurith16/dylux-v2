
let handler = async (m, { conn, text }) => {
    if (!text) throw `✳️ Por favor, ingrese el enlace de un canal.`;
  
    let id = text.replace(/https:\/\/(www\.)?whatsapp\.com\/channel\//, "").split("/")[0];
  
      let metadata = await conn.newsletterMetadata("invite", id);
      let img = `https://pps.whatsapp.net${metadata.preview}`
  
     let info = `
         *INFO DEL CANAL*
  📌  *ID:* ${metadata.id}
  🫧 *Nombre:* ${metadata.name}
  👥 *Seguidores:* ${metadata.subscribers}
  ⏳ *Creado el:* ${new Date(metadata.creation_time * 1000).toLocaleString("es-ES")} `
  
  conn.sendFile(m.chat, img, 'channel.jpg', info, m, null, fwc )
      
  }
  handler.help = ['ci ']
  handler.tags = ['tools']
  handler.command = ['ci', 'channelinfo', 'cinfo']
  
  export default handler
  
