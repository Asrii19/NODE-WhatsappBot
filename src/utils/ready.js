const config = require("./config");
const mensajeReady = async (client) => {
  try {
    // Obtener la lista de chats
    const chats = await client.getChats();
    // Buscar el grupo por nombre
    const grupo = chats.find(
      (chat) => chat.isGroup && chat.name === config.nombreChat
    );
    if (grupo) {
      // Enviar un mensaje de texto al grupo encontrado
      client.sendMessage(grupo.id._serialized,config.msgChat);
    } else {
      console.log("No se encontró el grupo con el nombre proporcionado.");
    }
  } catch (error) {
    console.error("Error al buscar el grupo:", error);
  }
};
module.exports = {
    mensajeReady,
}