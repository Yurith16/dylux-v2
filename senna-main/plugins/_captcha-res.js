 
let handler = m => m;
handler.before = async function (m) {
    if (!/^-?[0-9]+(\.[0-9]+)?$/.test(m.text)) return !0;
    //if (!m.quoted || !m.quoted.fromMe || !m.text || !/^🤖 CAPTCHA/i.test(m.quoted.text)) return !0
    this.captchaCodes = this.captchaCodes ? this.captchaCodes : {}
    let capt = Object.values(this.captchaCodes).find(capt => capt.code && capt.time && [capt.id].includes(m.sender))
     if (!capt || capt.id != m.sender) return //m.reply(`🧩 No puedes responder este *captcha* por que no es para tí`)
     if (m.sender == capt.id && m.text == capt.code) {
            clearTimeout(this.time);
            delete this.captchaCodes[capt.id];
            m.reply(`✅ ¡Bienvenido al grupo!`)
        
    }
    
    return !0;
};

export default handler
