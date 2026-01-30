let handler = async (m, { conn, text }) => {
if (!text) throw `✳️ ${mssg.notext}`
m.react('💬')
try {
m.reply(`❎ Error: AI tools not configured`, null, fwc)
} catch {
m.reply(`❎ Error: intenta más tarde`)
 }
}
handler.help = ['ai <text>']
handler.tags = ['tools']
handler.command = ['ia', 'ai', 'chatgpt', 'openai', 'gpt']

export default handler;
