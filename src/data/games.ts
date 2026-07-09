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
  },
  'cc1': {
    id: 'cc1',
    title: {
      [Language.EN]: "Credit Card Combat",
      [Language.ZH_HK]: "信用卡格鬥",
      [Language.ZH_CN]: "信用卡格斗"
    },
    intro: {
      [Language.EN]: "You just got your first credit card with a HK$5,000 limit. Use it wisely, or the interest will fight back!",
      [Language.ZH_HK]: "你剛拿到人生第一張信用卡，額度係5,000港元。用得精明啲，否則利息隨時反咬你一口！",
      [Language.ZH_CN]: "你刚拿到人生第一张信用卡，额度是5,000港元。用得聪明点，不然利息随时反咬你一口！"
    },
    totalSteps: 3,
    steps: {
      's1': {
        id: 's1',
        image: '📱',
        text: {
          [Language.EN]: "Your phone screen just shattered. A new flagship costs HK$6,000 — over your limit. A friend suggests a HK$1,500 refurbished phone instead. What do you do?",
          [Language.ZH_HK]: "你部手機個screen爆咗。買部新旗艦機要6,000港元，超過你嘅信用卡額度。朋友建議你買部1,500港元嘅翻新機。你點做？",
          [Language.ZH_CN]: "你的手机屏幕碎了。买部新旗舰机要6,000港元，超过你的信用卡额度。朋友建议你买部1,500港元的翻新机。你怎么做？"
        },
        choices: [
          {
            text: { [Language.EN]: "Ask for a credit limit increase and buy the flagship", [Language.ZH_HK]: "申請提高信用額度，買旗艦機", [Language.ZH_CN]: "申请提高信用额度，买旗舰机" },
            nextStepId: 's2',
            feedback: { [Language.EN]: "Approved! But you're now starting the month deeper in debt than you can handle.", [Language.ZH_HK]: "批准咗！但你而家一開波已經債台高築。", [Language.ZH_CN]: "批准了！但你现在一开始就债台高筑。" },
            scoreDelta: -60
          },
          {
            text: { [Language.EN]: "Buy the HK$1,500 refurbished phone instead", [Language.ZH_HK]: "買嗰部1,500港元嘅翻新機", [Language.ZH_CN]: "买那部1,500港元的翻新机" },
            nextStepId: 's2',
            feedback: { [Language.EN]: "Smart! You stayed within budget and kept your limit healthy.", [Language.ZH_HK]: "精明！你冇超支，仲保住個信用額度健康。", [Language.ZH_CN]: "聪明！你没有超支，还保住了信用额度健康。" },
            scoreDelta: 20
          }
        ]
      },
      's2': {
        id: 's2',
        image: '🧾',
        text: {
          [Language.EN]: "Your monthly statement arrives: minimum payment HK$150, or pay the full balance. Interest on unpaid balances is 32% a year. What do you do?",
          [Language.ZH_HK]: "月結單到咗：最低還款額150港元，定係還晒成筆數。未還嘅結餘年利率高達32%。你點做？",
          [Language.ZH_CN]: "月结单到了：最低还款额150港元，或者还清全部。未还的余额年利率高达32%。你怎么做？"
        },
        choices: [
          {
            text: { [Language.EN]: "Just pay the minimum payment", [Language.ZH_HK]: "淨係還最低還款額", [Language.ZH_CN]: "只还最低还款额" },
            nextStepId: 's3',
            feedback: { [Language.EN]: "You pay less today, but that leftover balance keeps racking up expensive interest.", [Language.ZH_HK]: "今日還少咗，但剩低嘅結餘會不斷㩒利息，好貴㗎！", [Language.ZH_CN]: "今天还得少，但剩下的余额会不断累积高额利息！" },
            scoreDelta: -50
          },
          {
            text: { [Language.EN]: "Pay the full balance to avoid interest", [Language.ZH_HK]: "還晒成筆數，避免利息", [Language.ZH_CN]: "还清全部余额，避免利息" },
            nextStepId: 's3',
            feedback: { [Language.EN]: "Great habit! Paying in full means zero interest charges.", [Language.ZH_HK]: "好習慣！還晒錢即係零利息。", [Language.ZH_CN]: "好习惯！还清全部就是零利息。" },
            scoreDelta: 30
          }
        ]
      },
      's3': {
        id: 's3',
        image: '🛍️',
        text: {
          [Language.EN]: "At checkout, an app offers \"0% interest, pay in 4 installments\" for a HK$2,000 gadget you don't really need. What do you do?",
          [Language.ZH_HK]: "埋單嗰陣，個app提議你用「0利息，分4期」買個2,000港元、你其實唔係好需要嘅gadget。你點做？",
          [Language.ZH_CN]: "结账的时候，app提议你用\"0利息，分4期\"买个2,000港元、你其实不太需要的小玩意。你怎么做？"
        },
        choices: [
          {
            text: { [Language.EN]: "Buy it — it's 0% interest anyway!", [Language.ZH_HK]: "買啦，反正0利息！", [Language.ZH_CN]: "买吧，反正0利息！" },
            nextStepId: 'lose',
            feedback: { [Language.EN]: "Even at 0%, buying things you don't need adds up — and miss a payment, hidden late fees kick in.", [Language.ZH_HK]: "就算0利息，買唔需要嘅嘢一樣使錢；如果唔記得還，仲有隱藏遲交罰款！", [Language.ZH_CN]: "就算是0利息，买不需要的东西一样花钱；忘记还款的话，还有隐藏的逾期罚款！" },
            scoreDelta: -70
          },
          {
            text: { [Language.EN]: "Skip it — you don't need it right now", [Language.ZH_HK]: "唔買，而家其實唔需要", [Language.ZH_CN]: "不买，现在其实不需要" },
            nextStepId: 'win',
            feedback: { [Language.EN]: "Nice self-control! You avoided an unnecessary installment trap.", [Language.ZH_HK]: "自制力一流！你避開咗一個唔必要嘅分期陷阱。", [Language.ZH_CN]: "自制力一流！你避开了一个不必要的分期陷阱。" },
            scoreDelta: 40
          }
        ]
      }
    }
  }
};
