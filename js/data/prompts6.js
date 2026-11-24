// Review prompts — levels 51–60. Classical items expect classical answers.
import { D, Pa } from './helpers.js';

export default {
  // 51
  'zo': Pa("A soba shop's sign.", "この店のそばは、三代目の職人が毎朝手で打っている。＿", "The soba here is made by hand every morning by a third-generation artisan. ___", "Write an emphatic line: this, truly, is real soba (これぞ).", "本物 そば", "これぞ本物のそばである。"),
  'namu-emphatic': Pa("A tale in classical style.", "昔、山の奥に小さき寺ありけり。＿", "Long ago, deep in the mountains, there was a small temple. ___", "Write, with emphatic なむ, that an aged monk lived there (…住みける).", "僧 住む", "そこに老いたる僧なむ住みける。"),
  'ki': Pa("A memoir in literary style.", "幼き日、祖母の家の庭には大きな柿の木があった。＿", "In my childhood, there was a big persimmon tree in Grandmother's garden. ___", "Write that you still recall the days you played under it with her (past し before a noun: 遊びし日々).", "祖母 遊ぶ", "その木の下で祖母と遊びし日々を、今も思い出す。"),
  'keri': Pa("The opening of a tale.", "＿その娘は、月のように美しかった。", "___ The daughter was as beautiful as the moon.", "Write a classical opening: long ago, there was an old man who had one daughter (…ありけり).", "昔 翁 娘", "昔、一人の娘を持つ翁ありけり。"),
  'koso-izenkei': Pa("A travel diary in classical style.", "旅の宿にて、窓より空を見上げたり。＿", "At an inn on my journey, I looked up at the sky from the window. ___", "Write that tonight's moon, above all, is beautiful — こそ with the realis (已然形) ending.", "月 美しい", "この夜の月こそ美しけれ。"),

  // 52
  'domo': Pa("A travel diary in literary style.", "道に迷ひて、山の中を一日歩きけり。＿", "Having lost my way, I walked in the mountains all day. ___", "Write that however far you walked, you couldn't reach the village (歩けども歩けども).", "歩く 村", "歩けども歩けども、村には着かなかった。"),
  'nu-tsu-perfective': Pa("A classical-style diary.", "嵐の夜は明けたり。＿", "The stormy night has given way to dawn. ___", "Write that the wind, too, has stopped (perfective ぬ).", "風 止む", "風も止みぬ。"),
  'tari-classical': Pa("A classical-style landscape.", "春の日、野に出でて遊びけり。＿", "On a spring day, I went out into the fields to play. ___", "Write that a small stream was flowing quietly (流れたり).", "小川 流れる", "小川、静かに流れたり。"),
  'izenkei-ba': Pa("A night on the road, in classical prose.", "旅の途中、古き寺に立ち寄りけり。＿", "On my journey, I stopped at an old temple. ___", "Write that when you looked up, the sky was full of stars (已然形 + ば: 見上ぐれば).", "見上げる 星", "見上ぐれば、空に星満ちたり。"),

  // 53
  'mono-wo': D("A friend missed a free concert.", [["Friend", "昨日の無料コンサート、知らなかった…", "I didn't know about yesterday's free concert..."]], "Say regretfully: if only they had asked, you would have told them (〜ものを).", "聞く 教える", "聞いてくれれば、教えたものを。"),
  'mu': Pa("A classical-style travelogue.", "日も暮れぬ。＿", "The sun has set. ___", "Write: come, let us seek lodging for tonight (求めむ).", "宿 求める", "いざ、今宵の宿を求めむ。"),
  'beshi': D("A strict teacher.", [["Student", "先生、宿題は明日まででいいですか。", "Teacher, can the homework be due tomorrow?"]], "Answer in classical style: no, it must be submitted today.", "今日 出す", "否、今日中に出すべし。"),
  'maji': Pa("A samurai's vow in a historical novel.", "殿は命をかけて我を救ひたまへり。＿", "My lord saved me at the risk of his own life. ___", "Write his vow: as long as I live, I shall not forget this debt (忘るまじ).", "生きる 恩 忘れる", "生きる限り、この恩は忘るまじ。"),
  'ramu': Pa("A reflection far from home.", "故郷を離れて、はや三年。＿", "Already three years since I left home. ___", "Write: I wonder how the cherry trees back home are blooming right now (咲くらむ).", "故郷 桜 咲く", "今ごろ故郷の桜はいかに咲くらむ。"),

  // 54
  'kemu': Pa("A visit to castle ruins.", "この城跡に立ちて、遠き昔を思ふ。＿", "Standing in these castle ruins, I think of the distant past. ___", "Write: the warriors of old, too, must have gazed at this moon (見けむ).", "武士 月 見る", "昔の武士たちも、この月を見けむ。"),
  'rashi-classical': Pa("A classical-style seasonal note.", "風のにほひ、やはらかになりぬ。＿", "The scent of the wind has grown soft. ___", "Write: it seems spring has come (〜らし).", "春", "春は来たるらし。"),
  'meri': Pa("A court lady's diary.", "宴の声、いつしか静まりぬ。＿", "The voices of the banquet have quieted at some point. ___", "Write: it appears the guests have all gone home (〜めり).", "客 帰る", "客はみな帰りぬるめり。"),
  'nari-hearsay': Pa("A night scene in classical prose.", "夜更けて、庭に出でたり。＿", "Late at night, I went out into the garden. ___", "Write: from somewhere, I hear the sound of a koto (すなり).", "琴 音", "いづこよりか琴の音すなり。"),
  'zu-ya': D("A friend is puzzled by your hobby.", [["Friend", "古文なんて、なんで勉強してるの？", "Why are you studying classical Japanese, of all things?"]], "Reply in kanbun style: to read old books for oneself — is that not a joy?", "古い 本 読む 楽しい", "古き本を自ら読む、また楽しからずや。"),

  // 55
  'mogana': Pa("A love poem's preface.", "君と会へるは、年に一度のみ。＿", "I can see you only once a year. ___", "Write the wish: would that I had wings (〜もがな).", "翼", "我に翼もがな。"),
  'baya': Pa("A traveler's journal.", "聞けば、この先に名高き滝ありといふ。＿", "I hear there is a famous waterfall ahead. ___", "Write: oh, how I wish to see that waterfall (見ばや).", "滝 見る", "いかでその滝を見ばや。"),
  'namu-wish': Pa("A poem-like wish.", "明日は大切な試合の日なり。＿", "Tomorrow is the day of an important match. ___", "Write a wish to the rain: I wish you would stop soon (止まなむ).", "雨 止む", "雨よ、早く止まなむ。"),
  'ji': Pa("A diary after a falling-out.", "かの人の言葉に、深く傷つけり。＿", "I was deeply hurt by that person's words. ___", "Write: I shall never meet that person again (〜じ).", "二度と 会う", "二度とかの人には会はじ。"),
  'mashi': Pa("A daydream.", "窓の外を鳥の群れが飛んでいく。＿", "A flock of birds flies past the window. ___", "Write: were I a bird, I would fly to my hometown (〜まし).", "鳥 故郷 飛ぶ", "鳥ならましかば、故郷へ飛ばまし。"),
  'seba-mashi': Pa("A reflection on the past.", "あの日、私は彼に何も言はずに別れたり。＿", "That day, I parted from him without saying anything. ___", "Write: had I conveyed my feelings, how different things would have been (〜ましかば〜まし).", "思い|思ひ 伝える 違う", "思ひを伝へましかば、いかに違はまし。"),

  // 56
  'nite': Pa("A school's official notice.", "第十回卒業式を下記のとおり行います。＿", "The 10th graduation ceremony will be held as follows. ___", "Write that reception will be at the school's main entrance (にて).", "受付 正面玄関", "受付は本校正面玄関にて行います。"),
  'sourou': Pa("An Edo-period-style letter.", "寒さ厳しき折、いかがお過ごしに候や。＿", "How are you faring in this bitter cold? ___", "Write in 候文 that you yourself are living safely and well.", "無事 暮らす", "私こと、無事に暮らしをり候。"),
  'tamau': Pa("A Heian-style tale.", "春の夜、帝は庭の梅を御覧じけり。＿", "On a spring night, the emperor gazed upon the plum blossoms in the garden. ___", "Write that the emperor composed a poem (詠みたまふ).", "帝 歌 詠む", "帝、一首の歌を詠みたまふ。"),
  'tatematsuru': Pa("A tale of a princess.", "姫君は、遠き国より都へ上りけり。＿", "The princess came up to the capital from a distant province. ___", "Write that the people served her wholeheartedly (仕へ奉る).", "人々 仕える", "人々、心をこめて姫君に仕へ奉る。"),
  'haberi': D("A Heian court scene.", [["Empress", "雪はいかがなる？", "How is the snow?"]], "As a lady-in-waiting, reply politely that it is falling very heavily (降り侍り).", "雪 降る", "雪、いと多く降り侍り。"),
  'nite-sourou': Pa("The opening of a Noh play.", "＿この度、都へ上らばやと存じ候。", "___ I now intend to make my way up to the capital.", "Write the traveler's self-introduction: I am a monk from the eastern provinces (にて候).", "東国 僧", "これは東国より出でたる僧にて候。"),

  // 57
  'zu-final': Pa("A newspaper item in terse style.", "昨夜、山中で遭難した登山者の捜索が続いている。＿", "The search continues for a climber who went missing in the mountains last night. ___", "Write (ending in classical ず) that his whereabouts are still unknown.", "行方 知る", "行方は、いまだ知れず。"),
  'bekenya': D("A friend wonders if you'll quit.", [["Friend", "もう、あきらめるの？", "Giving up already?"]], "Answer rhetorically in kanbun style: having come this far, how could I possibly give up?", "諦める", "ここまで来て、いかでか諦むべけんや。"),
  'wo-shite-shimeru': Pa("A critic's essay.", "その少女のピアノ演奏は、まさに天才のものだった。＿", "The girl's piano performance was truly that of a genius. ___", "Write that it moved even the stern judges to tears (〜をして〜しめた).", "審査員 涙 流す", "それは厳しい審査員をして涙を流さしめた。"),
  'iwanya-wo-ya': D("A friend wants to run a marathon untrained.", [["Friend", "練習なしでフルマラソン、走れるかな。", "Could I run a full marathon without training?"]], "Say even trained people find it hard — let alone someone who hasn't trained (いわんや〜をや).", "練習", "練習した人でさえ苦しいのに、いわんや練習しない人をや。"),
  'gotoshi': Pa("A reflective essay.", "若いころは、時間はいくらでもあると思っていた。＿", "When I was young, I thought I had all the time in the world. ___", "Write the aphorism: life is like a dream (〜ごとし).", "人生 夢", "人生は夢のごとし。"),
  'ni-arazu': Pa("An essay on success.", "多くの人は、成功とはお金持ちになることだと考える。＿", "Many people think success means becoming rich. ___", "Write: yet happiness does not lie in money alone (〜にあらず).", "幸せ お金", "されど、幸せはお金のみにあらず。"),

  // 58
  'o-moushiageru': Pa("A New Year's business card.", "新年あけましておめでとうございます。＿本年もよろしくお願い申し上げます。", "Happy New Year. ___ We look forward to your continued support this year.", "Write that you sincerely thank them for their patronage last year (お礼申し上げます).", "旧年 愛顧 礼", "旧年中のご愛顧に、心よりお礼申し上げます。"),
  'de-irassharu': D("Calling a client's office.", [["Voice", "はい、山田商事でございます。", "Yamada Trading, how may I help you?"]], "Ask honorifically whether you're speaking with Mr. Suzuki.", "鈴木", "失礼ですが、鈴木様でいらっしゃいますか。"),
  'te-oru': D("A client calls your company.", [["Client", "田中部長はいらっしゃいますか。", "Is Manager Tanaka available?"]], "Humbly say Tanaka is in a meeting at the moment.", "田中 会議", "申し訳ございません。田中はただいま会議に出ております。"),
  'te-mairu': D("A client asks a question at the front desk.", [["Client", "予約が入っているか、確認できますか。", "Could you check whether my reservation went through?"]], "Humbly say you'll go check right away.", "確認する", "すぐに確認してまいります。"),
  'go-itadaku': Pa("A hotel's welcome letter.", "＿お部屋の準備ができるまで、ロビーでおくつろぎください。", "___ Please relax in the lobby until your room is ready.", "Write: thank you very much for staying with us today (ご宿泊いただき).", "宿泊 ありがとう", "本日はご宿泊いただき、誠にありがとうございます。"),
  'de-gozaimasu': D("You're a department-store clerk.", [["Customer", "すみません、靴売り場はどこですか。", "Excuse me, where is the shoe department?"]], "Say very politely that the shoe department is on the third floor.", "靴売り場 三階", "靴売り場は三階でございます。"),
  'zonjimasu': Pa("A follow-up email to a client.", "先日はお忙しい中、お時間をいただきありがとうございました。＿", "Thank you for making time for us the other day despite your busy schedule. ___", "Write that you'd be grateful to meet again (〜幸いに存じます).", "会う 幸い", "またお会いできれば幸いに存じます。"),

  // 59
  'tomo-literary': D("A friend urges you to give up.", [["Friend", "みんな反対しているよ。やめたら？", "Everyone's against it. Why not quit?"]], "Say that even if everyone opposes you, you will do it (〜ようとも).", "反対する やる", "たとえ皆に反対されようとも、私はやる。"),
  'beku-mo-nai': D("A friend asks about a match against a pro.", [["Friend", "プロの選手に勝てると思う？", "Think you could beat a pro?"]], "Say against a pro, victory is beyond all hope (望むべくもない).", "勝利 望む", "プロ相手では、勝利など望むべくもない。"),
  'zu-shite': Pa("A profile of a shogi prodigy.", "その少年は、五歳で大人の棋士を負かしたという。＿", "They say the boy beat adult players at the age of five. ___", "Write that, they say, he learned everything without being taught by anyone (教わらずして).", "教わる 覚える", "誰にも教わらずして、すべてを覚えたという。"),
  'u-ga-mai-ga': D("Festival plans.", [["Friend", "明日、雨らしいよ。お祭り、行く？", "They say rain tomorrow. Still going to the festival?"]], "Say rain or no rain, you're going.", "雨 降る 行く", "雨が降ろうが降るまいが、行くよ。"),
  'u-ni-mo-nai': D("A friend is upset you didn't call.", [["Friend", "どうして連絡くれなかったの？", "Why didn't you get in touch?"]], "Say you tried to, but your phone battery was dead, so you couldn't.", "連絡 電池", "連絡しようにも、携帯の電池が切れていてできなかったんだ。"),
  'mono-to-suru': Pa("A lease agreement.", "第五条（家賃）＿", "Article 5 (Rent) ___", "Write: the tenant shall pay the rent by the 25th of each month.", "借主 家賃 支払う", "借主は、毎月二十五日までに家賃を支払うものとする。"),
  'mono-to-minasu': Pa("Terms of service.", "第八条（同意）＿", "Article 8 (Consent) ___", "Write: anyone who uses this service shall be deemed to have agreed to these terms.", "利用 規約 同意する", "本サービスを利用した者は、本規約に同意したものとみなす。"),

  // 60
  'n-to-suru': Pa("The climax of a novel.", "長い戦いが、ついに終わりを迎えようとしていた。＿", "The long battle was at last drawing to an end. ___", "Write that the sun was just about to rise from beyond the mountains (昇らんとしていた).", "太陽 山 昇る", "太陽が今まさに山の向こうから昇らんとしていた。"),
  'ba-koso': D("Your child complains.", [["Child", "どうしてそんなに厳しいの？", "Why are you so strict?"]], "Say it's precisely because you love them (〜ばこそ).", "愛する", "あなたを愛すればこそ、厳しくするのよ。"),
  'mo-saru-koto-nagara': D("A friend wonders about a popular ramen shop.", [["Friend", "あのラーメン屋、なんであんなに人気なの？", "Why is that ramen shop so popular?"]], "Say the taste, of course, but even more so the owner's personality.", "味 店主 人柄", "味もさることながら、店主の人柄がいいんだよ。"),
  'ni-kakotsukete': D("Office gossip.", [["Coworker", "山田さん、今日も休みですね。", "Yamada's off again today."]], "Say apparently he took the day off using the rain as an excuse.", "雨 休む", "雨にかこつけて、仕事を休んだらしいよ。"),
  'ni-hikikae': D("Comparing siblings.", [["Friend", "弟さんはスポーツが得意だね。", "Your brother is great at sports."]], "Say in stark contrast to your athletic brother, you're terrible at sports.", "弟 運動", "スポーツ万能の弟にひきかえ、私は運動が苦手だ。"),
  'wo-ii-koto-ni': D("A substitute teacher reports back.", [["Teacher", "私がいない間、クラスはどうでしたか。", "How was the class while I was away?"]], "Say that, taking advantage of the teacher's absence, the students played games.", "先生 留守 ゲーム", "先生が留守なのをいいことに、生徒たちはゲームをしていました。"),
  'to-wa-urahara-ni': Pa("A sports column.", "開幕前、そのチームは優勝候補と言われていた。＿", "Before the season opened, the team was called a title favorite. ___", "Write that, contrary to expectations, they finished in last place.", "予想 最下位", "しかし、予想とは裏腹に最下位に終わった。"),
};
