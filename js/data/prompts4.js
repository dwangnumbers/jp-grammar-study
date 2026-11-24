// Review prompts — levels 31–40.
import { D, Pa } from './helpers.js';

export default {
  // 31
  'ni-oite': Pa("A press release.", "＿世界中から約三千人の研究者が参加する予定だ。", "___ About 3,000 researchers from around the world are expected to attend.", "Write that the international conference will be held in Kyoto in May (において).", "国際会議 京都 五月", "国際会議は五月に京都において開かれる。"),
  'ni-kanshite': D("The end of a presentation.", [["Presenter", "以上で発表を終わります。", "That concludes my presentation."]], "Ask formally if you may ask one question regarding the budget.", "予算 質問", "予算に関して、一つ質問してもよろしいでしょうか。"),
  'ni-watatte': Pa("A news report.", "台風十五号が関東地方を直撃した。＿多くの家が停電した。", "Typhoon No. 15 hit the Kanto region directly. ___ Many homes lost power.", "Write that strong winds continued over a two-day period.", "二日間 強い 風", "二日間にわたって強い風が続いた。"),
  'wo-megutte': Pa("A newspaper article.", "市は駅前に新しいビルを建てる計画を発表した。＿反対する住民も多い。", "The city announced a plan to build a new building by the station. ___ Many residents oppose it.", "Write that a heated debate continues over this plan.", "計画 議論", "この計画をめぐって、激しい議論が続いている。"),
  'ni-kakete': D("A TV weather segment.", [["Anchor", "週末の天気はどうですか。", "How's the weather looking this weekend?"]], "Say there will probably be heavy rain from Saturday night through Sunday morning.", "土曜日 日曜日 大雨", "土曜日の夜から日曜日の朝にかけて、大雨になるでしょう。"),
  'ge': Pa("A scene from a novel.", "彼女は黙って窓の外を見つめていた。＿何があったのか、誰も聞けなかった。", "She silently stared out the window. ___ No one could ask what had happened.", "Write that she had a lonely-looking expression.", "寂しい 顔", "彼女は寂しげな顔をしていた。"),
  'buri': D("Running into an old classmate.", [["Old classmate", "あれ？もしかして山田さん？", "Huh? Is that you, Yamada?"]], "Say: wow, it's been ten years!", "十年", "わあ、十年ぶりですね！"),

  // 32
  'kaneru': D("You work at a bank's front desk.", [["Customer", "他のお客様の住所を教えてもらえませんか。", "Could you tell me another customer's address?"]], "Politely refuse: you're afraid you cannot tell them that.", "教える", "申し訳ございませんが、それはお教えしかねます。"),
  'kanenai': D("Your friend is texting while driving.", [["Friend", "運転中だけど、大丈夫だよ。", "I'm driving, but it's fine."]], "Warn them that looking at their phone while driving could lead to an accident.", "携帯 事故", "運転しながら携帯を見ていたら、事故になりかねないよ。"),
  'zaru-wo-enai': D("Making weekend plans.", [["Coworker", "土曜日の旅行、行けますか。", "Can you make the Saturday trip?"]], "Say your boss told you to, so you have no choice but to work on Saturday.", "上司 土曜日 働く", "上司に言われたので、土曜日は働かざるを得ません。"),
  'zu-ni-wa-irarenai': D("Watching a comedy show.", [["Friend", "笑いすぎだよ。", "You're laughing too much."]], "Say it's too funny — you can't help laughing.", "面白い 笑う", "面白すぎて、笑わずにはいられないよ。"),
  'te-tamaranai': D("Mid-afternoon at the office.", [["Coworker", "今日、なんだか元気ないね。", "You seem low on energy today."]], "Say you skipped lunch, so you're unbearably hungry.", "昼ご飯 お腹 すく", "昼ご飯を食べなかったから、お腹がすいてたまらない。"),
  'te-naranai': Pa("An essay about living abroad.", "日本に来て、もう五年になる。＿今年の冬は、久しぶりに帰国しようと思う。", "It's already been five years since I came to Japan. ___ This winter I think I'll go home for the first time in a while.", "Write that lately you can't stop worrying about your parents' health.", "両親 健康", "最近、両親の健康が気になってならない。"),

  // 33
  'uru': Pa("A disaster-preparedness pamphlet.", "日本は地震の多い国です。＿ですから、いつも水と食べ物を準備しておきましょう。", "Japan is a country with many earthquakes. ___ So always keep water and food on hand.", "Write that a big earthquake could happen at any time.", "大きな 地震 起こる", "大きな地震はいつでも起こり得ます。"),
  'ppanashi': D("Your roommate is annoyed.", [["Roommate", "また冷蔵庫が開いてたよ。", "The fridge was open again."]], "Apologize: you left the fridge open.", "冷蔵庫 開ける", "ごめん、冷蔵庫を開けっぱなしにしちゃった。"),
  'ni-suginai': D("A coworker praises your Japanese.", [["Coworker", "日本語、ペラペラですね！", "Your Japanese is fluent!"]], "Modestly say you've merely memorized a little.", "少し 覚える", "いいえ、少し覚えたに過ぎません。"),
  'ni-hokanaranai': Pa("A speech at an awards ceremony.", "このたびは素晴らしい賞をいただき、ありがとうございます。＿これからも努力を続けます。", "Thank you for this wonderful award. ___ I will continue to work hard.", "Write that this success is nothing other than the result of the team's effort.", "成功 チーム 努力 結果", "この成功はチームの努力の結果にほかなりません。"),
  'ni-kagiru': D("A scorching summer afternoon.", [["Friend", "何か飲む？", "Want something to drink?"]], "Say on a hot day, nothing beats cold barley tea.", "暑い 麦茶", "暑い日は冷たい麦茶に限る。"),
  'ni-kagirazu': Pa("A culture article.", "最近、日本のアニメの人気が高まっている。＿特に、アジアやヨーロッパでファンが増えている。", "Japanese anime has been growing in popularity. ___ Fans are increasing especially in Asia and Europe.", "Write that anime is watched not only in Japan but all over the world.", "日本 世界中 見る", "アニメは日本に限らず、世界中で見られている。"),
  'ni-kagitte': D("You rush into the office late.", [["Coworker", "珍しいですね、遅刻なんて。", "It's unusual for you to be late."]], "Say of all days, the train is late on the day of an important meeting.", "大事 会議 電車 遅れる", "大事な会議の日に限って、電車が遅れるんです。"),

  // 34
  'mono-reason': D("Your mom is upset.", [["Mom", "どうして電話しなかったの？", "Why didn't you call?"]], "Whine that you were busy (casual sentence-final もん).", "忙しい", "だって、忙しかったんだもん。"),
  'gatai': Pa("A newspaper column.", "その政治家は、記者会見で事実と違うことを話した。＿国民の信頼を失ったのも当然だ。", "At the press conference, the politician said things that contradicted the facts. ___ No wonder he lost the public's trust.", "Write that his attitude is hard to forgive.", "態度 許す", "その態度は許しがたい。"),
  'nuku': D("After the marathon.", [["Friend", "完走おめでとう！", "Congrats on finishing!"]], "Say you were tired, but you ran all the way to the end.", "最後 走る", "疲れたけど、最後まで走り抜いたよ。"),
  'mono-no': D("A friend asks about your gym membership.", [["Friend", "ジム、毎日行ってる？", "Going to the gym every day?"]], "Say although you joined, you've only gone twice.", "入会する 二回", "入会したものの、まだ二回しか行っていない。"),
  'mono-nara': D("A friend asks about home.", [["Friend", "故郷に帰りたい？", "Do you want to go back to your hometown?"]], "Say if you could, you'd go back right now.", "帰る 今すぐ", "帰れるものなら、今すぐ帰りたいよ。"),
  'mono-ka': D("After a terrible haircut.", [["Friend", "あの美容院、また行く？", "Going back to that salon?"]], "Say emphatically: as if you'd ever go there again!", "二度と 行く", "あの美容院には、もう二度と行くもんか。"),
  'mono-dakara': D("Arriving late for a date.", [["Partner", "遅いよ！", "You're late!"]], "Make an excuse: the train was delayed, you see.", "電車 遅れる", "ごめん、電車が遅れたものだから。"),

  // 35
  'tsutsu': Pa("An essay about bad habits.", "健康のために、甘い物は控えたほうがいい。＿私は毎晩アイスを食べてしまう。", "For your health, it's better to cut back on sweets. ___ I end up eating ice cream every night.", "Write that even knowing it's bad for your body, you can't stop.", "体 悪い 知る", "体に悪いと知りつつも、やめられない。"),
  'tsutsu-aru': Pa("A news report on the economy.", "政府の新しい政策が始まって一年がたった。＿専門家は、来年はさらによくなると見ている。", "A year has passed since the government's new policy began. ___ Experts expect things to improve further next year.", "Write that the economy is in the process of recovering little by little.", "経済 回復する", "経済は少しずつ回復しつつある。"),
  'ue-de': D("Your boss presses you.", [["Boss", "この契約、今日中に決めてくれますか。", "Can you decide on this contract today?"]], "Say you'll reply after discussing it carefully with your team.", "チーム 相談する 返事", "チームとよく相談した上で、お返事します。"),
  'ijou-wa': D("Your teammate wants to quit.", [["Teammate", "やっぱり、この仕事、やめようかな。", "Maybe I'll quit this job after all."]], "Say now that they've taken it on, they have to see it through.", "引き受ける 最後", "引き受けた以上は、最後までやらなければならないよ。"),
  'kara-niwa': D("A friend just moved north.", [["Friend", "北海道に引っ越してきたよ。", "I've moved to Hokkaido."]], "Say if they're going to live in Hokkaido, they have to try skiing.", "北海道 住む スキー", "北海道に住むからには、スキーをやってみないとね。"),
  'kara-koso': D("A student complains.", [["Student", "先生はどうしていつも厳しいんですか。", "Why are you always so strict?"]], "Say it's precisely because you have high hopes for them.", "期待する 厳しい", "期待しているからこそ、厳しくするんだよ。"),
  'kara-to-itte': D("A friend wants to stop their medicine.", [["Friend", "熱が下がったから、もう薬は飲まなくていいよね。", "My fever's down, so I can stop the medicine, right?"]], "Say just because the fever went down doesn't mean they're cured.", "熱 下がる 治る", "熱が下がったからといって、治ったわけではないよ。"),

  // 36
  'mai': Pa("Your diary, the morning after.", "昨日の飲み会で飲みすぎて、大変なことになった。＿", "I drank too much at yesterday's party, and it went badly. ___", "Write your firm resolve never to drink that much again (〜まい).", "二度と 飲む", "もう二度とあんなに飲むまい。"),
  'shidai': D("A client on the phone.", [["Client", "結果がわかったら教えてください。", "Please let me know once you have the results."]], "Say you'll contact them as soon as the results come out.", "結果 出る 連絡", "結果が出次第、ご連絡いたします。"),
  'bakari-ni': D("A friend notices you're down.", [["Friend", "彼女とけんかしたの？", "Did you fight with your girlfriend?"]], "Say just because you said one unnecessary thing, you made her angry.", "一言 怒る", "余計な一言を言ったばかりに、怒らせてしまった。"),
  'ippou-da': Pa("A report on rural Japan.", "この村では若い人がどんどん都会へ出ていく。＿学校も、去年閉校になった。", "In this village, young people keep leaving for the cities. ___ Even the school closed last year.", "Write that the population just keeps going down.", "人口 減る", "人口は減る一方だ。"),
  'ka-no-you-ni': D("A friend asks about meeting your ex.", [["Friend", "元カレ、会った時どうだった？", "How was your ex when you ran into him?"]], "Say he acted as if he didn't know you.", "知る 振る舞う", "まるで私を知らないかのように振る舞った。"),
  'koto-ka': Pa("A letter to a friend who'd gone quiet.", "お手紙、ありがとう。＿元気そうで、本当に安心しました。", "Thank you for your letter. ___ I'm so relieved you seem well.", "Write how very worried you were (どんなに〜ことか).", "心配する", "どんなに心配したことか。"),

  // 37
  'nomi': Pa("A sign at a small shop's register.", "＿クレジットカードはご利用いただけません。", "___ Credit cards cannot be used.", "Write (formally) that payment is cash only.", "現金", "お支払いは現金のみとなっております。"),
  'dokoroka': D("A friend asks about your Chinese.", [["Friend", "中国語、話せる？", "Can you speak Chinese?"]], "Say far from speaking it, you can't even say hello.", "話す 挨拶", "話すどころか、挨拶もできないよ。"),
  'ni-shite-wa': D("Your coworker brings in homemade curry.", [["Coworker", "娘が初めて作ったカレーです。", "This is the first curry my daughter has made."]], "Say it's really delicious for a first try.", "初めて おいしい", "初めてにしては、とてもおいしいですね。"),
  'ni-shite-mo': D("Your friend didn't reply all day.", [["Friend", "ごめん、忙しかったんだ。", "Sorry, I was busy."]], "Say even if they were busy, they could at least have gotten in touch.", "忙しい 連絡", "忙しかったにしても、連絡ぐらいできたでしょう。"),
  'komu': D("A friend is upset.", [["Friend", "彼女、私のこと嫌いなんだと思う。", "I think she hates me."]], "Say they've just convinced themselves of that.", "思う", "それは思い込んでいるだけだよ。"),
  'au': D("A team meeting.", [["Boss", "この問題、どうしましょうか。", "What shall we do about this problem?"]], "Suggest that everyone discuss it together.", "みんな 話す", "みんなで話し合いましょう。"),

  // 38
  'tate': D("At a bakery.", [["Clerk", "いらっしゃいませ。", "Welcome."]], "Ask which bread is fresh from the oven.", "パン 焼く", "焼きたてのパンはどれですか。"),
  'buru': D("A friend asks about your new section chief.", [["Friend", "新しい課長、どう？", "How's the new section chief?"]], "Say he's always acting important, so you find him a bit hard to deal with.", "偉い 苦手", "いつも偉ぶっていて、ちょっと苦手だ。"),
  'nai-koto-ni-wa': D("A new café opened nearby.", [["Friend", "新しいカフェ、おいしいかな？", "Wonder if the new café is any good?"]], "Say you can't tell until you actually go.", "実際 行く わかる", "実際に行ってみないことには、わからないね。"),
  'nai-koto-wa-nai': D("A deadline check.", [["Coworker", "金曜日までに終わりますか。", "Will it be done by Friday?"]], "Say hesitantly that if you work overtime, it's not that you can't finish.", "残業する 終わる", "残業すれば、終わらないことはないです。"),
  'koto-naku': Pa("A profile of a potter.", "田中さんは五十年間、毎朝五時に工房に入った。＿その作品は今、世界中で愛されている。", "For fifty years, Mr. Tanaka entered his workshop at five every morning. ___ His work is now loved around the world.", "Write that he kept making pottery without ever giving up.", "諦める 作る", "決して諦めることなく、器を作り続けた。"),
  'koto-kara': Pa("A plaque explaining a street name.", "この坂には、昔から桜の木がたくさんある。＿", "This slope has had many cherry trees since long ago. ___", "Write that because there are many cherry trees, it is called \"Sakura-zaka\".", "桜坂 呼ぶ", "桜の木が多いことから、「桜坂」と呼ばれている。"),
  'koto-ni': Pa("Your travel blog.", "先週、京都の小さな旅館に泊まった。＿まさか、こんな所で会えるとは思わなかった。", "Last week I stayed at a small inn in Kyoto. ___ I never imagined I'd run into him in a place like that.", "Write that, to your surprise, your high school teacher was staying there too.", "驚く 高校 先生 泊まる", "驚いたことに、高校の先生も泊まっていた。"),

  // 39
  'ni-oujite': D("At the gym.", [["Client", "このトレーニング、私にはきつすぎませんか。", "Isn't this workout too hard for me?"]], "As the trainer, say you'll adjust the routine according to their fitness level.", "体力 メニュー 変える", "体力に応じて、メニューを変えますよ。"),
  'ni-motozuite': Pa("A research report.", "本研究では、全国の大学生千人にアンケートを行った。＿", "In this study, we surveyed 1,000 university students nationwide. ___", "Write that the following analysis was carried out based on this data.", "データ 分析", "以下の分析は、このデータに基づいて行った。"),
  'ni-sotte': D("A tourist asks for directions.", [["Tourist", "公園までどう行けばいいですか。", "How do I get to the park?"]], "Say to walk along this river for about ten minutes.", "川 歩く", "この川に沿って十分ぐらい歩いてください。"),
  'wo-chuushin-ni': Pa("A marketing report.", "新商品の売り上げは予想以上だった。＿", "Sales of the new product exceeded expectations. ___", "Write that it's selling mainly among women in their twenties.", "二十代 女性 売れる", "特に二十代の女性を中心に売れている。"),
  'wo-hajime': Pa("A company newsletter.", "昨日、田中さんの結婚式が行われた。＿二百人以上が二人を祝った。", "Yesterday, Mr. Tanaka's wedding took place. ___ Over 200 people celebrated the couple.", "Write that many people, starting with the company president, attended.", "社長 出席する", "社長をはじめ、多くの人が出席した。"),
  'kkonai': D("A friend dares you.", [["Friend", "このハンバーガー、十個食べられる？", "Can you eat ten of these burgers?"]], "Say there's no way you could eat ten.", "十個 食べる", "十個なんて、食べられっこないよ。"),
  'zujimai': D("Back from Paris.", [["Friend", "エッフェル塔、見た？", "Did you see the Eiffel Tower?"]], "Say you were busy, so in the end you never went.", "忙しい 行く", "忙しくて、結局行かずじまいだった。"),

  // 40
  'gatera': D("A neighbor sees you leaving.", [["Neighbor", "お出かけですか。", "Heading out?"]], "Say you're going to the post office while out for a walk.", "散歩 郵便局", "ええ、散歩がてら郵便局に行ってきます。"),
  'mamire': D("Your dad comes back from fixing the car.", [["Dad", "やっと直ったよ。", "Finally fixed it."]], "Say: Dad, you're covered in oil!", "油", "お父さん、油まみれだよ！"),
  'te-koso': D("A student questions the homework.", [["Student", "練習問題なんて、意味があるんですか。", "Is there any point to these practice problems?"]], "Say it's only by actually solving problems that you truly understand.", "問題 解く わかる", "実際に問題を解いてこそ、本当にわかるんだよ。"),
  'te-kara-de-nai-to': D("A pushy salesperson.", [["Salesperson", "今日、ご契約されますか。", "Will you sign the contract today?"]], "Say you can't decide until you've discussed it with your family.", "家族 相談する 決める", "家族と相談してからでないと、決められません。"),
  'nai-demo-nai': D("A friend offers natto.", [["Friend", "納豆、食べられる？", "Can you eat natto?"]], "Say reluctantly that it's not that you can't eat it...", "納豆 食べる", "納豆は食べられなくもないけど…"),
  'mono-ga-aru': D("After a concert.", [["Friend", "今日の演奏、どうだった？", "How was today's performance?"]], "Say there was something in her singing voice that moved the audience.", "歌声 感動", "彼女の歌声には、聞く人を感動させるものがあった。"),
  'koto-dakara': D("Waiting for a chronically late friend.", [["Friend", "田中さん、まだ来ないね。", "Tanaka still isn't here."]], "Say knowing him, he's probably still asleep.", "田中 寝る", "田中さんのことだから、まだ寝ているんだろう。"),
};
