
const {
  useMultiFileAuthState,
  DisconnectReason,
  fetchLatestBaileysVersion, 
  MessageRetryMap,
  makeCacheableSignalKeyStore, 
  jidNormalizedUser,
  PHONENUMBER_MCC
 } = await import('@whiskeysockets/baileys')
import moment from 'moment-timezone'
import NodeCache from 'node-cache'
import readline from 'readline'
import qrcode from "qrcode"
import crypto from 'crypto'
import fs from "fs"
import pino from 'pino';
import * as ws from 'ws';
const { CONNECTING } = ws
import { Boom } from '@hapi/boom'
import { makeWASocket } from '../lib/simple.js';

if (global.conns instanceof Array) console.log()
else global.conns = []

let handler = async (m, { conn: _conn, args, usedPrefix, command, isOwner }) => {

let parent = args[0] && args[0] == 'plz' ? _conn : await global.conn
if (!((args[0] && args[0] == 'plz') || (await global.conn).user.jid == _conn.user.jid)) {
  throw `📌 ${mssg.nobbot}\n\n wa.me/${global.conn.user.jid.split`@`[0]}?text=${usedPrefix}botclone`
}

  let userBot = global.db.data.users[m.sender]
  //=====
async function bbts() {

let authFolderB
let nameR = `senna_${crypto.randomBytes(10).toString('base64').replace(/[^a-zA-Z]/g, '').toUpperCase().slice(0, 6)}`

if (args[0] && args[0].length > 1700) {
  let decodedData = Buffer.from(args[0], "base64").toString("utf-8")
  authFolderB = nameR
  fs.mkdirSync("./bebots/"+ authFolderB, { recursive: true })
  fs.writeFileSync(`./bebots/${authFolderB}/creds.json`, decodedData)
} else if (args[0] && fs.existsSync("./bebots/" + args[0])) {
  authFolderB = args[0]
  if (!fs.existsSync(`./bebots/${authFolderB}/creds.json`)) {
      fs.rmdirSync(`./bebots/${authFolderB}`, { recursive: true })
      authFolderB = nameR
      fs.mkdirSync("./bebots/"+ authFolderB, { recursive: true })
  }
} else {
  authFolderB = nameR
  fs.mkdirSync("./bebots/"+ authFolderB, { recursive: true })
}

//--
const {state, saveState, saveCreds} = await useMultiFileAuthState(`./bebots/${authFolderB}`)
const msgRetryCounterMap = (MessageRetryMap) => { };
const msgRetryCounterCache = new NodeCache()
const {version} = await fetchLatestBaileysVersion();
let phoneNumber = m.sender.split('@')[0]

const methodCodeQR = process.argv.includes("qr")
const methodCode = !!phoneNumber || process.argv.includes("code")
const MethodMobile = process.argv.includes("mobile")

const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
const question = (texto) => new Promise((resolver) => rl.question(texto, resolver))

const connectionOptions = {
logger: pino({ level: 'silent' }),
printQRInTerminal: false,
mobile: MethodMobile, 
//browser: ['Chrome (Linux)', '', ''],
browser: [ "Ubuntu", "Chrome", "20.0.04" ], //-- si el código para conectar sale error cambie al de arriba v:
auth: {
creds: state.creds,
keys: makeCacheableSignalKeyStore(state.keys, pino({ level: "fatal" }).child({ level: "fatal" })),
},
markOnlineOnConnect: true, 
generateHighQualityLinkPreview: true, 
getMessage: async (clave) => {
let jid = jidNormalizedUser(clave.remoteJid)
let msg = await store.loadMessage(jid, clave.id)
return msg?.message || ""
},
msgRetryCounterCache,
msgRetryCounterMap,
defaultQueryTimeoutMs: undefined,   
version
}

//--
let conn = makeWASocket(connectionOptions)

if (methodCode && !conn.authState.creds.registered) {
  if (!phoneNumber) {
      //parent.sendMessage(m.chat, { text: `✴️ Su número de teléfono no está definido` }, { quoted: m })
      process.exit(0);
  }
  let cleanedNumber = phoneNumber.replace(/[^0-9]/g, '');
  if (!Object.keys(PHONENUMBER_MCC).some(v => cleanedNumber.startsWith(v))) {
      //parent.sendMessage(m.chat, { text: `✴️ Su número debe comenzar con el código de país` }, { quoted: m })
      process.exit(0);
  }

  setTimeout(async () => {
      let codeBot = await conn.requestPairingCode(cleanedNumber);
      codeBot = codeBot?.match(/.{1,4}/g)?.join("-") || codeBot;
      //parent.sendMessage(m.chat, { text: `➤ Code: *${codeBot}*\n\n${mssg.botqr}` }, { quoted: m })
      parent.sendFile(m.chat, 'https://i.ibb.co/SKKdvRb/code.jpg', 'qrcode.png', `➤ Code: *${codeBot}*\n\n${mssg.botqr}`, m)
      //parent.sendButton2(m.chat, `➤ Code: *${codeBot}*\n\n${mssg.botqr}`, mssg.ig, 'https://i.ibb.co/SKKdvRb/code.jpg', [], codeBot, null, m)
      rl.close();
  }, 3000);
}

conn.isInit = false

//---new
let isInit = true

async function connectionUpdate(update) {
  const { connection, lastDisconnect, isNewLogin, qr } = update
  if (isNewLogin) conn.isInit = true
  // scan qr
 /* if (qr) {
    let scan = await parent.sendFile(m.chat, await qrcode.toDataURL(qr, { scale: 8 }), 'qrcode.png', `${mssg.botqr}`, m)
setTimeout(() => {
  parent.sendMessage(m.chat, { delete: scan.key })
}, 50000) //50 segundos
}*/

  const code = lastDisconnect?.error?.output?.statusCode || lastDisconnect?.error?.output?.payload?.statusCode;
      if (code && code !== DisconnectReason.loggedOut && conn?.ws.socket == null) {
    let i = global.conns.indexOf(conn)
    if (i < 0) return console.log(await creloadHandler(true).catch(console.error))
    delete global.conns[i]
    global.conns.splice(i, 1)

   if (code !== DisconnectReason.connectionClosed){ 
      //parent.sendMessage(conn.user.jid, {text : `⚠️ ${mssg.recon}`}, { quoted: m }) //reconectar
  } else {
      parent.sendMessage(m.chat, {text : `⛔ ${mssg.sesClose}`}, { quoted: m }) // session cerrada
  }
  }
  //----
  if (global.db.data == null) loadDatabase()

  if (connection == 'open') {

      userBot.namebebot = authFolderB
      userBot.isbebot = true

  conn.isInit = true
  global.conns.push(conn)
  await parent.sendMessage(m.chat, {text : args[0] ? `✅ ${mssg.connet}` : `✅ ${mssg.connID}`}, { quoted: m })
  await sleep(5000)
  if (args[0]) return
      await parent.sendMessage(conn.user.jid, {text : `✅ ${mssg.connMsg}`}, { quoted: m })
      parent.sendMessage(conn.user.jid, {text : `${usedPrefix + command} ${authFolderB}`}, { quoted: m })
    }

}


setInterval(async () => {
  if (!conn.user) {
    try { conn.ws.close() } catch { }
    conn.ev.removeAllListeners()
    let i = global.conns.indexOf(conn)
    if (i < 0) return
    delete global.conns[i]
    global.conns.splice(i, 1)
  }}, 60000)

//-- reconectar sub-bots
setInterval(async () => {
  console.log("🔄 Revisando conexiones de bots...");

  for (let [jid, user] of Object.entries(global.db.data.users)) {
      if (!user.isbebot || !user.namebebot) continue; // Solo bots activos

      let botFolder = `./bebots/${user.namebebot}`;
      let credsPath = `${botFolder}/creds.json`;

      // Verificar si el archivo creds.json existe
      if (!fs.existsSync(credsPath)) {
          console.log(`⚠️ No se encontró creds.json para ${user.namebebot}`);
          continue;
      }

      // Buscar si el bot ya está en global.conns y está funcionando
      let existingConn = global.conns.find(c => c.user && c.user.id === jid);
      if (existingConn && existingConn.ws && existingConn.ws.readyState === 1) {
          console.log(`✅ Bot ${user.namebebot} ya está conectado.`);
          continue; // No necesita reconexión
      }

      // Si el bot no está conectado, proceder con la reconexión
      console.log(`🔄 Reconectando bot ${user.namebebot}...`);

      try {
          // Cerrar la conexión anterior si existía y estaba fallando
          if (existingConn) {
              try { existingConn.ws.close(); } catch (err) {}
              global.conns = global.conns.filter(c => c !== existingConn);
          }

          const { state, saveCreds } = await useMultiFileAuthState(botFolder);

          let newConn = makeWASocket({
              logger: pino({ level: "silent" }),
              printQRInTerminal: false,
              auth: {
                  creds: state.creds,
                  keys: makeCacheableSignalKeyStore(state.keys, pino({ level: "fatal" }).child({ level: "fatal" }))
              },
              version: (await fetchLatestBaileysVersion()).version,
              markOnlineOnConnect: true
          });

          // Manejar eventos
          newConn.ev.on("creds.update", saveCreds);
          newConn.ev.on("connection.update", async (update) => {
              const { connection, lastDisconnect } = update;
              if (connection === "open") {
                  console.log(`✅ Bot ${user.namebebot} reconectado y activo.`);
              } else if (connection === "close") {
                  console.log(`⚠️ Bot ${user.namebebot} se desconectó.`);
                  let code = lastDisconnect?.error?.output?.statusCode;
                  if (code !== DisconnectReason.loggedOut) {
                      console.log(`🔄 Intentando reconectar ${user.namebebot}...`);
                      global.conns = global.conns.filter(c => c !== newConn);
                  }
              }
          });

          // Asignar eventos para que el bot responda a comandos
          let handler = await import("../handler.js");
          newConn.handler = handler.handler.bind(newConn);
          newConn.ev.on("messages.upsert", newConn.handler);
          newConn.ev.on("group-participants.update", handler.participantsUpdate.bind(newConn));
          newConn.ev.on("groups.update", handler.groupsUpdate.bind(newConn));
          //newConn.ev.on("message.delete", handler.deleteUpdate.bind(newConn));
          

          global.conns.push(newConn); // Agregar la nueva conexión
      } catch (err) {
          console.error(`❌ Error al reconectar ${user.namebebot}:`, err);
      }
  }
}, 900000); //cada 15 minutos

//---

  
let handler = await import('../handler.js')
let creloadHandler = async function (restatConn) {
try {
const Handler = await import(`../handler.js?update=${Date.now()}`).catch(console.error)
if (Object.keys(Handler || {}).length) handler = Handler
} catch (e) {
console.error(e)
}
if (restatConn) {
try { conn.ws.close() } catch { }
conn.ev.removeAllListeners()
conn = makeWASocket(connectionOptions)
isInit = true
}

if (!isInit) {
conn.ev.off('messages.upsert', conn.handler)
conn.ev.off('group-participants.update', conn.participantsUpdate)
conn.ev.off('groups.update', conn.groupsUpdate)
//conn.ev.off('message.delete', conn.onDelete)
conn.ev.off('call', conn.onCall)
conn.ev.off('connection.update', conn.connectionUpdate)
conn.ev.off('creds.update', conn.credsUpdate)
}

conn.welcome = global.conn.welcome + ''
conn.bye = global.conn.bye + ''
conn.spromote = global.conn.spromote + ''
conn.sdemote = global.conn.sdemote + ''

conn.handler = handler.handler.bind(conn)
conn.participantsUpdate = handler.participantsUpdate.bind(conn)
conn.groupsUpdate = handler.groupsUpdate.bind(conn)
//conn.onDelete = handler.deleteUpdate.bind(conn)
conn.connectionUpdate = connectionUpdate.bind(conn)
conn.credsUpdate = saveCreds.bind(conn, true)

conn.ev.on('messages.upsert', conn.handler)
conn.ev.on('group-participants.update', conn.participantsUpdate)
conn.ev.on('groups.update', conn.groupsUpdate)
//conn.ev.on('message.delete', conn.onDelete)
conn.ev.on('connection.update', conn.connectionUpdate)
conn.ev.on('creds.update', conn.credsUpdate)
isInit = false
return true
}
creloadHandler(false)
}
bbts()

}
handler.help = ['botclone']
handler.tags = ['bebot']
handler.command = ['bebot', 'serbot', 'jadibot', 'botclone', 'clonebot']
handler.rowner = false

export default handler

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
