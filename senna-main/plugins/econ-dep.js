
let handler = async (m, { conn, text, usedPrefix, command, args }) => {
 
    if (!text) throw `✳️ ${mssg.useCmd}\n\n*${usedPrefix + command}* <${mssg.amount} o all>`
  
   if (args[0].toLowerCase() !== 'all' && !/^[1-9]\d*$/.test(args[0])) throw `✳️ ${mssg.isNan}`
    let all =  Math.floor(global.db.data.users[m.sender].coin)
    let count = args[0].replace('all', all)
     count = Math.max(1, count)
     
  //  if (isNaN(count)) throw `✳️ ${mssg.isNan}`
  
    if (global.db.data.users[m.sender].coin >= count) {
      global.db.data.users[m.sender].coin -= count
      global.db.data.users[m.sender].bank += count
  
      m.reply(`✅ ${mssg.dep(count)}`, null, fwc)
    } else m.reply(`❎ ${mssg.depNan}`, null, fwc)
  
  }
  handler.help = ['dep']
  handler.tags = ['econ']
  handler.command = ['dep','depositar'] 
  
  export default handler
  