// Review prompts — levels 21–30.
import { D, Pa } from './helpers.js';

export default {
  // 21
  'sae': D("A friend asks about your week.", [["Friend", "最近忙しい？", "Busy lately?"]], "Say you're so busy you don't even have time to sleep.", "寝る 時間", "忙しくて、寝る時間さえない。"),
  'koso': D("New Year's resolutions.", [["Friend", "今年の目標は？", "What's your goal this year?"]], "Say this year, for sure, you want to get your driver's license.", "今年 運転免許 取る", "今年こそ運転免許を取りたい。"),
  'demo-even': D("A coworker eyes your homemade dish.", [["Coworker", "この料理、難しいですか。", "Is this dish hard to make?"]], "Say it's so easy even a child can make it.", "子供 作る", "簡単だから、子供でも作れますよ。"),
  'nanka': D("Your friend is surprised you don't play games anymore.", [["Friend", "最近、ゲームしないね。", "You don't play games lately."]], "Say you have no time for things like games.", "ゲーム 時間", "ゲームなんかする時間はないよ。"),
  'hodo': D("Comparing winters.", [["Friend", "大阪は東京より寒い？", "Is Osaka colder than Tokyo?"]], "Say no, Osaka isn't as cold as Tokyo.", "大阪 東京 寒い", "いや、大阪は東京ほど寒くない。"),
  'causative-passive': D("A friend asks about your old job.", [["Friend", "前のアルバイト、どうだった？", "How was your old part-time job?"]], "Complain that you were made to work until late at night every day.", "毎日 夜中 働く", "毎日夜中まで働かされた。"),
  'tsumori': D("Your professor asks about your future.", [["Professor", "卒業したら、どうするつもりですか。", "What do you plan to do after graduating?"]], "Say you intend to work at a company in Tokyo.", "東京 会社 働く", "東京の会社で働くつもりです。"),

  // 22
  'ppoi': D("A friend asks about your new manager.", [["Friend", "新しい部長、どんな人？", "What's the new manager like?"]], "Say casually he's a bit childish.", "子供", "ちょっと子供っぽい人だよ。"),
  'garu': D("Your friend wonders why the dog stays inside.", [["Friend", "犬、散歩に行かないの？", "Isn't your dog going for a walk?"]], "Say your dog hates the rain (shows it doesn't like it).", "犬 雨 嫌", "うちの犬は雨を嫌がるんだ。"),
  'wake-da': D("A friend reveals something.", [["Friend", "実は母が日本人なんだ。", "Actually, my mom is Japanese."]], "Say: oh, no wonder your Japanese is so good.", "日本語 上手", "ああ、だから日本語が上手なわけだ。"),
  'wake-dewanai': D("A friend notices you never order sushi.", [["Friend", "寿司、嫌いなの？", "Do you hate sushi?"]], "Say it's not that you dislike it, but you don't eat much raw fish.", "嫌い 生 魚", "嫌いなわけではないけど、生の魚はあまり食べない。"),
  'wake-ga-nai': D("Office gossip.", [["Coworker", "田中さんが嘘をついたって本当？", "Is it true Tanaka lied?"]], "Say there's no way Tanaka would lie — he's honest.", "田中 正直 嘘", "田中さんは正直だから、嘘をつくわけがない。"),
  'wake-ni-wa-ikanai': D("6 p.m. at the office.", [["Coworker", "もう帰りませんか。", "Shall we head home?"]], "Say you can't very well leave before the manager does.", "部長 帰る", "部長より先に帰るわけにはいきません。"),

  // 23
  'beki': D("A class debate.", [["Classmate", "若い人はもっと選挙に行くべきだと思う？", "Do you think young people should vote more?"]], "Say yes, you think everyone should go vote.", "みんな 選挙 行く", "はい、みんな選挙に行くべきだと思います。"),
  'tagaru': D("A friend asks about your nephew.", [["Friend", "甥っ子さん、何が好きなの？", "What does your nephew like?"]], "Say he always wants to play outside.", "外 遊ぶ", "いつも外で遊びたがっている。"),
  'koto-wa-nai': D("A nervous new coworker.", [["New coworker", "明日の発表、失敗したらどうしよう…", "What if I mess up tomorrow's presentation..."]], "Reassure them there's no need to be so nervous.", "緊張する", "そんなに緊張することはないよ。"),
  'koto-ga-aru-sometimes': D("A friend asks about your commute.", [["Friend", "電車はいつも時間通り？", "Is your train always on time?"]], "Say in winter there are times it's late because of snow.", "冬 雪 遅れる", "冬は雪で遅れることがあります。"),
  'mono-da': D("Visiting your old neighborhood with a childhood friend.", [["Friend", "懐かしいね、この公園。", "This park brings back memories."]], "Say you used to play baseball here a lot as kids.", "よく 野球", "子供のころ、よくここで野球をしたものだ。"),
  'koto-da': D("A junior student asks for advice.", [["Junior", "どうすれば日本語が上手になりますか。", "How can I get better at Japanese?"]], "Advise that the thing to do is talk with Japanese people a lot.", "日本人 話す", "日本人とたくさん話すことだ。"),

  // 24
  'ni-tsuite': D("Your professor asks about your term paper.", [["Professor", "何について書くつもりですか。", "What are you planning to write about?"]], "Say you'll write about the history of Japanese anime.", "アニメ 歴史", "日本のアニメの歴史について書くつもりです。"),
  'ni-totte': D("A friend notices you call home daily.", [["Friend", "毎日家族に電話してるね。", "You call your family every day."]], "Explain that to you, family matters more than anything.", "家族 大切", "家族は私にとって何よりも大切だから。"),
  'ni-yotte': D("A class discussion.", [["Classmate", "この問題の答えは一つですか。", "Is there only one answer to this question?"]], "Say no, the answer differs depending on the person.", "答え 人 違う", "いいえ、答えは人によって違います。"),
  'ni-taishite': D("Customer-service training.", [["Trainer", "お客様にはどんな態度で接するべきですか。", "What attitude should we take with customers?"]], "Say you should always speak politely to customers.", "お客様 丁寧", "お客様に対して、いつも丁寧に話すべきです。"),
  'to-shite': D("Small talk at a party.", [["Guest", "どちらにお勤めですか。", "Where do you work?"]], "Say you work as an English teacher at a high school.", "高校 英語 教師", "高校で英語の教師として働いています。"),
  'teki': D("A meeting at work.", [["Boss", "この計画についてどう思いますか。", "What do you think of this plan?"]], "Say personally, you think it's a good plan.", "個人 計画", "個人的には、いい計画だと思います。"),
  'rashii-typical': D("Spring has finally arrived.", [["Friend", "今日は暖かいね。", "It's warm today."]], "Say it's real spring-like weather.", "春 天気", "本当に春らしい天気だね。"),

  // 25
  'kakeru': D("Your roommate is tidying up.", [["Roommate", "この本、片付けていい？", "Can I put this book away?"]], "Say no — it's a book you're halfway through reading.", "読む 本", "だめ、それは読みかけの本だから。"),
  'kiru': D("At a pizza place.", [["Friend", "ピザ、もう一枚頼む？", "Order another pizza?"]], "Say no, you couldn't possibly eat it all.", "全部 食べる", "いや、全部は食べきれないよ。"),
  'you-to-suru': D("A coworker asks about a missed call.", [["Coworker", "昨日、電話に出ませんでしたね。", "You didn't answer my call yesterday."]], "Say just as you were about to answer, it cut off.", "出る 切れる", "出ようとした時、切れてしまったんです。"),
  'ta-tokoro': D("A friend asks about concert tickets.", [["Friend", "チケット、取れた？", "Did you get the tickets?"]], "Say when you checked the website, they were already sold out.", "サイト 見る 売り切れ", "サイトを見たところ、もう売り切れだった。"),
  'ta-totan': D("A friend asks about your picnic.", [["Friend", "ピクニック、どうだった？", "How was the picnic?"]], "Say the moment you got to the park, it started raining.", "公園 着く 雨", "公園に着いたとたん、雨が降り出した。"),
  'uchi-ni': D("Your host mother brings soup.", [["Host mother", "スープ、どうぞ。", "Here's your soup."]], "Say you'll eat it while it's hot.", "熱い 食べる", "熱いうちに食べますね。"),
  'aida-ni': D("Your neighbor brings up last night.", [["Neighbor", "昨日の夜、大きい地震があったね。", "There was a big earthquake last night."]], "Say it happened while you were asleep, so you didn't notice.", "寝る 気づく|気がつく", "寝ている間に起きたから、気がつかなかった。"),

  // 26
  'nara': D("A friend shares travel plans.", [["Friend", "来週、京都に行くんだ。", "I'm going to Kyoto next week."]], "Say if they're going to Kyoto, they should see the bamboo forest.", "京都 竹林 見る", "京都に行くなら、竹林を見たほうがいいよ。"),
  'temo': D("Your friend checks the forecast.", [["Friend", "明日は雨だよ。それでも走るの？", "It's going to rain tomorrow. Still running?"]], "Say you'll run even if it rains.", "雨 降る 走る", "雨が降っても、走るよ。"),
  'tatte': D("A friend wants to make up.", [["Friend", "謝ったら、彼は許してくれるかな？", "If I apologize, will he forgive me?"]], "Say casually that even if they apologize, you don't think he'll forgive them.", "謝る 許す", "謝ったって、許してくれないと思う。"),
  'ba-hodo': D("A student struggling with kanji.", [["Student", "漢字って、覚えるのが大変ですね。", "Kanji are so hard to memorize."]], "Say the more you memorize, the easier it gets.", "覚える 簡単", "覚えれば覚えるほど簡単になるよ。"),
  'sae-ba': D("Packing for a trip abroad.", [["Friend", "旅行に何が必要？", "What do you need for the trip?"]], "Say as long as you have your passport, you'll be fine.", "パスポート 大丈夫", "パスポートさえあれば大丈夫。"),
  'to-shitara': D("A hypothetical chat.", [["Friend", "もし長い休みがあったら、どうする？", "If you had a long vacation, what would you do?"]], "Say supposing you had a month off, you'd want to travel around Europe.", "一か月 ヨーロッパ 旅行", "一か月休みがあるとしたら、ヨーロッパを旅行したい。"),

  // 27
  'toka': D("A friend asks about your days off.", [["Friend", "休みの日は何してるの？", "What do you do on your days off?"]], "Say things like watching movies and cooking.", "映画 料理", "映画を見るとか、料理をするとかしてるよ。"),
  'tte': D("Passing on a message.", [["Friend", "田中さん、何て言ってた？", "What did Tanaka say?"]], "Report casually that she says she's busy tomorrow.", "明日 忙しい", "明日は忙しいって。"),
  'n-desu': D("Your coworker looks concerned.", [["Coworker", "どうしたんですか。元気がないですね。", "What's wrong? You seem down."]], "Explain that it's because you couldn't sleep much last night.", "昨日 寝る", "昨日、あまり寝られなかったんです。"),
  'okage-de': D("Celebrating good news.", [["Friend", "合格おめでとう！", "Congrats on passing!"]], "Say you were able to pass thanks to your teacher.", "先生 合格", "先生のおかげで合格できました。"),
  'sei-de': D("Arriving late to a meeting.", [["Boss", "どうして遅れたんですか。", "Why were you late?"]], "Say it was because of a train accident.", "電車 事故 遅れる", "電車の事故のせいで、遅れてしまいました。"),
  'kuse-ni': D("Complaining about your older brother.", [["Friend", "お兄さん、宿題手伝ってくれた？", "Did your brother help with your homework?"]], "Complain that even though he knows the answers, he won't tell you.", "答え 知る 教える", "答えを知っているくせに、教えてくれない。"),
  'dake-de-naku': D("Back from Hokkaido.", [["Friend", "北海道のホテルはどうだった？", "How was the hotel in Hokkaido?"]], "Say it was not only clean, but the view was great too.", "ホテル きれい 景色", "あのホテルはきれいなだけでなく、景色もよかった。"),

  // 28
  'gachi': D("A winter checkup.", [["Doctor", "冬は運動していますか。", "Do you exercise in winter?"]], "Say in winter you tend to stay home.", "冬 家 いる", "冬は家にいがちです。"),
  'gimi': D("Calling in to work.", [["Manager", "声が変ですね。", "Your voice sounds strange."]], "Say you've got a touch of a cold.", "風邪", "ちょっと風邪気味なんです。"),
  'ni-chigainai': D("Your roommate looks at the dark window next door.", [["Roommate", "田中さんの部屋、電気が消えてるね。", "Tanaka's lights are off."]], "Say he must have gone to bed already.", "寝る", "もう寝たに違いない。"),
  'ni-kimatteiru': D("Online shopping with a friend.", [["Friend", "このブランドの時計、千円だって！", "This designer watch is only 1,000 yen!"]], "Say it's obviously a fake.", "偽物", "そんなの偽物に決まってるよ。"),
  'towa-kagiranai': D("Picking a restaurant.", [["Friend", "高い店のほうがおいしいよね。", "Expensive places taste better, right?"]], "Say expensive restaurants aren't necessarily tasty.", "高い 店 おいしい", "高い店がおいしいとは限らないよ。"),
  'mama': D("Your roommate mentions the living room.", [["Roommate", "昨日の夜、テレビがついてたよ。", "The TV was on last night."]], "Apologize: you fell asleep with the TV on.", "テレビ つける 寝る", "ごめん、テレビをつけたまま寝ちゃった。"),

  // 29
  'zutsu': D("A friend asks about your kanji routine.", [["Friend", "漢字、どうやって覚えてる？", "How are you memorizing kanji?"]], "Say you memorize five a day, a little at a time.", "毎日 五つ 覚える", "毎日五つずつ覚えています。"),
  'made-ni': D("Your boss assigns a task.", [["Boss", "この報告書、いつできますか。", "When can you have this report done?"]], "Say you'll finish it by Thursday.", "木曜日 終わる|終える", "木曜日までに終わらせます。"),
  'nakya': D("Late night at a friend's place.", [["Friend", "もう一本映画見ない？", "Watch one more movie?"]], "Say casually you've got work tomorrow, so you gotta go home.", "仕事 帰る", "明日仕事だから、もう帰らなきゃ。"),
  'tsuide-ni': D("Your roommate is heading out.", [["Roommate", "ちょっとスーパーに行ってくるね。", "I'm popping over to the supermarket."]], "Ask them to buy milk while they're going.", "牛乳 買う", "行くついでに、牛乳を買ってきてくれる？"),
  'tabi-ni': D("Visiting your grandmother's house.", [["Grandma", "また来てくれたのね。", "You came again."]], "Say every time you come here, you remember your childhood.", "来る 子供 思い出す", "ここに来るたびに、子供のころを思い出すよ。"),
  'ni-tsurete': D("A friend complains about waking up early.", [["Friend", "最近、朝早く目が覚めるんだ。", "Lately I keep waking up early."]], "Say apparently people wake up earlier as they get older.", "年 取る 早い", "年を取るにつれて、早く起きるようになるらしいよ。"),
  'ni-shitagatte': D("Hiking up a mountain.", [["Friend", "空気が冷たくなってきたね。", "The air's getting cold."]], "Say the higher you climb, the colder it gets.", "高い 登る 寒い", "高く登るにしたがって、寒くなる。"),

  // 30
  'kke': D("Chatting before after-work drinks.", [["Coworker", "今日の飲み会、楽しみですね。", "Looking forward to tonight's drinks."]], "Ask what time it starts again (you've forgotten).", "何時 始まる", "何時から始まるんでしたっけ。"),
  'darake': D("Your kid comes home from soccer.", [["Child", "ただいま！", "I'm home!"]], "Say wow, you're covered in mud!", "泥", "わあ、泥だらけだね！"),
  'to-iu-koto': D("A coworker shares news.", [["Coworker", "来月、課長が辞めるそうです。", "I hear the section chief is quitting next month."]], "Say: so that means a new section chief will come.", "新しい 課長 来る", "つまり、新しい課長が来るということですね。"),
  'to-iu-no-wa': D("A friend asks about a word.", [["Friend", "「木漏れ日」って何？", "What's \"komorebi\"?"]], "Explain that komorebi is the light that shines between the leaves of trees.", "木漏れ日 光", "「木漏れ日」というのは、木の葉の間から差す光のことだよ。"),
  'furi-wo-suru': D("Gossip after a party.", [["Friend", "元カレ、パーティーにいたでしょう？", "Your ex was at the party, right?"]], "Say yes, but you pretended not to see him.", "見る", "うん、でも見ないふりをした。"),
  'ki-ga-suru': D("At a conference.", [["Attendee", "はじめまして。", "Nice to meet you."]], "Say you have a feeling you've met them somewhere before.", "どこか 会う", "どこかでお会いしたような気がします。"),
  'sasete-itadaku': D("Wrapping up a business meeting.", [["Client", "今日はありがとうございました。", "Thank you for today."]], "Say you'll (humbly) contact them again next week.", "来週 連絡する", "来週、また連絡させていただきます。"),
};
