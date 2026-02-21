 
import fs from 'fs'
import archiver from 'archiver'
let handler = async (m, { conn }) => {
    try {
        const filePath = './database.json'
        const zipPath = './database.zip'

        // Leer el tamaño del archivo database.json
        const stats = fs.statSync(filePath)
        const fileSizeInBytes = stats.size

        // Convertir el tamaño a una unidad legible
        let fileSize
        if (fileSizeInBytes < 1024) {
            fileSize = `${fileSizeInBytes} B`
        } else if (fileSizeInBytes < 1024 * 1024) {
            fileSize = `${(fileSizeInBytes / 1024).toFixed(2)} KB`
        } else if (fileSizeInBytes < 1024 * 1024 * 1024) {
            fileSize = `${(fileSizeInBytes / (1024 * 1024)).toFixed(2)} MB`
        } else {
            fileSize = `${(fileSizeInBytes / (1024 * 1024 * 1024)).toFixed(2)} GB`
        }

        // Crear un archivo ZIP
        const output = fs.createWriteStream(zipPath)
        const archive = archiver('zip', { zlib: { level: 9 } })

        archive.pipe(output)
        archive.append(fs.createReadStream(filePath), { name: 'database.json' })
        await archive.finalize()

        // Enviar el archivo comprimido
        m.react(done)
        await conn.sendFile(m.chat, zipPath, 'database.zip', `📂 *Tamaño:* ${fileSize}`, m, null, { mimetype: 'application/zip', asDocument: true })

        // Eliminar el archivo ZIP después de enviarlo
        fs.unlinkSync(zipPath)
    } catch (err) {
        
      m.react(done)
    let sesi = await fs.readFileSync('./database.json')
    return await conn.sendFile(m.chat, sesi, 'database.json' , '', m, null, { mimetype: 'application/json', asDocument: true })
    }
    
}
handler.command = /^(getdb)$/i
handler.rowner = true

export default handler
