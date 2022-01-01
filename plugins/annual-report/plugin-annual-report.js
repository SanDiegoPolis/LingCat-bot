"use strict"
const seedRandom = require("../lib/seed-random");
const { getPermission } = require("../lib/permission");
const help = `
查看年度水群报告
`.trim();

async function annualReport(_bot, data, args = null) {
    if (!await getPermission(data, "年度水群报告")) return;
    if (args?.length === 1 && ["help", '帮助'].indexOf(args?.[0]) !== -1) {
        data.reply(help);
        return;
    } else if (args?.length > 1) {
        return;
    }

    let sender = data.sender.card ? data.sender.card : data.sender.nickname;
    let count = 7299;
    let rank = 'x';
    const count_ARKsanlin = 9258;
    let month_latest = 'x';
    let date_latest = 'x';
    let month_earliest = 'x';
    let date_earliest = 'x';
    let hour_latest = '5';
    let minute_latest = 'x';
    let hour_latest_morning = '6';
    let minute_latest_morning = 'x';
    let hour_earliest = '6';
    let minute_earliest = 'x';

    const seedID = data.user_id + new String(2021);
    let pfmList = [];

    if (count <= 100) pfmList = ['潜海员', '$数据丢失$灵喵喵不认识这个人捏', '不活跃成员会资深会员', '您完全不社交是吗'];
    else if (count <= 500) pfmList = ['水群，到底是一种怎么样的存在', '零元水', '学水群，认识水群，你学会了吗？', '我好不容易水一次群，你却把我伤的这么彻底'];
    else if (count <= 1000) pfmList = [`当年${sender[0]}老师退出文坛我是极力反对的`, '这群保熟吗', 'tnnd！为什么不水！水！'];
    else if (count <= 3000) pfmList = ['喷射战士', '水群你都要卷？', '再水亿句', '你这么水你朋友知道吗？啊对对对'];
    else pfmList = ['汐灵本体', '宁就是天天龙王？', '你上一秒这么水，还是在上秒'];
    const randomNum = seedRandom.getRandomIntInclusive(seedID, 0, pfmList.length - 1);
    let pfm = pfmList[randomNum];

    let replyObj = `${sender} 的年度水群报告(今年只从9.28开始统计)：

    这一年，你一共水了${count}条消息，在群友中排行第${rank}`
    if (rank == 1) replyObj += `，恭迎龙神大人！！！`;
    else if (count >= 100) {
        if (count <= 500) replyObj += `，你水了${(count / 64).toFixed(2)}组消息！`;
        else if (count <= 1000) replyObj += `，足足有${(count / 154).toFixed(2)}倍的官号粉丝`;
        else if (count <= 3000) replyObj += `，大概能达到${(count / 255).toFixed(2)}次附魔上限`;
        else replyObj += `，你水了${(count / count_ARKsanlin).toFixed(2)}个汐灵了，再接再厉！`;
    }
    
    replyObj += `
    ${month_latest}月${date_latest}号，你卷到很晚，${hour_latest}:${minute_latest}还在发消息`;
    if (hour_latest_morning - hour_latest <= 1) replyObj += `，你是直接通宵了吧`;
    replyObj += `
    ${month_earliest}月${date_earliest}号，你${hour_earliest}:${minute_earliest}在群里打卡，你起的真早`;
    if (hour_earliest >= 6 && hour_earliest <= 7) replyObj += `，这天大家都卷不过你`;
    replyObj += `\n
    你的年度喷水形象是：
    ${pfm}`;

    data.reply(replyObj);
}
exports.annualReport = annualReport;