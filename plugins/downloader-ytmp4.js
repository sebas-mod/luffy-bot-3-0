import fetch from 'node-fetch'
import yts from 'yt-search'

let handler = async (m, { conn, command, text, usedPrefix }) => {
  if (!text) throw m.reply(`✧ Ejemplo: ${usedPrefix}${command} https://youtube.com/watch?v=gR3nlpwRTRA`);

 await conn.sendMessage(m.chat, { react: { text: '🕒', key: m.key }})

    let results = await yts(text);
    let tes = results.videos[0]

  const args = text.split(' ');
  const videoUrl = args[0];
  
  const apiUrl = `https://www.apis-anomaki.zone.id/downloader/ytv?url=${encodeURIComponent(tes.url)}`;

  try {
    const respuesta = await fetch(apiUrl);
    const keni = await respuesta.json()
    const { url, qualityLabel, fps } = keni.result.formats[0];
    const { title } = keni.result;

    if (!url) throw m.reply('No hay respuesta de la api.');


    const caption = `
      *💮 PLAY VIDEO 💮*
 
  ✧ : \`titulo;\` ${tes.title || 'no encontrado'}
  ✧ : \`duracion;\` ${tes.duration || 'no encontrado'}
  ✧ : \`calidad;\` ${qualityLabel || 'no encontrado'}
  ✧ : \`fps;\` ${fps || 'no encontrado'}
 
> ${wm}
> Pedido de @${m.sender.split('@')[0]}`;

//await conn.sendMessage(m.chat, { document: { url: url }, caption: caption, mimetype: 'video/mp4', fileName: `${title}` + `.mp4`}, {quoted: m })

    await conn.sendMessage(m.chat, {
      video: { url: url },
      mimetype: "video/mp4",
      fileName: title,
      caption: wm,
      mentions: [m.sender]
    }, { quoted: m });
await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key }})

  } catch (error) {
    console.error(`Error: ${error.message}`);
    await conn.sendMessage(m.chat, { react: { text: '❎', key: m.key }})
  }
};

handler.help = ['ytmp4 *<link>*','ytv *<link>*'];
handler.tags = ['downloader'];
handler.command = /^(ytmp4|ytv|ytvideo)$/i;

handler.register = true
handler.disable = false

export default handler