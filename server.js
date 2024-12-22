import net from "net";
import fs from "node:fs/promises";

const server = net.createServer();

let fileHandle, fileStream;

server.on("connection", (socket) => {
  console.log("Connection made");

  socket.on("data", async (data) => {
    fileHandle = await fs.open(`Storage/test.txt`, "w");
    fileStream = fileHandle.createWriteStream();
    fileStream.write(data);
  });

  socket.on("end", () => {
    console.log("connection ended");
    fileHandle.close();
  });
});

server.listen(5050, "::1", ()=>{
    console.log(`Server is running on `, server.address());
})