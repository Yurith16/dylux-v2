let handler = async (m, { conn }) => {
  // Obtener metadata del grupo si es grupo
  let groupInfo = ''
  let userFound = false
  let userRole = 'No encontrado'

  if (m.isGroup) {
    try {
      const metadata = await conn.groupMetadata(m.chat)
      const participants = metadata.participants || []

      // Buscar usuario normalizando ID
      const normalizeId = (jid) => {
        if (!jid) return ''
        const numbers = jid.replace(/[^0-9]/g, '')
        return numbers.slice(-11) // Últimos 11 dígitos
      }

      const senderNum = normalizeId(m.sender)

      for (const p of participants) {
        const partNum = normalizeId(p.id || p.jid)
        if (partNum === senderNum || p.id === m.sender) {
          userFound = true
          userRole = p.admin || 'miembro'
          break
        }
      }

      groupInfo = `
┃ 📊 *Participantes:* ${participants.length}
┃ 🔍 *Usuario encontrado:* ${userFound ? '✅' : '❌'}
┃ 🏷️ *Rol en grupo:* ${userRole}
`
    } catch (e) {
      groupInfo = `┃ ❌ *Error obteniendo metadata:* ${e.message}`
    }
  }

  // Verificar si es owner
  const ownerNumbers = global.owner ? global.owner.map(v => {
    if (Array.isArray(v)) return v[0]
    return v
  }).map(v => v.replace(/[^0-9]/g, '')) : []

  const senderNum = m.sender.replace(/[^0-9]/g, '').slice(-11)
  const isROwner = ownerNumbers.includes(senderNum)
  const isOwner = isROwner || m.fromMe

  let info = `
╭━━━「 📊 TEST DE DYLUX 」
┃
┃ 👤 *Usuario:* ${senderNum}
┃ 🆔 *ID Original:* ${m.sender}
┃
┃ 📁 *Chat:* ${m.isGroup ? 'Grupo ✅' : 'Privado ❌'}
┃
┃ 👑 *Owner Config:* ${ownerNumbers.join(', ')}
┃ 👑 *Es Owner:* ${isOwner ? '✅' : '❌'}
┃ 👑 *Es ROwner:* ${isROwner ? '✅' : '❌'}
${groupInfo}
┃
╰━━━━━━━━━━━━━━━━━━━
`

  m.reply(info)
}

handler.help = ['test']
handler.tags = ['info']
handler.command = /^test$/i

export default handler