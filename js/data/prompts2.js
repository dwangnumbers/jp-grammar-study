// Review prompts — levels 11–20.
import { D, Pa } from './helpers.js';

export default {
  // 11
  'shi': D("A friend asks about your apartment.", [["Friend", "今のアパートはどう？", "How's your current apartment?"]], "Say it's cheap, and it's close to the station too, so it's good (list the reasons with し).", "安い 駅 近い", "安いし、駅にも近いし、いいよ。"),
  'potential': D("At a Japanese restaurant.", [["Waiter", "お箸、大丈夫ですか。", "Are chopsticks all right for you?"]], "Say yes, you can use chopsticks.", "箸 使う", "はい、箸が使えます。"),
  'volitional': D("Texting a friend on a hot day.", [["Friend", "暑いね。", "So hot, huh."]], "Suggest casually that you go swimming at the pool.", "プール 泳ぐ", "プールで泳ごう。"),
  'koto-ga-dekiru': D("A job interview.", [["Interviewer", "何か外国語を話すことができますか。", "Can you speak any foreign languages?"]], "Say you can speak Chinese.", "中国語 話す", "はい、中国語を話すことができます。"),
  'to-omou': D("Looking at a restaurant menu with a friend.", [["Friend", "この店、どう思う？", "What do you think of this place?"]], "Say you think it's a little expensive.", "少し 高い", "少し高いと思います。"),
  'you-to-omou': D("Talking about the New Year holidays.", [["Coworker", "年末は何をしますか。", "What are you doing at the end of the year?"]], "Say you're thinking of going back to your parents' home.", "実家 帰る", "実家に帰ろうと思っています。"),

  // 12
  'to-conditional': D("A tourist stops you on the street.", [["Tourist", "郵便局はどこですか。", "Where's the post office?"]], "Say if you go straight along this road, it's on the right.", "まっすぐ 右", "この道をまっすぐ行くと、右にあります。"),
  'ba-form': D("Planning a weekend hike.", [["Friend", "日曜日、本当に山に行く？", "Are we really going to the mountains on Sunday?"]], "Say you'll climb the mountain if the weather is good.", "天気 いい|良い 登る", "天気がよければ、山に登ります。"),
  'tara': D("Your coworker is leaving the office.", [["Coworker", "じゃあ、先に帰りますね。", "Well, I'll head home first."]], "Ask them to contact you when they get home.", "家 着く 連絡", "家に着いたら連絡してください。"),
  'nakereba-naranai': D("A friend invites you out.", [["Friend", "今晩、カラオケに行かない？", "Want to go to karaoke tonight?"]], "Say sorry, you have to write a report tonight.", "レポート 書く", "ごめん、今晩はレポートを書かなければならない。"),
  'nakutemo-ii': D("A guest arrives at your casual restaurant.", [["Guest", "靴を脱がなければなりませんか。", "Do I have to take off my shoes?"]], "Say no, they don't have to take them off.", "靴 脱ぐ", "いいえ、靴は脱がなくてもいいですよ。"),

  // 13
  'passive': D("A friend notices you walked to school.", [["Friend", "どうしたの？", "What happened?"]], "Say your bicycle was stolen.", "自転車 盗む", "自転車を盗まれた。"),
  'imperative': D("You're a coach shouting during a race.", [["Runner", "はあ、はあ…", "(panting)"]], "Shout bluntly at the runner to run faster!", "速い 走る", "もっと速く走れ！"),
  'nasai': D("You're a parent. It's 11 p.m.", [["Child", "まだゲームしたい。", "I still want to play games."]], "Firmly tell your child it's late, so go to bed.", "遅い 寝る", "もう遅いから、早く寝なさい。"),
  'tara-dou': D("A friend has a headache.", [["Friend", "頭が痛くて…", "My head hurts..."]], "Suggest they take some medicine.", "薬 飲む", "薬を飲んだらどう？"),
  'ba-ii': D("Lost in a new city.", [["Station staff", "どちらへ行かれますか。", "Where are you headed?"]], "Say you want to go to city hall and ask which bus you should take.", "市役所 バス 乗る", "市役所に行きたいんですが、どのバスに乗ればいいですか。"),

  // 14
  'causative': D("Talking about childhood.", [["Friend", "子供の時、親は厳しかったですか。", "Were your parents strict when you were a kid?"]], "Say your mother made you practice piano every day.", "母 ピアノ 練習", "母は毎日私にピアノを練習させました。"),
  'te-ageru': D("Your little sister is reading.", [["Sister", "この漢字、読めない…", "I can't read this kanji..."]], "Say casually you'll read it for her.", "読む", "じゃあ、私が読んであげるよ。"),
  'te-kureru': D("A friend asks about your move.", [["Friend", "引っ越し、一人でやったの？", "Did you move all by yourself?"]], "Say no, your older brother helped you.", "兄 手伝う", "ううん、兄が手伝ってくれた。"),
  'te-morau': D("A coworker compliments your profile photo.", [["Coworker", "この写真、すてきですね。", "This photo is lovely."]], "Say you had a friend take it for you.", "友達 撮る", "友達に撮ってもらいました。"),
  'sasete-kudasai': D("Your boss reaches for the bill.", [["Boss", "今日は私が払いますよ。", "I'll pay today."]], "Politely insist: please let you pay today.", "払う", "いいえ、今日は私に払わせてください。"),

  // 15
  'sou-looks': D("At a bakery with a friend.", [["Friend", "このパン、新しいね。", "This bread is new."]], "Say it looks delicious.", "パン おいしい", "このパン、おいしそうだね。"),
  'sugiru': D("After a huge dinner.", [["Friend", "大丈夫？顔色が悪いよ。", "You okay? You look pale."]], "Say you ate a bit too much.", "食べる", "ちょっと食べすぎた。"),
  'yasui': D("A classmate asks about your textbook.", [["Classmate", "その教科書、どう？", "How's that textbook?"]], "Say it's very easy to understand.", "わかる|分かる", "とてもわかりやすいよ。"),
  'nikui': D("Shoe shopping with a friend.", [["Friend", "このハイヒール、かわいいでしょう？", "Aren't these heels cute?"]], "Say they're cute, but they look hard to walk in.", "かわいい 歩く", "かわいいけど、歩きにくそう。"),
  'sou-da-hearsay': D("Gossip at work.", [["Coworker", "鈴木さん、最近元気がないですね。", "Suzuki hasn't seemed herself lately."]], "Say you heard she's going to quit the company.", "会社 辞める", "会社を辞めるそうですよ。"),
  'you-da': D("You hear the doorbell and a thump outside.", [["Roommate", "今、何の音？", "What was that sound?"]], "Say it seems the package has arrived.", "荷物 届く", "荷物が届いたようだ。"),
  'mitai': D("Your coworker is slumped over his desk.", [["Coworker", "田中さん、全然動かないね。", "Tanaka isn't moving at all."]], "Say casually he seems to be asleep.", "寝る", "寝ているみたい。"),

  // 16
  'noni': D("A friend asks about the exam.", [["Friend", "試験、どうだった？", "How did the exam go?"]], "Say you failed, even though you studied every day.", "毎日 勉強する 落ちる", "毎日勉強したのに、落ちた。"),
  'node': D("Calling your part-time job in the morning.", [["Manager", "もしもし。", "Hello?"]], "Politely say you've caught a cold, so you'll take today off.", "風邪 休む", "風邪をひいたので、今日は休みます。"),
  'chau': D("A friend opens the fridge.", [["Friend", "あれ、ケーキは？", "Huh, where's the cake?"]], "Admit casually that you ate it all.", "全部 食べる", "ごめん、全部食べちゃった。"),
  'toku': D("Planning a party.", [["Friend", "飲み物はどうする？", "What about drinks?"]], "Say casually you'll buy the drinks ahead of time.", "飲み物 買う", "飲み物は私が買っとくよ。"),
  'te-shimau': D("Your friend sees you standing outside your door.", [["Friend", "どうしたの？", "What's wrong?"]], "Say you've (unfortunately) lost your house key.", "鍵 なくす", "家の鍵をなくしてしまった。"),
  'te-oku': D("Before a dinner party.", [["Roommate", "お客さん、七時に来るよ。", "The guests are coming at seven."]], "Say you'll clean the room before then.", "部屋 掃除する", "じゃあ、部屋を掃除しておくね。"),
  'te-miru': D("At a clothing store.", [["Clerk", "こちらの新しいシャツはいかがですか。", "How about this new shirt?"]], "Ask if you can try it on.", "着る", "着てみてもいいですか。"),

  // 17
  'rashii': D("Lunch-break chat.", [["Coworker", "駅前に新しいレストランができましたね。", "A new restaurant opened by the station."]], "Say it's apparently very popular.", "人気", "とても人気があるらしいですよ。"),
  'te-aru': D("Packing for a trip.", [["Partner", "ホテル、予約した？", "Did you book the hotel?"]], "Say yes, the hotel has already been booked.", "ホテル 予約する", "うん、ホテルはもう予約してあるよ。"),
  'te-iku': D("Leaving for a hike.", [["Mom", "今日は雨が降るかもしれないよ。", "It might rain today."]], "Say you'll take an umbrella with you.", "傘 持つ", "じゃあ、傘を持っていく。"),
  'te-kuru': D("Lunchtime at the office.", [["Coworker", "昼ご飯、どうしますか。", "What are you doing for lunch?"]], "Say you'll go buy something at the convenience store (and come back).", "コンビニ 買う", "コンビニで何か買ってきます。"),
  'kamoshirenai': D("Planning a picnic.", [["Friend", "明日、ピクニックに行けるかな。", "Think we can go on the picnic tomorrow?"]], "Say it might rain tomorrow.", "明日 雨", "明日は雨かもしれない。"),
  'hazu': D("A coworker is searching for something.", [["Coworker", "会議の資料はどこですか。", "Where are the meeting documents?"]], "Say they should be on your desk.", "机 上", "私の机の上にあるはずです。"),
  'ka-douka': D("Planning a party.", [["Friend", "山田さんもパーティーに来る？", "Is Yamada coming to the party too?"]], "Say you don't know whether he's coming.", "来る わかる|分かる", "来るかどうかわからない。"),

  // 18
  'hajimeru': D("A new coworker asks about your hobby.", [["Coworker", "いつからヨガをしていますか。", "How long have you done yoga?"]], "Say you started doing yoga last year.", "去年 ヨガ", "去年からヨガをやり始めました。"),
  'owaru': D("A friend eyes the manga in your hands.", [["Friend", "その漫画、貸してくれない？", "Can you lend me that manga?"]], "Say you'll lend it to them when you finish reading it.", "読む 貸す", "読み終わったら貸すね。"),
  'tsuzukeru': D("Halfway through a marathon.", [["Coach", "疲れた？", "Tired?"]], "Say you're tired, but you'll keep running.", "疲れる 走る", "疲れたけど、走り続けます。"),
  'you-ni-suru': D("At a checkup.", [["Doctor", "最近、よく眠れていますか。", "Have you been sleeping well recently?"]], "Say you make a point of going to bed by eleven every night.", "十一時 寝る", "毎晩、十一時までに寝るようにしています。"),
  'you-ni-naru': D("A friend notices your progress.", [["Friend", "日本語、上手になったね。", "Your Japanese has gotten good."]], "Say you've become able to read newspapers.", "新聞 読む", "新聞が読めるようになったよ。"),
  'koto-ni-suru': D("A friend asks about your plans.", [["Friend", "大学院、どうするの？", "What are you doing about grad school?"]], "Say you've decided to go to grad school in Japan.", "日本 大学院 行く", "日本の大学院に行くことにした。"),
  'koto-ni-naru': D("A team meeting.", [["Boss", "何か報告がありますか。", "Anything to report?"]], "Announce that it's been decided you'll transfer to Osaka in April.", "四月 大阪 転勤する", "四月から大阪に転勤することになりました。"),

  // 19
  'bakari': D("Running into another parent.", [["Neighbor", "息子さん、元気ですか。", "How's your son?"]], "Complain that he's fine, but does nothing but play games.", "ゲーム する", "元気だけど、ゲームばかりしているよ。"),
  'naide': D("A friend sees you yawning at noon.", [["Friend", "眠そうだね。", "You look sleepy."]], "Say you came to school without sleeping last night.", "寝る 学校 来る", "昨日は寝ないで学校に来たんだ。"),
  'zuni': Pa("A short news story.", "昨日、駅で財布をなくした男性がいた。＿警察は、親切な人が届けてくれたと話している。", "Yesterday a man lost his wallet at the station. ___ The police say a kind person turned it in.", "Write (in written style) that the wallet came back without any money being taken.", "財布 お金 取る 戻る", "財布は、お金を取られずに戻ってきた。"),
  'ta-bakari': D("A neighbor greets you.", [["Neighbor", "日本の生活はどうですか。", "How's life in Japan?"]], "Say you only just came last week, so you don't really know yet.", "先週 来る", "先週来たばかりなので、まだよくわかりません。"),
  'tokoro-da': D("Your mom calls.", [["Mom", "今、話せる？", "Can you talk now?"]], "Say you're just about to leave the house.", "家 出る", "ちょうど今、家を出るところだよ。"),
  'tame-ni': D("A friend asks about your many shifts.", [["Friend", "どうしてそんなにアルバイトしているの？", "Why are you working so many shifts?"]], "Say you're saving money in order to study abroad.", "留学する 貯金する", "留学するために、貯金しているんだ。"),
  'you-ni-purpose': D("Your coworker is leaving on an icy night.", [["Coworker", "外、凍っていますね。", "It's icy outside."]], "Tell them to be careful so they don't slip and fall.", "転ぶ 気", "転ばないように、気をつけてください。"),

  // 20
  'o-ni-naru': D("Answering the office phone.", [["Caller", "部長はいらっしゃいますか。", "Is the department manager in?"]], "Say the manager has already gone home (honorific お〜になる).", "部長 帰る", "部長はもうお帰りになりました。"),
  'o-suru': D("At a hotel front desk.", [["Guest", "荷物が重くて…", "My bags are heavy..."]], "Humbly offer to carry their bags up to the room.", "部屋 荷物 持つ", "お部屋までお荷物をお持ちします。"),
  'sonkeigo-verbs': D("Taking orders at a faculty lunch.", [["Professor", "どれもおいしそうですね。", "Everything looks delicious."]], "Ask the professor (honorifically) what they will eat.", "何 召し上がる", "先生は何を召し上がりますか。"),
  'kenjougo-verbs': D("A business call.", [["Client", "お名前をお願いします。", "May I have your name, please?"]], "Give your name humbly.", "申す", "スミスと申します。"),
  'te-itadaku': D("A classmate asks about your thesis.", [["Classmate", "論文、うまくいった？", "Did your thesis go well?"]], "Say yes — your professor kindly checked it for you.", "先生 見る|チェック", "うん、先生に見ていただいたから。"),
  'te-kudasaru': D("At a conference venue.", [["Coworker", "ここまでどうやって来ましたか。", "How did you get here?"]], "Say the company president kindly drove you here by car.", "社長 車 送る", "社長が車で送ってくださいました。"),
  'te-itadakemasenka': D("On a stuffy train.", [["Passenger", "はい？", "Yes?"]], "Very politely ask if they could open the window.", "窓 開ける", "すみません、窓を開けていただけませんか。"),
};
