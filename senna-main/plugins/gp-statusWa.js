 
const { generateWAMessage, STORIES_JID } = await import('@whiskeysockets/baileys');
var handler = async (m, { conn, args, usedPrefix, command }) => {
    try {
        // Función para obtener los participantes de un grupo
        const fetchParticipants = async (jid) => {
            const { participants } = await conn.groupMetadata(jid);
            return participants.map(({ id }) => id);
        };

        // Función para enviar un estado con mención
        const sendStatus = async (jids, content) => {
            const msg = await generateWAMessage(STORIES_JID, content, {
                upload: conn.waUploadToServer
            });

            let statusJidList = [];

            for (const jid of jids) {
                if (jid.endsWith("@g.us")) {
                    const groupParticipants = await fetchParticipants(jid);
                    statusJidList.push(...groupParticipants);
                } else {
                    statusJidList.push(jid);
                }
            }

            // Eliminamos duplicados
            statusJidList = [...new Set(statusJidList)];

            // Enviar mensaje de estado
            await conn.relayMessage(msg.key.remoteJid, msg.message, {
                messageId: msg.key.id,
                statusJidList,
                additionalNodes: [{
                    tag: "meta",
                    attrs: {},
                    content: [{
                        tag: "mentioned_users",
                        attrs: {},
                        content: jids.map(jid => ({
                            tag: "to",
                            attrs: { jid },
                        }))
                    }]
                }]
            });

            // Notificar a los mencionados
            for (const jid of jids) {
                const type = jid.endsWith("@g.us") ? "groupStatusMentionMessage" : "statusMentionMessage";
                await conn.relayMessage(jid, {
                    [type]: {
                        message: {
                            protocolMessage: {
                                key: msg.key,
                                type: 25
                            }
                        }
                    }
                }, {
                    additionalNodes: [{
                        tag: "meta",
                        attrs: { is_status_mention: "true" },
                    }]
                });
            }

            return msg;
        };

        // Verificar si el mensaje es una respuesta a multimedia
        const q = m.quoted || m;
        const mime = (q.msg || q).mimetype || '';
        let content = {};

        if (mime) {
            const media = await q.download();
            if (/image/.test(mime)) {
                content.image = media;
            } else if (/video/.test(mime)) {
                content.video = media;
            } else if (/audio/.test(mime)) {
                content.audio = media;
            } else {
                m.reply("⚠️ Tipo de archivo no soportado.", null, fwc);
            }
            if (q.text) content.caption = q.text;
        } else if (args.length > 0) {
            content.text = args.join(" ");
        } else {
            m.reply(`⚠️ Responde a un archivo multimedia o escribe un mensaje.\nEjemplo:\n${usedPrefix + command} Hola a todos`, null, fwc)
        }

        // Enviar estado y responder con confirmación
        const sentMessage = await sendStatus([m.chat], content);
        m.reply(`✅ *Estado enviado con éxito!*`, null, fwc)

    } catch (error) {
        m.reply(`❎ *Error:* \n${error.message}`)
    }
};
handler.help = ['sw']
handler.tags = ['group']
handler.command = ['statuswa', 'sw'] 
handler.group = true
handler.rowner = true

export default handler
