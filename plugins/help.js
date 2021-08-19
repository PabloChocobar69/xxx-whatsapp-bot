const fs = require("fs");
const path = require("path");
const data = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../data/help.json"))
);
const { MessageType } = require("@adiwajshing/baileys");
const { text } = MessageType;

const help = (infor4, client, xxx3,syntax) =>
  new Promise((resolve, reject) => {
    let infor5 = { ...infor4 };
    let xxx = { ...xxx3 };
    arg = infor5.arg;
    from = infor5.from;
    prefix = infor5.groupdata.prefix;
    useprefix = infor5.groupdata.useprefix;
    var msg;
    c = prefix == undefined ? "```Not needed in inbox```" : useprefix ? prefix : "```Disabled```";
    if (prefix == undefined || !useprefix) prefix = "🎀";

    if (arg.length == 1) {
      cas = infor5.number === process.env.OWNER_NUMBER ?
        "🚧 *Owner only* :\n```dl :         Change daily limit,\ndgl :       Change daily group limit,\nmgs :     Minimum group size,\nsql :        Database query,\nmdr :      Add bot moderators,\nrestart : Restart the bot```\n\n"
        : "";

      const grpcmds = infor5.groupdata == 0 ?"":"👑 *Group Admin* :\n```groupinfo, promote, demote, kick, grouplink, botleave, setprefix, prefix, autosticker, close, open, tagall, ban, unban, banlist, filterabuse, botaccess```\n\n";
      msg =
        "🤖🤖🤖  *XXX 🤖 BOT*  🤖🤖🤖\n\n💡 *Prefix:*  " +
        c +
      "\n\n" +
        "📗 *General* :\n ```help, faq, limit, delete, sourcecode```\n\n" +
      grpcmds+
      "📱 *Media* :\n```sticker, rs, ytv, shorturl, run, crypto, market, pin, rashmika```\n\n" +
       cas+
        "🎁 *For detailed info :*\n" +
        prefix +
        "```help <command>```\n\n" +
        "🚄 *Example* :\n" +
        prefix + "help crypto\n" +
        prefix + "help shorturl\n"+ 
        prefix + "help sticker\n"+
        prefix + "help autosticker\n"+
       prefix + "help run\n" +
      "\n📃 *Bot Updates* :" +
      "\n‼️ _NSFW detection added_"+
      "\n‼️ _groupinfo added_"+
      "\n‼️ _New feature added for coders_ - *run*, see detailed info on how to use it."

      client.sendMessage(from, msg, text, {
        quoted: xxx,
      });
      resolve();
    } else {

      try {
        msg =
          syntax == undefined ? "🔖 *Description* :\n" +
          data[arg[1]].desc : "‼️ *Error* :\n```syntax error in the given command.```";
        msg += "\n\n" +
          "📕 *Usage* :\n" +
          prefix + "```" +
          data[arg[1]].usage +
          "```" +
          "\n\n" +
          "📚 *Example* :\n";
          data[arg[1]].eg.forEach(currentItem => {
            msg += "```" + prefix + currentItem + "```" + "\n";
          });
        client.sendMessage(from, msg, text, {
          quoted: xxx,
          detectLinks: false

        });
        resolve();
      } catch (e) {
        client.sendMessage(
          from,
          "🤖 ```No such command:``` " + arg[1],
          text,
          {
            quoted: xxx,
          }
        );
        resolve();
      }
    }
  });
module.exports.help = help;