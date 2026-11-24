// Review prompts — levels 41–50.
import { D, Pa } from './helpers.js';

export default {
  // 41
  'sura': D("A colleague asks about the new hire.", [["Colleague", "新人の佐藤さん、どうですか。", "How's Sato, the new hire?"]], "Complain that he doesn't even say hello.", "挨拶", "挨拶すらしないんですよ。"),
  'taritomo': Pa("A team leader's memo.", "プロジェクトの締め切りは来週の月曜日だ。＿全員の協力をお願いしたい。", "The project deadline is next Monday. ___ I ask for everyone's cooperation.", "Write that not a single minute can be wasted until the deadline.", "一分 無駄 締め切り", "締め切りまで、一分たりとも無駄にできない。"),
  'dani': Pa("A flood survivor's memoir.", "あの夜、川の水は一気に町に流れ込んだ。＿", "That night, the river poured into the town all at once. ___", "Write that it's frightening even to imagine what would have happened if you hadn't fled.", "逃げる 想像する 恐ろしい", "あのまま逃げなかったらと、想像するだに恐ろしい。"),
  'ni-shite': Pa("A sports article.", "その選手は十五歳でプロデビューした。＿", "The athlete made his pro debut at fifteen. ___", "Write that at the age of just seventeen, he became world champion.", "十七歳 世界 チャンピオン", "そして十七歳にして世界チャンピオンになった。"),
  'n-bakari': Pa("A memoir.", "合格の知らせを聞いた母は、私を強く抱きしめた。＿", "On hearing I'd been accepted, my mother hugged me tightly. ___", "Write that she was so happy she looked about to cry.", "泣く 喜ぶ", "泣かんばかりに喜んでいた。"),
  'meku': D("Early March, walking outside.", [["Friend", "今日は暖かいね。", "It's warm today."]], "Say even the wind has become quite spring-like.", "風 春", "風もだいぶ春めいてきたね。"),

  // 42
  'gotoki': Pa("A retirement speech.", "四十年間、この会社で働いてきました。＿", "I have worked at this company for forty years. ___", "Write that those forty years passed like a dream.", "夢 過ぎる", "その四十年は夢のごとく過ぎ去りました。"),
  'jimiru': D("Office gossip.", [["Friend", "課長、会議で机をたたいて怒ったんだって。", "I heard the section chief pounded the desk in the meeting."]], "Say that for an adult, that's childish behavior.", "子供 行動", "大人なのに、子供じみた行動ですね。"),
  'wo-motte': Pa("A notice on a shop door.", "長い間ご愛顧いただき、誠にありがとうございました。＿", "Thank you sincerely for your patronage over the years. ___", "Write that the shop will close as of the end of this month.", "今月末 閉店", "当店は今月末をもって閉店いたします。"),
  'wo-oite': D("Choosing a new team leader.", [["Director", "誰にリーダーを任せましょうか。", "Who should we put in charge?"]], "Say there's no one but Ms. Suzuki.", "鈴木 ほか", "鈴木さんをおいてほかにいません。"),
  'wo-yoso-ni': Pa("A local news article.", "その町では、新しい空港の建設に住民の多くが不安を感じている。＿", "In that town, many residents are uneasy about the construction of a new airport. ___", "Write that the city went ahead with the plan, paying no heed to residents' concerns.", "住民 心配 計画 進める", "市は住民の心配をよそに、計画を進めた。"),
  'wo-monotomo-sezu': Pa("A sports report.", "決勝戦の日は、朝から台風のような天気だった。＿", "On the day of the final, the weather was like a typhoon from the morning. ___", "Write that the players, undaunted by the strong wind, fought to the end.", "選手 強風 戦う", "選手たちは強風をものともせずに、最後まで戦った。"),
  'wo-kinjienai': Pa("An editorial.", "被災地では、今も多くの人が避難所で暮らしている。＿", "In the disaster zone, many people are still living in shelters. ___", "Write that one cannot help feeling sympathy for them.", "同情", "彼らには同情を禁じ得ない。"),

  // 43
  'taru': Pa("An opinion column.", "最近、政治家の失言が続いている。＿", "Lately, politicians keep making gaffes. ___", "Write that one who is a politician should be careful with words.", "政治家 言葉 気をつける", "政治家たる者、言葉には気をつけるべきだ。"),
  'bekarazu': Pa("A sign at a temple.", "＿ここは神聖な場所です。", "___ This is a sacred place.", "Write the sign: photography prohibited (〜べからず).", "撮影", "撮影すべからず。"),
  'beku': Pa("A biography.", "彼は子供のころから医者になるのが夢だった。＿", "Since he was a child, his dream was to become a doctor. ___", "Write that he went to Tokyo in order to realize that dream.", "夢 実現する 東京", "その夢を実現すべく、東京へ出た。"),
  'nara-dewa': D("A tourist in your hometown.", [["Tourist", "この町のおすすめは何ですか。", "What do you recommend in this town?"]], "Recommend trying the hot springs — something you can only experience here.", "温泉 体験", "ここならではの温泉を体験してみてください。"),
  'nara-izashirazu': D("A veteran coworker made a basic error.", [["Coworker", "すみません、敬語の使い方を間違えました。", "Sorry, I used keigo incorrectly."]], "Say a new employee would be one thing, but in your tenth year, that's a problem.", "新入社員 十年", "新入社員ならいざしらず、十年目でそれは困りますね。"),
  'nari-ni': D("A junior apologizes for their report.", [["Junior", "あまりいい報告書じゃなくて、すみません。", "Sorry the report isn't very good."]], "Say you can see they worked hard in their own way.", "頑張る", "君なりに頑張ったのはわかるよ。"),
  'nagara-ni': Pa("A documentary narration.", "この村の人々は、百年前と同じ方法で米を作っている。＿", "The people of this village grow rice the same way as a hundred years ago. ___", "Write that the time-honored (unchanged since long ago) scenery still remains.", "昔 景色", "昔ながらの景色が今も残っている。"),
  'taru-mono': D("The team captain wants to skip practice.", [["Captain", "練習、今日は休んでもいいですか。", "Can I skip practice today?"]], "Say a captain must be an example for everyone.", "キャプテン 手本", "キャプテンたるもの、みんなの手本にならなければならない。"),

  // 44
  'n-ga-tame': Pa("A historical novel.", "その若者は昼も夜も剣の稽古を続けた。＿", "The young man kept up his sword training day and night. ___", "Write that it was all in order to avenge his father.", "父 仇 討つ", "すべては父の仇を討たんがためであった。"),
  'zutomo': D("Cooking with a friend.", [["Friend", "このスープ、塩を入れ忘れたかも。", "I might have forgotten to salt this soup."]], "Say you can tell it's good even without tasting it.", "味見 わかる", "味見せずとも、おいしいのはわかるよ。"),
  'ga-hayai-ka': Pa("A story about your dog.", "散歩の時間になると、うちの犬はそわそわし始める。＿", "When it's time for a walk, our dog gets restless. ___", "Write that no sooner had you opened the door than the dog ran outside.", "ドア 開ける 犬 走る", "ドアを開けるが早いか、犬が外へ走り出した。"),
  'ya-inaya': Pa("A news report.", "人気ゲームの新作が今朝発売された。＿", "The latest installment of a popular game went on sale this morning. ___", "Write that the moment the store opened, customers surged in.", "店 開く 客", "店が開くや否や、客が押し寄せた。"),
  'nari-as-soon': Pa("A novel.", "長い出張から帰ってきた父は、疲れ切っていた。＿", "Father, back from a long business trip, was exhausted. ___", "Write that the moment he got home, he collapsed onto the sofa.", "家 帰る ソファー 倒れる", "家に帰るなり、ソファーに倒れ込んだ。"),
  'soba-kara': D("A friend asks about your savings.", [["Friend", "貯金、できてる？", "Managing to save money?"]], "Say not at all — you spend money as fast as you earn it.", "稼ぐ 使う", "全然。稼ぐそばから使ってしまうんだ。"),
  'ga-saigo': D("Warning a friend about an office gossip.", [["Friend", "山田さんに、私の秘密を話しちゃおうかな。", "Maybe I'll tell Yamada my secret."]], "Warn that once they tell her, the whole office will know.", "話す 会社中", "彼女に話したが最後、会社中に知られるよ。"),

  // 45
  'majiki': Pa("A news commentary.", "ある警察官が、事件の証拠を隠していたことがわかった。＿", "It came to light that a police officer had been hiding evidence. ___", "Write that this is conduct utterly unbecoming of a police officer.", "警察官 行為", "警察官としてあるまじき行為だ。"),
  'neba-naranu': Pa("A leader's speech.", "我々は今、大きな危機に直面している。＿", "We now face a great crisis. ___", "Write (in literary style) that now is the time we must act.", "今 行動する", "今こそ行動せねばならない。"),
  'ni-taru': D("A colleague is unsure.", [["Colleague", "彼の説明、信じますか。", "Do you believe his explanation?"]], "Say no, his explanation isn't worth believing.", "説明 信じる", "いいえ、その説明は信じるに足るものではありません。"),
  'ni-taeru': Pa("A movie review.", "子供向けのアニメ映画だと思って見始めた。＿", "I started watching it thinking it was an animated film for kids. ___", "Write that it turned out to be a work that even adults can appreciate.", "大人 鑑賞 作品", "ところが、大人の鑑賞にも堪える作品だった。"),
  'ni-taenai': Pa("A TV review.", "昨夜の番組は、出演者が一般人を笑いものにするだけだった。＿", "Last night's show was nothing but the cast ridiculing ordinary people. ___", "Write that the cast's words were unbearable to listen to.", "聞く 言葉", "出演者の言葉は、聞くに堪えないものだった。"),
  'ni-atai-suru': D("A friend asks about a much-discussed novel.", [["Friend", "あの小説、話題になってるけど、どう？", "That novel's getting a lot of buzz. Any good?"]], "Say it's a work worth reading at least once.", "一度 読む", "一度読むに値する作品だよ。"),
  'ni-kataku-nai': Pa("An article about an earthquake.", "地震で家を失い、家族とも連絡が取れない人も多い。＿", "Many people lost their homes in the earthquake and can't reach their families. ___", "Write that their anxiety is not hard to imagine.", "不安 想像", "その不安は想像にかたくない。"),

  // 46
  'naru-literary': Pa("A temple's tourism poster.", "千年の時を超えて、この寺は今も静かに立っている。＿", "Spanning a thousand years, this temple still stands quietly. ___", "Write an elevated phrase inviting people to come encounter a great history (偉大なる).", "偉大 歴史", "偉大なる歴史に、出会いに来てください。"),
  'to-areba': D("A colleague needs weekend help.", [["Colleague", "週末なのに、本当に手伝ってくれるんですか。", "You'll really help, even on a weekend?"]], "Say if it's for them, you'll help any time.", "手伝う", "あなたのためとあれば、いつでも手伝いますよ。"),
  'to-atte': Pa("A news report.", "今日から三連休が始まった。＿", "A three-day weekend began today. ___", "Write that, it being a long weekend, the expressways are extremely congested.", "連休 高速道路 混雑", "連休とあって、高速道路は大変混雑している。"),
  'to-aimatte': Pa("A restaurant review.", "窓からは、夕日に染まる海が見える。＿", "From the window you can see the sea tinted by the sunset. ___", "Write that, combined with this view, the food tasted all the better.", "景色 料理 おいしい", "この景色と相まって、料理は一層おいしく感じられた。"),
  'to-bakari-ni': Pa("A short story.", "残業中の同僚に「手伝おうか」と声をかけると、＿", "When I asked my coworker working late, \"Want some help?\", ___", "Write that he handed his work over as if to say \"I've been waiting for that!\"", "仕事 渡す", "彼は「待ってました」とばかりに仕事を渡してきた。"),
  'tomo-naru-to': D("Your nephew has news.", [["Nephew", "来月から大学生です！", "I'm starting university next month!"]], "Say once you're a university student, you have to manage your own schedule.", "大学生 自分 スケジュール", "大学生ともなると、自分でスケジュールを管理しなければならないよ。"),

  // 47
  'nu': Pa("A short story.", "本を読み始めたのは、夕方だった。＿外はもう真っ暗だった。", "I started reading in the early evening. ___ Outside, it was already pitch dark.", "Write that before you knew it, hours had passed (知らぬ間に).", "知る 時間 過ぎる", "知らぬ間に何時間も過ぎていた。"),
  'zaru': Pa("A museum exhibition description.", "この展覧会では、これまで公開されなかった資料を紹介する。＿", "This exhibition presents materials never before made public. ___", "Write that visitors can learn the unknown history of the town (知られざる).", "町 歴史 知る", "町の知られざる歴史を知ることができる。"),
  'zu-ni-wa-sumanai': D("A colleague broke a client's sample.", [["Colleague", "取引先のサンプルを壊してしまいました…", "I broke the client's sample..."]], "Say there's no getting around reporting it to the manager.", "部長 報告する", "部長に報告せずにはすまないね。"),
  'zu-ni-wa-okanai': Pa("A film review.", "この映画は、ある母親と息子の三十年間を描いている。＿", "This film depicts thirty years in the lives of a mother and her son. ___", "Write that the final scene is bound to make the audience cry.", "最後 観客 泣く", "最後の場面は、観客を泣かせずにはおかない。"),
  'te-yamanai': Pa("A wedding speech.", "お二人の新しい門出を心からお祝い申し上げます。＿", "I offer my heartfelt congratulations on your new beginning. ___", "Write that you sincerely and continually wish for the couple's happiness.", "二人 幸せ 願う", "お二人の幸せを願ってやみません。"),
  'wo-yogi-naku-sareru': Pa("A news report.", "大雨の影響で、川の水位が急に上がった。＿", "Due to heavy rain, the river level rose suddenly. ___", "Write that several hundred residents were forced to evacuate.", "住民 避難", "数百人の住民が避難を余儀なくされた。"),

  // 48
  'tote': D("A friend is surprised you lost your temper.", [["Friend", "君でも怒ることがあるんだね。", "So even you get angry sometimes."]], "Say even you are only human.", "人間", "私とて人間だからね。"),
  'shimeru': Pa("A history of science.", "その若い科学者の論文は、学界に大きな衝撃を与えた。＿", "The young scientist's paper sent shockwaves through academia. ___", "Write that it made even the great professors say \"We were wrong\" (言わしめる).", "教授 言う", "それは大教授たちをして「我々が間違っていた」と言わしめた。"),
  'shimatsu-da': D("A friend asks about your son.", [["Friend", "息子さん、大学はどう？", "How's your son doing at university?"]], "Complain that he skipped class so much he finally ended up repeating a year.", "授業 休む 留年する", "授業を休んでばかりで、ついに留年する始末だ。"),
  'kirai-ga-aru': D("A performance review.", [["Manager", "田中さんの仕事ぶりはどうですか。", "How is Tanaka's work?"]], "Say he's capable, but tends to push ahead alone without consulting anyone.", "相談する 一人", "優秀ですが、相談せずに一人で進めるきらいがあります。"),
  'made-mo-nai': D("A junior asks an obvious question.", [["Junior", "この書類、提出前に確認したほうがいいですか。", "Should I check this document before submitting it?"]], "Say needless to say, they should check it.", "言う 確認する", "言うまでもなく、確認すべきだよ。"),
  'made-da': D("The night before an exam.", [["Friend", "もし落ちたら、どうする？", "What will you do if you fail?"]], "Say if you fail, you'll simply take it again next year.", "落ちる 来年 受ける", "落ちたら、来年また受けるまでだ。"),
  'nimo-hodo-ga-aru': D("Your cake is gone.", [["Roommate", "ケーキ、猫が食べたんじゃない？", "Maybe the cat ate the cake?"]], "Say there's a limit to how far a lie can go.", "嘘", "嘘にもほどがあるよ。"),

  // 49
  'yara': D("A coworker asks about your weekend.", [["Coworker", "週末はゆっくりできましたか。", "Did you get to relax on the weekend?"]], "Say no — between cleaning, laundry and whatnot, you were busy.", "掃除 洗濯 忙しい", "いいえ、掃除やら洗濯やらで忙しかったです。"),
  'dano': D("A friend asks about your roommate.", [["Friend", "ルームメイト、どう？", "How's your roommate?"]], "Complain he's always griping: the room's cold, the food's bad, and so on.", "寒い まずい 文句", "部屋が寒いだの、料理がまずいだの、文句ばかり言う。"),
  'de-arou': Pa("The conclusion of a research paper.", "本研究の結果、新しい治療法の効果が確認された。＿", "This study confirmed the efficacy of the new treatment. ___", "Write that this method will probably come to be widely used in the future.", "将来 広い 使う", "この方法は、将来広く使われるであろう。"),
  'de-are': D("A parent asks the principal for an exception.", [["Parent", "うちの子は特別に許してもらえませんか。", "Couldn't you make an exception for my child?"]], "Say whatever the reason, the rules must be followed.", "理由 規則 守る", "理由が何であれ、規則は守らなければなりません。"),
  'to-ii-to-ii': D("A friend asks about your new apartment.", [["Friend", "新しい部屋、気に入ってる？", "Do you like your new place?"]], "Say both the location and the rent are perfect.", "場所 家賃", "場所といい家賃といい、申し分ないよ。"),
  'to-iwazu': Pa("A news report on a heat wave.", "今年の夏は記録的な暑さが続いている。＿", "This summer, record-breaking heat continues. ___", "Write that, day or night alike, many people can't sleep because of the heat.", "昼 夜 暑い", "昼といわず夜といわず、暑くて眠れない人が多い。"),
  'nari-nari': D("A new employee is stuck.", [["New employee", "この資料、わからないところがあるんですが…", "There are parts of this document I don't understand..."]], "Tell them to ask a senior colleague or look it up online or something.", "先輩 聞く 調べる", "先輩に聞くなり、ネットで調べるなりしてください。"),

  // 50
  'zukume': D("A year-end chat.", [["Friend", "今年はどんな一年だった？", "What kind of year was it?"]], "Say with your marriage and promotion, it was a year of nothing but good things.", "結婚 昇進", "結婚に昇進に、いいことずくめの一年だったよ。"),
  'gurumi': D("A friend notices you're close with your neighbors.", [["Friend", "お隣さんと仲がいいね。", "You're close with your neighbors."]], "Say your whole families have been friends for twenty years.", "家族 付き合い", "もう二十年、家族ぐるみの付き合いなんだ。"),
  'ikan-ni-yorazu': Pa("Exam instructions.", "試験中の不正行為は厳しく禁止されています。＿", "Cheating during the exam is strictly prohibited. ___", "Write that, regardless of the reason, anyone who cheats will fail.", "理由 不正行為 不合格", "理由のいかんによらず、不正行為をした者は不合格とする。"),
  'ikan-de-wa': D("An athlete asks the coach.", [["Athlete", "オリンピックに出られるでしょうか。", "Do you think I can make the Olympics?"]], "Say depending on tomorrow's match result, they might be able to compete.", "試合 結果 出場", "明日の試合の結果いかんでは、出場できるかもしれない。"),
  'wo-kawakiri-ni': Pa("Music news.", "人気バンドが来年の春、三年ぶりの全国ツアーを行う。＿", "A popular band will hold its first nationwide tour in three years next spring. ___", "Write that, starting with Sapporo, they'll perform in twenty cities.", "札幌 都市 公演", "札幌を皮切りに、二十の都市で公演する。"),
  'tomo-naku': Pa("A short story.", "日曜日の午後、私は一人で縁側に座っていた。＿", "On Sunday afternoon, I sat alone on the veranda. ___", "Write that you were idly listening to the sound of the rain, without really meaning to.", "雨 音 聞く", "聞くともなく雨の音を聞いていた。"),
  'te-shikarubeki': D("A friend's train was three hours late.", [["Friend", "鉄道会社から何の説明もなかったんだよ。", "The railway company gave no explanation at all."]], "Say there ought to have been an explanation and an apology.", "説明 謝罪", "説明と謝罪があってしかるべきだよね。"),
};
