import { GameScenario, Language } from '../types';

export const GAMES: Record<string, GameScenario> = {
  'm1': {
    id: 'm1',
    title: {
      [Language.EN]: "The Campus Tycoon",
      [Language.ZH_HK]: "校園大亨",
      [Language.ZH_CN]: "校园大亨"
    },
    intro: {
      [Language.EN]: "Welcome to your first semester! You have HK$5,000 to survive the month. Every choice matters.",
      [Language.ZH_HK]: "歡迎來到你的第一個學期！你有5,000港元來度過這個月。每一個選擇都至關重要。",
      [Language.ZH_CN]: "欢迎来到你的第一个学期！你有5,000港元来度过这个月。每一个选择都至关重要。"
    },
    totalSteps: 2,
    steps: {
      's1': {
        id: 's1',
        text: {
          [Language.EN]: "Your friends are going to a fancy cafe in Causeway Bay. It costs HK$300. What do you do?",
          [Language.ZH_HK]: "你的朋友們正要去銅鑼灣的一家高級咖啡館。費用是300港元。你怎麼辦？",
          [Language.ZH_CN]: "你的朋友正要去铜锣湾的一家高级咖啡馆。费用是300港元。你怎么办？"
        },
        choices: [
          {
            text: { [Language.EN]: "Go with them", [Language.ZH_HK]: "跟他們一起去", [Language.ZH_CN]: "跟他们一起去" },
            nextStepId: 's2',
            feedback: { [Language.EN]: "It was fun, but your wallet is lighter!", [Language.ZH_HK]: "很有趣，但你的錢包變輕了！", [Language.ZH_CN]: "很有趣，但你的钱包变轻了！" },
            scoreDelta: -300
          },
          {
            text: { [Language.EN]: "Suggest a cheaper canteen meal", [Language.ZH_HK]: "建議去食堂吃便宜點", [Language.ZH_CN]: "建议去食堂吃便宜点" },
            nextStepId: 's2',
            feedback: { [Language.EN]: "Good choice! You saved HK$250.", [Language.ZH_HK]: "明智的選擇！你節省了250港元。", [Language.ZH_CN]: "明智的选择！你节省了250港元。" },
            scoreDelta: -50
          }
        ]
      },
      's2': {
        id: 's2',
        text: {
          [Language.EN]: "You need a new textbook. A new one is HK$500, a second-hand one is HK$150.",
          [Language.ZH_HK]: "你需要一本新教科書。新的要500港元，二手只要150港元。",
          [Language.ZH_CN]: "你需要一本新教科书。新的要500港元，二手只要150港元。"
        },
        choices: [
          {
            text: { [Language.EN]: "Buy new", [Language.ZH_HK]: "買新的", [Language.ZH_CN]: "买新的" },
            nextStepId: 'win',
            feedback: { [Language.EN]: "Shiny and new, but expensive!", [Language.ZH_HK]: "又新又漂亮，但很貴！", [Language.ZH_CN]: "又新又漂亮，但很贵！" },
            scoreDelta: -500
          },
          {
            text: { [Language.EN]: "Buy second-hand", [Language.ZH_HK]: "買二手的", [Language.ZH_CN]: "买二手的" },
            nextStepId: 'win',
            feedback: { [Language.EN]: "Smart move! It works just as well.", [Language.ZH_HK]: "聰明的舉動！它同樣好用。", [Language.ZH_CN]: "聪明的举动！它同样好用。" },
            scoreDelta: -150
          }
        ]
      }
    }
  }
};
