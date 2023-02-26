import mysql from "mysql2/promise";
import { Client } from "ssh2";
import { dbServer } from "@/const/dbConfig";

// ssh元
const tunnelConfig = {
  username: process.env.SSH_USER ?? "",
  port: parseInt(process.env.SSH_PORT ?? "0"),
  host: process.env.SSH_HOST ?? "",
  privateKey: process.env.SSH_KEY?.replaceAll("\\n", "\n") ?? "",
};

// ssh先
const forwardConfig = {
  srcHost: "127.0.0.1",
  srcPort: dbServer.port,
  dstHost: dbServer.host,
  dstPort: dbServer.port,
};

export const SSHConnection = async (): Promise<mysql.Pool | undefined> => {
  const sshPromise = new Promise<mysql.Pool>((resolve, reject) => {
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
            const connection = mysql.createPool(updatedDbServer);
            resolve(connection);
          }
        );
      });
    // ssh元へ接続実行
    sshClient.connect(tunnelConfig);
  });

  try {
    return await sshPromise;
  } catch (err) {
    console.log(err);
    return;
  }
};
