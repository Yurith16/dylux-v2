export function before(m) {
    let user = global.db.data.users[m.sender]
    if (user.afk > -1) {
        m.reply(`
${mssg.afkdel} 

▢ *${mssg.name} :* ${this.getName(m.sender)}
▢ *${mssg.afktime} :* ${(new Date - user.afk).toTimeString()}
  `.trim())
        user.afk = -1
        user.afkReason = ''
    }

    // VERSIÓN CORREGIDA - Manejo seguro de arrays
    let jids = []

    // Procesar mentionedJid de forma segura
    if (m.mentionedJid) {
        if (Array.isArray(m.mentionedJid)) {
            jids = [...m.mentionedJid]
        } else if (typeof m.mentionedJid === 'string') {
            jids = [m.mentionedJid]
        }
    }

    // Agregar quoted sender si existe
    if (m.quoted && m.quoted.sender) {
        jids.push(m.quoted.sender)
    }

    // Filtrar y remover duplicados
    jids = [...new Set(jids.filter(jid => jid && typeof jid === 'string'))]

    for (let jid of jids) {
        let user = global.db.data.users[jid]
        if (!user)
            continue
        let afkTime = user.afk
        if (!afkTime || afkTime < 0)
            continue
        let reason = user.afkReason || ''

        let afkt = `
≡ ${mssg.afktag} 

▢ *${mssg.name} :* ${this.getName(jid)}
${reason ? `▢ *${mssg.with}* : ${reason}` : ''}
▢ *${mssg.afktime} :* ${(new Date - afkTime).toTimeString()}`

        m.reply(afkt, null, {mentions: this.parseMention(afkt)})
    }
    return true
}