
import * as cheerio from 'cheerio';
import fetch from 'node-fetch';
let handler = async (m, { conn, args, text, usedPrefix, command, isOwner, isPrems }) => {
   
if (!global.db.data.chats[m.chat].nsfw) throw `🚫 ${mssg.gpNsfw(usedPrefix)}`    
 if (!text) throw `✳️ ${mssg.notext}`   
m.react(done)
    try {
            let result = await phSearch(text)
            let caption = result.map((i, index) => {
                return `
📌 *${mssg.title}:* ${i.title}
*Subido por:* ${i.uploader}
👀 *${mssg.views}:* ${i.views}
⌚ *${mssg.duration}:* ${i.duration} 
🔗 *${mssg.link}:* ${i.link} `;
              }).join("\n_____________________\n");
              await m.reply(caption)
              } catch (e) {
              m.reply(`🔴 ${mssg.error}`)
               }
            
}

handler.command = ["pornhub"]

export default handler

async function phSearch(query) {
  const response = await fetch(`https://www.pornhub.com/video/search?search=${query}`);
  const html = await response.text();
  const $ = cheerio.load(html);
  
  const videoList = [];

  $('li[data-video-segment]').each((index, element) => {
    const $element = $(element);
    
    const link = $element.find('.title a').attr('href').trim();
    const title = $element.find('.title a').text().trim();
    const uploader = $element.find('.videoUploaderBlock a').text().trim();
    const views = $element.find('.views').text().trim().replace('views', '');
    const duration = $element.find('.duration').text().trim();
    
    const videoData = {
      link: "https://www.pornhub.com" + link,
      title: title,
      uploader: uploader,
      views: views,
      duration: duration
    };
    
    videoList.push(videoData);
  });
  
  return videoList;
}
