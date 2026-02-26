import { Module, Language, ModulePage } from '../types';

// --- CONFIGURATION INTERFACE ---

interface ModuleContentConfig {
  id: string;
  topicEn: string;
  topicHk: string;
  topicCn: string;
  chaptersEn: string[];
  chaptersHk: string[];
  chaptersCn: string[];
  highlightsEn: string[]; // Must be 6 items
  highlightsHk: string[]; // Must be 6 items
  highlightsCn: string[]; // Must be 6 items
}

// --- CONTENT GENERATOR ---

// --- CONTENT DICTIONARY (Partial for common topics) ---
const TOPIC_EXPLANATIONS: Record<string, { [key in Language]: string }> = {
  "Why Goals Matter": {
    [Language.EN]: "Setting financial goals gives you a roadmap for your money. Without a destination, you're just driving aimlessly. Goals help you prioritize spending and keep you motivated during tough times.",
    [Language.ZH_HK]: "設定理財目標能為你的金錢提供路線圖。沒有目的地，你只是在漫無目的地駕駛。目標能幫助你優先處理開支，並在困難時期保持動力。",
    [Language.ZH_CN]: "设定理财目标能为你的金钱提供路线图。没有目的地，你只是在漫无目的地驾驶。目标能帮助你优先处理开支，并在困难时期保持动力。"
  },
  "SMART Framework": {
    [Language.EN]: `
# Teaching Note: SMART Framework
## Introduction
The SMART framework is the gold standard for goal setting in personal finance. For students, it transforms vague desires like "I want to save money" into concrete, actionable plans. In the context of Hong Kong's competitive environment, being "SMART" with your goals is what separates successful savers from those who constantly wonder where their money went.

## Key Principles (S.M.A.R.T.)
1. **Specific:** Your goal must be clear. Instead of "Save money," say "Save for a new laptop."
2. **Measurable:** You need a number. "Save $5,000" is measurable; "Save a lot" is not.
3. **Achievable:** Be realistic. If you only earn $2,000 a month from a part-time job, saving $10,000 in two months is not achievable.
4. **Relevant:** Does this goal matter to you? Saving for a car might not be relevant if you live next to an MTR station and have no parking.
5. **Time-bound:** Set a deadline. "By December 31st" creates urgency.

## Practical Examples in Hong Kong
Imagine a student at HKU who wants to go on an exchange program.
- **Vague Goal:** "Save for exchange."
- **SMART Goal:** "Save HK$30,000 for my exchange trip to London by July 2027 by saving HK$1,000 every month from my tutoring income and cutting down on weekend high-tea."

## Common Pitfalls
Many students set goals that are too ambitious, leading to burnout. Others forget the "Time-bound" aspect, so they keep pushing the goal further into the future. In HK, the temptation to spend on "limited edition" items can often derail even the smartest goals if they aren't reviewed weekly.

## Summary
A SMART goal is a contract with your future self. Write it down, put it on your desk, and track your progress every month using your banking app's "Savings Goal" feature.
    `.trim(),
    [Language.ZH_HK]: `
# 教學筆記：SMART 框架
## 引言
SMART 框架是個人理財目標設定的黃金標準。對於學生來說，它將「我想存錢」等模糊的願望轉化為具體、可執行的計劃。在香港競爭激烈的環境中，對目標保持「SMART」是區分成功儲蓄者與那些不斷納悶錢去哪兒了的人的關鍵。

## 核心原則 (S.M.A.R.T.)
1. **具體 (Specific)：** 目標必須清晰。不要說「存錢」，而要說「為買新電腦存錢」。
2. **可衡量 (Measurable)：** 你需要一個數字。「存 5,000 元」是可衡量的；「存很多錢」則不是。
3. **可達成 (Achievable)：** 要現實。如果你兼職每月只賺 2,000 元，要在兩個月內存 10,000 元是不現實的。
4. **相關性 (Relevant)：** 這個目標對你重要嗎？如果你住在地鐵站旁邊且沒有車位，為買車存錢可能並不相關。
5. **有時限 (Time-bound)：** 設定截止日期。「在 12 月 31 日之前」會產生緊迫感。

## 香港實際案例
想像一位想參加交換生計劃的港大學生。
- **模糊目標：** 「為交換生計劃存錢。」
- **SMART 目標：** 「在 2027 年 7 月之前，通過每月從補習收入中存入 1,000 元並減少週末下午茶開支，為倫敦交換生之旅存夠 30,000 港元。」

## 常見陷阱
許多學生設定了過於宏大的目標，導致精疲力竭。其他人則忘記了「有時限」這一點，因此不斷將目標推向未來。在香港，如果沒有每週檢視目標，「限量版」物品的誘惑往往會讓最聰明的目標也偏離軌道。

## 總結
SMART 目標是與未來的自己簽訂的契約。把它寫下來，放在書桌上，並每月使用銀行 App 的「儲蓄目標」功能追蹤進度。
    `.trim(),
    [Language.ZH_CN]: `
# 教学笔记：SMART 框架
## 引言
SMART 框架是个人理财目标设定的黄金标准。对于学生来说，它将“我想存钱”等模糊的愿望转化为具体、可执行的计划。在香港竞争激烈的环境中，对目标保持“SMART”是区分成功储蓄者与那些不断纳闷钱去哪儿了的人的关键。

## 核心原则 (S.M.A.R.T.)
1. **具体 (Specific)：** 目标必须清晰。不要说“存钱”，而要说“为买新电脑存钱”。
2. **可衡量 (Measurable)：** 你需要一个数字。“存 5,000 元”是可衡量的；“存很多钱”则不是。
3. **可达成 (Achievable)：** 要现实。如果你兼职每月只赚 2,000 元，要在两个月内存 10,000 元是不现实的。
4. **相关性 (Relevant)：** 这个目标对你重要吗？如果你住在地铁站旁边且没有车位，为买车存钱可能并不相关。
5. **有时限 (Time-bound)：** 设定截止日期。“在 12 月 31 日之前”会产生紧迫感。

## 香港实际案例
想象一位想参加交换生计划的港大学生。
- **模糊目标：** “为交换生计划存钱。”
- **SMART 目标：** “在 2027 年 7 月之前，通过每月从补习收入中存入 1,000 元并减少周末下午茶开支，为伦敦交换生之旅存够 30,000 港元。”

## 常见陷阱
许多学生设定了过于宏大的目标，导致精疲力竭。其他人则忘记了“有时限”这一点，因此不断将目标推向未来。在香港，如果没有每周检视目标，“限量版”物品的诱惑往往会让最聪明的目标也偏离轨道。

## 总结
SMART 目标是与未来的自己签订的契约。把它写下来，放在书桌上，并每月使用银行 App 的“储蓄目标”功能追踪进度。
    `.trim()
  },
  "The 50/30/20 Rule": {
    [Language.EN]: `
# Teaching Note: The 50/30/20 Rule
## Introduction
The 50/30/20 rule is a simple yet powerful budgeting framework designed to help individuals manage their after-tax income. For students in Hong Kong, where the cost of living—especially dining and entertainment—can be extremely high, this rule provides a clear boundary for spending and saving.

## Key Principles
The rule divides your income into three distinct categories:
1. **50% for Needs:** These are essential expenses you cannot avoid. For a student, this might include your MTR/bus fares, basic mobile plan, and essential meals (canteen food).
2. **30% for Wants:** These are lifestyle choices. This includes that weekend movie, a fancy dinner at a cafe in Causeway Bay, or a new pair of sneakers.
3. **20% for Savings/Debt:** This is your future fund. It goes toward your emergency fund, investing in stocks/ETFs, or paying off student loans early.

## Practical Examples in Hong Kong
Suppose you earn HK$6,000 a month from an internship.
- **Needs (HK$3,000):** MTR fares ($800), basic meals ($1,800), mobile bill ($400).
- **Wants (HK$1,800):** Netflix/Spotify ($150), 2-3 dinners with friends ($1,000), hobby/shopping ($650).
- **Savings (HK$1,200):** Put directly into a high-yield savings account or a monthly stock investment plan.

## Common Pitfalls
The biggest challenge for HK students is the "Wants" category. With so many shopping malls and trendy restaurants, it's easy for "Wants" to consume 50% or 60% of your income. Another pitfall is ignoring the "Savings" part until the end of the month. The secret is to **"Pay Yourself First"**—move that 20% to your savings account as soon as you get paid.

## Summary
The 50/30/20 rule is a guideline, not a law. If your needs are lower because you live with parents, you might increase your savings to 40%. The goal is to build a habit of conscious spending that lasts a lifetime.
    `.trim(),
    [Language.ZH_HK]: `
# 教學筆記：50/30/20 法則
## 引言
50/30/20 法則是個簡單而強大的預算框架，旨在幫助個人管理稅後收入。對於香港學生來說，生活成本（尤其是餐飲和娛樂）可能非常高，這條法則為支出和儲蓄提供了清晰的界限。

## 核心原則
該法則將你的收入分為三個不同的類別：
1. **50% 用於「需要」：** 這些是你無法避免的基本開支。對於學生來說，這可能包括地鐵/巴士車費、基本電話月費和基本膳食（食堂飯菜）。
2. **30% 用於「想要」：** 這些是生活方式的選擇。這包括週末的電影、在銅鑼灣咖啡館的精緻晚餐或一雙新波鞋。
3. **20% 用於「儲蓄/債務」：** 這是你的未來基金。它用於應急基金、投資股票/ETF 或提早償還學生貸款。

## 香港實際案例
假設你實習每月賺取 6,000 港元。
- **需要 (3,000 港元)：** 地鐵車費 ($800)、基本膳食 ($1,800)、電話費 ($400)。
- **想要 (1,800 港元)：** Netflix/Spotify ($150)、與朋友吃 2-3 次晚飯 ($1,000)、愛好/購物 ($650)。
- **儲蓄 (1,200 港元)：** 直接存入高息儲蓄戶口或每月股票投資計劃。

## 常見陷阱
香港學生面臨的最大挑戰是「想要」類別。商場和潮流餐廳林立，很容易讓「想要」佔據你收入的 50% 或 60%。另一個陷阱是直到月底才考慮「儲蓄」部分。秘訣是**「先支付給自己」**——一出糧就將那 20% 轉入你的儲蓄戶口。

## 總結
50/30/20 法則是個指南，而不是法律。如果你因為與父母同住而需求較低，你可能會將儲蓄增加到 40%。目標是建立一種持續終生的自覺消費習慣。
    `.trim(),
    [Language.ZH_CN]: `
# 教学笔记：50/30/20 法则
## 引言
50/30/20 法则是一个简单而强大的预算框架，旨在帮助个人管理税后收入。对于香港学生来说，生活成本（尤其是餐饮和娱乐）可能非常高，这条法则为支出和储蓄提供了清晰的界限。

## 核心原则
该法则将你的收入分为三个不同的类别：
1. **50% 用于“需要”：** 这些是你无法避免的基本开支。对于学生来说，这可能包括地铁/巴士车费、基本电话月费和基本膳食（食堂饭菜）。
2. **30% 用于“想要”：** 这些是生活方式的选择。这包括周末的电影、在铜锣湾咖啡馆的精致晚餐或一双新运动鞋。
3. **20% 用于“储蓄/债务”：** 这是你的未来基金。它用于应急基金、投资股票/ETF 或提早偿还学生贷款。

## 香港实际案例
假设你实习每月赚取 6,000 港元。
- **需要 (3,000 港元)：** 地铁车费 ($800)、基本膳食 ($1,800)、电话费 ($400)。
- **想要 (1,800 港元)：** Netflix/Spotify ($150)、与朋友吃 2-3 次晚饭 ($1,000)、爱好/购物 ($650)。
- **储蓄 (1,200 港元)：** 直接存入高息储蓄账户或每月股票投资计划。

## 常见陷阱
香港学生面临的最大挑战是“想要”类别。商场和潮流餐厅林立，很容易让“想要”占据你收入的 50% 或 60%。另一个陷阱是直到月底才考虑“储蓄”部分。秘诀是**“先支付给自己”**——一发工资就将那 20% 转入你的储蓄账户。

## 总结
50/30/20 法则是一个指南，而不是法律。如果你因为与父母同住而需求较低，你可能会将储蓄增加到 40%。目标是建立一种持续终身的自觉消费习惯。
    `.trim()
  },
  "Credit Cards Explained": {
    [Language.EN]: `
# Teaching Note: Credit Cards Explained
## Introduction
Credit cards are one of the most misunderstood financial tools. In Hong Kong, banks aggressively market credit cards to university students with attractive welcome offers and cash rebates. However, without proper knowledge, a credit card can quickly turn from a convenient payment tool into a lifelong debt burden.

## Key Principles
1. **Credit is a Loan:** When you use a credit card, you are borrowing money from the bank. It is not "free money."
2. **The Grace Period:** Most cards offer a 50-60 day interest-free period. If you pay the **Full Statement Balance** by the due date, you pay zero interest.
3. **The Interest Trap:** If you only pay the "Minimum Payment," the remaining balance will be charged interest at an extremely high rate (often 30% to 36% APR).
4. **Credit Score (TU):** Your behavior with credit cards is reported to TransUnion (TU). A good score helps you get lower interest rates on mortgages later in life.

## Practical Examples in Hong Kong
Imagine you spend HK$5,000 on a new phone using a credit card.
- **Scenario A (Responsible):** You pay the full HK$5,000 when the bill arrives. Result: You get credit card points/rebates and pay $0 interest.
- **Scenario B (The Trap):** You only pay the HK$250 minimum payment. Result: The remaining HK$4,750 starts accruing interest at 30% APR. It could take years to pay off that one phone.

## Common Pitfalls
1. **Cash Advances:** Never use a credit card to withdraw cash from an ATM. Interest starts immediately and fees are high.
2. **Welcome Gift Temptation:** Getting a card just for a free suitcase or headphones without understanding the annual fee or spending requirements.
3. **Overspending:** Spending more than you have in your bank account because you "don't have to pay yet."

## Summary
A credit card is a tool for convenience and building a credit history. **Rule of Thumb:** Never charge anything to your credit card that you cannot afford to pay off in full with the cash currently in your bank account.
    `.trim(),
    [Language.ZH_HK]: `
# 教學筆記：信用卡詳解
## 引言
信用卡是最容易被誤解的理財工具之一。在香港，銀行會通過吸引人的迎新禮品和現金回贈，向大學生積極推銷信用卡。然而，如果缺乏相關知識，信用卡很快就會從方便的支付工具變成終身的債務負擔。

## 核心原則
1. **信貸即貸款：** 當你使用信用卡時，你是在向銀行借錢。這不是「免費的金錢」。
2. **免息期：** 大多數信用卡提供 50-60 天的免息期。如果你在到期日前支付**全額結單欠款**，你無需支付任何利息。
3. **利息陷阱：** 如果你只支付「最低還款額」，剩餘的欠款將按極高的利率（通常年利率為 30% 至 36%）計算利息。
4. **信貸評分 (TU)：** 你的信用卡使用行為會報告給環聯 (TransUnion)。良好的評分有助於你日後申請按揭時獲得更低的利率。

## 香港實際案例
假設你使用信用卡購買了一部價值 5,000 港元的新手機。
- **情境 A（負責任）：** 當賬單寄到時，你支付全額 5,000 港元。結果：你獲得信用卡積分/回贈，且支付 0 元利息。
- **情境 B（陷阱）：** 你只支付 250 港元的最低還款額。結果：剩餘的 4,750 港元開始按 30% 的年利率計算利息。償還這部手機的欠款可能需要數年時間。

## 常見陷阱
1. **現金透支：** 絕不要使用信用卡從 ATM 提取現金。利息會立即開始計算，且手續費很高。
2. **迎新禮品誘惑：** 僅為了免費行李箱或耳機而申請信用卡，卻不了解年費或簽賬要求。
3. **過度消費：** 因為「還不需要付款」而花費超過你銀行賬戶存款的金額。

## 總結
信用卡是用於方便和建立信貸紀錄的工具。**經驗法則：** 絕不要用信用卡購買任何你目前銀行賬戶中的現金無法全額支付的物品。
    `.trim(),
    [Language.ZH_CN]: `
# 教学笔记：信用卡详解
## 引言
信用卡是最容易被误解的理财工具之一。在香港，银行会通过吸引人的迎新礼品和现金回赠，向大学生积极推销信用卡。然而，如果缺乏相关知识，信用卡很快就会从方便的支付工具变成终身的债务负担。

## 核心原则
1. **信贷即贷款：** 当你使用信用卡时，你是在向银行借钱。这不是“免费的金钱”。
2. **免息期：** 大多数信用卡提供 50-60 天的免息期。如果你在到期日前支付**全额结单欠款**，你无需支付任何利息。
3. **利息陷阱：** 如果你只支付“最低还款额”，剩余的欠款将按极高的利率（通常年利率为 30% 至 36%）计算利息。
4. **信贷评分 (TU)：** 你的信用卡使用行为会报告给环联 (TransUnion)。良好的评分有助于你日后申请按揭时获得更低的利率。

## 香港实际案例
假设你使用信用卡购买了一部价值 5,000 港元的新手机。
- **情境 A（负责任）：** 当账单寄到时，你支付全额 5,000 港元。结果：你获得信用卡积分/回赠，且支付 0 元利息。
- **情境 B（陷阱）：** 你只支付 250 港元的最低还款额。结果：剩余的 4,750 港元开始按 30% 的年利率计算利息。偿还这部手机的欠款可能需要数年时间。

## 常见陷阱
1. **现金透支：** 绝不要使用信用卡从 ATM 提取现金。利息会立即开始计算，且手续费很高。
2. **迎新礼品诱惑：** 仅为了免费行李箱或耳机而申请信用卡，却不了解年费或签账要求。
3. **过度消费：** 因为“还不需要付款”而花费超过你银行账户存款的金额。

## 总结
信用卡是用于方便和建立信贷纪录的工具。**经验法则：** 绝不要用信用卡购买任何你目前银行账户中的现金无法全额支付的物品。
    `.trim()
  },
  "MPF Overview": {
    [Language.EN]: `
# Teaching Note: MPF Overview
## Introduction
The Mandatory Provident Fund (MPF) is a compulsory saving scheme for the retirement of residents in Hong Kong. For many students, their first encounter with MPF happens when they start a part-time job or an internship. While it might seem like a "tax" that reduces your take-home pay, it is actually your own money being saved for your future.

## Key Principles
1. **Mandatory Contributions:** Most employees and employers are each required to contribute 5% of the employee's relevant income to an MPF scheme.
2. **Relevant Income:** For most people, this includes wages, bonuses, and commissions. There are minimum and maximum income levels for contributions.
3. **Vesting:** Your contributions and your employer's mandatory contributions are "fully vested" in you immediately.
4. **Preservation:** MPF benefits must be preserved until you reach the retirement age of 65, with very few exceptions (like permanent departure from HK).

## Practical Examples in Hong Kong
Imagine you have a part-time job at a local cafe earning HK$8,000 a month.
- **Your Contribution:** HK$400 (5%) will be deducted from your salary.
- **Employer Contribution:** Your boss must also contribute HK$400 (5%) to your MPF account.
- **Total Saved:** HK$800 is invested every month into funds you choose. Over 40 years of a career, this compounding can be significant.

## Common Pitfalls
1. **Ignoring Fund Choice:** Many students leave their money in the "Default Investment Strategy" (DIS) or a "Conservative Fund" without checking if it matches their long-term goals.
2. **Losing Track of Accounts:** Every time you change part-time jobs, you might end up with a new MPF account. If you don't "consolidate" them, you might lose track of your money and pay multiple sets of fees.
3. **High Fees:** Not all MPF funds are created equal. Some have much higher management fees than others, which can eat into your long-term returns.

## Summary
MPF is your long-term retirement partner. Even as a student, take 10 minutes to log into your MPF provider's portal. Check which funds you are invested in and consider consolidating your accounts if you have more than one.
    `.trim(),
    [Language.ZH_HK]: `
# 教學筆記：強積金 (MPF) 概覽
## 引言
強制性公積金（強積金/MPF）是為香港居民退休而設的強制性儲蓄計劃。對於許多學生來說，他們第一次接觸強積金是在開始兼職工作或實習時。雖然它看起來像是一種減少你實收薪水的「稅收」，但實際上它是為你未來儲蓄的屬於你自己的錢。

## 核心原則
1. **強制性供款：** 大多數僱員及其僱主均須各按僱員有關入息的 5% 向強積金計劃供款。
2. **有關入息：** 對於大多數人來說，這包括工資、獎金和佣金。供款設有最低和最高入息水平。
3. **歸屬：** 你的供款和僱主的強制性供款會立即「完全歸屬」於你。
4. **保存：** 強積金累算權益必須保存至你達到 65 歲的退休年齡，極少數情況（如永久離開香港）除外。

## 香港實際案例
假設你在一家本地咖啡館兼職，每月賺取 8,000 港元。
- **你的供款：** 將從你的薪水中扣除 400 港元 (5%)。
- **僱主供款：** 你的老闆也必須向你的強積金戶口供款 400 港元 (5%)。
- **總儲蓄：** 每月有 800 港元投入你選擇的基金中。在 40 年的職業生涯中，這種複息效應可能非常顯著。

## 常見陷阱
1. **忽視基金選擇：** 許多學生將錢留在「預設投資策略」(DIS) 或「保守基金」中，而沒有檢查它是否符合他們的長期目標。
2. **失去戶口紀錄：** 每次更換兼職工作，你都可能得到一個新的強積金戶口。如果你不「整合」它們，你可能會失去對金錢的追蹤，並支付多套費用。
3. **高昂費用：** 並非所有強積金基金都是一樣的。有些基金的管理費比其他基金高得多，這會侵蝕你的長期回報。

## 總結
強積金是你長期的退休夥伴。即使是學生，也請花 10 分鐘登錄你的強積金受託人門戶網站。檢查你投資了哪些基金，如果你有多個戶口，請考慮進行整合。
    `.trim(),
    [Language.ZH_CN]: `
# 教学笔记：强积金 (MPF) 概览
## 引言
强制性公积金（强积金/MPF）是为香港居民退休而设的强制性储蓄计划。对于许多学生来说，他们第一次接触强积金是在开始兼职工作或实习时。虽然它看起来像是一种减少你实收薪水的“税收”，但实际上它是为你未来储蓄的属于你自己的钱。

## 核心原则
1. **强制性供款：** 大多数雇员及其雇主均须各按雇员有关入息的 5% 向强积金计划供款。
2. **有关入息：** 对于大多数人来说，这包括工资、奖金和佣金。供款设有最低和最高入息水平。
3. **归属：** 你的供款和雇主的强制性供款会立即“完全归属”于你。
4. **保存：** 强积金累算权益必须保存至你达到 65 岁的退休年龄，极少数情况（如永久离开香港）除外。

## 香港实际案例
假设你在一家本地咖啡馆兼职，每月赚取 8,000 港元。
- **你的供款：** 将从你的薪水中扣除 400 港元 (5%)。
- **雇主供款：** 你的老板也必须向你的强积金账户供款 400 港元 (5%)。
- **总储蓄：** 每月有 800 港元投入你选择的基金中。在 40 年的职业生涯中，这种复利效应可能非常显著。

## 常见陷阱
1. **忽视基金选择：** 许多学生将钱留在“默认投资策略”(DIS) 或“保守基金”中，而没有检查它是否符合他们的长期目标。
2. **失去账户记录：** 每次更换兼职工作，你都可能得到一个新的强积金账户。如果你不“整合”它们，你可能会失去对金钱的追踪，并支付多套费用。
3. **高昂费用：** 并非所有强积金基金都是一样的。有些基金的管理费比其他基金高得多，这会侵蚀你的长期回报。

## 总结
强积金是你长期的退休伙伴。即使是学生，也请花 10 分钟登录你的强积金受托人门户网站。检查你投资了哪些基金，如果你有多个账户，请考虑进行整合。
    `.trim()
  },
  "Student Loans": {
    [Language.EN]: `
# Teaching Note: Student Loans in Hong Kong
## Introduction
For many students in Hong Kong, government loans are the first major debt they will ever carry. While these loans enable you to pursue higher education, they are still a legal obligation that must be repaid. Understanding the difference between a "Grant" and a "Loan" and the terms of repayment is essential for your post-graduation financial health.

## Key Principles
1. **TSFS (Grant & Loan):** The Tertiary Student Finance Scheme is means-tested. It provides grants for tuition and academic expenses, and low-interest loans for living expenses.
2. **NLSPS (Non-means-tested):** The Non-means-tested Loan Scheme is available to most students regardless of family income. It has a higher interest rate than TSFS because it is not subsidized.
3. **Interest Calculation:** Interest usually starts accruing as soon as the loan is disbursed or upon graduation, depending on the scheme.
4. **Repayment Period:** Repayment typically starts 1-2 years after graduation and can last up to 15 years.

## Practical Examples in Hong Kong
Imagine you take an NLSPS loan of HK$42,100 per year for a 4-year degree.
- **Total Principal:** HK$168,400.
- **Interest Rate:** Suppose it's 2.4% per annum.
- **Repayment:** Upon graduation, you might have to pay around HK$1,200 to HK$1,500 per month for 15 years. This is a significant fixed expense that you must factor into your first "real" budget.

## Common Pitfalls
1. **Treating Loans as "Income":** Using student loan money for luxury items, travel, or expensive meals instead of tuition and essential living costs.
2. **Ignoring the Interest:** Not realizing that interest on NLSPS loans accumulates while you are still studying.
3. **Missing Payments:** Failing to update your contact information with the Student Finance Office (SFO) and missing repayment notices, which can lead to surcharges and a damaged credit score.

## Summary
Student loans are an investment in your human capital. They are "good debt" if used wisely. However, you should only borrow what you absolutely need. Keep a record of your total debt and use the SFO's online calculator to estimate your future monthly repayments.
    `.trim(),
    [Language.ZH_HK]: `
# 教學筆記：香港學生貸款
## 引言
對於許多香港學生來說，政府貸款是他們承擔的第一筆重大債務。雖然這些貸款讓你能夠追求高等教育，但它們仍然是必須償還的法律義務。了解「資助」(Grant) 與「貸款」(Loan) 之間的區別以及還款條款，對於你畢業後的財務健康至關重要。

## 核心原則
1. **TSFS（資助及貸款）：** 本地專上學生資助計劃是需經過入息審查的。它提供學費及學習開支資助，以及用於生活開支的低息貸款。
2. **NLSPS（免入息審查）：** 全日制大專學生免入息審查貸款計劃適用於大多數學生，無論家庭收入如何。它的利率比 TSFS 高，因為它沒有補貼。
3. **利息計算：** 利息通常在貸款發放時或畢業後開始計算，具體取決於計劃。
4. **還款期：** 還款通常在畢業後 1-2 年開始，最長可達 15 年。

## 香港實際案例
假設你每年申請 42,100 港元的 NLSPS 貸款，修讀 4 年制學位。
- **總本金：** 168,400 港元。
- **利率：** 假設年利率為 2.4%。
- **還款：** 畢業後，你可能需要在 15 年內每月支付約 1,200 至 1,500 港元。這是一項重大的固定開支，你必須將其納入你的第一份「真實」預算中。

## 常見陷阱
1. **將貸款視為「收入」：** 將學生貸款用於購買奢侈品、旅遊或昂貴餐飲，而不是學費和基本生活開支。
2. **忽視利息：** 沒有意識到 NLSPS 貸款的利息在你讀書期間就已經在累積。
3. **錯過還款：** 未能向學生資助處 (SFO) 更新你的聯絡資料並錯過還款通知，這可能導致附加費並損害你的信貸評分。

## 總結
學生貸款是對你人力資本的投資。如果運用得當，它們是「好債」。然而，你應該只借取你絕對需要的金額。記錄你的總債務，並使用 SFO 的網上計算機估算你未來的每月還款額。
    `.trim(),
    [Language.ZH_CN]: `
# 教学笔记：香港学生贷款
## 引言
对于许多香港学生来说，政府贷款是他们承担的第一笔重大债务。虽然这些贷款让你能够追求高等教育，但它们仍然是必须偿还的法律义务。了解“资助”(Grant) 与“贷款”(Loan) 之间的区别以及还款条款，对于你毕业后的财务健康至关重要。

## 核心原则
1. **TSFS（资助及贷款）：** 本地专上学生资助计划是需经过入息审查的。它提供学费及学习开支资助，以及用于生活开支的低息贷款。
2. **NLSPS（免入息审查）：** 全日制大专学生免入息审查贷款计划适用于大多数学生，无论家庭收入如何。它的利率比 TSFS 高，因为它没有补贴。
3. **利息计算：** 利息通常在贷款发放时或毕业后开始计算，具体取决于计划。
4. **还款期：** 还款通常在毕业后 1-2 年开始，最长可达 15 年。

## 香港实际案例
假设你每年申请 42,100 港元的 NLSPS 贷款，修读 4 年制学位。
- **总本金：** 168,400 港元。
- **利率：** 假设年利率为 2.4%。
- **还款：** 毕业后，你可能需要在 15 年内每月支付约 1,200 至 1,500 港元。这是一项重大的固定开支，你必须将其纳入你的第一份“真实”预算中。

## 常见陷阱
1. **将贷款视为“收入”：** 将学生贷款用于购买奢侈品、旅游或昂贵餐饮，而不是学费和基本生活开支。
2. **忽视利息：** 没有意识到 NLSPS 贷款的利息在你读书期间就已经在累积。
3. **错过还款：** 未能向学生资助处 (SFO) 更新你的联络资料并错过还款通知，这可能导致附加费并损害你的信贷评分。

## 总结
学生贷款是对你人力资本的投资。如果运用得当，它们是“好债”。然而，你应该只借取你绝对需要的金额。记录你的总债务，并使用 SFO 的网上计算器估算你未来的每月还款额。
    `.trim()
  },
  "The Emergency Fund": {
    [Language.EN]: `
# Teaching Note: The Emergency Fund
## Introduction
An emergency fund is your financial safety net. In Hong Kong's high-cost environment, unexpected events like a medical emergency, a sudden laptop repair, or a gap between jobs can be financially devastating. An emergency fund provides peace of mind and prevents you from falling into high-interest debt when life happens.

## Key Principles
1. **Liquidity:** The money must be easily accessible. A high-yield savings account is ideal. Do not lock it in a long-term fixed deposit or stocks.
2. **Size:** Aim for 3 to 6 months of essential living expenses. For a student, this might be a smaller amount, like HK$10,000 to HK$20,000.
3. **Purpose:** It is ONLY for true emergencies. A "limited edition" sneaker drop or a last-minute trip to Japan is NOT an emergency.
4. **Replenishment:** If you use it, your top priority should be to refill it as soon as possible.

## Practical Examples in Hong Kong
Suppose you are a student living in a hostel. Your monthly expenses are HK$4,000.
- **Target Fund:** HK$12,000 to HK$24,000.
- **The Emergency:** Your laptop, which you need for your final year project, suddenly dies. The repair cost is HK$3,500.
- **The Solution:** You use your emergency fund. You don't need to ask for a high-interest loan or stress about how to pay for it. You then save HK$500 a month for the next 7 months to replenish the fund.

## Common Pitfalls
1. **Not Having One:** Thinking "it won't happen to me."
2. **Investing the Fund:** Putting your emergency money into volatile stocks. If the market crashes at the same time you have an emergency, you'll be forced to sell at a loss.
3. **Scope Creep:** Using the fund for "emergencies" that are actually just unplanned "wants."

## Summary
Start small. Even saving HK$200 a month toward your emergency fund is a great start. Once you reach your target, you will feel a significant reduction in financial stress, knowing that you are prepared for whatever Hong Kong life throws at you.
    `.trim(),
    [Language.ZH_HK]: `
# 教學筆記：應急基金
## 引言
應急基金是你的財務安全網。在香港高生活成本的環境中，醫療緊急情況、突然的電腦維修或工作空窗期等意外事件可能會在財務上造成沉重打擊。應急基金能讓你安心，並防止你在生活中遇到意外時陷入高息債務。

## 核心原則
1. **流動性：** 資金必須易於提取。高息儲蓄戶口是理想之選。不要將其鎖定在長期定期存款或股票中。
2. **規模：** 目標是儲備 3 至 6 個月的必要生活費。對於學生來說，這可能是一個較小的金額，例如 10,000 至 20,000 港元。
3. **用途：** 它「僅」用於真正的緊急情況。「限量版」波鞋發售或最後一刻決定的日本之旅「不是」緊急情況。
4. **補充：** 如果你動用了它，你的首要任務應該是盡快重新填滿它。

## 香港實際案例
假設你是一名住在宿舍的學生，每月開支為 4,000 港元。
- **目標基金：** 12,000 至 24,000 港元。
- **緊急情況：** 你畢業論文所需的電腦突然壞了，維修費用為 3,500 港元。
- **解決方案：** 你動用應急基金。你不需要申請高息貸款，也不需要為如何支付而感到壓力。然後，你在接下來的 7 個月內每月存入 500 港元以補充基金。

## 常見陷阱
1. **完全沒有：** 認為「這種事不會發生在我身上」。
2. **將基金用於投資：** 將應急資金投入波動較大的股票。如果市場在你遇到緊急情況時崩盤，你將被迫虧本出售。
3. **範圍蔓延：** 將基金用於實際上只是未經計劃的「想要」的「緊急情況」。

## 總結
從小處開始。即使每月為應急基金存入 200 港元也是一個很好的開始。一旦達到目標，你會感到財務壓力顯著減輕，因為你知道自己已經為香港生活中的任何意外做好了準備。
    `.trim(),
    [Language.ZH_CN]: `
# 教学笔记：应急基金
## 引言
应急基金是你的财务安全网。在香港高生活成本的环境中，医疗紧急情况、突然的电脑维修或工作空窗期等意外事件可能会在财务上造成沉重打击。应急基金能让你安心，并防止你在生活中遇到意外时陷入高息债务。

## 核心原则
1. **流动性：** 资金必须易于提取。高息储蓄账户是理想之选。不要将其锁定在长期定期存款或股票中。
2. **规模：** 目标是储备 3 至 6 个月的必要生活费。对于学生来说，这可能是一个较小的金额，例如 10,000 至 20,000 港元。
3. **用途：** 它“仅”用于真正的紧急情况。“限量版”运动鞋发售或最后一刻决定的日本之旅“不是”紧急情况。
4. **补充：** 如果你动用了它，你的首要任务应该是尽快重新填满它。

## 香港实际案例
假设你是一名住在宿舍的学生，每月开支为 4,000 港元。
- **目标基金：** 12,000 至 24,000 港元。
- **紧急情况：** 你毕业论文所需的电脑突然坏了，维修费用为 3,500 港元。
- **解决方案：** 你动用应急基金。你不需要申请高息贷款，也不需要为如何支付而感到压力。然后，你在接下来的 7 个月内每月存入 500 港元以补充基金。

## 常见陷阱
1. **完全没有：** 认为“这种事不会发生在我身上”。
2. **将基金用于投资：** 将应急资金投入波动较大的股票。如果市场在你遇到紧急情况时崩盘，你将被迫亏本出售。
3. **范围蔓延：** 将基金用于实际上只是未经计划的“想要”的“紧急情况”。

## 总结
从小处开始。即使每月为应急基金存入 200 港元也是一个很好的开始。一旦达到目标，你会感到财务压力显著减轻，因为你知道自己已经为香港生活中的任何意外做好了准备。
    `.trim()
  },
  "Compound Interest Magic": {
    [Language.EN]: `
# Teaching Note: Compound Interest Magic
## Introduction
Albert Einstein famously called compound interest the "eighth wonder of the world." For a student in Hong Kong, understanding this concept is the single most important step toward long-term wealth. It is the process where the value of an investment increases because the earnings on an investment, both principal and interest, earn interest as time passes.

## Key Principles
1. **The Time Factor:** The earlier you start, the more time your money has to grow. Time is more important than the amount you invest.
2. **The Rate of Return:** A higher interest rate or investment return will accelerate the compounding effect.
3. **Consistency:** Regular contributions (like a monthly investment plan) maximize the power of compounding.
4. **Patience:** Compounding starts slow but grows exponentially in the later years.

## Practical Examples in Hong Kong
Consider two students, Alex and Bella.
- **Alex** starts saving HK$1,000 a month at age 20. He stops at age 30 (10 years total).
- **Bella** starts saving HK$1,000 a month at age 30 and continues until age 60 (30 years total).
- **The Result:** Assuming a 7% annual return, Alex will likely have more money at age 60 than Bella, even though he invested much less total capital. This is because Alex's money had an extra 10 years to compound.

## Common Pitfalls
1. **Starting Too Late:** Thinking "I'll wait until I earn more" is the biggest mistake. Even HK$100 a month started at age 18 is better than HK$1,000 a month started at age 40.
2. **Withdrawing Early:** Every time you take money out of your investment account, you "reset" the compounding clock.
3. **Ignoring Fees:** High management fees on investment funds can significantly eat into your compounded returns over decades.

## Summary
Compound interest is a snowball. It starts small and moves slowly, but as it rolls down the hill of time, it becomes unstoppable. Start your "snowball" today, even if it's just a small amount in a low-cost index fund or a high-yield savings account.
    `.trim(),
    [Language.ZH_HK]: `
# 教學筆記：複息效應的魔力
## 引言
愛因斯坦曾有名言稱複息為「世界第八大奇蹟」。對於香港學生來說，理解這個概念是邁向長期財富最重要的一步。複息是指投資價值增加的過程，因為投資產生的收益（包括本金和利息）隨著時間推移也會產生利息。

## 核心原則
1. **時間因素：** 越早開始，你的錢就有越多的時間增長。時間比你投資的金額更重要。
2. **回報率：** 較高的利率或投資回報會加速複息效應。
3. **持之以恆：** 定期供款（如每月投資計劃）能發揮複息的最大威力。
4. **耐心：** 複息開始時很慢，但在後期會呈指數級增長。

## 香港實際案例
考慮兩位學生，Alex 和 Bella。
- **Alex** 從 20 歲開始每月存 1,000 港元，到 30 歲停止（共 10 年）。
- **Bella** 從 30 歲開始每月存 1,000 港元，一直持續到 60 歲（共 30 年）。
- **結果：** 假設年回報率為 7%，Alex 在 60 歲時擁有的錢很可能比 Bella 還多，儘管他投入的總本金要少得多。這是因為 Alex 的資金多了 10 年的時間進行複息增長。

## 常見陷阱
1. **太晚開始：** 認為「等我賺多點再說」是最大的錯誤。即使是從 18 歲開始每月存 100 港元，也比從 40 歲開始每月存 1,000 港元要好。
2. **提早提取：** 每次你從投資戶口中提款，你都在「重置」複息時鐘。
3. **忽視費用：** 投資基金的高昂管理費會在幾十年內顯著侵蝕你的複息回報。

## 總結
複息就像滾雪球。它開始時很小且移動緩慢，但隨著它在時間的山坡上滾下，它會變得勢不可擋。今天就開始你的「雪球」，即使只是在低成本指數基金或高息儲蓄戶口中存入少量資金。
    `.trim(),
    [Language.ZH_CN]: `
# 教学笔记：复利效应的魔力
## 引言
爱因斯坦曾有名言称复利为“世界第八大奇迹”。对于香港学生来说，理解这个概念是迈向长期财富最重要的一步。复利是指投资价值增加的过程，因为投资产生的收益（包括本金和利息）随着时间推移也会产生利息。

## 核心原则
1. **时间因素：** 越早开始，你的钱就有越多的时间增长。时间比你投资的金额更重要。
2. **回报率：** 较高的利率或投资回报会加速复利效应。
3. **持之以恒：** 定期供款（如每月投资计划）能发挥复利的最大威力。
4. **耐心：** 复利开始时很慢，但在后期会呈指数级增长。

## 香港实际案例
考虑两位学生，Alex 和 Bella。
- **Alex** 从 20 岁开始每月存 1,000 港元，到 30 岁停止（共 10 年）。
- **Bella** 从 30 岁开始每月存 1,000 港元，一直持续到 60 岁（共 30 年）。
- **结果：** 假设年回报率为 7%，Alex 在 60 岁时拥有的钱很可能比 Bella 还多，尽管他投入的总本金要少得多。这是因为 Alex 的资金多了 10 年的时间进行复利增长。

## 常见陷阱
1. **太晚开始：** 认为“等我赚多点再说”是最大的错误。即使是从 18 岁开始每月存 100 港元，也比从 40 岁开始每月存 1,000 港元要好。
2. **提早提取：** 每次你从投资账户中提款，你都在“重置”复利时钟。
3. **忽视费用：** 投资基金的高昂管理费会在几十年内显著侵蚀你的复利回报。

## 总结
复利就像滚雪球。它开始时很小且移动缓慢，但随着它在时间的山坡上滚下，它会变得势不可挡。今天就开始你的“雪球”，即使只是在低成本指数基金或高息储蓄账户中存入少量资金。
    `.trim()
  }
};

const CASE_STUDIES: Record<string, { 
  cs1: { [key in Language]: string }, 
  cs2: { [key in Language]: string } 
}> = {
  'm1': {
    cs1: {
      [Language.EN]: `
# Case Study: The Crypto Rollercoaster
## Meet Alex
Alex is a Year 2 student at a local university. Like many of his peers, he was captivated by the stories of "overnight millionaires" in the cryptocurrency market. He saw a post on social media about a new meme coin called "DogeHK" and decided to invest his entire HK$20,000 savings—money he had earned from two years of part-time tutoring.

## The Decision
Alex didn't do any research. He didn't look at the whitepaper or understand the technology. He was driven by **FOMO (Fear Of Missing Out)**. He thought, "If it doubles, I can buy that new gaming PC I've always wanted." He ignored the concept of **Risk Capacity**—the actual amount of money he could afford to lose without affecting his life.

## The Outcome
Within the first week, the coin doubled in value. Alex felt like a financial genius. He started telling his friends to invest. However, a week later, the main developer of the coin sold all their holdings (a "rug pull"). The value crashed by 95% in three hours. Alex's HK$20,000 was now worth HK$1,000.

## The Lesson
Alex learned that his **Risk Tolerance** (his emotional ability to handle ups and downs) was high when things were going up, but his **Risk Capacity** was actually very low. He needed that money for his final year tuition. By going "all-in" on a high-risk asset, he violated the core principle of diversification. He now understands that high reward always comes with high risk, and you should never invest money you cannot afford to lose.
      `.trim(),
      [Language.ZH_HK]: `
# 案例研究：加密貨幣過山車
## 認識 Alex
Alex 是一名大二學生。像許多同齡人一樣，他被加密貨幣市場中「一夜暴富」的故事所吸引。他在社交媒體上看到一個關於名為「DogeHK」的新模因幣的帖子，決定投入他全部 20,000 港元的積蓄——這是他做了兩年兼職補習賺來的錢。

## 決定過程
Alex 沒有做任何研究。他沒有看白皮書，也不了解其技術。他被 **FOMO（恐懼錯過）** 所驅動。他想：「如果它翻倍，我就可以買我一直想要的那台新電競電腦了。」他忽視了 **風險承擔能力 (Risk Capacity)** 的概念——即他在不影響生活的情況下實際能承受損失的金額。

## 結果
在第一週內，該幣的價值翻了一倍。Alex 覺得自己是個理財天才。他開始叫朋友們也投資。然而，一週後，該幣的主要開發者賣掉了所有持股（即「抽地毯」）。價值在三小時內暴跌了 95%。Alex 的 20,000 港元現在只值 1,000 港元。

## 教訓
Alex 了解到，當價格上漲時，他的 **風險承受意願 (Risk Tolerance)**（他處理波動的情緒能力）很高，但他的 **風險承擔能力** 實際上非常低。他需要那筆錢來支付最後一年的學費。通過將所有資金投入高風險資產，他違反了分散投資的核心原則。他現在明白，高回報總是伴隨著高風險，絕不應投資你無法承受損失的資金。
      `.trim(),
      [Language.ZH_CN]: `
# 案例研究：加密货币过山车
## 认识 Alex
Alex 是一名大二学生。像许多同龄人一样，他被加密货币市场中“一夜暴富”的故事所吸引。他在社交媒体上看到一个关于名为“DogeHK”的新模因币的帖子，决定投入他全部 20,000 港元的积蓄——这是他做了两年兼职补习赚来的钱。

## 决定过程
Alex 没有做任何研究。他没有看白皮书，也不了解其技术。他被 **FOMO（恐惧错过）** 所驱动。他想：“如果它翻倍，我就可以买我一直想要的那台新电竞电脑了。”他忽视了 **风险承担能力 (Risk Capacity)** 的概念——即他在不影响生活的情况下实际能承受损失的金额。

## 结果
在第一周内，该币的价值翻了一倍。Alex 觉得自己是个理财天才。他开始叫朋友们也投资。然而，一周后，该币的主要开发者卖掉了所有持股（即“抽地毯”）。价值在三小时内暴跌了 95%。Alex 的 20,000 港元现在只值 1,000 港元。

## 教训
Alex 了解到，当价格上涨时，他的 **风险承受意愿 (Risk Tolerance)**（他处理波动的情绪能力）很高，但他的 **风险承担能力** 实际上非常低。他需要那笔钱来支付最后一年的学费。通过将所有资金投入高风险资产，他违反了分散投资的核心原则。他现在明白，高回报总是伴随着高风险，绝不应投资你无法承受损失的资金。
      `.trim()
    },
    cs2: {
      [Language.EN]: `
# Case Study: The Inflation Ghost
## Meet Bella
Bella is a very conservative Year 1 student. She is terrified of losing money, so she keeps all her savings—HK$50,000 from red pocket money and part-time jobs—in a standard savings account at a major bank. She checks her balance every day and feels happy that the number never goes down.

## The Strategy
Bella's strategy is "Zero Risk." She refuses to invest in stocks, bonds, or even time deposits because she wants her money to be 100% safe and accessible. Her bank pays her 0.01% interest per year. She thinks, "At least I'm not like Alex who lost everything in crypto."

## The Outcome
After three years, Bella's HK$50,000 has grown to HK$50,015. However, during those three years, the cost of living in Hong Kong (inflation) rose by an average of 3% per year. The price of her favorite lunch set rose from HK$50 to HK$55. The electronics she wanted to buy became more expensive.

## The Lesson
Bella realized that while her *nominal* balance stayed the same, her **Purchasing Power** actually decreased. In real terms, her HK$50,000 is now worth about HK$45,700 in "three-years-ago" dollars. She learned that by avoiding all market risk, she fell victim to **Inflation Risk**. She now understands that for long-term goals, keeping everything in cash is actually a guaranteed way to lose value over time. She is now looking into low-risk options like government inflation-linked bonds (iBonds) or high-yield savings accounts.
      `.trim(),
      [Language.ZH_HK]: `
# 案例研究：通脹幽靈
## 認識 Bella
Bella 是一名非常保守的大一學生。她非常害怕虧錢，所以她將所有的積蓄——來自利是錢和兼職工作的 50,000 港元——存放在一家大型銀行的標準儲蓄戶口中。她每天查看餘額，看到數字從未減少就感到很高興。

## 策略
Bella 的策略是「零風險」。她拒絕投資股票、債券甚至定期存款，因為她希望自己的錢 100% 安全且隨時可用。她的銀行每年支付 0.01% 的利息。她想：「至少我不想 Alex 那樣在加密貨幣中失去一切。」

## 結果
三年後，Bella 的 50,000 港元增長到了 50,015 港元。然而，在這三年中，香港的生活成本（通脹）平均每年上升 3%。她最喜歡的午餐套餐價格從 50 港元漲到了 55 港元。她想買的電子產品也變貴了。

## 教訓
Bella 意識到，雖然她的 *名義* 餘額保持不變，但她的 **購買力 (Purchasing Power)** 實際上下降了。按實際價值計算，她的 50,000 港元現在僅相當於三年前的約 45,700 港元。她了解到，通過規避所有市場風險，她成為了 **通脹風險 (Inflation Risk)** 的受害者。她現在明白，對於長期目標，將所有資金以現金形式存放實際上是隨著時間推移而貶值的保證方式。她現在正研究低風險的選擇，如政府通脹掛鉤債券 (iBond) 或高息儲蓄戶口。
      `.trim(),
      [Language.ZH_CN]: `
# 案例研究：通胀幽灵
## 认识 Bella
Bella 是一名非常保守的大一学生。她非常害怕亏钱，所以她将所有的积蓄——来自红包钱和兼职工作的 50,000 港元——存放在一家大型银行的标准储蓄账户中。她每天查看余额，看到数字从未减少就感到很高兴。

## 策略
Bella 的策略是“零风险”。她拒绝投资股票、债券甚至定期存款，因为她希望自己的钱 100% 安全且随时可用。她的银行每年支付 0.01% 的利息。她想：“至少我不想 Alex 那样在加密货币中失去一切。”

## 结果
三年后，Bella 的 50,000 港元增长到了 50,015 港元。然而，在这三年中，香港的生活成本（通胀）平均每年上升 3%。她最喜欢的午餐套餐价格从 50 港元涨到了 55 港元。她想买的电子产品也变贵了。

## 教训
Bella 意识到，虽然她的 *名义* 余额保持不变，但她的 **购买力 (Purchasing Power)** 实际上下降了。按实际价值计算，她的 50,000 港元现在仅相当于三年前的约 45,700 港元。她了解到，通过规避所有市场风险，她成为了 **通胀风险 (Inflation Risk)** 的受害者。她现在明白，对于长期目标，将所有资金以现金形式存放实际上是随着时间推移而贬值的保证方式。她现在正研究低风险的选择，如政府通胀挂钩债券 (iBond) 或高息储蓄账户。
      `.trim()
    }
  },
  'm2': {
    cs1: {
      [Language.EN]: `
# Case Study: The Graduation Trip Dream
## Meet Chloe
Chloe is a Year 3 student who has always dreamed of a 14-day graduation trip to Japan. She estimated the cost to be around HK$25,000. In the past, she tried to save but always ended up spending the money on clothes or expensive dinners.

## The SMART Approach
Chloe decided to apply the **SMART Framework** to her goal:
- **Specific:** "Save HK$25,000 for a 14-day trip to Tokyo and Osaka."
- **Measurable:** "I need to save HK$1,500 every month for the next 17 months."
- **Achievable:** "I earn HK$4,000 from tutoring. Saving HK$1,500 is realistic if I limit my cafe visits."
- **Relevant:** "This trip is a once-in-a-lifetime reward for my hard work in university."
- **Time-bound:** "I need the full amount by June next year."

## The Outcome
Chloe set up a separate "Japan Fund" in her banking app. Every time she was tempted to buy something unnecessary, she looked at a picture of Mount Fuji on her phone. Because her goal was **Time-bound** and **Measurable**, she could see her progress every month. By the time she graduated, she had exactly HK$25,500.

## The Lesson
Chloe learned that a goal without a plan is just a wish. By making her goal **SMART**, she turned a vague dream into a concrete reality. She also realized that having a **Relevant** goal made the small sacrifices (like skipping a few expensive meals) much easier to handle.
      `.trim(),
      [Language.ZH_HK]: `
# 案例研究：畢業旅行之夢
## 認識 Chloe
Chloe 是一名大三學生，一直夢想著去日本進行為期 14 天的畢業旅行。她估計費用約為 25,000 港元。過去，她嘗試過儲蓄，但最後總是把錢花在衣服或昂貴的晚餐上。

## SMART 方法
Chloe 決定將 **SMART 框架** 應用於她的目標：
- **具體 (Specific)：** 「為東京和大阪的 14 天旅行存 25,000 港元。」
- **可衡量 (Measurable)：** 「在接下來的 17 個月內，我每個月需要存 1,500 港元。」
- **可達成 (Achievable)：** 「我從補習中賺取 4,000 港元。如果我限制去咖啡館的次數，存 1,500 港元是現實的。」
- **相關性 (Relevant)：** 「這次旅行是我大學四年努力學習的一生一次的獎勵。」
- **有時限 (Time-bound)：** 「我需要在明年 6 月前存夠全額。」

## 結果
Chloe 在銀行 App 中設立了一個獨立的「日本基金」。每當她想買不必要的東西時，她就會看手機上富士山的照片。因為她的目標是 **有時限** 且 **可衡量** 的，她每個月都能看到進度。到她畢業時，她正好存了 25,500 港元。

## 教訓
Chloe 了解到，沒有計劃的目標只是一個願望。通過使目標 **SMART**，她將一個模糊的夢想變成了具體的現實。她還意識到，擁有一個 **相關** 的目標讓那些小小的犧牲（如少吃幾頓昂貴的飯）變得更容易接受。
      `.trim(),
      [Language.ZH_CN]: `
# 案例研究：毕业旅行之梦
## 认识 Chloe
Chloe 是一名大三学生，一直梦想着去日本进行为期 14 天的毕业旅行。她估计费用约为 25,000 港元。过去，她尝试过储蓄，但最后总是把钱花在衣服或昂贵的晚餐上。

## SMART 方法
Chloe 决定将 **SMART 框架** 应用于她的目标：
- **具体 (Specific)：** “为东京和大阪的 14 天旅行存 25,000 港元。”
- **可衡量 (Measurable)：** “在接下来的 17 个月内，我每个月需要存 1,500 港元。”
- **可达成 (Achievable)：** “我从补习中赚取 4,000 港元。如果我限制去咖啡馆的次数，存 1,500 港元是现实的。”
- **相关性 (Relevant)：** “这次旅行是我大学四年努力学习的一生一次的奖励。”
- **有时限 (Time-bound)：** “我需要在明年 6 月前存够全额。”

## 结果
Chloe 在银行 App 中设立了一个独立的“日本基金”。每当她想买不必要的东西时，她就会看手机上富士山的照片。因为她的目标是 **有时限** 且 **可衡量** 的，她每个月都能看到进度。到她毕业时，她正好存了 25,500 港元。

## 教训
Chloe 了解到，没有计划的目标只是一个愿望。通过使目标 **SMART**，她将一个模糊的梦想变成了具体的现实。她还意识到，拥有一个 **相关** 的目标让那些小小的牺牲（如少吃几顿昂贵的饭）变得更容易接受。
      `.trim()
    },
    cs2: {
      [Language.EN]: `
# Case Study: The Aimless Spender
## Meet David
David is a Year 2 student with a part-time job earning HK$5,000 a month. He doesn't have any specific financial goals. He thinks, "I'm young, I should enjoy my life." Whenever he sees a new gadget or a limited-edition sneaker, he buys it.

## The Problem
Last month, David's laptop—which he uses for all his university assignments—suddenly broke. The repair cost was HK$4,000. David looked at his bank account and saw only HK$800. He had spent all his money on things he couldn't even remember now.

## The Crisis
David had to borrow money from his parents, which led to a long, uncomfortable lecture about responsibility. He felt stressed and embarrassed. He realized that because he had no **Short-term** or **Medium-term** goals, he had no "buffer" for life's surprises.

## The Lesson
David learned that financial goals aren't just about buying big things; they are about **Financial Security**. He realized that "enjoying life" doesn't mean spending every cent today. He has now set a new goal: "Build a HK$10,000 Emergency Fund by saving HK$1,000 a month." He now understands that having a goal gives his money a purpose and protects him from future stress.
      `.trim(),
      [Language.ZH_HK]: `
# 案例研究：漫無目的的消費者
## 認識 David
David 是一名大二學生，兼職每月賺取 5,000 港元。他沒有任何具體的理財目標。他想：「我還年輕，應該享受生活。」每當他看到新電子產品或限量版波鞋時，他都會買下來。

## 問題所在
上個月，David 用來做所有大學功課的電腦突然壞了。維修費用為 4,000 港元。David 查看他的銀行戶口，發現只有 800 港元。他把所有的錢都花在了那些他現在甚至記不起來的東西上。

## 危機出現
David 不得不向父母借錢，這導致了一場關於責任感的漫長而令人不快的說教。他感到壓力很大且很尷尬。他意識到，因為他沒有 **短期** 或 **中期** 目標，他對生活中的意外沒有任何「緩衝」。

## 教訓
David 了解到，理財目標不僅僅是為了買大件物品，更是為了 **財務安全 (Financial Security)**。他意識到「享受生活」並不意味著今天花掉每一分錢。他現在設定了一個新目標：「通過每月儲蓄 1,000 港元，建立一個 10,000 港元的應急基金。」他現在明白，擁有目標能讓他的金錢有了意義，並保護他免受未來的壓力。
      `.trim(),
      [Language.ZH_CN]: `
# 案例研究：漫无目的的消费者
## 认识 David
David 是一名大二学生，兼职每月赚取 5,000 港元。他没有任何具体的理财目标。他想：“我还年轻，应该享受生活。”每当他看到新电子产品或限量版运动鞋时，他都会买下来。

## 问题所在
上个月，David 用来做所有大学功课的电脑突然坏了。维修费用为 4,000 港元。David 查看他的银行账户，发现只有 800 港元。他把所有的钱都花在了那些他现在甚至记不起来的东西上。

## 危机出现
David 不得不向父母借钱，这导致了一场关于责任感的漫长而令人不快的说教。他感到压力很大且很尴尬。他意识到，因为他没有 **短期** 或 **中期** 目标，他对生活中的意外没有任何“缓冲”。

## 教训
David 了解到，理财目标不仅仅是为了买大件物品，更是为了 **财务安全 (Financial Security)**。他意识到“享受生活”并不意味着今天花掉每一分钱。他现在设定了一个新目标：“通过每月储蓄 1,000 港元，建立一个 10,000 港元的应急基金。”他现在明白，拥有目标能让他的金钱有了意义，并保护他免受未来的压力。
      `.trim()
    }
  },
  'm3': {
    cs1: {
      [Language.EN]: `
# Case Study: The Hidden Cost of Daily Habits
## Meet Emily
Emily is a Year 2 student who loves the vibrant cafe culture in Hong Kong. Every morning before her lectures, she stops by a trendy cafe near campus to buy a HK$45 specialty latte. On weekends, she often meets friends for "brunch" or "high tea," spending another HK$200 to HK$300. Despite earning a decent HK$6,000 a month from her part-time tutoring job, she constantly finds herself with less than HK$200 in her bank account by the 20th of every month. She often has to skip social events at the end of the month because she simply has no money left.

## The Budgeting Experiment
After attending a financial literacy workshop, Emily decided to conduct a 30-day "Budgeting Experiment." She downloaded a simple expense-tracking app and committed to recording every single cent she spent, no matter how small. She didn't change her habits at first; she just wanted to see where her money was actually going.

## The Shocking Discovery
At the end of the month, Emily sat down to review her data. She was shocked to find that she had spent HK$1,350 on her daily lattes alone. When she added in her weekend cafe visits, her total "Cafe Spending" was over HK$2,500—more than 40% of her total income! She realized that while she thought she was being careful with "big" purchases, these small, mindless daily habits were the true "budget killers" that were draining her wealth.

## The Transformation
Emily didn't stop drinking coffee entirely. Instead, she bought a high-quality reusable flask and started making her own coffee at home four days a week, allowing herself a "cafe treat" only on Fridays. She also suggested "picnic lunches" in the park with friends instead of expensive cafes. By making these small adjustments, she managed to save HK$1,500 in the very first month. She put this money into a high-yield savings account, feeling a sense of control over her finances for the first time in her life.

## The Lesson
Emily learned that budgeting isn't about deprivation; it's about **awareness and choice**. By tracking her expenses, she gained the power to decide where her money should go. She realized that her daily latte was costing her more than just HK$45—it was costing her the ability to save for her future goals. She now lives by the mantra: "Watch the cents, and the dollars will take care of themselves."
      `.trim(),
      [Language.ZH_HK]: `
# 案例研究：日常習慣的隱藏成本
## 認識 Emily
Emily 是一名大二學生，非常喜歡香港充滿活力的咖啡館文化。每天上課前，她都會在校園附近的一家潮流咖啡店買一杯 45 港元的精品拿鐵。週末，她經常和朋友一起吃「早午餐」或「下午茶」，再花掉 200 到 300 港元。儘管她每個月從兼職補習工作中賺取不錯的 6,000 港元，但她發現每個月到 20 號時，銀行戶口裡的錢往往剩下不到 200 港元。她經常不得不在月底推掉社交活動，因為她真的沒錢了。

## 預算實驗
在參加了一個理財工作坊後，Emily 決定進行為期 30 天的「預算實驗」。她下載了一個簡單的記賬 App，並承諾記錄每一分錢的支出，無論金額多小。起初她沒有改變習慣，只是想看看她的錢到底花在哪裡。

## 震驚的發現
月底時，Emily 坐下來查看她的數據。她震驚地發現，單是每天的拿鐵咖啡就花掉了 1,350 港元。加上週末去咖啡館的開支，她的「咖啡總支出」超過了 2,500 港元——佔她總收入的 40% 以上！她意識到，雖然她覺得自己在「大額」消費上很小心，但這些微小、無意識的日常習慣才是真正榨乾她財富的「預算殺手」。

## 轉變過程
Emily 並沒有完全停止喝咖啡。相反，她買了一個高質量的隨行杯，並開始每週四天在家自己沖咖啡，只允許自己在週五去咖啡館「獎勵」一下。她還建議朋友們在公園野餐，而不是去昂貴的咖啡館。通過這些小小的調整，她在第一個月就成功節省了 1,500 港元。她將這筆錢存入了一個高息儲蓄戶口，這輩子第一次感受到了對自己財務的掌控感。

## 教訓
Emily 了解到，預算管理並非刻意剝奪享受，而是關於 **覺察與選擇**。通過追蹤開支，她獲得了決定金錢去向的權力。她意識到每天的拿鐵咖啡代價不僅僅是 45 港元——它還讓她失去了為未來目標儲蓄的能力。她現在信奉這句格言：「留意小錢，大錢自然會積聚。」
      `.trim(),
      [Language.ZH_CN]: `
# 案例研究：日常习惯的隐藏成本
## 认识 Emily
Emily 是一名大二学生，非常喜欢香港充满活力的咖啡馆文化。每天上课前，她都会在校园附近的一家潮流咖啡店买一杯 45 港元的精品拿铁。周末，她经常和朋友一起吃“早午餐”或“下午茶”，再花掉 200 到 300 港元。尽管她每个月从兼职补习工作中赚取不错的 6,000 港元，但她发现每个月到 20 号时，银行账户里的钱往往剩下不到 200 港元。她经常不得不在月底推掉社交活动，因为她真的没钱了。

## 预算实验
在参加了一个理财工作坊后，Emily 决定进行为期 30 天的“预算实验”。她下载了一个简单的记账 App，并承诺记录每一分钱的支出，无论金额多小。起初她没有改变习惯，只是想看看她的钱到底花在哪里。

## 震惊的发现
月底时，Emily 坐下来查看她的数据。她震惊地发现，单是每天的拿铁咖啡就花掉了 1,350 港元。加上周末去咖啡馆的开支，她的“咖啡总支出”超过了 2,500 港元——占她总收入的 40% 以上！她意识到，虽然她觉得自己在“大额”消费上很小心，但这些微小、无意识的日常习惯才是真正榨干她财富的“预算杀手”。

## 转变过程
Emily 并没有完全停止喝咖啡。相反，她买了一个高质量的随行杯，并开始每周四天在家自己冲咖啡，只允许自己在周五去咖啡馆“奖励”一下。她还建议朋友们在公园野餐，而不是去昂贵的咖啡馆。通过这些小小的调整，她在第一个月就成功节省了 1,500 港元。她将这笔钱存入了一个高息储蓄账户，这辈子第一次感受到了对自己财务的掌控感。

## 教训
Emily 了解到，预算管理并非刻意剥夺享受，而是关于 **觉察与选择**。通过追踪开支，她获得了决定金钱去向的权力。她意识到每天的拿铁咖啡代价不仅仅是 45 港元——它还让她失去了为未来目标储蓄的能力。她现在信奉这句格言：“留意小钱，大钱自然会积聚。”
      `.trim()
    },
    cs2: {
      [Language.EN]: `
# Case Study: The Power of Paying Yourself First
## Meet Frank
Frank is a Year 3 student who works part-time at a retail store, earning HK$5,000 a month. For years, Frank's approach to saving was simple: "I'll spend what I need, and whatever is left at the end of the month, I'll put into savings." The problem was that at the end of almost every month, there was exactly HK$0 left. Sometimes, he even had to borrow a few hundred dollars from his sister to cover his MTR fares for the last few days of the month.

## The Strategy Shift
Frank read a book about personal finance that introduced the concept of **"Paying Yourself First."** The idea is to treat your savings like a non-negotiable bill that must be paid before any other spending occurs. Instead of saving what is left after spending, you spend what is left after saving.

## Implementation
The next time Frank received his HK$5,000 salary, he didn't go out for a celebratory dinner. Instead, he immediately transferred HK$1,000 to a separate savings account that he didn't carry the ATM card for. He then sat down and looked at the remaining HK$4,000. He realized he had to be much more careful with his spending. He started using the 50/30/20 rule on this HK$4,000, allocating HK$2,000 for needs, HK$1,200 for wants, and keeping the HK$800 as an extra buffer.

## The Result
In the first few months, it was difficult. Frank had to say "no" to a few expensive outings. However, he noticed something amazing: because the money was already "gone" from his main account, he naturally adjusted his lifestyle to fit the remaining balance. After six months, Frank looked at his separate savings account and saw HK$6,000. It was the most money he had ever owned at one time. He felt a huge sense of accomplishment and security.

## The Lesson
Frank learned that human nature is to spend whatever is available. By **"Paying Himself First,"** he removed the temptation to spend his savings. He realized that saving isn't about having "extra" money; it's about making your future self a priority. He now tells his friends: "Don't wait for the end of the month to save. Your future self deserves to be paid first."
      `.trim(),
      [Language.ZH_HK]: `
# 案例研究：「先支付給自己」的威力
## 認識 Frank
Frank 是一名大三學生，在一家零售店兼職，每月賺取 5,000 港元。多年來，Frank 的儲蓄方法很簡單：「我會花掉我需要的錢，月底剩下多少，我就存多少。」問題是，幾乎每個月底，剩下的錢正好是 0 港元。有時，他甚至不得不向姐姐借幾百元來支付月底最後幾天的地鐵費。

## 策略轉變
Frank 讀了一本關於個人理財的書，書中介紹了 **「先支付給自己」(Paying Yourself First)** 的概念。這個想法是將儲蓄視為一項不可協商的賬單，必須在進行任何其他消費之前支付。與其儲蓄消費後剩餘的錢，不如消費儲蓄後剩餘的錢。

## 執行過程
下次 Frank 收到 5,000 港元薪水時，他沒有出去吃慶祝晚餐。相反，他立即將 1,000 港元轉入一個獨立的儲蓄戶口，而且他平時不帶那個戶口的提款卡。然後，他坐下來查看剩餘的 4,000 港元。他意識到自己必須對支出更加小心。他開始對這 4,000 港元應用 50/30/20 法則，分配 2,000 港元用於「需要」，1,200 港元用於「想要」，並保留 800 港元作為額外緩衝。

## 結果
在最初的幾個月裡，這很困難。Frank 不得不拒絕幾次昂貴的聚會。然而，他發現了一件神奇的事情：因為錢已經從他的主戶口中「消失」了，他自然而然地調整了生活方式以適應剩餘的餘額。六個月後，Frank 查看他的獨立儲蓄戶口，發現裡面有 6,000 港元。這是他有史以來同時擁有的最多錢。他感到巨大的成就感和安全感。

## 教訓
Frank 了解到，人的天性是花掉所有可用的錢。通過 **「先支付給自己」**，他消除了花掉儲蓄的誘惑。他意識到儲蓄並非關於擁有「多餘」的錢，而是關於將未來的自己放在首位。他現在告訴朋友們：「不要等到月底才儲蓄。未來的你值得被優先支付。」
      `.trim(),
      [Language.ZH_CN]: `
# 案例研究：“先支付给自己”的威力
## 认识 Frank
Frank 是一名大三学生，在一家零售店兼职，每月赚取 5,000 港元。多年来，Frank 的储蓄方法很简单：“我会花掉我需要的钱，月底剩下多少，我就存多少。”问题是，几乎每个月底，剩下的钱正好是 0 港元。有时，他甚至不得不向姐姐借几百元来支付月底最后几天的地铁费。

## 策略转变
Frank 读了一本关于个人理财的书，书中介绍了 **“先支付给自己”(Paying Yourself First)** 的概念。这个想法是将储蓄视为一项不可协商的账单，必须在进行任何其他消费之前支付。与其储蓄消费后剩余的钱，不如消费储蓄后剩余的钱。

## 执行过程
下次 Frank 收到 5,000 港元薪水时，他没有出去吃庆祝晚餐。相反，他立即将 1,000 港元转入一个独立的储蓄账户，而且他平时不带那个账户的提款卡。然后，他坐下来查看剩余的 4,000 港元。他意识到自己必须对支出更加小心。他开始对这 4,000 港元应用 50/30/20 法则，分配 2,000 港元用于“需要”，1,200 港元用于“想要”，并保留 800 港元作为额外缓冲。

## 结果
在最初的几个月里，这很困难。Frank 不得不拒绝几次昂贵的聚会。然而，他发现了一件神奇的事情：因为钱已经从他的主账户中“消失”了，他自然而然地调整了生活方式以适应剩余的余额。六个月后，Frank 查看他的独立储蓄账户，发现里面有 6,000 港元。这是他有史以来同时拥有的最多钱。他感到巨大的成就感和安全感。

## 教训
Frank 了解到，人的天性是花掉所有可用的钱。通过 **“先支付给自己”**，他消除了花掉储蓄的诱惑。他意识到储蓄并非关于拥有“多余”的钱，而是关于将未来的自己放在首位。他现在告诉朋友们：“不要等到月底才储蓄。未来的你值得被优先支付。”
      `.trim()
    }
  },
  'm4': {
    cs1: {
      [Language.EN]: `
# Case Study: The Power of Automation
## Meet Grace
Grace is a Year 2 student who earns HK$4,000 a month from a part-time job as a social media assistant. She wanted to save HK$10,000 for a summer internship program in Singapore. However, she found that every month, she would spend her entire salary on small things like snacks, mobile games, and hanging out with friends. She always told herself, "I'll save whatever is left at the end of the month," but there was never anything left.

## The Automated Strategy
Grace decided to stop relying on her willpower. She set up an **Automated Standing Instruction** in her banking app. On the 5th of every month (the day after she gets paid), the bank automatically transfers HK$1,000 from her payroll account to a separate "Singapore Fund" account. She also hid the ATM card for the second account in a drawer at home.

## The Outcome
For the first two months, Grace felt a bit "tight" with her spending. She had to skip a few expensive dinners. But because the money was moved automatically, she didn't even have the chance to spend it. It became "invisible" to her. After 10 months, she checked her Singapore Fund and was thrilled to see exactly HK$10,000. She hadn't even noticed the effort of saving because it happened in the background.

## The Lesson
Grace learned that **Automation is the enemy of procrastination**. By removing the decision-making process, she made saving her "default" behavior. She realized that her brain naturally adjusted her spending to whatever was left in her main account. She now uses automation for all her financial goals, including her emergency fund and her monthly investment plan.
      `.trim(),
      [Language.ZH_HK]: `
# 案例研究：自動化的力量
## 認識 Grace
Grace 是一名大二學生，兼職擔任社交媒體助理，每月賺取 4,000 港元。她想存 10,000 港元參加新加坡的暑期實習計劃。然而，她發現每個月她都會把全部薪水花在零食、手機遊戲和與朋友聚會等小事上。她總是告訴自己：「月底剩下多少我就存多少」，但最後總是分文不剩。

## 自動化策略
Grace 決定不再依賴自己的意志力。她在銀行 App 中設定了 **自動常設指令 (Standing Instruction)**。每個月 5 號（即出糧後的第二天），銀行會自動將 1,000 港元從她的出糧戶口轉入一個獨立的「新加坡基金」戶口。她還把第二個戶口的提款卡藏在家裡的抽屜裡。

## 結果
在最初的兩個月裡，Grace 覺得手頭有點緊。她不得不推掉幾次昂貴的晚飯。但由於錢是自動轉走的，她根本沒有機會花掉它。這筆錢對她來說變成了「隱形」的。10 個月後，她查看她的新加坡基金，驚喜地發現正好有 10,000 港元。她甚至沒有感覺到儲蓄的吃力，因為一切都在後台自動完成。

## 教訓
Grace 了解到，**自動化是拖延症的剋星**。通過消除決策過程，她將儲蓄變成了她的「預設」行為。她意識到大腦會自然而然地根據主戶口剩餘的金額來調整支出。她現在將自動化應用於所有的理財目標，包括她的應急基金和每月投資計劃。
      `.trim(),
      [Language.ZH_CN]: `
# 案例研究：自动化的力量
## 认识 Grace
Grace 是一名大二学生，兼职担任社交媒体助理，每月赚取 4,000 港元。她想存 10,000 港元参加新加坡的暑期实习计划。然而，她发现每个月她都会把全部薪水花在零食、手机游戏和与朋友聚会等小事上。她总是对自己说：“月底剩下多少我就存多少”，但最后总是分文不剩。

## 自动化策略
Grace 决定不再依赖自己的意志力。她在银行 App 中设定了 **自动常设指令 (Standing Instruction)**。每个月 5 号（即发工资后的第二天），银行会自动将 1,000 港元从她的工资账户转入一个独立的“新加坡基金”账户。她还把第二个账户的提款卡藏在家里的小抽屉里。

## 结果
在最初的两个月里，Grace 觉得手头有点紧。她不得不推掉几次昂贵的晚饭。但由于钱是自动转走的，她根本没有机会花掉它。这笔钱对她来说变成了“隐形”的。10 个月后，她查看她的新加坡基金，惊喜地发现正好有 10,000 港元。她甚至没有感觉到储蓄的吃力，因为一切都在后台自动完成。

## 教训
Grace 了解到，**自动化是拖延症的克星**。通过消除决策过程，她将储蓄变成了她的“默认”行为。她意识到大脑会自然而然地根据主账户剩余的金额来调整支出。她现在将自动化应用于所有的理财目标，包括她的应急基金和每月投资计划。
      `.trim()
    },
    cs2: {
      [Language.EN]: `
# Case Study: The High-Yield Hunt
## Meet Henry
Henry is a Year 4 student who has been very disciplined with his savings. Over his university years, he managed to save HK$40,000 from internships and red pocket money. He kept all this money in his basic savings account at a traditional bank, earning a tiny 0.001% interest. He thought he was doing the right thing by keeping it "safe."

## The Realization
One day, Henry saw an advertisement for a **Virtual Bank** offering a 3.5% per annum interest rate on savings, with no lock-in period. He did some quick math: his current bank was paying him about HK$0.40 a year in interest. The virtual bank would pay him HK$1,400 a year for the same HK$40,000. He realized he was losing over HK$100 every single month just by keeping his money in the wrong place.

## The Move
Henry was nervous about virtual banks, so he checked the **Hong Kong Deposit Protection Board** website. He confirmed that deposits in virtual banks are protected up to HK$500,000, just like traditional banks. He opened an account in 5 minutes using his phone and transferred his HK$40,000.

## The Outcome
A year later, Henry received HK$1,400 in interest—enough to pay for a nice weekend trip or several months of his mobile phone bill. He felt proud that his money was finally "working" for him, even while he was sleeping.

## The Lesson
Henry learned that **where you keep your money matters as much as how much you save**. He realized that in a high-inflation environment, "safe" money in a low-interest account is actually losing value. He now regularly compares interest rates and ensures his emergency fund is always in a high-yield environment while remaining liquid.
      `.trim(),
      [Language.ZH_HK]: `
# 案例研究：尋找高息之源
## 認識 Henry
Henry 是一名大四學生，一直對儲蓄非常有紀律。在大學期間，他通過實習和利是錢成功存下了 40,000 港元。他將這筆錢全部放在一家傳統銀行的基本儲蓄戶口中，賺取極微薄的 0.001% 利息。他認為將錢保持「安全」是正確的做法。

## 覺醒時刻
有一天，Henry 看到一家 **虛擬銀行** 的廣告，聲稱儲蓄年利率高達 3.5%，且沒有鎖定期。他做了一個簡單的計算：他目前的銀行每年只給他約 0.4 港元的利息。而虛擬銀行同樣的 40,000 港元每年會支付他 1,400 港元。他意識到，僅僅因為把錢放錯了地方，他每個月就損失了 100 多港元。

## 行動過程
Henry 對虛擬銀行感到有些緊張，於是他在 **香港存款保障委員會** 的網站上進行了查詢。他確認虛擬銀行的存款同樣受到最高 500,000 港元的保障，與傳統銀行無異。他用手機在 5 分鐘內開了戶，並轉入了那 40,000 港元。

## 結果
一年後，Henry 收到了 1,400 港元的利息——這足以支付一次不錯的週末旅行或幾個月的電話費。他感到很自豪，因為他的錢終於開始為他「工作」了，即使是在他睡覺的時候。

## 教訓
Henry 了解到，**存放資金的位置與儲蓄金額同樣重要**。他意識到在高通脹環境下，存放在低息戶口中的「安全」資金實際上正在貶值。他現在會定期比較利率，並確保他的應急基金始終處於高息環境中，同時保持流動性。
      `.trim(),
      [Language.ZH_CN]: `
# 案例研究：寻找高息之源
## 认识 Henry
Henry 是一名大四学生，一直对储蓄非常有纪律。在大学期间，他通过实习和红包钱成功存下了 40,000 港元。他将这笔钱全部放在一家传统银行的基本储蓄账户中，赚取极微薄的 0.001% 利息。他认为将钱保持“安全”是正确做法。

## 觉醒时刻
有一天，Henry 看到一家 **虚拟银行** 的广告，声称储蓄年利率高达 3.5%，且没有锁定期。 he做了一个简单的计算：他目前的银行每年只给他约 0.4 港元的利息。而虚拟银行同样的 40,000 港元每年会支付他 1,400 港元。他意识到，仅仅因为把钱放错了地方，他每个月就损失了 100 多港元。

## 行动过程
Henry 对虚拟银行感到有些紧张，于是他在 **香港存款保障委员会** 的网站上进行了查询。他确认虚拟银行的存款同样受到最高 500,000 港元的保障，与传统银行无异。他用手机在 5 分钟内开了户，并转入了那 40,000 港元。

## 结果
一年后，Henry 收到了 1,400 港元的利息——这足以支付一次不错的周末旅行或几个月的电话费。他感到很自豪，因为他的钱终于开始为他“工作”了，即使是在他睡觉的时候。

## 教训
Henry 了解到，**存放资金的位置与储蓄金额同样重要**。他意识到在高通胀环境下，存放在低息账户中的“安全”资金实际上正在贬值。他现在会定期比较利率，并确保他的应急基金始终处于高息环境中，同时保持流动性。
      `.trim()
    }
  },
  'm5': {
    cs1: {
      [Language.EN]: `
# Case Study: The Minimum Payment Trap
## Meet Ivan
Ivan is a recent graduate who just started his first full-time job. To celebrate, he bought a high-end designer watch for HK$15,000 using his new credit card. He thought, "The bank only asks for a HK$300 minimum payment every month. I can easily afford that!" He didn't bother to read the fine print about the **30% APR (Annual Percentage Rate)**.

## The Spiral
For the first six months, Ivan faithfully paid the HK$300 minimum. He felt like he was managing his debt well. However, when he checked his statement in the seventh month, he was horrified to see that his balance was still over HK$14,500. Most of his HK$300 payments had gone toward paying the **interest**, not the actual cost of the watch.

## The Math
Ivan used an online credit card calculator and realized that if he continued paying only the minimum, it would take him over **20 years** to pay off the watch, and he would end up paying more than HK$40,000 in total—nearly three times the original price! He felt trapped and stressed, realizing that he was working just to pay the bank's interest.

## The Lesson
Ivan learned that **credit cards are high-interest loans, not free money**. He realized that the "Minimum Payment" is a trap designed to keep you in debt for as long as possible. He immediately cut back on all non-essential spending and started paying HK$2,000 a month toward the card. He now understands that you should never buy anything on credit that you can't pay off in full within the grace period.
      `.trim(),
      [Language.ZH_HK]: `
# 案例研究：最低還款額陷阱
## 認識 Ivan
Ivan 是一名剛開始第一份全職工作的畢業生。為了慶祝，他用新申請的信用卡買了一隻價值 15,000 港元的名牌手錶。他想：「銀行每個月只要求 300 港元的最低還款額。我完全負擔得起！」他沒有理會那些關於 **30% 年利率 (APR)** 的細則。

## 債務螺旋
在最初的六個月裡，Ivan 準時支付了 300 港元的最低還款額。他覺得自己處理債務得很好。然而，當他在第七個月查看結單時，他驚恐地發現欠款餘額仍超過 14,500 港元。他那 300 港元的還款大部分都用來支付 **利息**，而不是手錶本身的本金。

## 數學計算
Ivan 使用了網上信用卡計算機，意識到如果他繼續只支付最低還款額，他將需要超過 **20 年** 才能還清這隻手錶，而且總共要支付超過 40,000 港元——幾乎是原價的三倍！他感到被困住了，壓力巨大，意識到自己工作只是為了支付銀行的利息。

## 教訓
Ivan 了解到，**信用卡是高息貸款，而不是免費金錢**。他意識到「最低還款額」是一個陷阱，旨在讓你盡可能長時間地處於債務狀態。他立即削減了所有非必要開支，並開始每月向信用卡支付 2,000 港元。他現在明白，絕不應該用信用卡購買任何你無法在免息期內全額還清的東西。
      `.trim(),
      [Language.ZH_CN]: `
# 案例研究：最低还款额陷阱
## 认识 Ivan
Ivan 是一名刚开始第一份全职工作的毕业生。为了庆祝，他用新申请的信用卡买了一只价值 15,000 港元的名牌手表。他想：“银行每个月只要求 300 港元的最低还款额。我完全负担得起！”他没有理会那些关于 **30% 年利率 (APR)** 的细则。

## 债务螺旋
在最初的六个月里，Ivan 准时支付了 300 港元的最低还款额。他觉得自己处理债务得很好。然而，当他在第七个月查看结单时，他惊恐地发现欠款余额仍超过 14,500 港元。他那 300 港元的还款大部分都用来支付 **利息**，而不是手表本身的本金。

## 数学计算
Ivan 使用了网上信用卡计算器，意识到如果他继续只支付最低还款额，他将需要超过 **20 年** 才能还清这只手表，而且总共要支付超过 40,000 港元——几乎是原价的三倍！他感到被困住了，压力巨大，意识到自己工作只是为了支付银行的利息。

## 教训
Ivan 了解到，**信用卡是高息贷款，而不是免费金钱**。他意识到“最低还款额”是一个陷阱，旨在让你尽可能长时间地处于债务状态。他立即削减了所有非必要支出，并开始每月向信用卡支付 2,000 港元。他现在明白，绝不应该用信用卡购买任何你无法在免息期内全额还清的东西。
      `.trim()
    },
    cs2: {
      [Language.EN]: `
# Case Study: The Student Loan Strategy
## Meet Jenny
Jenny is a Year 4 student who is about to graduate with HK$150,000 in government student loans (NLSPS). While most of her friends are planning expensive graduation trips, Jenny is feeling anxious. She knows that interest on her loan has been accruing since she started university, and she will need to start repaying it soon after she finds a job.

## The Plan
Jenny decided to face her debt head-on. She logged into the **Student Finance Office (SFO)** portal and used their repayment calculator. She found that her monthly repayment would be around HK$1,100 for 15 years. She realized that if she only paid the minimum, she would pay over HK$40,000 in interest over the life of the loan.

## The Strategy
Jenny set a goal: "Pay off the loan in 7 years instead of 15." She calculated that she would need to pay HK$2,000 a month. To achieve this, she decided to live with her parents for the first few years of her career and keep her lifestyle modest. She also planned to use 50% of any year-end bonuses to make **lump-sum repayments**, which would directly reduce the principal and save her thousands in future interest.

## The Outcome
By the time Jenny graduated, she had a clear roadmap. While her friends were stressed about their first bills, Jenny felt in control. She knew exactly how much of her first salary was already "spoken for" and had a plan to become debt-free much faster than her peers.

## The Lesson
Jenny learned that **debt is a weight, but a plan is a map**. She realized that by understanding the terms of her loan and being proactive about repayment, she could save a significant amount of money and gain financial freedom much earlier. She now understands that "good debt" (like an investment in education) still needs a "great plan" to manage.
      `.trim(),
      [Language.ZH_HK]: `
# 案例研究：學生貸款策略
## 認識 Jenny
Jenny 是一名即將畢業的大四學生，背負著 150,000 港元的政府學生貸款 (NLSPS)。當她的大多數朋友都在計劃昂貴的畢業旅行時，Jenny 感到很焦慮。她知道自從她上大學以來，貸款利息就一直在累積，而且在她找到工作後不久就需要開始還款。

## 制定計劃
Jenny 決定正面迎接債務。她登錄了 **學生資助處 (SFO)** 的門戶網站，並使用了他們的還款計算機。她發現她每個月的還款額約為 1,100 港元，持續 15 年。她意識到如果她只按最低要求還款，在整個貸款期內她將支付超過 40,000 港元的利息。

## 還款策略
Jenny 設定了一個目標：「在 7 年內還清貸款，而不是 15 年。」她計算出每個月需要支付 2,000 港元。為了實現這一目標，她決定在工作的前幾年與父母同住，並保持簡樸的生活方式。她還計劃將年終獎金的 50% 用於 **一筆過還款**，這將直接減少本金，並為她節省數千元的未來利息。

## 結果
當 Jenny 畢業時，她已經有了一份清晰的路線圖。當她的朋友們在為第一份賬單感到壓力時，Jenny 覺得一切都在掌控之中。她準確地知道第一份薪水中有多少已經「名花有主」，並且有一個比同齡人更早清還債務的計劃。

## 教訓
Jenny 了解到，**債務是重量，但計劃是地圖**。她意識到通過了解貸款條款並積極主動地還款，她可以節省大量金錢並更早獲得財務自由。她現在明白，「好債」（如教育投資）仍然需要一個「好計劃」來管理。
      `.trim(),
      [Language.ZH_CN]: `
# 案例研究：学生贷款策略
## 认识 Jenny
Jenny 是一名即将毕业的大四学生，背负着 150,000 港元的政府学生贷款 (NLSPS)。当她的大多数朋友都在计划昂贵的毕业旅行时，Jenny 感到很焦虑。她知道自从她上大学以来，贷款利息就一直在累积，而且在她找到工作后不久就需要开始还款。

## 制定计划
Jenny 决定正面迎接债务。她登录了 **学生资助处 (SFO)** 的门户网站，并使用了他们的还款计算器。她发现她每个月的还款额约为 1,100 港元，持续 15 年。她意识到如果她只按最低要求还款，在整个贷款期内她将支付超过 40,000 港元的利息。

## 还款策略
Jenny 设定了一个目标：“在 7 年内还清贷款，而不是 15 年。”她计算出每个月需要支付 2,000 港元。为了实现这一目标，她决定在工作的前几年与父母同住，并保持简朴的生活方式。她还计划将年终奖金的 50% 用于 **一笔过还款**，这将直接减少本金，并为她节省数千元的未来利息。

## 结果
当 Jenny 毕业时，她已经有了一份清晰的路线图。当她的朋友们在为第一份账单感到压力时，Jenny 觉得一切都在掌控之中。她准确地知道第一份薪水中有多少已经“名花有主”，并且有一个比同龄人更早清还债务的计划。

## 教训
Jenny 了解到，**债务是重量，但计划是地图**。她意识到通过了解贷款条款并积极主动地还款，她可以节省大量金钱并更早获得财务自由。她现在明白，“好债”（如教育投资）仍然需要一个“好计划”来管理。
      `.trim()
    }
  },
  'm6': {
    cs1: {
      [Language.EN]: `
# Case Study: The Index Fund Investor
## Meet Kevin
Kevin is a Year 3 student who has HK$10,000 to invest. He spent weeks watching YouTube videos about "day trading" and "picking the next big stock." However, he felt overwhelmed by the complexity and the risk of losing his hard-earned money. He didn't have the time to track the market every hour between his lectures.

## The Simple Strategy
After reading a book on passive investing, Kevin decided to ignore the "hype" and invest in a low-cost **Exchange Traded Fund (ETF)** that tracks the S&P 500. He opened a brokerage account and bought HK$10,000 worth of the ETF. He understood that by doing this, he was instantly owning a small piece of the 500 largest companies in the US.

## The Outcome
Over the next year, the stock market had many ups and downs. Some individual stocks crashed, while others soared. Kevin didn't panic. He didn't even check his account most days. At the end of the year, the S&P 500 was up by 10%. Kevin's HK$10,000 was now worth HK$11,000. He had outperformed many of his friends who tried to "pick winners" and ended up losing money due to bad timing and high trading fees.

## The Lesson
Kevin learned that **simplicity often beats complexity in investing**. He realized that as a student, his greatest asset is time, not his ability to predict the market. By choosing a diversified index fund, he gained broad market exposure with minimal effort and cost. He now plans to add HK$500 every month to his ETF, regardless of whether the market is up or down.
      `.trim(),
      [Language.ZH_HK]: `
# 案例研究：指數基金投資者
## 認識 Kevin
Kevin 是一名大三學生，有 10,000 港元可以用於投資。他花了幾週時間觀看關於「日間交易」和「挑選下一隻大牛股」的 YouTube 影片。然而，他對其中的複雜性和失去血汗錢的風險感到不知所措。在課堂之間，他也沒有時間每小時追蹤市場動向。

## 簡單策略
在閱讀了一本關於被動投資的書後，Kevin 決定無視那些「炒作」，轉而投資於一隻追蹤標準普爾 500 指數的低成本 **交易所買賣基金 (ETF)**。他開了一個證券戶口，買入了價值 10,000 港元的 ETF。他明白，通過這樣做，他瞬間就擁有了美國 500 家最大公司的一小部分股份。

## 結果
在接下來的一年裡，股市經歷了許多起伏。一些個別股票崩盤了，而另一些則飆升。Kevin 沒有恐慌。大多數日子裡，他甚至沒有查看他的戶口。年底時，標普 500 指數上漲了 10%。Kevin 的 10,000 港元現在價值 11,000 港元。他的表現優於許多試圖「挑選贏家」的朋友，那些朋友因為時機不當和高昂的交易費用而最終虧損。

## 教訓
Kevin 了解到，**在投資中，簡單往往勝過複雜**。他意識到作為一名學生，他最大的資產是時間，而不是預測市場的能力。通過選擇分散的指數基金，他以最小的努力和成本獲得了廣泛的市場風險敞口。他現在計劃無論市場漲跌，每個月都向他的 ETF 增加 500 港元。
      `.trim(),
      [Language.ZH_CN]: `
# 案例研究：指数基金投资者
## 认识 Kevin
Kevin 是一名大三学生，有 10,000 港元可以用于投资。他花了几周时间观看关于“日间交易”和“挑选下一只大牛股”的 YouTube 视频。然而，他对其中的复杂性和失去血汗钱的风险感到不知所措。在课堂之间，他也没有时间每小时追踪市场动向。

## 简单策略
在阅读了一本关于被动投资的书后，Kevin 决定无视那些“炒作”，转而投资于一只追踪标准普尔 500 指数的低成本 **交易所买卖基金 (ETF)**。他开了一个证券账户，买入了价值 10,000 港元的 ETF。他明白，通过这样做，他瞬间就拥有了美国 500 家最大公司的一小部分股份。

## 结果
在接下来的一年里，股市经历了许多起伏。一些个别股票崩盘了，而另一些则飙升。Kevin 没有恐慌。大多数日子里，他甚至没有查看他的账户。年底时，标普 500 指数上涨了 10%。Kevin 的 10,000 港元现在价值 11,000 港元。他的表现优于许多试图“挑选赢家”的朋友，那些朋友因为时机不当和高昂的交易费用而最终亏损。

## 教训
Kevin 了解到，**在投资中，简单往往胜过复杂**。他意识到作为一名学生，他最大的资产是时间，而不是预测市场的能力。通过选择分散的指数基金，他以最小的努力和成本获得了广泛的市场风险敞口。他现在计划无论市场涨跌，每个月都向他的 ETF 增加 500 港元。
      `.trim()
    },
    cs2: {
      [Language.EN]: `
# Case Study: The Dividend Dream
## Meet Lily
Lily is a Year 2 student who likes the idea of "passive income." She wants to build a portfolio that pays her money regularly, even if she doesn't sell her shares. She is interested in the stable, blue-chip companies that are famous in Hong Kong for their consistent dividend payouts.

## The Strategy
Lily decided to focus on **Dividend Investing**. She researched companies with a long history of paying dividends, such as major banks and utility companies in Hong Kong. She understood that while these stocks might not grow as fast as tech stocks, they provide a steady stream of cash. She started by buying one "board lot" of a major HK bank using her savings.

## The Outcome
Every six months, Lily received a notification from her bank: "Dividend Credited." The first few times, it was only a few hundred dollars. But instead of spending it, Lily used the money to buy more shares of the same company (a process called **Dividend Reinvestment**). Over two years, her "income stream" grew. She felt a sense of security knowing that she was building a "money tree" that would provide for her in the future.

## The Lesson
Lily learned that **investing isn't just about price appreciation; it's about cash flow**. She realized that by focusing on high-quality dividend stocks, she was building a more resilient portfolio. She also understood the power of compounding when dividends are reinvested. She now aims to build a portfolio that will eventually cover her basic living expenses through dividends alone.
      `.trim(),
      [Language.ZH_HK]: `
# 案例研究：股息之夢
## 認識 Lily
Lily 是一名大二學生，她非常喜歡「被動收入」這個想法。她想建立一個能定期給她派錢的投資組合，即使她不賣出股份。她對那些在香港以穩定派息聞名的藍籌公司感興趣。

## 投資策略
Lily 決定專注於 **股息投資**。她研究了那些有長期派息紀錄的公司，例如香港的主要銀行和公用事業公司。她明白，雖然這些股票的增長速度可能不如科技股，但它們能提供穩定的現金流。她開始用積蓄買入了一手香港主要銀行的股份。

## 結果
每隔六個月，Lily 都會收到銀行的通知：「股息已存入」。頭幾次，只有幾百港元。但 Lily 沒有花掉它，而是用這筆錢買入更多同一家公司的股份（這個過程稱為 **股息再投資**）。兩年下來，她的「收入流」增長了。她感到很有安全感，因為她知道自己正在種植一棵「搖錢樹」，這棵樹將在未來為她提供保障。

## 教訓
Lily 了解到，**投資不僅僅是關於價格上漲，更是關於現金流**。她意識到通過專注於高質量的股息股，她正在建立一個更具韌性的投資組合。她還明白了股息再投資時複息的威力。她現在的目標是建立一個最終能僅靠股息就覆蓋她基本生活開支的投資組合。
      `.trim(),
      [Language.ZH_CN]: `
# 案例研究：股息之梦
## 认识 Lily
Lily 是一名大二学生，她非常喜欢“ passive income”这个想法。她想建立一个能定期给她派钱的投资组合，即使她不卖出股份。她对那些在香港以稳定派息闻名的蓝筹公司感兴趣。

## 投资策略
Lily 决定专注于 **股息投资**。她研究了那些有长期派息记录的公司，例如香港的主要银行和公用事业公司。她明白，虽然这些股票的增长速度可能不如科技股，但它们能提供稳定的现金流。她开始用积蓄买入了一手香港主要银行的股份。

## 结果
每隔六个月，Lily 都会收到银行的通知：“股息已存入”。头几次，只有几百港元。但 Lily 没有花掉它，而是用这笔钱买入更多同一家公司的股份（这个过程称为 **股息再投资**）。两年下来，她的“收入流”增长了。她感到很有安全感，因为她知道自己正在种植一棵“摇钱树”，这棵树将在未来为她提供保障。

## 教训
Lily 了解到，**投资不仅仅是关于价格上涨，更是关于现金流**。她意识到通过专注于高质量的股息股，她正在建立一个更具韧性的投资组合。她还明白了股息再投资时复利的威力。她现在的目标是建立一个最终能仅靠股息就覆盖她基本生活开支的投资组合。
      `.trim()
    }
  },
  'm7': {
    cs1: {
      [Language.EN]: `
# Case Study: The Diversified Duo
## Meet Mark & Nancy
Mark and Nancy are two friends who both started investing with HK$20,000. 
- **Mark** was convinced that a single tech company would "change the world." He put all HK$20,000 into that one stock. 
- **Nancy** followed the principle of **Diversification**. She split her HK$20,000 into four parts: HK$5,000 in a US tech ETF, HK$5,000 in a HK dividend ETF, HK$5,000 in a global bond fund, and HK$5,000 in a gold ETF.

## The Market Event
Six months later, a major regulatory change hit the tech sector. Mark's single stock plummeted by 40%. His HK$20,000 was now worth only HK$12,000. He felt devastated and was tempted to sell everything in a panic. Nancy's tech ETF also dropped, but her bond fund and gold ETF actually rose in value as investors sought safety. Overall, Nancy's portfolio was only down by 2%.

## The Outcome
Nancy stayed calm and even used some of her savings to buy more of the tech ETF while it was "on sale." Mark, however, was so stressed that he couldn't focus on his studies. He eventually sold his stock at the bottom, losing HK$8,000. Nancy's portfolio recovered fully within three months and eventually reached new highs.

## The Lesson
Mark and Nancy learned that **diversification is the only "free lunch" in investing**. They realized that you can't predict which sector will fail next, but you can protect yourself by not putting all your eggs in one basket. Nancy's diversified approach provided her with "emotional insurance," allowing her to stay invested during tough times.
      `.trim(),
      [Language.ZH_HK]: `
# 案例研究：分散投資二人組
## 認識 Mark 和 Nancy
Mark 和 Nancy 是兩位朋友，他們都拿著 20,000 港元開始投資。
- **Mark** 深信一家科技公司將會「改變世界」。他將全部 20,000 港元都投入了那一隻股票。
- **Nancy** 遵循了 **分散投資** 的原則。她將 20,000 港元分成四部分：5,000 港元買入美國科技 ETF，5,000 港元買入香港股息 ETF，5,000 港元買入全球債券基金，以及 5,000 港元買入黃金 ETF。

## 市場事件
六個月後，一項重大的監管變動打擊了科技行業。Mark 的那隻股票暴跌了 40%。他的 20,000 港元現在只值 12,000 港元。他感到非常沮喪，並想在恐慌中賣掉所有東西。Nancy 的科技 ETF 也下跌了，但由於投資者尋求避險，她的債券基金和黃金 ETF 反而升值了。總體而言，Nancy 的投資組合僅下跌了 2%。

## 結果
Nancy 保持冷靜，甚至動用了一些積蓄在科技 ETF 「減價」時買入更多。然而，Mark 壓力大到無法專注於學業。他最終在底部賣出了股票，損失了 8,000 港元。Nancy 的投資組合在三個月內完全恢復，並最終創下新高。

## 教訓
Mark 和 Nancy 了解到，**分散投資是投資中唯一的「免費午餐」**。他們意識到你無法預測哪個行業會下一個倒下，但你可以通過不把所有雞蛋放在同一個籃子裡來保護自己。Nancy 的分散投資方法為她提供了「情緒保險」，讓她在困難時期也能堅持投資。
      `.trim(),
      [Language.ZH_CN]: `
# 案例研究：分散投资二人组
## 认识 Mark 和 Nancy
Mark 和 Nancy 是两位朋友，他们都拿着 20,000 港元开始投资。
- **Mark** 深信一家科技公司将会“改变世界”。他将全部 20,000 港元都投入了那一只股票。
- **Nancy** 遵循了 **分散投资** 的原则。她将 20,000 港元分成四部分：5,000 港元买入美国科技 ETF，5,000 港元买入香港股息 ETF，5,000 港元买入全球债券基金，以及 5,000 港元买入黄金 ETF。

## 市场事件
六个月后，一项重大的监管变动打击了科技行业。Mark 的那只股票暴跌了 40%。他的 20,000 港元现在只值 12,000 港元。他感到非常沮丧，并想在恐慌中卖掉所有东西。Nancy 的科技 ETF 也下跌了，但由于投资者寻求避险，她的债券基金和黄金 ETF 反而升值了。总体而言，Nancy 的投资组合仅下跌了 2%。

## 结果
Nancy 保持冷静，甚至动用了一些积蓄在科技 ETF “减价”时买入更多。然而，Mark 压力大到无法专注于学业。他最终在底部卖出了股票，损失了 8,000 港元。Nancy 的投资组合在三个月内完全恢复，并最终创下新高。

## 教训
Mark 和 Nancy 了解到，**分散投资是投资中唯一的“免费午餐”**。他们意识到你无法预测哪个行业会下一个倒下，但你可以通过不把所有鸡蛋放在同一个篮子里来保护自己。Nancy 的分散投资方法为她提供了“情绪保险”，让她在困难时期也能坚持投资。
      `.trim()
    },
    cs2: {
      [Language.EN]: `
# Case Study: The Rebalancing Act
## Meet Oscar
Oscar is a Year 4 student who built a balanced portfolio of 60% stocks and 40% bonds. He understood that this mix matched his moderate risk tolerance. After a massive bull market in stocks, Oscar checked his account and found that his portfolio had shifted to 80% stocks and only 20% bonds because the stocks had grown so much faster.

## The Decision
Many of Oscar's friends told him to "let it ride" because stocks were doing so well. However, Oscar remembered the principle of **Portfolio Rebalancing**. He realized that his portfolio was now much riskier than he originally intended. If the stock market crashed, he would lose much more than he was comfortable with. He decided to sell some of his stocks and use the proceeds to buy more bonds, bringing his portfolio back to the original 60/40 split.

## The Outcome
Two months later, the stock market bubble burst, and prices dropped by 25%. Because Oscar had rebalanced, his losses were much smaller than his friends'. More importantly, because he had extra cash in bonds, he was able to buy stocks at their new, lower prices. He had effectively "sold high and bought low" without even trying to time the market.

## The Lesson
Oscar learned that **rebalancing is a disciplined way to manage risk**. He realized that a portfolio isn't a "set it and forget it" tool; it needs periodic maintenance to ensure it still aligns with your goals. He now rebalances his portfolio every six months, regardless of market conditions.
      `.trim(),
      [Language.ZH_HK]: `
# 案例研究：資產再平衡之舉
## 認識 Oscar
Oscar 是一名大四學生，他建立了一個由 60% 股票和 40% 債券組成的平衡投資組合。他明白這個比例符合他中等的風險承受能力。在經歷了一段強勁的股票牛市後，Oscar 查看了他的戶口，發現由於股票增長速度遠超債券，他的投資組合已演變為 80% 股票和僅 20% 債券。

## 決定過程
Oscar 的許多朋友都叫他「由得佢」，因為股票表現太好了。然而，Oscar 記住了 **投資組合再平衡 (Portfolio Rebalancing)** 的原則。他意識到他的投資組合現在的風險遠高於他的初衷。如果股市崩盤，他的損失將遠超他的承受範圍。他決定賣出部分股票，並用所得資金買入更多債券，使投資組合恢復到最初的 60/40 比例。

## 結果
兩個月後，股市泡沫破裂，價格下跌了 25%。由於 Oscar 進行了再平衡，他的損失比朋友們小得多。更重要的是，由於他在債券中擁有額外的現金，他能夠以更低的新價格買入股票。他實際上在沒有嘗試預測市場的情況下，實現了「高賣低買」。

## 教訓
Oscar 了解到，**再平衡是管理風險的一種紀律化方法**。他意識到投資組合並非「一勞永逸」的工具；它需要定期維護以確保仍符合你的目標。他現在每六個月就會進行一次再平衡，無論市場狀況如何。
      `.trim(),
      [Language.ZH_CN]: `
# 案例研究：资产再平衡之举
## 认识 Oscar
Oscar 是一名大四学生，他建立了一个由 60% 股票和 40% 债券组成的平衡投资组合。他明白这个比例符合他中等的风险承受能力。在经历了一段强劲的股票牛市后，Oscar 查看了他的账户，发现由于股票增长速度远超债券，他的投资组合已演变为 80% 股票和仅 20% 债券。

## 决定过程
Oscar 的许多朋友都叫他“由得佢”，因为股票表现太好了。然而，Oscar 记住了 **投资组合再平衡 (Portfolio Rebalancing)** 的原则。他意识到他的投资组合现在的风险远高于他的初衷。如果股市崩盘，他的损失将远超他的承受范围。他决定卖出部分股票，并用所得资金买入更多债券，使投资组合恢复到最初的 60/40 比例。

## 结果
两个月后，股市泡沫破裂，价格下跌了 25%。由于 Oscar 进行了再平衡，他的损失比朋友们小得多。更重要的是，由于他在债券中拥有额外的现金，他能够以更低的新价格买入股票。他实际上在没有尝试预测市场的情况下，实现了“高卖低买”。

## 教训
Oscar 了解到，**再平衡是管理风险的一种纪律化方法**。他意识到投资组合并非“一劳永逸”的工具；它需要定期维护以确保仍符合你的目标。他现在每六个月就会进行一次再平衡，无论市场状况如何。
      `.trim()
    }
  },
  'm8': {
    cs1: {
      [Language.EN]: `
# Case Study: The Consolidation King
## Meet Peter
Peter is a Year 4 student who has been very active in taking part-time jobs and internships throughout his university life. He worked at a cinema, a fast-food chain, and two different marketing agencies. Every time he started a new job, his employer opened a new **MPF (Mandatory Provident Fund)** account for him. By the time he was ready to graduate, Peter had four different MPF accounts with four different providers.

## The Problem
Peter received letters from four different banks every quarter. He found it impossible to track how much money he actually had. He also realized that he was paying management fees to four different providers, and his money was scattered across various funds that he didn't even remember choosing. He felt like his retirement savings were a "mess."

## The Solution
Peter decided to become the "Consolidation King." He used the **MPFA's e-Enquiry Portal** to find all his personal accounts. He then chose one provider that he liked (based on their app's user interface and low fund fees) and filled out a single "Scheme Consolidation Form." Within a few weeks, all his scattered funds were transferred into one single account.

## The Outcome
Peter now has one app to check his MPF balance. He can see that he has a total of HK$12,000 saved up. He also took the opportunity to review his fund choices and moved his money into a low-cost equity fund that matches his long-term growth goals. He feels much more organized and in control of his future.

## The Lesson
Peter learned that **managing your MPF is as important as earning the money**. He realized that having multiple accounts is inefficient and makes it easy to lose track of your wealth. He now plans to consolidate any new accounts immediately whenever he changes jobs in the future.
      `.trim(),
      [Language.ZH_HK]: `
# 案例研究：強積金整合之王
## 認識 Peter
Peter 是一名大四學生，在大學期間非常積極地參加兼職和實習。他曾在電影院、快餐連鎖店和兩家不同的營銷機構工作過。每次開始新工作時，僱主都會為他開一個新的 **強積金 (MPF)** 戶口。到他準備畢業時，Peter 已經在四家不同的受託人那裡擁有四個不同的強積金戶口。

## 問題所在
Peter 每季都會收到來自四家不同銀行的信件。他發現根本無法追蹤自己到底有多少錢。他還意識到自己正在向四家不同的受託人支付管理費，而且他的錢分散在各種他甚至不記得當初為何選擇的基金中。他覺得自己的退休儲蓄簡直是一團糟。

## 解決方案
Peter 決定成為「整合之王」。他利用 **積金局 (MPFA) 的個人帳戶查詢服務** 找出了自己所有的個人帳戶。然後，他選擇了一家他喜歡的受託人（基於他們的 App 界面和較低的基金收費），並填寫了一份「計劃整合表格」。幾週內，他所有分散的資金都轉入了一個單一帳戶。

## 結果
Peter 現在只需要一個 App 就能查看他的強積金餘額。他可以看到自己總共存了 12,000 港元。他還藉此機會重新檢視了基金選擇，將資金轉入了一個符合他長期增長目標的低成本股票基金。他感到生活更有條理，對未來更有掌控感。

## 教訓
Peter 了解到，**管理強積金與賺錢同樣重要**。他意識到擁有多個帳戶是低效的，而且很容易讓你失去對財富的追蹤。他現在計劃將來每次換工作時，都會立即整合任何新產生的帳戶。
      `.trim(),
      [Language.ZH_CN]: `
# 案例研究：强积金整合之王
## 认识 Peter
Peter 是一名大四学生，在大学期间非常积极地参加兼职和实习。他曾在电影院、快餐连锁店和两家不同的营销机构工作过。每次开始新工作时，雇主都会为他开一个新的 **强积金 (MPF)** 账户。到他准备毕业时，Peter 已经在四家不同的受托人那里拥有四个不同的强积金账户。

## 问题所在
Peter 每季都会收到来自四家不同银行的信件。他发现根本无法追踪自己到底有多少钱。他还意识到自己正在向四家不同的受托人支付管理费，而且他的钱分散在各种他甚至不记得当初为何选择的基金中。他觉得自己的退休储蓄简直是一团糟。

## 解决方案
Peter 决定成为“整合之王”。他利用 **积金局 (MPFA) 的个人账户查询服务** 找出了自己所有的个人账户。然后，他选择了一家他喜欢的受托人（基于他们的 App 界面和较低的基金收费），并填写了一份“计划整合表格”。几周内，他所有分散的资金都转入了一个单一账户。

## 结果
Peter 现在只需要一个 App 就能查看他的强积金余额。他可以看到自己总共存了 12,000 港元。他还借此机会重新检视了基金选择，将资金转入了一个符合他长期增长目标的低成本股票基金。他感到生活更有条理，对未来更有掌控感。

## 教训
Peter 了解到，**管理强积金与赚钱同样重要**。他意识到拥有多个账户是低效的，而且很容易让你失去对财富的追踪。他现在计划将来每次换工作时，都会立即整合任何新产生的账户。
      `.trim()
    },
    cs2: {
      [Language.EN]: `
# Case Study: The DIS Discovery
## Meet Queen
Queen is a Year 3 student who recently started a high-paying internship. When she received her first MPF statement, she noticed that 5% of her salary was being invested in a "Conservative Fund." She did some research and found that this fund had very low returns—barely enough to beat inflation—and she was still paying management fees.

## The Strategy
Queen learned about the **Default Investment Strategy (DIS)**, often called the "Core Accumulation Fund." She discovered that DIS funds have a fee cap of 0.95%, which is much lower than many active funds. She also liked that the DIS automatically adjusts the risk profile based on her age, becoming more conservative as she gets closer to retirement.

## The Change
Queen decided to move her entire MPF balance into the DIS. She realized that as a 21-year-old, she could afford to have a higher exposure to stocks for long-term growth, and the DIS provided a balanced, low-cost way to achieve this without her having to become an expert in fund selection.

## The Outcome
Over the next year, Queen's MPF grew by 8%, significantly outperforming the 1% return of her old Conservative Fund. She also felt good knowing that she wasn't overpaying for management fees. She felt like she had "hacked" the system by choosing the smart, default option.

## The Lesson
Queen learned that **the "default" isn't always bad, but you must understand it**. She realized that many people lose money in MPF simply by not looking at their fund choices. By choosing the DIS, she gained a professional, age-appropriate investment strategy at a very competitive price. She now encourages her fellow interns to check their MPF statements and consider the DIS.
      `.trim(),
      [Language.ZH_HK]: `
# 案例研究：DIS 的發現
## 認識 Queen
Queen 是一名大三學生，最近開始了一份高薪實習。當她收到第一份強積金結單時，她注意到薪水的 5% 被投資在一個「保守基金」中。她做了一些研究，發現這個基金的回報率非常低——勉強只能抵消通脹——而且她還在支付管理費。

## 投資策略
Queen 了解到了 **預設投資策略 (DIS)**，通常被稱為「核心累積基金」。她發現 DIS 基金的收費上限為 0.95%，遠低於許多主動型基金。她還很喜歡 DIS 會根據她的年齡自動調整風險概況，隨著她接近退休年齡而變得更加保守。

## 做出改變
Queen 決定將她的全部強積金餘額轉入 DIS。她意識到作為一名 21 歲的年輕人，她可以承受較高的股票風險以換取長期增長，而 DIS 提供了一種平衡且低成本的方式來實現這一目標，而無需她成為基金選擇專家。

## 結果
在接下來的一年裡，Queen 的強積金增長了 8%，遠高於舊保守基金 1% 的回報率。她還因為知道自己沒有支付過高的管理費而感到欣慰。她覺得自己通過選擇聰明的預設選項「破解」了系統。

## 教訓
Queen 了解到，**「預設」並不總是壞事，但你必須了解它**。她意識到許多人在強積金中虧錢僅僅是因為沒有查看自己的基金選擇。通過選擇 DIS，她以非常具競爭力的價格獲得了專業且符合年齡的投資策略。她現在鼓勵其他實習生也檢查他們的強積金結單並考慮 DIS。
      `.trim(),
      [Language.ZH_CN]: `
# 案例研究：DIS 的发现
## 认识 Queen
Queen 是一名大三学生，最近开始了一份高薪实习。当她收到第一份强积金结单时，她注意到薪水的 5% 被投资在一个“保守基金”中。她做了一些研究，发现这个基金的回报率非常低——勉强只能抵消通胀——而且她还在支付管理费。

## 投资策略
Queen 了解到了 **默认投资策略 (DIS)**，通常被称为“核心累积基金”。她发现 DIS 基金的收费上限为 0.95%，远低于许多主动型基金。她还很喜欢 DIS 会根据她的年龄自动调整风险概况，随着她接近退休年龄而变得更加保守。

## 做出改变
Queen 决定将她的全部强积金余额转入 DIS。她意识到作为一名 21 岁的年轻人，她可以承受较高的股票风险以换取长期增长，而 DIS 提供了一种平衡且低成本的方式来实现这一目标，而无需她成为基金选择专家。

## 结果
在接下来的一年里，Queen 的强积金增长了 8%，远高于旧保守基金 1% 的回报率。她还因为知道自己没有支付过高的管理费而感到欣慰。她觉得自己通过选择聪明的默认选项“破解”了系统。

## 教训
Queen 了解到，**“默认”并不总是坏事，但你必须了解它**。她意识到许多人在强积金中亏钱仅仅是因为没有查看自己的基金选择。通过选择 DIS，她以非常具竞争力的价格获得了专业且符合年龄的投资策略。她现在鼓励其他实习生也检查他们的强积金结单并考虑 DIS。
      `.trim()
    }
  },
  'm9': {
    cs1: {
      [Language.EN]: `
# Case Study: The VHIS Value
## Meet Rachel
Rachel is a Year 2 student who lives a very active lifestyle. She enjoys hiking and playing competitive volleyball. Her parents have basic family insurance, but Rachel wanted to ensure she had her own protection, especially since she started working part-time and earning her own money. She was particularly interested in the **Voluntary Health Insurance Scheme (VHIS)** because of its transparency and tax benefits.

## The Decision
Rachel decided to purchase a VHIS-certified "Standard Plan." She liked that the terms and conditions were standardized by the Hong Kong government, making it easy to compare across different insurance companies. The premium was around HK$2,000 a year—less than HK$170 a month.

## The Incident
A few months later, Rachel had a bad fall during a volleyball match and required minor surgery on her knee. She was able to go to a private hospital and receive immediate treatment. The total bill was HK$45,000. Because she had her VHIS plan, nearly 90% of the cost was covered. If she hadn't had insurance, she would have had to wait months for a public hospital slot or drain her entire savings.

## The Outcome
Rachel recovered quickly and was back on the court within two months. She also realized that because she was paying for her own VHIS, she could claim a tax deduction once she started her full-time career. She felt a huge sense of relief knowing that a physical accident didn't become a financial disaster.

## The Lesson
Rachel learned that **insurance is about transferring risk**. She realized that while she is young and healthy, the cost of protection is very low, but the value it provides during a crisis is immense. She now views her VHIS premium as a small, necessary "subscription fee" for her peace of mind.
      `.trim(),
      [Language.ZH_HK]: `
# 案例研究：自願醫保 (VHIS) 的價值
## 認識 Rachel
Rachel 是一名大二學生，生活方式非常活躍。她喜歡遠足和參加排球比賽。她的父母有基本的家庭保險，但 Rachel 想確保自己擁有獨立的保障，特別是自從她開始兼職賺錢後。她對 **自願醫保計劃 (VHIS)** 特別感興趣，因為它的透明度高且有稅務扣除優惠。

## 決定過程
Rachel 決定購買一份 VHIS 認可的「標準計劃」。她喜歡條款和細則由香港政府標準化，這讓她很容易在不同的保險公司之間進行比較。每年的保費約為 2,000 港元——每月不到 170 港元。

## 意外發生
幾個月後，Rachel 在一場排球比賽中摔得很重，膝蓋需要進行小手術。她能夠前往私家醫院並立即接受治療。總賬單為 45,000 港元。因為她有 VHIS 計劃，近 90% 的費用得到了報銷。如果她沒有保險，她將不得不花幾個月時間等待公立醫院的名額，或者耗盡她所有的積蓄。

## 結果
Rachel 康復很快，兩個月內就回到了球場。她還意識到，因為她是自己支付 VHIS 保費，一旦她開始全職工作，她就可以申請稅務扣除。她感到非常寬慰，因為一次身體上的意外並沒有演變成一場財務災難。

## 教訓
Rachel 了解到，**保險的核心在於轉移風險**。她意識到雖然自己年輕健康，保障成本很低，但它在危機期間提供的價值是巨大的。她現在將 VHIS 保費視為為了換取安心而支付的一筆小額、必要的「訂閱費」。
      `.trim(),
      [Language.ZH_CN]: `
# 案例研究：自愿医保 (VHIS) 的价值
## 认识 Rachel
Rachel 是一名大二学生，生活方式非常活跃。她喜欢远足和参加排球比赛。她的父母有基本的家庭保险，但 Rachel 想确保自己拥有独立的保障，特别是自从她开始兼职赚钱后。她对 **自愿医保计划 (VHIS)** 特别感兴趣，因为它的透明度高且有税务扣除优惠。

## 决定过程
Rachel 决定购买一份 VHIS 认可的“标准计划”。她喜欢条款和细则由香港政府标准化，这让她很容易在不同的保险公司之间进行比较。每年的保费约为 2,000 港元——每月不到 170 港元。

## 意外发生
几个月后，Rachel 在一场排球比赛中摔得很重，膝盖需要进行小手术。她能够前往私立医院并立即接受治疗。总账单为 45,000 港元。因为她有 VHIS 计划，近 90% 的费用得到了报销。如果她没有保险，她将不得不花几个月时间等待公立医院的名额，或者耗尽她所有的积蓄。

## 结果
Rachel 康复很快，两个月内就回到了球场。她还意识到，因为她是自己支付 VHIS 保费，一旦她开始全职工作，她就可以申请税务扣除。她感到非常宽慰，因为一次身体上的意外并没有演变成一场财务灾难。

## 教训
Rachel 了解到，**保险的核心在于转移风险**。她意识到虽然自己年轻健康，保障成本很低，但它在危机期间提供的价值是巨大的。她现在将 VHIS 保费视为为了换取安心而支付的一笔小额、必要的“订阅费”。
      `.trim()
    },
    cs2: {
      [Language.EN]: `
# Case Study: The Term vs. Whole Life Debate
## Meet Steven
Steven is a Year 4 student who was approached by an insurance agent who tried to sell him a "Whole Life" insurance policy with a "savings" element. The agent promised that Steven would get his money back with interest after 20 years. However, the premium was HK$1,500 a month, which was nearly 40% of Steven's part-time income.

## The Research
Steven felt pressured, so he decided to do his own research. He learned about **Term Life Insurance**, which provides pure protection without the savings element. He found that a Term Life policy with the same coverage amount would only cost him HK$150 a month.

## The Strategy
Steven decided to follow the strategy: **"Buy Term and Invest the Difference."** He bought the Term Life policy for HK$150 and committed to investing the remaining HK$1,350 into a low-cost ETF every month. He realized that by doing this, he had better protection and more control over his investments, and he wasn't locked into a high-premium contract for decades.

## The Outcome
Five years later, Steven's ETF portfolio had grown significantly, far outperforming the "guaranteed" returns promised by the Whole Life policy. He also had the flexibility to stop or change his investments if his life circumstances changed, which he wouldn't have had with the Whole Life policy.

## The Lesson
Steven learned that **insurance and investing are two different tools**. He realized that "bundled" products often have high fees and low flexibility. By separating his protection needs from his investment goals, he achieved better results and maintained control over his financial future. He now advises his friends to always ask for a "Term" quote before committing to any life insurance policy.
      `.trim(),
      [Language.ZH_HK]: `
# 案例研究：定期 vs 終身壽險之辯
## 認識 Steven
Steven 是一名大四學生，一位保險代理向他推銷一份帶有「儲蓄」成分的「終身壽險」保單。代理承諾 Steven 在 20 年後可以連本帶利取回資金。然而，保費每月高達 1,500 港元，幾乎佔了 Steven 兼職收入的 40%。

## 研究過程
Steven 感到壓力，於是決定自己做研究。他了解到了 **定期壽險 (Term Life Insurance)**，這種保險提供純粹的保障，沒有儲蓄成分。他發現一份保額相同的定期壽險保單每月只需 150 港元。

## 策略選擇
Steven 決定採用 **「買定期，投差價」(Buy Term and Invest the Difference)** 的策略。他以 150 港元購買了定期壽險，並承諾每月將剩餘的 1,350 港元投入低成本 ETF。他意識到這樣做不僅獲得了更好的保障，還能更靈活地掌控投資，而且不會被鎖定在長達數十年的高保費合約中。

## 結果
五年後，Steven 的 ETF 投資組合大幅增長，遠遠超過了終身壽險保單所承諾的「保證」回報。他還擁有在生活環境改變時停止或更改投資的靈活性，而這是終身壽險保單所不具備的。

## 教訓
Steven 了解到，**保險和投資是兩種不同的工具**。他意識到「捆綁式」產品通常費用較高且靈活性較低。通過將保障需求與投資目標分開，他獲得了更好的結果，並保持了對自己財務未來的掌控。他現在建議朋友們在購買任何人壽保險之前，一定要先詢問「定期」壽險的報價。
      `.trim(),
      [Language.ZH_CN]: `
# 案例研究：定期 vs 终身寿险之辩
## 认识 Steven
Steven 是一名大四学生，一位保险代理向他推销一份带有“储蓄”成分的“终身寿险”保单。代理承诺 Steven 在 20 年后可以连本带利取回资金。然而，保费每月高达 1,500 港元，几乎占了 Steven 兼职收入的 40%。

## 研究过程
Steven 感到压力，于是决定自己做研究。他了解到了 **定期寿险 (Term Life Insurance)**，这种保险提供纯粹的保障，没有储蓄成分。他发现一份保额相同的定期寿险保单每月只需 150 港元。

## 策略选择
Steven 决定采用 **“买定期，投差价”(Buy Term and Invest the Difference)** 的策略。他以 150 港元购买了定期寿险，并承诺每月将剩余的 1,350 港元投入低成本 ETF。他意识到这样做不仅获得了更好的保障，还能更灵活地掌控投资，而且不会被锁定在长达数十年的高保费合约中。

## 结果
五年后，Steven 的 ETF 投资组合大幅增长，远远超过了终身寿险保单所承诺的“保证”回报。他还拥有在生活环境改变时停止或更改投资的灵活性，而这是终身寿险保单所不具备的。

## 教训
Steven 了解到，**保险和投资是两种不同的工具**。他意识到“捆绑式”产品通常费用较高且灵活性较低。通过将保障需求与投资目标分开，他获得了更好的结果，并保持了对自己财务未来的掌控。他现在建议朋友们在购买任何人寿保险之前，一定要先询问“定期”寿险的报价。
      `.trim()
    }
  },
  'm10': {
    cs1: {
      [Language.EN]: `
# Case Study: The Career Starter Plan
## Meet Tina
Tina is a final-year student who just signed her first full-time job contract. Her starting salary is HK$18,000. She is excited but also worried about how to manage her new income. She remembers the "Financial Planning" module and decides to create a comprehensive plan before her first day of work.

## The Plan
Tina sat down and followed a step-by-step planning process:
1.  **Define Goals:** She wants to save HK$100,000 for a masters degree in three years and also start an emergency fund.
2.  **Budgeting (50/30/20):** She allocated HK$9,000 for needs (rent, food, transport), HK$5,400 for wants (hobbies, dining out), and HK$3,600 for savings and debt repayment.
3.  **Risk Management:** She signed up for a VHIS plan for HK$200 a month.
4.  **Investing:** She decided to put HK$2,000 of her savings into a diversified ETF every month.

## The Outcome
Six months into her job, Tina felt a sense of calm that many of her colleagues lacked. While they were "living paycheck to paycheck," Tina already had HK$20,000 in her emergency fund and HK$12,000 in her investment account. She knew exactly where her money was going and felt confident that she was on track for her masters degree.

## The Lesson
Tina learned that **a good plan is a roadmap to freedom**. She realized that by making decisions early, she avoided the "lifestyle creep" that often happens when people start earning more. She now reviews her plan every quarter to adjust for any changes in her income or goals.
      `.trim(),
      [Language.ZH_HK]: `
# 案例研究：職場新人的理財藍圖
## 認識 Tina
Tina 是一名應屆畢業生，剛剛簽署了她的第一份全職工作合約，起薪點為 18,000 港元。她既興奮又擔心如何管理這份新收入。她想起了「財務策劃」模組，決定在上班第一天之前制定一個全面的計劃。

## 策劃過程
Tina 坐下來，按照步驟進行策劃：
1.  **設定目標：** 她想在三年內存夠 100,000 港元讀碩士學位，同時建立應急基金。
2.  **預算分配 (50/30/20)：** 她將 9,000 港元分配給「需要」（租金、食物、交通），5,400 港元分配給「想要」（愛好、聚餐），剩餘的 3,600 港元用於儲蓄和還債。
3.  **風險管理：** 她參加了一份每月 200 港元的自願醫保 (VHIS) 計劃。
4.  **投資安排：** 她決定每月將儲蓄中的 2,000 港元投入分散的 ETF。

## 結果
工作六個月後，Tina 擁有一種許多同事所缺乏的平靜感。當同事們還在過著「月光族」的生活時，Tina 的應急基金已有 20,000 港元，投資戶口也有 12,000 港元。她清楚地知道每一分錢的去向，並對三年後讀碩士的目標充滿信心。

## 教訓
Tina 了解到，**一個好的計劃就是通往自由的路線圖**。她意識到通過及早做出決定，她成功避免了人們在收入增加時常犯的「生活方式通脹」錯誤。她現在每季都會檢視一次計劃，以根據收入或目標的變化進行調整。
      `.trim(),
      [Language.ZH_CN]: `
# 案例研究：职场新人的理财蓝图
## 认识 Tina
Tina 是一名应届毕业生，刚刚签署了她的第一份全职工作合约，起薪点为 18,000 港元。她既兴奋又担心如何管理这份新收入。她想起了“财务策划”模块，决定在上班第一天之前制定一个全面的计划。

## 策划过程
Tina 坐下来，按照步骤进行策划：
1.  **设定目标：** 她想在三年内存够 100,000 港元读硕士学位，同时建立应急基金。
2.  **预算分配 (50/30/20)：** 她将 9,000 港元分配给“需要”（租金、食物、交通），5,400 港元分配给“想要”（爱好、聚餐），剩余的 3,600 港元用于储蓄和还债。
3.  **风险管理：** 她参加了一份每月 200 港元的自愿医保 (VHIS) 计划。
4.  **投资安排：** 她决定每月将储蓄中的 2,000 港元投入分散的 ETF。

## 结果
工作六个月后，Tina 拥有一种许多同事所缺乏的平静感。当同事们还在过着“月光族”的生活时，Tina 的应急基金已有 20,000 港元，投资账户已有 12,000 港元。她清楚地知道每一分钱的去向，并对三年后读硕士的目标充满信心。

## 教训
Tina 了解到，**一个好的计划就是通往自由的路线图**。她意识到通过及早做出决定，她成功避免了人们在收入增加时常犯的“生活方式通胀”错误。她现在每季都会检视一次计划，以根据收入或目标的文化进行调整。
      `.trim()
    },
    cs2: {
      [Language.EN]: `
# Case Study: The Early Retirement Vision
## Meet Victor
Victor is a Year 3 student who is inspired by the **FIRE (Financial Independence, Retire Early)** movement. He doesn't want to work until he is 65; he wants to have the option to pursue his passions by the time he is 45. He knows that this requires a very disciplined financial plan and a high savings rate.

## The Strategy
Victor calculated his "FIRE Number"—the amount of money he needs to live off his investments forever. He realized that to reach this goal in 20 years, he needs to save at least 40% of his future income. He started practicing "frugal living" now as a student to prepare himself. He also focused on learning high-income skills so he can maximize his earning potential after graduation.

## The Action
Victor created a "Wealth Dashboard" where he tracks his net worth every month. Even with his small part-time income, he is already investing HK$1,000 a month. He understands that the most important factor in his plan is **time and consistency**. He avoids expensive "status symbols" like luxury watches or cars, focusing instead on buying "income-producing assets."

## The Outcome
While his friends are focused on the next big party or the latest iPhone, Victor feels a deep sense of purpose. He knows that every dollar he saves today is a "worker" that will earn him money in the future. He feels empowered by his long-term vision and isn't swayed by short-term market fluctuations or social pressure to spend.

## The Lesson
Victor learned that **financial planning is about values, not just numbers**. He realized that by defining what "enough" looks like for him, he gained a level of freedom that most people never experience. He now views every financial decision through the lens of his 45-year-old self, ensuring that his current actions align with his ultimate dream of independence.
      `.trim(),
      [Language.ZH_HK]: `
# 案例研究：早日退休的願景
## 認識 Victor
Victor 是一名大三學生，他深受 **FIRE (財務獨立，提早退休)** 運動的啟發。他不想工作到 65 歲；他希望在 45 歲時就能擁有追求夢想的選擇權。他知道這需要極其自律的財務計劃和極高的儲蓄率。

## 策略制定
Victor 計算了他的「FIRE 數字」——即僅靠投資回報就能維持生活所需的資金總額。他意識到要在 20 年內實現這個目標，他需要存下未來收入的至少 40%。為了做好準備，他現在作為學生就開始練習「簡約生活」。他還專注於學習高收入技能，以便在畢業後最大化他的賺錢潛力。

## 採取行動
Victor 建立了一個「財富儀表板」，每月追蹤自己的淨資產。即使只有微薄的兼職收入，他現在每月也堅持投資 1,000 港元。他明白計劃中最重要的因素是 **時間和一致性**。他避免購買昂貴的「身份象徵」（如名錶或名車），而是專注於購買「能產生收入的資產」。

## 結果
當朋友們還在關注下一場大型派對或最新的 iPhone 時，Victor 感到有一種深刻的使命感。他知道今天存下的每一塊錢都是一個未來的「工人」，會為他賺錢。他被自己的長期願景賦予了力量，不會被短期的市場波動或社交壓力所動搖。

## 教訓
Victor 了解到，**財務策劃關乎價值觀，而不僅僅是數字**。他意識到通過定義對自己來說什麼是「足夠」，他獲得了一種大多數人從未體驗過的自由。他現在會從 45 歲的自己的角度來審視每一個財務決定，確保目前的行動與他最終的獨立夢想一致。
      `.trim(),
      [Language.ZH_CN]: `
# 案例研究：早日退休的愿景
## 认识 Victor
Victor 是一名大三学生，他深受 **FIRE (财务独立，提早退休)** 运动的启发。他不想工作到 65 岁；他希望在 45 岁时就能拥有追求梦想的选择权。他知道这需要极其自律的财务计划和极高的储蓄率。

## 策略制定
Victor 计算了他的“FIRE 数字”——即仅靠投资回报就能维持生活所需的资金总额。他意识到要在 20 年内实现这个目标，他需要存下未来收入的至少 40%。为了做好准备，他现在作为学生就开始练习“简约生活”。他还专注于学习高收入技能，以便在毕业后最大化他的赚钱潜力。

## 采取行动
Victor 建立了一个“财富仪表板”，每月追踪自己的净资产。即使只有微薄的兼职收入，他现在每月也坚持投资 1,000 港元。他明白计划中最重要的因素是 **时间和一致性**。他避免购买昂贵的“身份象征”（如名表或名车），而是专注于购买“能产生收入的资产”。

## 结果
当朋友们还在关注下一场大型派对或最新的 iPhone 时，Victor 感到有一种深刻的使命感。他知道今天存下的每一块钱都是一个未来的“工人”，会为他赚钱。他被自己的长期愿景赋予了力量，不会被短期的市场波动或社交压力所动摇。

## 教训
Victor 了解到，**财务策划关乎价值观，而不仅仅是数字**。他意识到通过定义对自己来说什么是“足够”，他获得了一种大多数人从未体验过的自由。他现在会从 45 岁的自己的角度来审视每一个财务决定，确保目前的行动与他最终的独立梦想一致。
      `.trim()
    }
  }
};

const generateTeachingNoteTemplate = (title: string, topic: string, lang: Language): string => {
  const isEn = lang === Language.EN;
  const isHk = lang === Language.ZH_HK;
  
  if (isEn) {
    return `
# Teaching Note: ${title}
## Introduction
${title} is a critical pillar of ${topic} for any student living in Hong Kong. In our fast-paced economy, mastering this concept is not just an academic exercise but a survival skill. Whether you are managing your first part-time salary or planning for a post-graduation career, understanding the mechanics of ${title} will set you apart from your peers.

## Key Principles & Mechanics
To fully grasp ${title}, one must understand that it operates on several core principles. First, it requires a disciplined approach to data collection—knowing exactly where your money comes from and where it goes. Second, it involves the application of logical frameworks (like the 50/30/20 rule or SMART goals) to ensure that your financial decisions are based on data rather than emotion.

In the context of ${topic}, ${title} serves as the bridge between your current financial reality and your future aspirations. It involves calculating opportunity costs, understanding the time value of money, and recognizing the impact of external factors like inflation and market volatility.

## Practical Examples in Hong Kong
Consider a typical university student in HK. You likely use an **Octopus card** for daily transit and small purchases. Every time you tap that card, you are engaging with ${title}. If you don't track these "micro-transactions," they can easily add up to thousands of dollars a month. 

Another example is the **MPF (Mandatory Provident Fund)**. Even as a part-time worker, you might see 5% of your income deducted. Understanding ${title} means knowing how that 5% is being invested and what it means for your retirement decades from now. Furthermore, for those with **TSFS or NLSPS student loans**, ${title} is the key to managing repayments without falling into a debt trap.

## Common Pitfalls for Students
1. **The "Small Purchase" Trap:** Thinking that a $40 coffee or a $20 snack doesn't matter. Over a month, these can consume a significant portion of a student budget.
2. **Ignoring Inflation:** Assuming that $1,000 today will have the same purchasing power in 5 years. In HK's high-inflation environment, this is a dangerous assumption.
3. **Emotional Spending:** Using shopping or expensive meals as a stress-reliever after exams without checking your ${topic} plan.

## Summary & Actionable Advice
Mastering ${title} requires consistency. Start by documenting every transaction for one week. Use a local HK banking app or a simple spreadsheet to categorize your spending. By the end of the month, you will have a clear "Teaching Note" of your own financial behavior, allowing you to make the adjustments necessary for long-term success.
    `.trim();
  }

  if (isHk) {
    return `
# 教學筆記：${title}
## 引言
在香港生活的任何學生來說，${title} 都是 ${topic} 的重要支柱。在我們快節奏的經濟中，掌握這個概念不僅僅是一項學術練習，更是一項生存技能。無論你是在管理你的第一份兼職薪水，還是在為畢業後的職業生涯做規劃，了解 ${title} 的運作機制都會讓你脫穎而出。

## 核心原則與機制
要充分掌握 ${title}，必須理解它基於幾個核心原則。首先，它需要一種紀律嚴明數據收集方法——準確知道你的錢從哪裡來，到哪裡去。其次，它涉及邏輯框架的應用（如 50/30/20 法則或 SMART 目標），以確保你的理財決定是基於數據而非情緒。

在 ${topic} 的背景下，${title} 是你目前的財務現實與未來抱負之間的橋樑。它涉及計算機會成本、了解金錢的時間價值，以及認識通脹和市場波動等外部因素的影響。

## 香港實際案例
考慮一個典型的香港大學生。你可能每天使用 **八達通** 進行交通和微額消費。每次拍卡時，你都在與 ${title} 互動。如果你不記錄這些「微交易」，它們每個月很容易累積到數千元。

另一個例子是 **強積金 (MPF)**。即使是兼職工作，你可能會看到收入的 5% 被扣除。了解 ${title} 意味著知道這 5% 是如何投資的，以及它對你幾十年後的退休生活意味著什麼。此外，對於那些擁有 **TSFS 或 NLSPS 學生貸款** 的人來說，${title} 是管理還款而不陷入債務陷阱的關鍵。

## 學生常見陷阱
1. **「小額消費」陷阱：** 認為 40 元的咖啡或 20 元的零食無關緊要。一個月下來，這些消費可能會佔據學生預算的很大一部分。
2. **忽視通脹：** 假設今天的 1,000 元在 5 年後具有相同的購買力。在香港的高通脹環境下，這是一個危險的假設。
3. **情緒化消費：** 在考試後將購物或昂貴的餐飲作為減壓手段，而沒有檢查你的 ${topic} 計劃。

## 總結與行動建議
掌握 ${title} 需要持之以恆。首先記錄一週內的每一筆交易。使用本地銀行 App 或簡單的電子表格對你的支出進行分類。到月底，你將對自己的理財行為有一份清晰的「教學筆記」，讓你能夠做出長期成功所需的調整。
    `.trim();
  }

  // Simplified Chinese fallback
  return `
# 教学笔记：${title}
## 引言
对于在香港生活的任何学生来说，${title} 都是 ${topic} 的重要支柱。在我们快节奏的经济中，掌握这个概念不仅仅是一项学术练习，更是一项生存技能。无论你是在管理你的第一份兼职薪水，还是在为毕业后的职业生涯做规划，了解 ${title} 的运作机制都会让你脱颖而出。

## 核心原则与机制
要充分掌握 ${title}，必须理解它基于几个核心原则。首先，它需要一种纪律严明的数据收集方法——准确知道你的钱从哪里来，到哪里去。其次，它涉及逻辑框架的应用（如 50/30/20 法则或 SMART 目标），以确保你的理财决定是基于数据而非情绪。

在 ${topic} 的背景下，${title} 是你目前的财务现实与未来抱负之间的桥梁。它涉及计算机会成本、了解金钱的时间价值，以及认识通胀和市场波动等外部因素的影响。

## 香港实际案例
考虑一个典型的香港大学生。你可能每天使用 **八达通** 进行交通和微额消费。每次拍卡时，你都在与 ${title} 互动。如果你不记录这些“微交易”，它们每个月很容易累积到数千元。

另一个例子是 **强积金 (MPF)**。即使是兼职工作，你可能会看到收入的 5% 被扣除。了解 ${title} 意味着知道这 5% 是如何投资的，以及它对你几十年后的退休生活意味着什么。此外，对于那些拥有 **TSFS 或 NLSPS 学生贷款** 的人来说，${title} 是管理还款而不陷入债务陷阱的关键。

## 学生常见陷阱
1. **“小额消费”陷阱：** 认为 40 元的咖啡或 20 元的零食无关紧要。一个月下来，这些消费可能会占据学生预算的很大一部分。
2. **忽视通胀：** 假设今天的 1,000 元在 5 年后具有相同的购买力。在香港的高通胀环境下，这是一个危险的假设。
3. **情绪化消费：** 在考试后将购物或昂贵的餐饮作为减压手段，而没有检查你的 ${topic} 计划。

## 总结与行动建议
掌握 ${title} 需要持之以恒。首先记录一周内的每一笔交易。使用本地银行 App 或简单的电子表格对你的支出进行分类。到月底，你将对自己的理财行为有一份清晰的“教学笔记”，让你能够做出长期成功所需的调整。
  `.trim();
};

const generateModulePages = (config: ModuleContentConfig): ModulePage[] => {
  const pages: ModulePage[] = [];
  
  for (let i = 0; i < 20; i++) {
    const titleEn = config.chaptersEn[i] || `${config.topicEn} Concept ${i + 1}`;
    const titleHk = config.chaptersHk[i] || `${config.topicHk} 概念 ${i + 1}`;
    const titleCn = config.chaptersCn[i] || `${config.topicCn} 概念 ${i + 1}`;

    // Check if we have a specific explanation for this chapter title
    const specificExp = TOPIC_EXPLANATIONS[titleEn];

    pages.push({
      id: `${config.id}_p${i + 1}`,
      type: 'content',
      title: { 
        [Language.EN]: `${i + 1}. ${titleEn}`, 
        [Language.ZH_HK]: `${i + 1}. ${titleHk}`, 
        [Language.ZH_CN]: `${i + 1}. ${titleCn}` 
      },
      content: specificExp || {
        [Language.EN]: generateTeachingNoteTemplate(titleEn, config.topicEn, Language.EN),
        [Language.ZH_HK]: generateTeachingNoteTemplate(titleHk, config.topicHk, Language.ZH_HK),
        [Language.ZH_CN]: generateTeachingNoteTemplate(titleCn, config.topicCn, Language.ZH_CN)
      }
    });
  }

  // 2. Generate 2 Specific Case Studies
  const moduleCaseStudies = CASE_STUDIES[config.id];

  pages.push({
    id: `${config.id}_cs1`,
    type: 'case_study',
    title: { [Language.EN]: "Case Study 1", [Language.ZH_HK]: "案例研究 1", [Language.ZH_CN]: "案例研究 1" },
    content: moduleCaseStudies?.cs1 || {
      [Language.EN]: `Meet Alex, a student who mastered **${config.topicEn}**.\n\nInstead of ignoring the details, Alex spent time learning about ${config.chaptersEn[0] || 'the basics'}. When faced with a financial decision, Alex applied the 50/30/20 rule and consulted trusted sources.\n\n**Outcome:**\nAlex built a solid financial foundation and avoided common traps.`,
      [Language.ZH_HK]: `認識 Alex，一位掌握了 **${config.topicHk}** 的學生。\n\nAlex 沒有忽視細節，而是花時間學習了 ${config.chaptersHk[0] || '基礎知識'}。當面臨理財決定時，Alex 應用了 50/30/20 法則並諮詢了可靠的來源。\n\n**結果：**\nAlex 建立了穩固的財務基礎，避免了常見的陷阱。`,
      [Language.ZH_CN]: `认识 Alex，一位掌握了 **${config.topicCn}** 的学生。\n\nAlex 没有忽视细节，而是花时间学习了 ${config.chaptersCn[0] || '基础知识'}。当面临理财决定时，Alex 应用了 50/30/20 法则并咨询了可靠的来源。\n\n**结果：**\nAlex 建立了稳固的财务基础，避免了常见的陷阱。`
    }
  });

  pages.push({
    id: `${config.id}_cs2`,
    type: 'case_study',
    title: { [Language.EN]: "Case Study 2", [Language.ZH_HK]: "案例研究 2", [Language.ZH_CN]: "案例研究 2" },
    content: moduleCaseStudies?.cs2 || {
      [Language.EN]: `Meet Sam, who neglected **${config.topicEn}**.\n\nSam thought this topic was "boring" and skipped the lessons on ${config.chaptersEn[1] || 'advanced concepts'}. Without a plan, Sam made emotional decisions based on short-term desires rather than long-term logic.\n\n**Lesson:**\nIgnorance in ${config.topicEn} often results in lost opportunities and financial stress.`,
      [Language.ZH_HK]: `認識 Sam，他忽視了 **${config.topicHk}**。\n\nSam 覺得這個主題很「沉悶」，跳過了關於 ${config.chaptersHk[1] || '進階概念'} 的課程。由於沒有計劃，Sam 根據短期慾望而非長期邏輯做出了情緒化的決定。\n\n**教訓：**\n對 ${config.topicHk} 的無知往往導致錯失良機和財務壓力。`,
      [Language.ZH_CN]: `认识 Sam，他忽视了 **${config.topicCn}**。\n\nSam 觉得这个主题很「沉闷」，跳过了关于 ${config.chaptersCn[1] || '进阶概念'} 的课程。由于没有计划，Sam 根据短期欲望而非长期逻辑做出了情绪化的决定。\n\n**教训：**\n对 ${config.topicCn} 的无知往往导致错失良机和财务压力。`
    }
  });

  // 3. Generate 1 Highlight Page (Recap)
  pages.push({
    id: `${config.id}_sum`,
    type: 'highlight',
    title: { [Language.EN]: "Module Recap", [Language.ZH_HK]: "單元總結", [Language.ZH_CN]: "单元总结" },
    content: {
      [Language.EN]: config.highlightsEn,
      [Language.ZH_HK]: config.highlightsHk,
      [Language.ZH_CN]: config.highlightsCn
    }
  });

  return pages;
};

// --- DATA CONFIGURATIONS (M2 - M10) ---

const M2_CONFIG: ModuleContentConfig = {
  id: 'm2',
  topicEn: "Financial Goals", topicHk: "理財目標", topicCn: "理财目标",
  chaptersEn: ["Why Goals Matter", "SMART Framework", "Specific Goals", "Measurable Metrics", "Achievable Targets", "Relevant Focus", "Time-bound Deadlines", "Short-term Goals", "Medium-term Goals", "Long-term Goals", "Inflation Impact", "Visualizing Success", "Writing it Down", "Accountability Partners", "Reviewing Progress", "Adjusting Course", "Psychology of Saving", "Delayed Gratification", "Reward Systems", "Staying Motivated"],
  chaptersHk: ["為何目標重要", "SMART 框架", "具體目標 (Specific)", "可衡量指標 (Measurable)", "可達成目標 (Achievable)", "相關性 (Relevant)", "有時限 (Time-bound)", "短期目標", "中期目標", "長期目標", "通脹影響", "具象化成功", "寫下目標", "問責夥伴", "檢討進度", "調整方向", "儲蓄心理學", "延遲滿足", "獎勵機制", "保持動力"],
  chaptersCn: ["为何目标重要", "SMART 框架", "具体目标 (Specific)", "可衡量指标 (Measurable)", "可达成目标 (Achievable)", "相关性 (Relevant)", "有时限 (Time-bound)", "短期目标", "中期目标", "长期目标", "通胀影响", "具象化成功", "写下目标", "问责伙伴", "检讨进度", "调整方向", "储蓄心理学", "延迟满足", "奖励机制", "保持动力"],
  highlightsEn: [ "Goals must be S.M.A.R.T.", "Write goals down to increase success.", "Break big goals into milestones.", "Factor in inflation.", "Review every 6 months.", "Focus on the 'Why'." ],
  highlightsHk: [ "目標必須是 S.M.A.R.T。", "寫下目標提高成功率。", "將大目標分解為里程碑。", "計入通脹因素。", "每 6 個月檢討一次。", "專注於「為什麼」。" ],
  highlightsCn: [ "目标必须是 S.M.A.R.T。", "写下目标提高成功率。", "将大目标分解为里程碑。", "计入通胀因素。", "每 6 个月检讨一次。", "专注于「为什么」。" ]
};

const M3_CONFIG: ModuleContentConfig = {
  id: 'm3',
  topicEn: "Budgeting", topicHk: "預算管理", topicCn: "预算管理",
  chaptersEn: ["The Budgeting Mindset", "Income Sources", "Fixed Expenses", "Variable Expenses", "The 50/30/20 Rule", "Needs (50%)", "Wants (30%)", "Savings (20%)", "Tracking Methods", "Using Apps", "Spreadsheet Method", "Envelope System", "Zero-based Budgeting", "Reducing Waste", "The Latte Factor", "Student Discounts", "Reviewing Habits", "Handling Irregular Income", "Emergency Buffers", "Staying Consistent"],
  chaptersHk: ["預算心態", "收入來源", "固定開支", "變動開支", "50/30/20 法則", "需要 (50%)", "想要 (30%)", "儲蓄 (20%)", "記賬方法", "使用 App", "電子表格法", "信封理財法", "零基預算", "減少浪費", "拿鐵因子", "學生優惠", "檢討習慣", "處理不穩定收入", "緊急緩衝", "保持一致"],
  chaptersCn: ["预算心态", "收入来源", "固定开支", "变动开支", "50/30/20 法则", "需要 (50%)", "想要 (30%)", "储蓄 (20%)", "记账方法", "使用 App", "电子表格法", "信封理财法", "零基预算", "减少浪费", "拿铁因子", "学生优惠", "检讨习惯", "处理不稳定收入", "紧急缓冲", "保持一致"],
  highlightsEn: [ "Use 50/30/20 Rule.", "Track every expense.", "Distinguish Needs vs Wants.", "Pay yourself first.", "Zero-based budgeting.", "Watch small daily expenses." ],
  highlightsHk: [ "使用 50/30/20 法則。", "記錄每一筆開支。", "區分需要與想要。", "先支付給自己。", "零基預算。", "留意日常小額開支。" ],
  highlightsCn: [ "使用 50/30/20 法则。", "记录每一笔开支。", "区分需要与想要。", "先支付给自己。", "零基预算。", "留意日常小额开支。" ]
};

const M4_CONFIG: ModuleContentConfig = {
  id: 'm4',
  topicEn: "Savings", topicHk: "儲蓄", topicCn: "储蓄",
  chaptersEn: ["Why Save?", "The Emergency Fund", "How Much is Enough?", "Where to Keep It", "Compound Interest Magic", "Time vs Money", "Rule of 72", "High Yield Accounts", "Time Deposits", "Inflation Risk", "Automating Savings", "Saving Challenges", "Cutting Subscriptions", "Bulk Buying", "Cooking vs Eating Out", "Second-hand Markets", "Selling Unused Items", "Windfall Management", "Saving for Travel", "Financial Freedom"],
  chaptersHk: ["為何儲蓄？", "應急基金", "多少才夠？", "存放位置", "複息效應", "時間 vs 金錢", "72 法則", "高息戶口", "定期存款", "通脹風險", "自動化儲蓄", "儲蓄挑戰", "削減訂閱", "批量購買", "煮飯 vs 外出用餐", "二手市場", "出售閒置物品", "意外之財管理", "為旅遊儲蓄", "財務自由"],
  chaptersCn: ["为何储蓄？", "应急基金", "多少才够？", "存放位置", "复息效应", "时间 vs 金钱", "72 法则", "高息户口", "定期存款", "通胀风险", "自动化储蓄", "储蓄挑战", "削减订阅", "批量购买", "煮饭 vs 外出用餐", "二手市场", "出售闲置物品", "意外之财管理", "为旅游储蓄", "财务自由"],
  highlightsEn: [ "Build 3-6 months Emergency Fund.", "Compound interest is powerful.", "Start early.", "Automate transfers.", "Keep funds liquid but separate.", "Save 20% of income." ],
  highlightsHk: [ "建立 3-6 個月應急基金。", "複息效應強大。", "儘早開始。", "自動化轉賬。", "保持資金流動但分開。", "儲蓄 20% 收入。" ],
  highlightsCn: [ "建立 3-6 个月应急基金。", "复息效应强大。", "尽早开始。", "自动化转账。", "保持资金流动但分开。", "储蓄 20% 收入。" ]
};

const M5_CONFIG: ModuleContentConfig = {
  id: 'm5',
  topicEn: "Debt & Credit", topicHk: "債務與信貸", topicCn: "债务与信贷",
  chaptersEn: ["What is Credit?", "Good Debt vs Bad Debt", "Student Loans", "Credit Cards Explained", "Interest Rates (APR)", "Minimum Payments Trap", "Credit Score (TU)", "Building Score", "Factors Affecting Score", "Checking Report", "Buy Now Pay Later", "Personal Loans", "Tax Loans", "Snowball Method", "Avalanche Method", "Consolidation", "Bankruptcy", "Avoiding Sharks", "Responsible Usage", "Freedom"],
  chaptersHk: ["甚麼是信貸？", "好債 vs 壞債", "學生貸款", "信用卡詳解", "年利率 (APR)", "最低還款陷阱", "信貸評分 (TU)", "建立評分", "影響評分因素", "查閱報告", "先買後付", "私人貸款", "稅務貸款", "雪球還債法", "雪崩還債法", "債務重組", "破產", "避開大耳窿", "負責任使用", "自由"],
  chaptersCn: ["什么是信贷？", "好债 vs 坏债", "学生贷款", "信用卡详解", "年利率 (APR)", "最低还款陷阱", "信贷评分 (TU)", "建立评分", "影响评分因素", "查阅报告", "先买后付", "私人贷款", "税务贷款", "雪球还债法", "雪崩还债法", "债务重组", "破产", "避开大耳窿", "负责任使用", "自由"],
  highlightsEn: [ "Never pay only Minimum Payment.", "Understand APR.", "Credit Score matters.", "Good debt builds assets.", "Pay bills on time.", "Avoid Buy Now Pay Later." ],
  highlightsHk: [ "絕不只付最低還款額。", "了解 APR。", "信貸評分很重要。", "好債建立資產。", "準時繳費。", "避免先買後付。" ],
  highlightsCn: [ "绝不只付最低还款额。", "了解 APR。", "信贷评分很重要。", "好债建立资产。", "准时缴费。", "避免先买后付。" ]
};

const M6_CONFIG: ModuleContentConfig = {
  id: 'm6',
  topicEn: "Investing Basics", topicHk: "投資基礎", topicCn: "投资基础",
  chaptersEn: ["Investing vs Trading", "Asset Classes", "Stocks", "Bonds", "Mutual Funds", "ETFs", "Real Estate", "Commodities", "Crypto", "Risk/Reward", "Dividends", "Capital Gains", "Indices", "Bull vs Bear", "Brokerage Accounts", "Fees", "Tax", "Fundamental Analysis", "Technical Analysis", "Starting Out"],
  chaptersHk: ["投資 vs 交易", "資產類別", "股票", "債券", "基金", "ETF", "房地產", "商品", "加密貨幣", "風險/回報", "股息", "資本增值", "指數", "牛市 vs 熊市", "證券戶口", "費用", "稅務", "基本面分析", "技術分析", "起步"],
  chaptersCn: ["投资 vs 交易", "资产类别", "股票", "债券", "基金", "ETF", "房地产", "商品", "加密货币", "风险/回报", "股息", "资本增值", "指数", "牛市 vs 熊市", "证券户口", "费用", "税务", "基本面分析", "技术分析", "起步"],
  highlightsEn: [ "Stocks = Growth, Bonds = Stability.", "ETFs are low cost.", "Dividends share profits.", "Indices track markets.", "Watch the fees.", "Invest long term." ],
  highlightsHk: [ "股票=增長，債券=穩定。", "ETF 成本低。", "股息分享利潤。", "指數追蹤市場。", "留意費用。", "長線投資。" ],
  highlightsCn: [ "股票=增长，债券=稳定。", "ETF 成本低。", "股息分享利润。", "指数追踪市场。", "留意费用。", "长线投资。" ]
};

const M7_CONFIG: ModuleContentConfig = {
  id: 'm7',
  topicEn: "Portfolio", topicHk: "投資組合", topicCn: "投资组合",
  chaptersEn: ["What is a Portfolio?", "Asset Allocation", "Diversification", "Correlation", "Age Rule", "Risk Profiles", "Rebalancing", "DCA", "Lump Sum", "Core & Satellite", "Sector Allocation", "Geographic Allocation", "Home Bias", "Passive vs Active", "Robo-Advisors", "Monitoring", "Benchmarking", "Over-trading", "Psychology", "Staying Course"],
  chaptersHk: ["什麼是投資組合？", "資產配置", "分散投資", "相關性", "年齡法則", "風險概況", "再平衡", "平均成本法", "一筆過", "核心與衛星", "板塊配置", "地理配置", "本土偏好", "被動 vs 主動", "智能投顧", "監控", "基準", "過度交易", "心理", "堅持"],
  chaptersCn: ["什么是投资组合？", "资产配置", "分散投资", "相关性", "年龄法则", "风险概况", "再平衡", "平均成本法", "一笔过", "核心与卫星", "板块配置", "地理配置", "本土偏好", "被动 vs 主动", "智能投顾", "监控", "基准", "过度交易", "心理", "坚持"],
  highlightsEn: [ "Allocation drives returns.", "Diversify to lower risk.", "Use DCA.", "Rebalance periodically.", "Avoid Home Bias.", "Passive beats active often." ],
  highlightsHk: [ "配置驅動回報。", "分散降低風險。", "使用平均成本法。", "定期再平衡。", "避免本土偏好。", "被動常勝主動。" ],
  highlightsCn: [ "配置驱动回报。", "分散降低风险。", "使用平均成本法。", "定期再平衡。", "避免本土偏好。", "被动常胜主动。" ]
};

const M8_CONFIG: ModuleContentConfig = {
  id: 'm8',
  topicEn: "MPF (HK)", topicHk: "強積金", topicCn: "强积金",
  chaptersEn: ["MPF Overview", "Mandatory Contributions", "Voluntary Contributions", "TVC (Tax)", "DIS Strategy", "Fund Choices", "Equity Funds", "Bond Funds", "Conservative Funds", "Fees", "Performance", "Member Rights", "Changing Jobs", "Consolidation", "Offset Mechanism", "Withdrawal", "Early Withdrawal", "E-platforms", "MPF vs Pension", "Future"],
  chaptersHk: ["強積金概覽", "強制性供款", "自願性供款", "TVC (扣稅)", "DIS 策略", "基金選擇", "股票基金", "債券基金", "保守基金", "收費", "表現", "成員權利", "轉工", "整合", "對沖機制", "提取", "提早提取", "電子平台", "MPF vs 退休金", "未來"],
  chaptersCn: ["强积金概览", "强制性供款", "自愿性供款", "TVC (扣税)", "DIS 策略", "基金选择", "股票基金", "债券基金", "保守基金", "收费", "表现", "成员权利", "转工", "整合", "对冲机制", "提取", "提早提取", "电子平台", "MPF vs 退休金", "未来"],
  highlightsEn: [ "MPF is mandatory (5%).", "DIS is low fee option.", "TVC saves tax.", "Consolidate accounts.", "High fees erode returns.", "Long term growth focus." ],
  highlightsHk: [ "強積金是強制性的 (5%)。", "DIS 是低費選擇。", "TVC 節省稅項。", "整合戶口。", "高費侵蝕回報。", "專注長期增長。" ],
  highlightsCn: [ "强积金是强制性的 (5%)。", "DIS 是低费选择。", "TVC 节省税项。", "整合户口。", "高费侵蚀回报。", "专注长期增长。" ]
};

const M9_CONFIG: ModuleContentConfig = {
  id: 'm9',
  topicEn: "Insurance", topicHk: "保險", topicCn: "保险",
  chaptersEn: ["Risk Transfer", "Protection vs Investment", "Term Life", "Whole Life", "Critical Illness", "Medical (VHIS)", "Accident", "Travel", "Premiums", "Terms", "Exclusions", "Cooling-off", "Claims", "Agents vs Brokers", "Direct Online", "ILAS", "Needs Analysis", "Mistakes", "Reviewing", "Peace of Mind"],
  chaptersHk: ["風險轉移", "保障 vs 投資", "定期人壽", "終身人壽", "危疾", "醫療 (VHIS)", "意外", "旅遊", "保費", "條款", "不保事項", "冷靜期", "索償", "代理 vs 經紀", "網上直銷", "ILAS", "需求分析", "錯誤", "檢討", "安心"],
  chaptersCn: ["风险转移", "保障 vs 投资", "定期人寿", "终身人寿", "危疾", "医疗 (VHIS)", "意外", "旅游", "保费", "条款", "不保事项", "冷静期", "索偿", "代理 vs 经纪", "网上直销", "ILAS", "需求分析", "错误", "检讨", "安心"],
  highlightsEn: [ "Protection first.", "Term life is cheaper.", "VHIS for tax deduction.", "Read exclusions.", "Don't over-insure.", "Buy young." ],
  highlightsHk: [ "保障優先。", "定期人壽較平。", "VHIS 可扣稅。", "閱讀不保事項。", "勿過度投保。", "年輕時買。" ],
  highlightsCn: [ "保障优先。", "定期人寿较平。", "VHIS 可扣税。", "阅读不保事项。", "勿过度投保。", "年轻时买。" ]
};

const M10_CONFIG: ModuleContentConfig = {
  id: 'm10',
  topicEn: "Fraud Shield", topicHk: "防騙盾", topicCn: "防骗盾",
  chaptersEn: ["Fraud Landscape", "Phishing", "Vishing", "Impersonation", "Investment Scams", "Romance Scams", "Job Scams", "Shopping Fraud", "ID Theft", "Social Engineering", "Red Flags", "Verification", "Cyber Hygiene", "Passwords", "2FA", "Safe Payments", "Police (ADCC)", "Helping Seniors", "Psychology", "Vigilance"],
  chaptersHk: ["騙案概況", "網絡釣魚", "電話騙案", "假冒", "投資騙案", "情緣騙案", "求職騙案", "網購陷阱", "身份盜竊", "社交工程", "危險訊號", "核實", "網絡衛生", "密碼", "2FA", "安全支付", "警方 (ADCC)", "協助長者", "心理", "警惕"],
  chaptersCn: ["骗案概况", "网络钓鱼", "电话骗案", "假冒", "投资骗案", "情缘骗案", "求职骗案", "网购陷阱", "身份盗窃", "社交工程", "危险讯号", "核实", "网络卫生", "密码", "2FA", "安全支付", "警方 (ADCC)", "协助长者", "心理", "警惕"],
  highlightsEn: [ "Officials never ask for pw.", "Verify sender.", "Too good = Scam.", "Protect OTP.", "Use Scameter.", "Don't rush." ],
  highlightsHk: [ "官員不問密碼。", "核實發件人。", "太好=騙局。", "保護 OTP。", "用防騙視伏器。", "勿急。" ],
  highlightsCn: [ "官员不问密码。", "核实发件人。", "太好=骗局。", "保护 OTP。", "用防骗视伏器。", "勿急。" ]
};

// --- M1 DATA (Already Populated - Preserved) ---
const M1_PAGES: ModulePage[] = [
  // 1. Introduction
  {
    id: 'm1_p1', type: 'content',
    title: { [Language.EN]: "1. The Foundation of Finance", [Language.ZH_HK]: "1. 理財的基礎", [Language.ZH_CN]: "1. 理财的基础" },
    content: {
      [Language.EN]: "Financial literacy isn't just about getting rich; it's about freedom. It's the ability to understand and effectively use various financial skills, including personal financial management, budgeting, and investing. Before we talk about money, we must talk about *psychology*.",
      [Language.ZH_HK]: "理財不僅僅是為了致富，而是為了自由。它是一種理解和有效運用各種金融技能的能力，包括個人財務管理、預算和投資。在談論金錢之前，我們必須先談論「心理學」。",
      [Language.ZH_CN]: "理财不仅仅是为了致富，而是为了自由。它是一种理解和有效运用各种金融技能的能力，包括个人财务管理、预算和投资。在谈论金钱之前，我们必须先谈论「心理学」。"
    }
  },
  // To ensure M1 also meets requirements (20+2+1), and reusing existing good content:
  ...generateModulePages({
      id: 'm1',
      topicEn: "Onboarding & Risk", topicHk: "入門與風險", topicCn: "入门与风险",
      chaptersEn: ["What is Risk?", "Tolerance vs Capacity", "Inflation", "Market Risk", "Liquidity Risk", "Time Horizon", "Aggressive Profile", "Balanced Profile", "Conservative Profile", "Diversification", "Correlation", "Risk/Reward", "Emotions", "Sleep Test", "Black Swan", "Stop Loss", "Hedging", "Currency Risk", "Know Thyself"],
      chaptersHk: ["什麼是風險？", "承受意願 vs 能力", "通脹", "市場風險", "流動性風險", "時間跨度", "進取型", "平衡型", "保守型", "分散投資", "相關性", "風險/回報", "情緒", "睡眠測試", "黑天鵝", "止蝕", "對沖", "貨幣風險", "認識自己"],
      chaptersCn: ["什么是风险？", "承受意愿 vs 能力", "通胀", "市场风险", "流动性风险", "时间跨度", "进取型", "平衡型", "保守型", "分散投资", "相关性", "风险/回报", "情绪", "睡眠测试", "黑天鹅", "止蚀", "对冲", "货币风险", "认识自己"],
      highlightsEn: ["Capacity vs Tolerance.", "Inflation kills cash.", "Diversify.", "Time is weapon.", "High Risk = High Return.", "Master emotions."],
      highlightsHk: ["能力 vs 意願。", "通脹殺死現金。", "分散投資。", "時間是武器。", "高風險=高回報。", "掌控情緒。"],
      highlightsCn: ["能力 vs 意愿。", "通胀杀死现金。", "分散投资。", "时间是武器。", "高风险=高回报。", "掌控情绪。"]
  }).slice(1) // Remove first generic 'Concept 1' page since we manually added P1 above
];


export const MODULES: Module[] = [
  {
    id: 'm1',
    title: { [Language.EN]: "Onboarding & Risk", [Language.ZH_HK]: "入門與風險", [Language.ZH_CN]: "入门与风险" },
    description: { [Language.EN]: "Understand your financial personality.", [Language.ZH_HK]: "了解你的理財性格。", [Language.ZH_CN]: "了解你的理财性格。" },
    icon: "🧭",
    color: "bg-blue-500",
    pages: M1_PAGES
  },
  {
    id: 'm2',
    title: { [Language.EN]: "Financial Goals", [Language.ZH_HK]: "理財目標", [Language.ZH_CN]: "理财目标" },
    description: { [Language.EN]: "SMART goals setting.", [Language.ZH_HK]: "SMART 目標設定。", [Language.ZH_CN]: "SMART 目标设定。" },
    icon: "🎯",
    color: "bg-red-500",
    pages: generateModulePages(M2_CONFIG)
  },
  {
    id: 'm3',
    title: { [Language.EN]: "Budgeting", [Language.ZH_HK]: "預算管理", [Language.ZH_CN]: "预算管理" },
    description: { [Language.EN]: "50/30/20 Rule & Tracking.", [Language.ZH_HK]: "50/30/20 法則與記賬。", [Language.ZH_CN]: "50/30/20 法则与记账。" },
    icon: "📊",
    color: "bg-green-500",
    pages: generateModulePages(M3_CONFIG)
  },
  {
    id: 'm4',
    title: { [Language.EN]: "Savings", [Language.ZH_HK]: "儲蓄", [Language.ZH_CN]: "储蓄" },
    description: { [Language.EN]: "Emergency Funds & Compound Interest.", [Language.ZH_HK]: "應急基金與複息。", [Language.ZH_CN]: "应急基金与复息。" },
    icon: "💰",
    color: "bg-teal-500",
    pages: generateModulePages(M4_CONFIG)
  },
  {
    id: 'm5',
    title: { [Language.EN]: "Debt & Credit", [Language.ZH_HK]: "債務與信貸", [Language.ZH_CN]: "债务与信贷" },
    description: { [Language.EN]: "Managing Loans & Credit Score.", [Language.ZH_HK]: "管理貸款與信貸評分。", [Language.ZH_CN]: "管理贷款与信贷评分。" },
    icon: "💳",
    color: "bg-purple-500",
    pages: generateModulePages(M5_CONFIG)
  },
  {
    id: 'm6',
    title: { [Language.EN]: "Investing Basics", [Language.ZH_HK]: "投資基礎", [Language.ZH_CN]: "投资基础" },
    description: { [Language.EN]: "Stocks, Bonds & Funds.", [Language.ZH_HK]: "股票、債券與基金。", [Language.ZH_CN]: "股票、债券与基金。" },
    icon: "📈",
    color: "bg-indigo-500",
    pages: generateModulePages(M6_CONFIG)
  },
  {
    id: 'm7',
    title: { [Language.EN]: "Portfolio", [Language.ZH_HK]: "投資組合", [Language.ZH_CN]: "投资组合" },
    description: { [Language.EN]: "Asset Allocation & DCA.", [Language.ZH_HK]: "資產配置與平均成本法。", [Language.ZH_CN]: "资产配置与平均成本法。" },
    icon: "🍰",
    color: "bg-pink-500",
    pages: generateModulePages(M7_CONFIG)
  },
  {
    id: 'm8',
    title: { [Language.EN]: "MPF (HK)", [Language.ZH_HK]: "強積金", [Language.ZH_CN]: "强积金" },
    description: { [Language.EN]: "Mandatory Provident Fund.", [Language.ZH_HK]: "強制性公積金。", [Language.ZH_CN]: "强制性公积金。" },
    icon: "🇭🇰",
    color: "bg-red-600",
    pages: generateModulePages(M8_CONFIG)
  },
  {
    id: 'm9',
    title: { [Language.EN]: "Insurance", [Language.ZH_HK]: "保險", [Language.ZH_CN]: "保险" },
    description: { [Language.EN]: "Protection vs Investment.", [Language.ZH_HK]: "保障 vs 投資。", [Language.ZH_CN]: "保障 vs 投资。" },
    icon: "☂️",
    color: "bg-blue-400",
    pages: generateModulePages(M9_CONFIG)
  },
  {
    id: 'm10',
    title: { [Language.EN]: "Fraud Shield", [Language.ZH_HK]: "防騙盾", [Language.ZH_CN]: "防骗盾" },
    description: { [Language.EN]: "Spotting Scams in HK.", [Language.ZH_HK]: "識別香港常見騙案。", [Language.ZH_CN]: "识别香港常见骗案。" },
    icon: "🛡️",
    color: "bg-slate-600",
    pages: generateModulePages(M10_CONFIG)
  }
];