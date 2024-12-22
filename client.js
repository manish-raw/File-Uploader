import net from "net";
import fs from "node:fs/promises";

const socket = net.createConnection({ host: "::1", port: 5050 }, async () => {
  const filePath = "./text.txt";
  const fileHandle = await fs.open(filePath, "r");
  const fileStream = fileHandle.createReadStream();

  fileStream.on("data", (data) => {
    socket.write(data);
  });

  fileStream.on("end", () => {
    console.log("The file was successfully uploaded");
    socket.end();
  });
});
