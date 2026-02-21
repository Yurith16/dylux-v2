 
let handler = async (m, { conn, text, args, usedPrefix, command}) => {

let tex = `
${mssg.roulet(usedPrefix)}

[x36] Número individual
[x 3] Docenas (1-12, 13-24, 25-36)
[x 3] Columnas (1st, 2nd, 3rd)
[x 2] Mitades (1-18, 19-36)
[x 2] números Imapar/Par (Odd, Even)
[x 2] Colores (red, black)

${mssg.example}:
*${usedPrefix}rourette* 200 odd
*${usedPrefix}roulette* 600 2nd
`
let img = 'https://i.ibb.co/YjsxJwR/ruleta.png'
conn.sendFile(m.chat, img, 'ruleta.jpg', tex, m);
  } 
handler.help = ["roulette-info"]
handler.tags = ["game"]
handler.command = ['roulette-info', 'ruleta-info', 'info-ruleta']

export default handler
