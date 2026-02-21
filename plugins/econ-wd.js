
let handler = async (m, { conn, text, usedPrefix, command, args }) => {
 
  if (!text) throw `✳️ ${mssg.wd}`

 // let count = parseInt(args[0])
  let user = global.db.data.users[m.sender]
  
  if (args[0].toLowerCase() !== 'all' && !/^[1-9]\d*$/.test(args[0])) throw `✳️ ${mssg.isNan}`
  let all =  Math.floor(global.db.data.users[m.sender].bank)
  let count = args[0].replace('all', all)
   count = Math.max(1, count)

  if (isNaN(count)) throw `✳️ ${mssg.isNan}`
  if (count > user.bank) throw `✳️ ${mssg.noWd}`

    user.bank -= count
    user.coin += count

    m.reply(`✅ ${mssg.wdYes} *${count.toLocaleString()}🪙*`, null, fwc)
  
}
handler.help = ['wd']
handler.tags = ['econ']
handler.command = ['withdraw','wd', 'retirar']

export default handler
