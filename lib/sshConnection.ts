import { dbServer } from "./connectMysql";
const fs = require("fs");
const mysql = require("mysql2/promise");
const { Client } = require("ssh2");

// ssh元
const tunnelConfig = {
  username: process.env.SSH_USER,
  port: process.env.SSH_PORT,
  host: process.env.SSH_HOST,
  privateKey: fs.readFileSync("ssh_client.pem").toString(),
};

// ssh先
const forwardConfig = {
  srcHost: "127.0.0.1",
  srcPort: dbServer.port,
  dstHost: dbServer.host,
  dstPort: dbServer.port,
};

export const SSHConnection = new Promise<any>((resolve, reject) => {
  const sshClient = new Client();
  sshClient
    // ssh元に接続した後の処理
    .on("ready", () => {
      // ssh先へ接続
      sshClient.forwardOut(
        forwardConfig.srcHost,
        forwardConfig.srcPort,
        forwardConfig.dstHost,
        forwardConfig.dstPort,
        (err: any, stream: any) => {
          if (err) {
            console.log("error while ssh to db from client");
            console.log(err);
            reject(err);
          }

          // create a new DB server object including stream
          const updatedDbServer = {
            ...dbServer,
            stream,
          };
          // connect to mysql
          const connection = mysql.createConnection(updatedDbServer);
          resolve(connection);
        }
      );
    })
    // ssh元へ接続実行
    .connect(tunnelConfig);
});
