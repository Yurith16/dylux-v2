
import fetch from "node-fetch"
let handler = async(m, { conn, text, usedPrefix, command }) => {

if (!text) throw `✳️ ${mssg.notext}`
m.react(rwait)
    try {
        let data = await generateImage(text)
        if (data && data.imgs.length > 0) {
            for (let i = 0; i < data.imgs.length; i++) {
                await conn.sendFile(m.chat, data.imgs[i], '', `✳️ Imagen *(${i + 1}/${data.imgs.length})*`, m)
                m.react(done)
            }
        }
    } catch (e) {
        await m.reply(`✳️ ${mssg.error}`)
    }
}
handler.help = ["dalle"]
handler.tags = ["tools"];
handler.command = ["dalle", "gptimg", "gptphoto", "gptfoto", "aiimg", "iaimg"]

export default handler

async function generateImage(captionInput) {
    const data = {
        captionInput,
        captionModel: "default"
    };

    const url = 'https://chat-gpt.photos/api/generateImage';

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        return result;
    } catch (error) {
        throw error;
    }
}
