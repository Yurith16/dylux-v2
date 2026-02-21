 
let precioDiamante = 200;
let precioPremiumHora = 50;
let precioPremiumDia = 800;
let handler = async (m, { conn, text, usedPrefix, command, args }) => {
  if (!args[1]) throw `📌 ${mssg.example}: *${usedPrefix + command}* <ID> <cantidad>\n${mssg.example}: *${usedPrefix + command}* _01_ 5\n\n*${usedPrefix}shop* ${mssg.itemV}`;

  let option = args[0];
  let input = args[1];
  let user = global.db.data.users[m.sender];

  if (option === '01') {
    let sca = args[1];
    if (sca.toLowerCase() !== 'all' && !/^[1-9]\d*$/.test(sca)) throw `✳️ ${mssg.isNan}`;

    let all =  Math.floor(user.coin / precioDiamante)
   let count = sca.replace('all', all)
   count = Math.max(1, count)
    //if (isNaN(count)) throw `✳️ ${mssg.isNan}`;
    
    
    let totalCost = precioDiamante * count;

    if (user.coin >= totalCost) {
      user.coin -= totalCost;
      user.diamond += count;

      m.reply(`
┌─「 *${mssg.voucher.toUpperCase()}* 」
‣ *${mssg.buy}:* ${mssg.dmd}
‣ *${mssg.buyCount}:* ${count.toLocaleString()} 💎 
‣ *${mssg.spent}:* -${totalCost.toLocaleString()} 🪙
└──────────────`, null, fwc);
    } else {
      m.reply(`❎ ${mssg.buyNan('Coins')} *${count}* 💎`, null, fwc);
    }
  } else if (option === '02') {
    let count = 0;
    let unit = '';

    if (input.endsWith('h')) {
      count = parseInt(input.slice(0, -1));
      unit = 'horas';
    } else if (input.endsWith('d')) {
      count = parseInt(input.slice(0, -1));
      unit = 'días';
    } else {
      throw `✳️ ${mssg.noTime} 

*${mssg.example}:*
${usedPrefix + command} <ID> <cantidad>
${usedPrefix + command} 02 4d

h = ${mssg.hour} 
d = ${mssg.day}
`;
    }

    //if (isNaN(count)) throw `✳️ ${mssg.isNan}`;
    if (!/^[1-9]\d*$/.test(count)) throw `✳️ ${mssg.isNan}`;

    let precioPremium = 0;

    if (unit === 'horas') {
      precioPremium = precioPremiumHora * count;
    } else if (unit === 'días') {
      precioPremium = precioPremiumDia * count;
    }

    if (user.diamond >= precioPremium) {
      user.diamond -= precioPremium;
      let horas = 0;

      if (unit === 'horas') {
        horas = count * 3600000;
      } else if (unit === 'días') {
        horas = count * 86400000;
      }

      const now = new Date() * 1;

      if (now < user.premiumTime) {
        user.premiumTime += horas;
      } else {
        user.premiumTime = now + horas;
      }

      user.prem = true;

      m.reply(`
┌─「 *${mssg.voucher.toUpperCase()}* 」
‣ *${mssg.buy}:* Premium
‣ *${mssg.buyCount}:* ${count} ${unit}
‣ *${mssg.spent}:* -${precioPremium} 💎
└──────────────`, null, fwc);
    } else {
      m.reply(`❎ ${mssg.buyNan('Diamantes')} ${count} ${unit} de Premium`, null, fwc);
    }
  } else {
    throw `✳️ ${mssg.noItem(usedPrefix)}`;
  }

};
handler.help = ['buy <item>'];
handler.tags = ['econ'];
handler.command = ['buy'];

export default handler;
