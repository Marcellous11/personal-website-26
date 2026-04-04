import { motion } from 'framer-motion'

const quotes = [
  {
    text: "You have power over your mind, not outside events. Realize this, and you will find strength.",
    author: "Marcus Aurelius",
    source: "Meditations, VI.8",
    context: "Private journal entries written during the Marcomannic Wars, c. 170–180 AD — never intended for publication.",
  },
  {
    text: "The impediment to action advances action. What stands in the way becomes the way.",
    author: "Marcus Aurelius",
    source: "Meditations, V.20",
    context: "Composed on the Danube frontier while commanding Roman legions against Germanic tribes.",
  },
  {
    text: "Waste no more time arguing what a good man should be. Be one.",
    author: "Marcus Aurelius",
    source: "Meditations, X.16",
    context: "A note to himself — Marcus wrote the Meditations as personal reminders, not lectures to others.",
  },
  {
    text: "We suffer more in imagination than in reality.",
    author: "Seneca",
    source: "Letters to Lucilius, Letter 13",
    context: "Written from his Campanian villa in the last years of his life, c. 63–65 AD.",
  },
  {
    text: "Begin at once to live, and count each separate day as a separate life.",
    author: "Seneca",
    source: "Letters to Lucilius, Letter 77",
    context: "One of 124 letters to his friend Lucilius, written in semi-retirement under Emperor Nero.",
  },
  {
    text: "While we wait for life, life passes.",
    author: "Seneca",
    source: "On the Shortness of Life, I.3",
    context: "Written c. 49 AD, addressed to his father-in-law Paulinus — an argument against deferring a meaningful life.",
  },
  {
    text: "It's not what happens to you, but how you react to it that matters.",
    author: "Epictetus",
    source: "Enchiridion, 5",
    context: "Dictated to his student Arrian in Nicopolis, Greece. Epictetus himself never wrote — he was a former slave.",
  },
  {
    text: "Make the best use of what is in your power, and take the rest as it happens.",
    author: "Epictetus",
    source: "Enchiridion, 1",
    context: "The opening lines of the handbook compiled by Arrian from Epictetus' oral teachings in Nicopolis.",
  },
  {
    text: "Confine yourself to the present.",
    author: "Marcus Aurelius",
    source: "Meditations, VIII.7",
    context: "A brief but potent reminder — Marcus returned to this idea repeatedly across his journals.",
  },
  {
    text: "He who is everywhere is nowhere.",
    author: "Seneca",
    source: "Letters to Lucilius, Letter 2",
    context: "On the danger of distraction — written nearly 2,000 years before the age of notifications.",
  },
  {
    text: "No man is free who is not master of himself.",
    author: "Epictetus",
    source: "Discourses, II.1",
    context: "Remarkable words from a man who spent years as a Roman slave before buying his own freedom.",
  },
  {
    text: "Perfection of character: to live each day as if it were your last, without frenzy, without apathy, without pretense.",
    author: "Marcus Aurelius",
    source: "Meditations, VII.69",
    context: "One of the most complete definitions of Stoic virtue in the entire work.",
  },
  {
    text: "The whole future lies in uncertainty: live immediately.",
    author: "Seneca",
    source: "On the Shortness of Life, IX.1",
    context: "Written to challenge contemporaries who endlessly postponed the lives they wanted to live.",
  },
  {
    text: "All things are alien; time alone is ours.",
    author: "Seneca",
    source: "Letters to Lucilius, Letter 1",
    context: "The very first letter in the collection — Seneca's opening argument that time is your only true possession.",
  },
  {
    text: "You could leave life right now. Let that determine what you do and say and think.",
    author: "Marcus Aurelius",
    source: "Meditations, II.11",
    context: "Memento mori in its most direct form — written early in the journals, likely among his first entries.",
  },
  {
    text: "It never ceases to amaze me: we all love ourselves more than other people, but care more about their opinion than our own.",
    author: "Marcus Aurelius",
    source: "Meditations, XII.4",
    context: "One of the most unexpectedly modern observations in the entire Meditations.",
  },
  {
    text: "If it is not right, do not do it; if it is not true, do not say it.",
    author: "Marcus Aurelius",
    source: "Meditations, XII.17",
    context: "Near the final entries — a distillation of Stoic ethics into two simple rules.",
  },
  {
    text: "Wealth is the slave of a wise man. The master of a fool.",
    author: "Seneca",
    source: "Letters to Lucilius, Letter 119",
    context: "Written late in correspondence — Seneca was famously wealthy himself, writing honestly about the paradox.",
  },
  {
    text: "Associate with those who will make a better man of you.",
    author: "Seneca",
    source: "Letters to Lucilius, Letter 7",
    context: "On choosing your environment deliberately — Seneca's caution about the hidden cost of the crowd.",
  },
  {
    text: "Never esteem anything as of advantage to you that will make you break your word or lose your self-respect.",
    author: "Marcus Aurelius",
    source: "Meditations, III.7",
    context: "Marcus was Emperor — accountable to no one but himself. He wrote these notes to hold himself to that standard.",
  },
  {
    text: "To bear trials with a calm mind robs misfortune of its strength and burden.",
    author: "Seneca",
    source: "Hercules Oetaeus, 232",
    context: "From one of Seneca's tragedies — his Stoic philosophy ran through even his dramatic works.",
  },
  {
    text: "Wherever there is a human being, there is an opportunity for kindness.",
    author: "Seneca",
    source: "On the Happy Life, XXIV.3",
    context: "Written c. 58 AD — Seneca's argument that a virtuous and generous life are not in conflict.",
  },
  {
    text: "First say to yourself what you would be; and then do what you have to do.",
    author: "Epictetus",
    source: "Discourses, III.23",
    context: "From his school at Nicopolis, which attracted students from across the Roman Empire.",
  },
  {
    text: "The cucumber and the lettuce have their roots in the earth — so does the man who rises early.",
    author: "Marcus Aurelius",
    source: "Meditations, V.1",
    context: "Marcus' note to himself on difficult mornings — even the Emperor had to argue himself out of bed.",
  },
  {
    text: "Receive without pride, relinquish without struggle.",
    author: "Marcus Aurelius",
    source: "Meditations, VIII.33",
    context: "A compact summary of the Stoic relationship to fortune — hold things lightly.",
  },
]

function getDailyQuote() {
  const start = new Date(new Date().getFullYear(), 0, 0)
  const day = Math.floor((Date.now() - start) / 86400000)
  return { quote: quotes[day % quotes.length], day }
}

export default function StoicQuote() {
  const { quote, day } = getDailyQuote()

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="bg-card border border-border rounded-2xl p-6 flex flex-col flex-1"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <p className="text-xs font-medium text-light">Daily Stoic</p>
        <span className="font-mono text-[10px] text-muted">day {day}</span>
      </div>

      {/* Quote mark */}
      <span className="text-4xl leading-none text-accent/30 font-serif select-none mb-2">&ldquo;</span>

      {/* Quote text */}
      <p className="text-sm text-muted-light leading-relaxed flex-1 mb-5">
        {quote.text}
      </p>

      {/* Author + source */}
      <div className="mb-4">
        <p className="text-xs font-medium text-light">{quote.author}</p>
        <p className="font-mono text-[10px] text-accent/70 mt-0.5">{quote.source}</p>
      </div>

      {/* Divider */}
      <div className="h-px bg-border mb-4" />

      {/* Context */}
      <p className="text-[11px] text-muted leading-relaxed">
        {quote.context}
      </p>
    </motion.div>
  )
}
