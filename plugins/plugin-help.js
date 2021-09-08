"use strict"
const mongodbUtils = require("../lib/mongodb");
const fs = require("fs");
const path = require("path");
const botNickname = JSON.parse(fs.readFileSync(path.join(__dirname, "../package.json"))).botNickname;
const { getPermission } = require("../lib/permission");
const { _readFileSync } = require("../lib/file");
const permissionDir = path.join(__dirname, "../config-template/config");
const permissionPath = permissionDir + "/permission.json";

async function helpList(data, args) {
    if (!await getPermission(data, "help")) return;
    const gid = String(data.group_id);
    let permission = _readFileSync(permissionDir, "permission");
    let doc = permission[gid];
    let index = 1;

    const header = `
    ===== ${botNickname}功能一览 =====
    `.trim();

    let content = '';
    for (let name in doc) {
        if (!name.startsWith("_")) continue;
        if (doc[name]["help"] !== null) {
            content += `${index++}. <${doc[name]["help"]["cmd"]}> ${doc[name]["help"]["desc"]} ${await getPermission(data, name.slice(1)) ? "" : "(已关闭)"}\n`;
        }
    }
    const end = `有什么建议可以直接通过<-sendsl 消息>联系窝~~`;
    data.reply(`${header}\n${content + end}`);
}
exports.helpList = helpList;