  
export async function before(m, { conn, isAdmin, isBotAdmin, isOwner }) {
    const chat = global.db.data.chats[m.chat];
    const userID = m.messageStubParameters[0];
    conn.captchaCodes = conn.captchaCodes || {};
    
    let delay = time => new Promise(res => setTimeout(res, time))

    if (chat.captcha && m.messageStubType === 27) {
        let code = Math.floor(1000 + Math.random() * 9000);
        let cap = `🤖 CAPTCHA
        
🇪🇸
¡Hola! @${userID.split('@')[0]}
Por favor, responde con el código de 4 dígitos qué sale debajo de este texto.
*Tienes 1 minuto* para responder o seras eliminado del grupo.

➪: *${code}*


🇺🇸
Hello! @${userID.split('@')[0]}
Please respond to this message with the captcha code.
*You have 1 minutes* to respond, or you will be removed from the group.

➪: *${code}*`;

await delay(5000);

        conn.captchaCodes[userID] = {
            chat: await conn.reply(m.chat, cap, null, { mentions: [userID] } ),
            id: userID,
            code,
            time: setTimeout(async () => {
                if (conn.captchaCodes[userID]) {
                    await conn.reply(m.chat, `⏰ ¡Se acabó el tiempo! *@${userID.split('@')[0]}*\nSerás eliminado del grupo`, null, { mentions: [userID] });
                    
                    await delay(2000); // Espera 2 segundos
                    
                    conn.groupParticipantsUpdate(m.chat, [userID], 'remove');
                    delete conn.captchaCodes[userID];
                }
            }, 70000 ) //1 minutos
        }
    }
    //
}
 
