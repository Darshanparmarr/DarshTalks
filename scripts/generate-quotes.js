/*
  Darshtalks dataset generator.

  Produces ~5000 unique, coherent entries by combining carefully built
  word-banks (every combination is grammatical) plus a curated core of real
  quotes. Deterministic: a fixed seed means re-running yields the same file.

  Run:  node scripts/generate-quotes.js
  Out:  src/data/quotes.json
*/

const fs = require("fs");
const path = require("path");

const TARGET = 5000;

// --- seeded PRNG (mulberry32) so output is stable across runs --------------
function mulberry32(seed) {
  let a = seed >>> 0;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const rng = mulberry32(20261102);
function shuffle(arr) {
  const out = arr.slice();
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}
const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);

// ---------------------------------------------------------------------------
// Curated real quotes (English) — quality anchors with real authors.
// ---------------------------------------------------------------------------
const CURATED_EN = [
  ["Dream big, work hard, stay humble.", "Motivation", "Unknown"],
  ["Fall seven times, stand up eight.", "Resilience", "Japanese Proverb"],
  ["Be so good they can't ignore you.", "Motivation", "Steve Martin"],
  ["The quieter you become, the more you can hear.", "Spiritual", "Ram Dass"],
  ["Stars can't shine without darkness.", "Positivity", "Unknown"],
  ["What you seek is seeking you.", "Spiritual", "Rumi"],
  ["Little by little, one travels far.", "Patience", "J.R.R. Tolkien"],
  ["Grow through what you go through.", "Resilience", "Unknown"],
  ["Peace begins with a smile.", "Positivity", "Mother Teresa"],
  ["Your only limit is your mind.", "Motivation", "Unknown"],
  ["In the middle of difficulty lies opportunity.", "Resilience", "Albert Einstein"],
  ["Doubt kills more dreams than failure ever will.", "Motivation", "Suzy Kassem"],
  ["Silence is a source of great strength.", "Spiritual", "Lao Tzu"],
  ["Discipline is the bridge between goals and accomplishment.", "Motivation", "Jim Rohn"],
  ["Done is better than perfect.", "Motivation", "Unknown"],
  ["The soul always knows what to do to heal itself.", "Spiritual", "Caroline Myss"],
  ["Slow progress is still progress.", "Patience", "Unknown"],
  ["Energy flows where attention goes.", "Spiritual", "Unknown"],
  ["Act as if what you do makes a difference. It does.", "Motivation", "William James"],
  ["Bloom where you are planted.", "Positivity", "Unknown"],
  ["Make peace with your past so it doesn't ruin your present.", "Spiritual", "Unknown"],
  ["You are enough just as you are.", "Self Love", "Meghan Markle"],
  ["Breathe. It's just a bad day, not a bad life.", "Positivity", "Unknown"],
  ["The best way out is always through.", "Resilience", "Robert Frost"],
  ["Whatever you are, be a good one.", "Motivation", "Abraham Lincoln"],
  ["Happiness is not out there, it's in you.", "Positivity", "Unknown"],
  ["Start where you are. Use what you have. Do what you can.", "Motivation", "Arthur Ashe"],
  ["The journey of a thousand miles begins with one step.", "Patience", "Lao Tzu"],
  ["What we think, we become.", "Spiritual", "Buddha"],
  ["Turn your wounds into wisdom.", "Resilience", "Oprah Winfrey"],
  ["Comparison is the thief of joy.", "Self Love", "Theodore Roosevelt"],
  ["Do small things with great love.", "Positivity", "Mother Teresa"],
  ["It always seems impossible until it's done.", "Motivation", "Nelson Mandela"],
  ["You must be the change you wish to see in the world.", "Spiritual", "Mahatma Gandhi"],
  ["The wound is the place where the light enters you.", "Spiritual", "Rumi"],
  ["Fall in love with becoming the best version of yourself.", "Self Love", "Unknown"],
  ["Courage is grace under pressure.", "Resilience", "Ernest Hemingway"],
  ["Patience is bitter, but its fruit is sweet.", "Patience", "Aristotle"],
  ["He who has a why can bear almost any how.", "Resilience", "Friedrich Nietzsche"],
  ["Simplicity is the ultimate sophistication.", "Life", "Leonardo da Vinci"],
  ["Not all those who wander are lost.", "Life", "J.R.R. Tolkien"],
  ["The best revenge is massive success.", "Motivation", "Frank Sinatra"],
  ["A calm mind brings inner strength and self-confidence.", "Spiritual", "Dalai Lama"],
  ["Love yourself first and everything else falls in line.", "Self Love", "Lucille Ball"],
  ["Every moment is a fresh beginning.", "Positivity", "T.S. Eliot"],
  ["Hard times create strong people.", "Resilience", "Unknown"],
  ["The mind is everything. What you think you become.", "Spiritual", "Buddha"],
  ["Life is really simple, but we insist on making it complicated.", "Life", "Confucius"],
  ["Doubt is a killer. You just have to know who you are.", "Motivation", "Jennifer Lopez"],
  ["When you can't control what's happening, control how you respond.", "Resilience", "Unknown"],
  ["Gratitude turns what we have into enough.", "Positivity", "Unknown"],
  ["The only way to do great work is to love what you do.", "Motivation", "Steve Jobs"],
  ["Stay afraid, but do it anyway.", "Resilience", "Carrie Fisher"],
  ["Be a voice, not an echo.", "Motivation", "Unknown"],
  ["Self-care is how you take your power back.", "Self Love", "Lalah Delia"],
  ["Rivers know this: there is no hurry, we shall get there some day.", "Patience", "A.A. Milne"],
  ["Nothing can dim the light that shines from within.", "Self Love", "Maya Angelou"],
  ["Where there is love there is life.", "Life", "Mahatma Gandhi"],
  ["The best time for new beginnings is now.", "Positivity", "Unknown"],
  ["You are the sky. Everything else is just the weather.", "Spiritual", "Pema Chödrön"],
];

// ---------------------------------------------------------------------------
// Curated Hindi / Hinglish shayari anchors.
// ---------------------------------------------------------------------------
const CURATED_HI = [
  ["Zindagi ko samajhne mein hi aadha jeevan nikal jaata hai.", "Life", "Hindi"],
  ["Kabhi khud se bhi mil liya karo, bahut kuch kehte hain andar.", "Self Love", "Hindi"],
  ["Khamoshi bhi ek jawaab hoti hai, samajhne wale samajh jaate hain.", "Life", "Hindi"],
  ["Thoda ruk, saans le, tu bahut aage jaana hai.", "Motivation", "Hinglish"],
  ["Mehnat itni khamoshi se karo ki safalta shor macha de.", "Motivation", "Hinglish"],
  ["Apne hisse ka suraj khud ugana padta hai.", "Motivation", "Hindi"],
  ["Dil ko sambhaal, dimaag ko chala, dono ka balance hi zindagi hai.", "Life", "Hinglish"],
  ["Khud par bharosa rakh, waqt teri bhi sunega.", "Motivation", "Hinglish"],
  ["Raaste khud ban jaate hain, bas chalne ka hausla chahiye.", "Motivation", "Hindi"],
  ["Jo khud se jeet gaya, use duniya nahi hara sakti.", "Self Love", "Hindi"],
  ["Sapne wahi sach hote hain jinke liye neend kurbaan ho.", "Motivation", "Hinglish"],
  ["Kuch pal apne liye bhi jee, duniya toh chalti rahegi.", "Self Love", "Hinglish"],
  ["Mushkilein toh aati rahengi, tu bas rukna mat.", "Resilience", "Hinglish"],
  ["Umeed ka diya jalaye rakh, raat chahe kitni bhi lambi ho.", "Positivity", "Hindi"],
  ["Jitni gehri jadein, utna buland darakht.", "Life", "Hindi"],
  ["Apni roshni khud bano, andheron se mat darona.", "Self Love", "Hinglish"],
  ["Har subah ek naya mauka hai, kal ko bhool kar aaj ko jee.", "Positivity", "Hinglish"],
  ["Gham ko bhi muskura kar jeena seekh le, zindagi aasaan ho jaayegi.", "Life", "Hinglish"],
  ["Khud ki kadar karo, duniya apne aap karegi.", "Self Love", "Hindi"],
  ["Jo beet gaya use bhool, jo aana hai use chun.", "Life", "Hinglish"],
  ["Dil se nikli baat hi dil tak pahunchti hai.", "Life", "Hindi"],
  ["Thoda sabr rakh, acche din bhi tere hisse mein likhe hain.", "Patience", "Hinglish"],
  ["Girte hain sheh-sawaar hi maidan-e-jang mein.", "Resilience", "Hindi"],
  ["Jitna simple raho, utna hi sukoon milta hai.", "Life", "Hinglish"],
  ["Waqt ke saath chalna seekh, waqt kisi ke liye rukta nahi.", "Life", "Hinglish"],
  ["Tootne ke baad hi insaan sabse majboot banta hai.", "Resilience", "Hinglish"],
  ["Khwaab woh nahi jo neend mein aayein, khwaab woh hain jo neend udaa dein.", "Motivation", "Hinglish"],
  ["Apni awaaz itni buland karo ki kismat ko bhi sunna pade.", "Motivation", "Hinglish"],
  ["Rishte dil se nibhao, hisaab se nahi.", "Life", "Hinglish"],
  ["Khud ko itna mazboot bana le ki koi tufaan hila na sake.", "Resilience", "Hinglish"],
];

// ---------------------------------------------------------------------------
// Combinatorial banks (every pairing is grammatical and meaningful).
// ---------------------------------------------------------------------------

// Family A — English motivation: "{Imperative}, and {outcome}."
const A_IMPERATIVE = [
  "Work in silence", "Trust the process", "Start before you feel ready",
  "Show up every single day", "Push through the doubt", "Choose discipline over mood",
  "Stay patient with your progress", "Keep the promises you make to yourself",
  "Bet on yourself", "Do the work while no one claps", "Protect your focus",
  "Fall in love with the effort", "Keep moving, even slowly", "Outlast the hard days",
  "Water your own garden", "Build in the quiet", "Honor your small wins",
  "Keep your standards high", "Stay consistent", "Guard your energy",
  "Begin again as many times as it takes", "Take the next small step",
  "Finish what you start", "Learn in public", "Stay curious",
  "Choose courage over comfort", "Invest in your mind", "Do less but better",
  "Say no without guilt", "Rest, then rise", "Keep your head and heart aligned",
  "Run your own race", "Plant seeds you may never see bloom",
  "Make peace with slow progress", "Train your focus like a muscle",
  "Keep showing up for your dreams", "Let your work speak", "Stay humble, stay hungry",
  "Keep your circle honest", "Do it scared", "Back yourself completely",
  "Keep the faith on the quiet days", "Turn the pain into practice",
  "Pour into yourself first", "Keep your promises to your future",
];
const A_OUTCOME = [
  "the results will speak for themselves", "momentum will find you",
  "your future self will thank you", "everything else will follow",
  "growth becomes inevitable", "success becomes a habit", "the doors will open in time",
  "the right people will notice", "clarity will come", "your confidence will grow",
  "the fog will lift", "you will surprise yourself", "the wins will stack up",
  "life will meet you halfway", "the path will reveal itself",
  "the hard days will make sense later", "your patience will pay off",
  "opportunity will knock louder", "you will outgrow your doubts", "peace will follow",
  "the breakthrough will come", "you will build something real",
  "time will prove you right", "the seeds will bloom", "you will look back amazed",
  "the climb will feel worth it", "your discipline will become freedom",
  "the noise will fade", "you will find your people", "the dream will take shape",
  "your effort will compound", "you will earn your calm", "the struggle will shape you",
  "your story will inspire someone", "the pieces will fall into place",
  "your light will reach the right rooms", "the long game will reward you",
  "you will become the proof", "your consistency will win", "the best is still ahead",
  "you will thank today for not giving up", "your name will travel further than you",
  "the quiet work will echo loudly", "you will rise, calm and complete",
  "what is meant for you will arrive",
];

// Family B — English: "{Subject} {verbPhrase}."
const B_SUBJECT = [
  "Discipline", "Consistency", "Patience", "Courage", "Your mindset", "Hard work",
  "Self-belief", "Focus", "Kindness", "Gratitude", "Hope", "Honesty", "Small steps",
  "Your habits", "Faith", "Silence", "Growth", "Your attitude", "Resilience", "Hustle",
  "A calm mind", "Daily effort", "Self-respect", "Your dreams",
];
const B_VERB = [
  "beats talent when talent won't work", "turns dreams into plans you can touch",
  "is the quiet bridge to everything you want", "can change your whole life",
  "is a superpower in a noisy world", "speaks louder than any excuse",
  "builds the person you are becoming", "outlasts motivation every time",
  "writes the story others will read", "shapes your tomorrow",
  "is the rent you pay for your dreams", "always finds a way through",
  "makes the impossible look ordinary", "is where real confidence is born",
  "never goes out of style", "carries you when feelings fade",
  "is the shortcut nobody wants to take", "compounds into something remarkable",
  "earns the respect you're chasing", "opens doors that talent can't",
  "keeps you steady in the storm", "turns ordinary days into progress",
  "is the habit that sets you free", "wins the long game", "is enough to begin",
  "deserves your protection", "moves mountains one stone at a time",
  "is the loudest form of self-love", "becomes your reputation",
  "is the seed of everything good",
];

// Family C — English positivity: "Even {hardThing}, {reassurance}."
const C_HARD = [
  "on your hardest days", "when the plan falls apart", "when no one believes you",
  "when you feel behind", "in the middle of the mess", "when the fear is loud",
  "when progress feels invisible", "when you want to quit", "when the world feels heavy",
  "when you doubt it all", "after every setback", "when the road gets lonely",
  "when you lose your spark", "when nothing makes sense", "when you're starting over",
];
const C_REASSURE = [
  "you are still moving forward", "you are closer than you think",
  "you are allowed to begin again", "your effort still counts",
  "a better chapter is loading", "you are becoming who you needed",
  "the light is on its way", "you are growing in the dark",
  "you have survived everything so far", "your story isn't over",
  "there is a way through", "you are stronger than the moment",
  "hope is a quiet kind of strength", "small progress is still progress",
  "you are worth the patience",
];

// Family D — Hinglish shayari: "{l1}, {l2}."
const D_L1 = [
  "Khud pe yakeen rakh", "Thoda sabr kar", "Raaste bhale lambe hon", "Dil chhota mat kar",
  "Zindagi ek safar hai", "Mehnat karta ja", "Haar ke baad bhi uth", "Apni roshni khud ban",
  "Girte hain wahi jo chalte hain", "Waqt kharab hai, tu nahi", "Mushkilein aati rahengi",
  "Khamoshi se mehnat kar", "Apne sapno ke liye jaag", "Thak ja, par ruk mat",
  "Khud se vaada kar", "Andhera gehra sahi", "Jo tera hai wo milega",
  "Chalte reh, manzil door sahi", "Himmat mat haar", "Apni kadar khud kar",
  "Beeta kal bhool ja", "Aaj ko ji bhar ke ji", "Sapne bade dekh", "Khud ko waqt de",
  "Dard ko taqat bana", "Shikwa nahi, shukar kar", "Tu akela nahi hai",
  "Chhoti jeet bhi jeet hai", "Saans le, sab theek hoga", "Apne raaste khud bana",
  "Log kuch bhi kahein", "Dil ki sun, par dimaag se chal", "Zindagi dobara nahi milti",
  "Umeed ka daaman mat chhod", "Khud ko kam mat aank", "Raat kitni bhi lambi ho",
  "Thodi der aur tik ja", "Jhukna nahi, tootna nahi", "Apne hisse ka suraj uga",
  "Sabse pehle khud se jeet", "Gham ko muskaan bana", "Chal, phir se shuru kar",
  "Takleef bhi sikhaati hai", "Bas chalte rehna seekh", "Khwab dekhna chhodna mat",
  "Thaki haari shaam mein bhi", "Apne aap ko mat haar", "Jitni mehnat, utni chamak",
  "Dil toot ta hai to tootne de", "Khud ko sabit karna hai",
];
const D_L2 = [
  "manzil zaroor milegi", "acche din aayenge", "waqt badal jaayega",
  "safar khoobsurat ho jaayega", "sab sahi ho jaayega", "tu jeet jaayega",
  "duniya dekhegi", "sukoon zaroor milega", "raasta khud banega", "log yaad rakhenge",
  "kismat badlegi", "savera zaroor hoga", "himmat rang laayegi", "mehnat zaaya nahi jaayegi",
  "tera waqt bhi aayega", "dil halka ho jaayega", "khushi laut aayegi", "umeed zinda rahegi",
  "tu muskura dega", "rab saath dega", "mehnat bol padegi", "naya savera hoga",
  "tere hisse ki roshni aayegi", "taqat milti rahegi", "zindagi aasaan ho jaayegi",
  "tu sambhal jaayega", "kal behtar hoga", "sapne sach honge", "jeet teri hogi",
  "dard kam ho jaayega", "raaste aasaan honge", "waqt teri bhi sunega", "tu nikhar jaayega",
  "manzil paas aayegi", "andhera chhat jaayega", "tu phir uthega", "duaayein rang laayengi",
  "sab mil jaayega", "tu khil uthega", "zamana salaam karega",
];

// ---------------------------------------------------------------------------
// Assemble, de-duplicate, trim, and write.
// ---------------------------------------------------------------------------
const seen = new Set();
const pool = [];
const norm = (t) => t.replace(/\s+/g, " ").trim().toLowerCase();

function add(text, { category, type, language, author }) {
  const key = norm(text);
  if (seen.has(key)) return;
  seen.add(key);
  pool.push({ text: text.trim(), category, type, language, author });
}

// Curated first (quality anchors).
CURATED_EN.forEach(([text, category, author]) =>
  add(text, { category, type: "quote", language: "English", author })
);
CURATED_HI.forEach(([text, category, language]) =>
  add(text, { category, type: "shayari", language, author: "Unknown" })
);

// Family A
for (const imp of A_IMPERATIVE)
  for (const out of A_OUTCOME)
    add(`${imp}, and ${out}.`, { category: "Motivation", type: "quote", language: "English", author: "Unknown" });

// Family B
const B_CAT = ["Motivation", "Resilience", "Life", "Self Love"];
let bi = 0;
for (const sub of B_SUBJECT)
  for (const v of B_VERB)
    add(`${sub} ${v}.`, { category: B_CAT[bi++ % B_CAT.length], type: "quote", language: "English", author: "Unknown" });

// Family C
for (const h of C_HARD)
  for (const r of C_REASSURE)
    add(`${cap(`Even ${h}, ${r}.`)}`, { category: "Positivity", type: "quote", language: "English", author: "Unknown" });

// Family D (Hinglish shayari)
const D_CAT = ["Motivation", "Life", "Self Love", "Resilience", "Patience", "Positivity"];
let di = 0;
for (const l1 of D_L1)
  for (const l2 of D_L2)
    add(`${l1}, ${l2}.`, { category: D_CAT[di++ % D_CAT.length], type: "shayari", language: "Hinglish", author: "Unknown" });

// Keep curated anchors up front, shuffle the generated remainder, then mix.
const anchors = pool.slice(0, CURATED_EN.length + CURATED_HI.length);
const generated = shuffle(pool.slice(anchors.length));
const combined = anchors.concat(generated).slice(0, TARGET);

const final = combined.map((q, i) => ({
  id: `quote-${String(i + 1).padStart(4, "0")}`,
  text: q.text,
  category: q.category,
  type: q.type,
  language: q.language,
  author: q.author,
}));

const outPath = path.join(__dirname, "..", "src", "data", "quotes.json");
fs.writeFileSync(outPath, JSON.stringify(final, null, 0) + "\n", "utf8");

// Report.
const byType = {};
const byLang = {};
const byCat = {};
for (const q of final) {
  byType[q.type] = (byType[q.type] || 0) + 1;
  byLang[q.language] = (byLang[q.language] || 0) + 1;
  byCat[q.category] = (byCat[q.category] || 0) + 1;
}
console.log(`Wrote ${final.length} quotes to ${outPath}`);
console.log("By type:", byType);
console.log("By language:", byLang);
console.log("By category:", byCat);
console.log("Pool capacity before trim:", pool.length);
