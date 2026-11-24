// Review prompts — levels 1–10. See D / Pa in helpers.js.
import { D, Pa } from './helpers.js';

export default {
  // 1
  'wa': D("First day of class.", [["Classmate", "はじめまして。私は田中です。", "Nice to meet you. I'm Tanaka."]], "Introduce yourself: give your name and say you are a student.", "学生", "はじめまして。私はスミスです。学生です。"),
  'ka': D("At a party, pointing at someone.", [["Friend", "あの人は山田さんです。", "That person is Mr. Yamada."]], "Ask whether Mr. Yamada is a teacher.", "山田 先生", "山田さんは先生ですか。"),
  'no': D("A classmate picks up a book from the floor.", [["Classmate", "これはだれの本ですか。", "Whose book is this?"]], "Say that it is your book.", "私 本", "それは私の本です。"),
  'mo': D("Chatting with someone you just met.", [["New friend", "私は大学生です。", "I'm a university student."]], "Say you are a university student too.", "大学生", "私も大学生です。"),
  'desu': D("A coworker asks about your job.", [["Coworker", "お仕事は何ですか。", "What do you do for work?"]], "Say (politely) that you are an engineer.", "エンジニア", "私はエンジニアです。"),
  'da': Pa("Your diary.", "＿学校は休みだ。だから、朝ゆっくり寝た。", "___ There's no school. So I slept in this morning.", "Write in plain style that today is Saturday.", "今日 土曜日", "今日は土曜日だ。"),
  'janai': D("A shop clerk asks about a student discount.", [["Clerk", "学生さんですか。", "Are you a student?"]], "Say no, you are not a student — you are a teacher.", "学生 先生", "いいえ、学生じゃないです。先生です。"),
  'x-wa-y-desu': D("Showing a family photo to a friend.", [["Friend", "この人はだれ？", "Who's this?"]], "Say this person is your older sister.", "姉", "この人は姉です。"),
  'desu-ka': D("At a market stall, holding up a bag.", [["Vendor", "いらっしゃいませ。", "Welcome!"]], "Ask how much this is.", "これ いくら", "これはいくらですか。"),

  // 2
  'ga': D("Your teacher looks at the open window.", [["Teacher", "だれが窓を開けましたか。", "Who opened the window?"]], "Say that Tanaka opened it.", "田中 開ける", "田中さんが開けました。"),
  'verb-groups': D("A friend asks about your Sundays.", [["Friend", "日曜日は何をしますか。", "What do you do on Sundays?"]], "Say you watch movies, and you read books too (one ichidan verb and one godan verb).", "見る 読む", "映画を見ます。本も読みます。"),
  'wo': D("A friend asks about your mornings.", [["Friend", "朝ご飯に何を食べますか。", "What do you eat for breakfast?"]], "Say you eat toast every morning.", "毎朝 トースト 食べる", "毎朝トーストを食べます。"),
  'ni': D("Planning an early trip.", [["Friend", "明日、何時に起きますか。", "What time are you getting up tomorrow?"]], "Say you will get up at six.", "六時 起きる", "六時に起きます。"),
  'masu': D("A coworker asks about your evening.", [["Coworker", "今晩、何をしますか。", "What are you doing tonight?"]], "Say (politely) that you will read a book.", "本 読む", "家で本を読みます。"),
  'masen': D("At a dinner party.", [["Host", "お酒を飲みますか。", "Do you drink alcohol?"]], "Politely say no, you don't drink alcohol.", "お酒 飲む", "いいえ、お酒は飲みません。"),
  'mashita': D("Monday morning at the office.", [["Coworker", "週末は何をしましたか。", "What did you do on the weekend?"]], "Say you went to the beach.", "海 行く", "海に行きました。"),
  'masen-deshita': D("Your teacher asks about last night.", [["Teacher", "昨日の夜、テレビを見ましたか。", "Did you watch TV last night?"]], "Say no, you didn't watch TV.", "テレビ 見る", "いいえ、テレビは見ませんでした。"),
  'masen-ka': D("After class, with a classmate.", [["Classmate", "今日の午後は暇です。", "I'm free this afternoon."]], "Invite them to go to a café together.", "一緒 喫茶店 行く", "一緒に喫茶店に行きませんか。"),

  // 3
  'e': D("You run into a friend at the airport.", [["Friend", "どこへ行きますか。", "Where are you going?"]], "Say you are going to Hokkaido.", "北海道 行く", "北海道へ行きます。"),
  'de': D("A friend asks about your study habits.", [["Friend", "いつもどこで勉強しますか。", "Where do you usually study?"]], "Say you always study at a café.", "喫茶店 勉強する", "いつも喫茶店で勉強します。"),
  'to': D("Talking about the weekend.", [["Friend", "週末、だれと出かけますか。", "Who are you going out with this weekend?"]], "Say you are going out with your younger brother.", "弟 出かける", "弟と出かけます。"),
  'mashou': D("Late at the library with a friend.", [["Friend", "もう十時ですね。", "It's already ten o'clock."]], "Suggest that you both go home.", "帰る", "じゃあ、帰りましょう。"),
  'deshita': D("Monday at school.", [["Classmate", "週末の天気はどうでしたか。", "How was the weather on the weekend?"]], "Say it was rainy on Saturday.", "土曜日 雨", "土曜日は雨でした。"),
  'janakatta': D("Talking about a trip.", [["Friend", "ホテルはきれいでしたか。", "Was the hotel clean?"]], "Say no, the hotel was not clean.", "ホテル きれい", "いいえ、ホテルはきれいじゃなかったです。"),
  'mashou-ka': D("Your teacher is struggling with a big box.", [["Teacher", "この箱、重いですね。", "This box is heavy."]], "Offer to carry it.", "持つ", "私が持ちましょうか。"),

  // 4
  'ya': Pa("Describing your room.", "私の部屋は小さいです。＿でも、テレビはありません。", "My room is small. ___ But there is no TV.", "Say there are books, a desk and so on in the room.", "本 机", "部屋に本や机があります。"),
  'kara': D("Meeting someone at a party.", [["New friend", "どこから来ましたか。", "Where are you from?"]], "Say you are from Seattle.", "シアトル", "シアトルから来ました。"),
  'made': D("Talking with a classmate.", [["Classmate", "昨日は何時まで勉強しましたか。", "Until what time did you study yesterday?"]], "Say you studied until midnight.", "十二時 勉強する", "夜十二時まで勉強しました。"),
  'i-adj': D("Eating at a friend's house.", [["Friend", "このラーメン、どうですか。", "How's this ramen?"]], "Say this ramen is delicious.", "ラーメン おいしい", "このラーメンはおいしいです。"),
  'kunai': D("Shopping for a jacket.", [["Friend", "そのジャケットは高いですか。", "Is that jacket expensive?"]], "Say no, it isn't expensive.", "ジャケット 高い", "いいえ、このジャケットは高くないです。"),
  'katta': D("Back from a trip.", [["Friend", "京都はどうでしたか。", "How was Kyoto?"]], "Say the trip to Kyoto was very fun.", "京都 楽しい", "京都の旅行はとても楽しかったです。"),
  'kunakatta': D("After an exam.", [["Classmate", "昨日のテストは難しかったですか。", "Was yesterday's test hard?"]], "Say it wasn't very difficult.", "難しい", "いいえ、あまり難しくなかったです。"),
  'kara-made': D("A part-time job interview.", [["Interviewer", "毎日何時から何時まで働けますか。", "From what time until what time can you work each day?"]], "Say you can work from nine to five.", "九時 五時", "九時から五時まで働けます。"),

  // 5
  'ne': D("Walking outside with a coworker in winter.", [["Coworker", "あ、雪ですよ。", "Oh, it's snowing."]], "Agree that it's really cold, isn't it.", "寒い", "本当に寒いですね。"),
  'yo': D("A friend is looking for their phone.", [["Friend", "あれ、私の携帯はどこ？", "Huh, where's my phone?"]], "Tell them it's on the desk.", "机 上", "机の上にありますよ。"),
  'na-adj': D("Recommending a place to read.", [["Friend", "どんな公園ですか。", "What kind of park is it?"]], "Say it is a very quiet park.", "静か 公園", "とても静かな公園です。"),
  'dictionary-form': D("Texting a close friend.", [["Friend", "明日何する？", "What are you doing tomorrow?"]], "Say casually that you will play tennis with a friend.", "テニス する", "友達とテニスをする。"),
  'nai-form': D("Hanging out at a friend's place.", [["Friend", "コーヒー飲む？", "Want some coffee?"]], "Say casually that you don't drink coffee.", "コーヒー 飲む", "ううん、コーヒーは飲まない。"),
  'nai-form-ichidan': D("A friend offers you breakfast.", [["Friend", "朝ご飯、食べる？", "Want some breakfast?"]], "Say casually that you don't eat in the morning.", "朝 食べる", "ううん、朝は食べない。"),
  'ga-suki': D("Getting to know someone.", [["New friend", "どんなスポーツが好きですか。", "What sports do you like?"]], "Say you like baseball.", "野球", "野球が好きです。"),
  'ga-arimasu': D("Your new neighbor asks about the area.", [["Neighbor", "この近くに何がありますか。", "What is there near here?"]], "Say there is a big supermarket.", "大きい スーパー", "大きいスーパーがあります。"),

  // 6
  'kurai': D("A tourist asks you for directions.", [["Tourist", "駅まで何分ぐらいかかりますか。", "About how many minutes is it to the station?"]], "Say it takes about fifteen minutes on foot.", "十五分 歩く", "歩いて十五分ぐらいです。"),
  'ta-form-ichidan': D("Texting a friend.", [["Friend", "昨日、何した？", "What did you do yesterday?"]], "Say casually that you watched a movie at home.", "映画 見る", "うちで映画を見た。"),
  'ta-form': D("Texting a friend.", [["Friend", "週末、何した？", "What did you do over the weekend?"]], "Say casually that you read manga all day.", "一日中 漫画 読む", "一日中漫画を読んだ。"),
  'nakatta': D("Texting a friend.", [["Friend", "昨日のパーティー、行った？", "Did you go to the party yesterday?"]], "Say casually that you didn't go to the party.", "パーティー 行く", "ううん、パーティーには行かなかった。"),
  'te-form-ichidan': Pa("Your diary.", "今朝は六時に起きました。＿それから、電車で会社に行きました。", "This morning I got up at six. ___ Then I went to work by train.", "Say you ate breakfast and read the newspaper (join them with the て-form).", "朝ご飯 新聞 読む", "朝ご飯を食べて、新聞を読みました。"),
  'te-form': Pa("Your diary.", "日曜日は天気がよかった。＿夜は家でゆっくりした。", "The weather was nice on Sunday. ___ In the evening I relaxed at home.", "Say you went to the park and played tennis (join them with the て-form of 行く).", "公園 行く テニス", "公園に行って、テニスをしました。"),
  'te-kudasai': D("Your friend is talking very fast.", [["Friend", "それで、昨日駅で田中さんが…", "So, yesterday at the station, Tanaka…"]], "Politely ask them to speak slowly.", "ゆっくり 話す", "ゆっくり話してください。"),
  'te-iru': D("Your mom calls you.", [["Mom", "今、何してるの？", "What are you doing right now?"]], "Say you are making dinner.", "晩ご飯 作る", "晩ご飯を作っています。"),

  // 7
  'dake': D("At a café.", [["Waiter", "ご注文はお決まりですか。", "Are you ready to order?"]], "Ask for just water.", "水", "水だけお願いします。"),
  'tai': D("Planning the summer.", [["Friend", "夏休みに何がしたいですか。", "What do you want to do over summer break?"]], "Say you want to climb Mt. Fuji.", "富士山 登る", "富士山に登りたいです。"),
  'kute': D("A friend asks about your new apartment.", [["Friend", "新しいアパートはどう？", "How's the new apartment?"]], "Say it's new and clean (connect the two with the て-form).", "新しい きれい", "新しくて、きれいです。"),
  'naide-kudasai': D("You work at a library.", [["Student", "ここでお弁当を食べてもいいですか。", "Can I eat my lunch here?"]], "Politely ask them not to eat here.", "食べる", "すみませんが、ここで食べないでください。"),
  'te-mo-ii': D("Visiting a friend's home for the first time.", [["Friend", "どうぞ、入ってください。", "Please, come in."]], "Ask if you may use the bathroom.", "トイレ 使う", "トイレを使ってもいいですか。"),
  'te-wa-ikenai': D("You're a museum guard.", [["Visitor", "この絵の写真を撮ってもいいですか。", "May I take a photo of this painting?"]], "Tell them they must not take pictures.", "写真 撮る", "いいえ、写真を撮ってはいけません。"),

  // 8
  'yori': D("Talking about winter.", [["Friend", "東京と札幌と、どちらが寒いですか。", "Which is colder, Tokyo or Sapporo?"]], "Say Sapporo is colder than Tokyo.", "札幌 東京 寒い", "札幌は東京より寒いです。"),
  'nagara': D("Talking about morning routines.", [["Friend", "朝ご飯の時、何をしますか。", "What do you do at breakfast?"]], "Say you eat breakfast while reading the news.", "ニュース 読む 朝ご飯", "ニュースを読みながら朝ご飯を食べます。"),
  'kata': D("Stuck at a ticket machine.", [["Station staff", "どうしましたか。", "Is something wrong?"]], "Ask them to show you how to buy a ticket.", "切符 買う 教える", "切符の買い方を教えてください。"),
  'adverbial': D("A friend is surprised you're always first to class.", [["Friend", "毎朝何時に起きますか。", "What time do you get up every morning?"]], "Say you always get up early.", "早い 起きる", "いつも早く起きます。"),
  'hou-ga': D("Ordering drinks.", [["Friend", "コーヒーと紅茶と、どちらが好きですか。", "Which do you like better, coffee or tea?"]], "Say you like tea more than coffee.", "コーヒー 紅茶", "コーヒーより紅茶のほうが好きです。"),
  'ichiban': D("Talking about Japanese food.", [["Friend", "日本料理で何が一番好き？", "What's your favorite Japanese food?"]], "Say that of all Japanese food, you like sushi best.", "寿司 好き", "日本料理で寿司が一番好きです。"),

  // 9
  'tari': D("A coworker asks about your days off.", [["Coworker", "休みの日は何をしますか。", "What do you do on your days off?"]], "Say you do things like go shopping.", "買い物 する", "買い物をしたりします。"),
  'tari-tari-suru': D("Back from winter break.", [["Friend", "冬休みは何をしましたか。", "What did you do over winter break?"]], "Say you did things like skiing and reading books.", "スキー 本 読む", "スキーをしたり、本を読んだりしました。"),
  'ta-koto-ga-aru': D("Talking about travel.", [["Friend", "沖縄に行ったことがありますか。", "Have you ever been to Okinawa?"]], "Say yes, you've been there once.", "一度 行く", "はい、一度行ったことがあります。"),
  'mae-ni': D("Your host mother asks about your routine.", [["Host mother", "毎晩、寝る前に何をしますか。", "What do you do every night before bed?"]], "Say you take a bath before going to bed.", "お風呂 入る 寝る", "寝る前にお風呂に入ります。"),
  'ato-de': D("Your roommate wants to watch a movie.", [["Roommate", "今から映画を見ない？", "Want to watch a movie now?"]], "Suggest watching it after you eat dinner.", "晩ご飯 食べる 見る", "晩ご飯を食べた後で見ましょう。"),
  'toki': D("Getting to know a coworker.", [["Coworker", "子供の時、何が好きでしたか。", "What did you like when you were a kid?"]], "Say that when you were a child, you liked trains.", "子供 電車", "子供のとき、電車が好きでした。"),
  'te-kara': D("Your little brother grabs a snack.", [["Brother", "もう食べてもいい？", "Can I eat now?"]], "Tell him to wash his hands first, then eat.", "手 洗う 食べる", "手を洗ってから食べてね。"),

  // 10
  'kara-because': D("A friend invites you out.", [["Friend", "今晩、飲みに行かない？", "Want to go for drinks tonight?"]], "Say you can't go because you have a test tomorrow.", "明日 テスト", "明日テストがあるから、行けない。"),
  'kedo': D("A friend offers you some food.", [["Friend", "この辛いカレー、食べる？", "Want some of this spicy curry?"]], "Say it looks good, but you can't eat spicy food.", "おいしい 辛い", "おいしそうだけど、辛い物は食べられない。"),
  'deshou': Pa("A TV weather forecast.", "今日は一日中晴れました。でも、＿お出かけの時は気をつけてください。", "It was sunny all day today. But ___ Please take care when going out.", "Say it will probably snow tomorrow night.", "明日 夜 雪", "明日の夜は雪が降るでしょう。"),
  'ga-hoshii': D("Your birthday is coming up.", [["Mom", "誕生日に何がほしい？", "What do you want for your birthday?"]], "Say you want a new bicycle.", "新しい 自転車", "新しい自転車がほしい。"),
  'ni-iku': D("You run into a friend downtown.", [["Friend", "どこに行くの？", "Where are you headed?"]], "Say you're going to the bookstore to buy a dictionary.", "本屋 辞書 買う", "本屋に辞書を買いに行く。"),
  'naru': D("A coworker makes small talk in March.", [["Coworker", "最近、どうですか。", "How have things been lately?"]], "Say it has gotten warm lately.", "最近 暖かい", "最近、暖かくなりましたね。"),
};
