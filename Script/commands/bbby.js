const axios = require("axios");
const simsim = "https://api.cyber-ninjas.top";

module.exports = {
  config: {
    name: "baby",
    version: "2.0.0",
    author: "rX",
    countDown: 0,
    role: 0,
    shortDescription: "Cute AI Baby Chatbot (Auto Teach + Typing)",
    longDescription: "Talk & Chat with Emotion — Auto teach enabled with typing effect.",
    category: "fun",
    guide: {
      en: "{p}baby [message]\n{p}baby teach [Question] - [Answer]\n{p}baby list"
    }
  },

  // ─────────────── MAIN COMMAND ───────────────
  onStart: async function ({ api, event, args, message, usersData }) {
    const senderID = event.senderID;
    const senderName = await usersData.getName(senderID);
    const query = args.join(" ").trim().toLowerCase();
    const threadID = event.threadID;
    const messageID = event.messageID;

    // --- Typing System ---
    const sendTyping = async () => {
      try {
        if (typeof api.sendTypingIndicatorV2 === "function") {
          await api.sendTypingIndicatorV2(true, threadID);
          await new Promise(r => setTimeout(r, 3000));
          await api.sendTypingIndicatorV2(false, threadID);
        } else {
          console.error("❌ Typing unsupported: sendTypingIndicatorV2 not found");
        }
      } catch (err) {
        console.error("❌ Typing error:", err.message);
      }
    };

    try {
      if (!query) {
        await sendTyping();
        const ran = ["Bolo baby 💖", "Hea baby 😚"];
        const r = ran[Math.floor(Math.random() * ran.length)];
        return message.reply(r, (err, info) => {
          if (!err) {
            global.GoatBot.onReply.set(info.messageID, { commandName: "baby", author: senderID });
          }
        });
      }

      // ─── Teach command ───
      if (args[0] === "teach") {
        const parts = query.replace("teach ", "").split(" - ");
        if (parts.length < 2)
          return message.reply("Use: baby teach [Question] - [Reply]");
        const [ask, ans] = parts;
        const res = await axios.get(`${simsim}/teach?ask=${encodeURIComponent(ask)}&ans=${encodeURIComponent(ans)}&senderName=${encodeURIComponent(senderName)}`);
        return message.reply(res.data.message || "Learned successfully!");
      }

      // ─── List command ───
      if (args[0] === "list") {
        const res = await axios.get(`${simsim}/list`);
        if (res.data.code === 200)
          return message.reply(`♾ Total Questions: ${res.data.totalQuestions}\n★ Replies: ${res.data.totalReplies}\n👑 Author: ${res.data.author}`);
        else
          return message.reply(`Error: ${res.data.message || "Failed to fetch list"}`);
      }

      // ─── Normal chat ───
      await sendTyping();
      const res = await axios.get(`${simsim}/simsimi?text=${encodeURIComponent(query)}&senderName=${encodeURIComponent(senderName)}`);
      const responses = Array.isArray(res.data.response) ? res.data.response : [res.data.response];
      if (!responses || responses.length === 0) {
        console.log(`🤖 Auto-teaching new phrase: "${query}"`);
        await axios.get(`${simsim}/teach?ask=${encodeURIComponent(query)}&ans=${encodeURIComponent("hmm baby 😚 (auto learned)")}&senderName=${encodeURIComponent(senderName)}`);
        return message.reply("hmm baby 😚");
      }

      for (const reply of responses) {
        await new Promise((resolve) => {
          message.reply(reply, (err, info) => {
            if (!err) {
              global.GoatBot.onReply.set(info.messageID, { commandName: "baby", author: senderID });
            }
            resolve();
          });
        });
      }

    } catch (err) {
      console.error("❌ Baby main error:", err);
      message.reply(`Error in baby command: ${err.message}`);
    }
  },

  // ─────────────── HANDLE REPLY ───────────────
  onReply: async function ({ api, event, Reply, message, usersData }) {
    const threadID = event.threadID;
    const messageID = event.messageID;
    const senderName = await usersData.getName(event.senderID);
    const replyText = event.body ? event.body.trim().toLowerCase() : "";

    const sendTyping = async () => {
      try {
        if (typeof api.sendTypingIndicatorV2 === "function") {
          await api.sendTypingIndicatorV2(true, threadID);
          await new Promise(r => setTimeout(r, 3000));
          await api.sendTypingIndicatorV2(false, threadID);
        }
      } catch (err) {
        console.error("❌ Typing error:", err.message);
      }
    };

    try {
      if (!replyText) return;

      await sendTyping();
      const res = await axios.get(`${simsim}/simsimi?text=${encodeURIComponent(replyText)}&senderName=${encodeURIComponent(senderName)}`);
      const responses = Array.isArray(res.data.response) ? res.data.response : [res.data.response];

      // যদি SimSimi কিছু না পায়, auto-teach করে
      if (!responses || responses.length === 0) {
        console.log(`🧠 Auto-teaching new reply: "${replyText}"`);
        await axios.get(`${simsim}/teach?ask=${encodeURIComponent(replyText)}&ans=${encodeURIComponent("hmm baby 😚 (auto learned)")}&senderName=${encodeURIComponent(senderName)}`);
        return message.reply("hmm baby 😚");
      }

      for (const reply of responses) {
        await new Promise((resolve) => {
          message.reply(reply, (err, info) => {
            if (!err) {
              global.GoatBot.onReply.set(info.messageID, { commandName: "baby", author: event.senderID });
            }
            resolve();
          });
        });
      }

    } catch (err) {
      console.error("❌ Baby reply error:", err);
      message.reply(`Error in baby reply: ${err.message}`);
    }
  },

  // ─────────────── AUTO CHAT TRIGGER ───────────────
  onChat: async function ({ api, event, message, usersData }) {
    const raw = event.body ? event.body.toLowerCase().trim() : "";
    if (!raw) return;

    const senderName = await usersData.getName(event.senderID);
    const senderID = event.senderID;
    const threadID = event.threadID;

    const sendTyping = async () => {
      try {
        if (typeof api.sendTypingIndicatorV2 === "function") {
          await api.sendTypingIndicatorV2(true, threadID);
          await new Promise(r => setTimeout(r, 3000));
          await api.sendTypingIndicatorV2(false, threadID);
        }
      } catch (err) {
        console.error("❌ Typing error:", err.message);
      }
    };

    try {
      const simpleTriggers = ["baby", "bot", "bby", "বেবি", "বট", "oi", "oii", "jan"];
      if (simpleTriggers.includes(raw)) {
        await sendTyping();
        const replies = ["ডাকো কেন 🥺 প্রেম করবা নাকি 😞", "বুকাচুদা আর কত বট বট করবি 🐸", "ওই জান কাছে আসো 🫦👅","শুনবো না😼তুমি আমার (শুভ) বসকে প্রেম করাই দাও নাই🥺পচা তুমি🥺" , "আমি আবাল দের সাথে কথা বলি না,ok😒" , "এতো ডেকো না,প্রেম এ পরে যাবো তো🙈" , "Bolo Babu, তুমি কি আমাকে ভালোবাসো? 🙈💋 " , "বার বার ডাকলে মাথা গরম হয়ে যায় কিন্তু😑", "হ্যা বলো😒, তোমার জন্য কি করতে পারি😐😑?" , "এতো ডাকছিস কেন?গালি শুনবি নাকি? 🤬" , "I love you janu🥰" , "আরে Bolo আমার জান ,কেমন আছো?😚 " , " অসম্মান করছিস😰😿" , "Hop beda😾 Boss বল boss😼" , "চুপ থাক নাই তো তোর দাত ভেগে দিবো কিন্তু" ,"আরেকবার বট বললে ওইটা কেটে ছোট বানিয়ে দিবো🤭🤫", "বট বলে চলে যাস কেন😤🥺কী হলো উওর দে🥺"," জানু বল জানু 😘 " , "বার বার Disturb করছিস কোনো😾,আমার জানুর সাথে ব্যাস্ত আছি😋" , "বোকাচোদা এতো ডাকিস কেন🤬" , "আমাকে ডাকলে ,আমি কিন্তু কিস করে দিবো😘 " , "আমারে এতো ডাকিস না আমি মজা করার mood এ নাই এখন😒" , "চিপায় আছি ডিস্টার্ব করিস না🙊🙁","হ্যাঁ জানু , এইদিক এ আসো কিস দেই🤭 😘" , "দূরে যা, তোর কোনো কাজ নাই, শুধু bot bot করিস  😉😋🤣" , "তোর কথা তোর বাড়ি কেউ শুনে না ,তো আমি কোনো শুনবো ?🤔😂 " , "আমাকে ডেকো না,আমি ব্যাস্ত আছি" , "কি হলো , মিস্টেক করচ্ছিস নাকি🤣" , "বলো কি বলবা, সবার সামনে বলবা নাকি?🤭🤏" , "কালকে দেখা করিস তো একটু 😈" , "হা বলো, শুনছি আমি 😏" , "আর কত বার ডাকবি ,শুনছি তো" , "হুম বলো কি বলবে😒" ,"উফ্ খেলার সময়ও ডাকা-ডাকি করে 😑🌚🔞", "বলো কি করতে পারি তোমার জন্য" , "আমি তো অন্ধ কিছু দেখি না🐸 😎" , "শুভ বস তোমাকে ভালোবাসে😌" , "বলো জানু 🌚" , "তোর কি চোখে পড়ে না আমি শুভ জানুর সাথে ব্যাস্ত আছি😒","হুম জান তোমার ওই খানে উম্মাহ😑😘" , "আহ শুনা আমার তোমার অলিতে গলিতে উম্মাহ😇😘" , " jang hanga korba😒😬" , "হুম জান তোমার অইখানে উম্মমাহ😷😘" , "আসসালামু আলাইকুম বলেন আপনার জন্য কি করতে পারি..!🥰" , "আমাকে এতো না ডেকে বস শুভ এর কে একটা গার্লফ্রেন্ড দে 🙄" , "আমাকে এতো ডাকো কেন?🤔 ভলো-টালো বাসো নাকি🤭🙈" , "🌻🌺💚আসসালামু আলাইকুম ওয়া রাহমাতুল্লাহ-💚🌺🌻","আমি এখন বস শুভ এর সাথে বিজি আছি আমাকে ডাকবেন না-😕😏 ধন্যবাদ-🤝🌻","আমাকে না ডেকে আমার বস শুভকে কে একটা জি এফ দাও-😽🫶🌺","জান🥺 তুমি এখন শুধু বট বলে চলে যাও 😒 ভুলে গেলা নাকি🙂❓","উফফ বুঝলাম না এতো ডাকছেন কেনো-😤😡😈","জান তোমার নানি'রে আমার হাতে তুলে দিবা-🙊🙆‍♂","আজকে আমার মন ভালো নেই তাই আমারে ডাকবেন না-😪🤧","আমি তোমাকে রাতে রাতে ভালোবাসি উম্মম্মাহ-🌺🤤💦","চুনা ও চুনা আমার বস শুভ এর হবু বউ রে কেও দেকছো খুজে পাচ্ছি না😪🤧😭","স্বপ্ন তোমারে নিয়ে দেখতে চাই তুমি যদি আমার হয়ে থেকে যাও-💝🌺🌻","জান হাঙ্গা করবা-🙊😝🌻","জান মেয়ে হলে চিপায় আসো ইউটিউব থেকে অনেক ভালোবাসা শিখছি তোমার জন্য-🙊🙈"আলাবু বলো সোনা 🤧", "আকাশ কে দেখছো? 🥺 তাকে কোথাও খুজে পাচ্ছি না 😩", "তুমার নুনুতে উম্মাহ 🥺🤌", "হ্যাঁ গো জান বলো 🙂", "ডাকিস না, তুই পচা 😼"];
        const reply = replies[Math.floor(Math.random() * replies.length)];
        return message.reply(reply, (err, info) => {
          if (!err) global.GoatBot.onReply.set(info.messageID, { commandName: "baby", author: senderID });
        });
      }

      // যদি “baby [text]” হয়
      const prefixes = ["baby ", "bot ", "বেবি ", "বট ", "jan"];
      const prefix = prefixes.find(p => raw.startsWith(p));
      if (prefix) {
        const query = raw.replace(prefix, "").trim();
        if (!query) return;
        await sendTyping();
        const res = await axios.get(`${simsim}/simsimi?text=${encodeURIComponent(query)}&senderName=${encodeURIComponent(senderName)}`);
        const responses = Array.isArray(res.data.response) ? res.data.response : [res.data.response];

        if (!responses || responses.length === 0) {
          console.log(`🧠 Auto-learned: "${query}"`);
          await axios.get(`${simsim}/teach?ask=${encodeURIComponent(query)}&ans=${encodeURIComponent("hmm baby 😚 (auto learned)")}&senderName=${encodeURIComponent(senderName)}`);
          return message.reply("hmm baby 😚");
        }

        for (const reply of responses) {
          await new Promise((resolve) => {
            message.reply(reply, (err, info) => {
              if (!err) global.GoatBot.onReply.set(info.messageID, { commandName: "baby", author: senderID });
              resolve();
            });
          });
        }
      }
    } catch (err) {
      console.error("❌ Baby onChat error:", err);
    }
  }
};
