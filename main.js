const {session} = require("./src/client");

const client = session();
client.initialize();
