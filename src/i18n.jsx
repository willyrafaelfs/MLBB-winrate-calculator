import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const STORAGE_KEY = 'mlbb-wr-lang'

const plural = (n, one, many) => (n === 1 ? one : many)

const dict = {
  id: {
    locale: 'id-ID',
    docTitle: 'Kalkulator Winrate MLBB',
    brand: 'Kalkulator Winrate',
    langLabel: 'Bahasa',

    sentence: {
      a: 'Aku sudah main',
      b: 'match dengan winrate',
      cPunct: ',',
      c: 'dan targetku',
      d: '.',
    },
    fields: {
      matches: 'Jumlah match yang sudah dimainkan',
      current: 'Winrate saat ini dalam persen',
      target: 'Target winrate dalam persen',
    },

    need: {
      head: (count, n) => (count === 1 ? 'Menangkan satu match lagi.' : `Menang ${n} kali beruntun.`),
      sub: (wr, total) =>
        `Tanpa kalah sekali pun. Setelah itu winrate kamu ${wr} dari ${total} match.`,
    },
    reached: {
      head: 'Kamu sudah sampai.',
      sub: (b, target) =>
        b === 0
          ? `Hati-hati: kalah sekali lagi dan winrate kamu turun di bawah ${target}.`
          : `Kamu masih aman sampai ${b} kekalahan beruntun dan tetap di ${target} ke atas.`,
    },
    errors: {
      noMatches: 'Isi dulu jumlah match yang sudah kamu mainkan.',
      noCurrent: 'Isi winrate kamu saat ini.',
      currentOver: 'Winrate tidak bisa lebih dari 100%.',
      noTarget: 'Isi target winrate di atas 0%.',
      targetOver: 'Target winrate tidak bisa lebih dari 100%.',
      target100: '100% tidak bisa dicapai kalau kamu pernah kalah. Coba 99% atau lebih rendah.',
    },

    ledger: {
      title: 'Rekor kamu, match demi match',
      per: (k) => `Satu kotak = ${k} match.`,
      wins: (n) => `${n} menang`,
      losses: (n) => `${n} kalah`,
      need: (n) => `${n} kemenangan lagi`,
    },

    scenarios: {
      title: 'Tidak mungkin menang terus?',
      sub: (t) =>
        `Pilih winrate yang realistis untukmu ke depan. Hanya winrate di atas ${t} yang bisa membawamu ke target.`,
      matches: (m) => `${m} match lagi`,
      wins: (w) => `${w} di antaranya menang`,
      never: (hi) => `Dengan winrate ${hi} ke bawah, target ini tidak akan tercapai.`,
      none: 'Targetmu terlalu tinggi untuk dikejar dengan winrate ke depan yang realistis. Satu-satunya cara adalah streak di atas.',
      forward: 'Winrate ke depan',
      result: 'Yang dibutuhkan',
    },

    chart: {
      titleNeed: 'Naiknya winrate selama streak',
      subNeed: 'Setiap kemenangan beruntun menaikkan winrate, tapi makin lama makin pelan.',
      titleReached: 'Turunnya winrate kalau kalah beruntun',
      subReached: 'Seberapa jauh kamu bisa kalah sebelum jatuh di bawah target.',
      axisNeed: 'Menang beruntun',
      axisReached: 'Kalah beruntun',
      target: (t) => `Target ${t}`,
      tipNeed: (x) => `${x} kemenangan beruntun`,
      tipReached: (x) => `${x} kekalahan beruntun`,
      mark: (x) => `${x} menang`,
    },

    method: {
      title: 'Cara menghitungnya',
      body: [
        'Jumlah kemenangan saat ini didapat dari total match dikali winrate, lalu dibulatkan, karena MLBB menampilkan winrate yang sudah dibulatkan.',
        'Kemenangan beruntun yang dibutuhkan adalah angka x terkecil yang membuat (menang + x) / (total + x) mencapai target.',
        'Untuk winrate ke depan f, jumlah match tambahan adalah (target × total − menang) / (f − target). Ini hanya bisa dihitung kalau f lebih tinggi dari target.',
      ],
    },

    footer: {
      by: 'Dirancang dan dibuat oleh',
      source: 'Kode sumber',
      disclaimer:
        'Proyek fan-made. Tidak berafiliasi dengan Moonton atau Mobile Legends: Bang Bang.',
    },
  },

  en: {
    locale: 'en-US',
    docTitle: 'MLBB Winrate Calculator',
    brand: 'Winrate Calculator',
    langLabel: 'Language',

    sentence: {
      a: "I've played",
      b: 'matches at',
      cPunct: ' winrate,',
      c: 'and I want',
      d: '.',
    },
    fields: {
      matches: 'Matches played',
      current: 'Current winrate in percent',
      target: 'Target winrate in percent',
    },

    need: {
      head: (count, n) => (count === 1 ? 'Win the next match.' : `Win ${n} in a row.`),
      sub: (wr, total) => `No losses. That puts you at ${wr} after ${total} matches.`,
    },
    reached: {
      head: "You're already there.",
      sub: (b, target) =>
        b === 0
          ? `Careful: one more loss drops you below ${target}.`
          : `You can lose ${b} in a row and still stay at ${target} or higher.`,
    },
    errors: {
      noMatches: "Enter how many matches you've played.",
      noCurrent: 'Enter your current winrate.',
      currentOver: "A winrate can't go above 100%.",
      noTarget: 'Set a target above 0%.',
      targetOver: "A target can't go above 100%.",
      target100: "100% is out of reach once you've lost a match. Try 99% or lower.",
    },

    ledger: {
      title: 'Your record, match by match',
      per: (k) => `Each square is ${k} matches.`,
      wins: (n) => `${n} ${plural(n, 'win', 'wins')}`,
      losses: (n) => `${n} ${plural(n, 'loss', 'losses')}`,
      need: (n) => `${n} more ${plural(n, 'win', 'wins')} to go`,
    },

    scenarios: {
      title: "Can't win them all?",
      sub: (t) =>
        `Pick the winrate you can realistically hold from here. Only rates above ${t} can get you to your target.`,
      matches: (m) => `${m} more ${plural(m, 'match', 'matches')}`,
      wins: (w) => `${w} of them ${plural(w, 'a win', 'wins')}`,
      never: (hi) => `At ${hi} or lower, you never reach this target.`,
      none: 'Your target is too high to chase with a realistic forward winrate. The streak above is the only way there.',
      forward: 'Winrate from here',
      result: 'What it takes',
    },

    chart: {
      titleNeed: 'How a streak lifts your winrate',
      subNeed: 'Every win in a row pushes you up, but each one moves the number a little less.',
      titleReached: 'How a losing streak drags it down',
      subReached: 'How far you can slip before you fall under your target.',
      axisNeed: 'Wins in a row',
      axisReached: 'Losses in a row',
      target: (t) => `Target ${t}`,
      tipNeed: (x) => `${x} ${plural(x, 'win', 'wins')} in a row`,
      tipReached: (x) => `${x} ${plural(x, 'loss', 'losses')} in a row`,
      mark: (x) => `${x} ${plural(x, 'win', 'wins')}`,
    },

    method: {
      title: "How it's calculated",
      body: [
        'Your current wins come from total matches times winrate, rounded, because MLBB shows a rounded winrate.',
        'The streak you need is the smallest x where (wins + x) / (matches + x) reaches your target.',
        'For a forward winrate f, the extra matches are (target × matches − wins) / (f − target). This only works when f is above your target.',
      ],
    },

    footer: {
      by: 'Designed and built by',
      source: 'Source code',
      disclaimer:
        'Fan-made project. Not affiliated with Moonton or Mobile Legends: Bang Bang.',
    },
  },
}

function initialLang() {
  const fromUrl = new URLSearchParams(window.location.search).get('lang')
  if (fromUrl === 'id' || fromUrl === 'en') return fromUrl
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved === 'id' || saved === 'en') return saved
  } catch {
    // storage blocked; fall through to browser language
  }
  const nav = typeof navigator !== 'undefined' ? navigator.language || '' : ''
  return nav.toLowerCase().startsWith('en') ? 'en' : 'id'
}

const LanguageContext = createContext(null)

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(initialLang)

  useEffect(() => {
    document.documentElement.lang = lang
    document.title = dict[lang].docTitle
    const url = new URL(window.location.href)
    url.searchParams.set('lang', lang)
    window.history.replaceState(null, '', url)
    try {
      localStorage.setItem(STORAGE_KEY, lang)
    } catch {
      // ignore
    }
  }, [lang])

  const value = useMemo(() => {
    const t = dict[lang]
    const num = (n, digits = 0) =>
      new Intl.NumberFormat(t.locale, {
        maximumFractionDigits: digits,
        minimumFractionDigits: 0,
      }).format(n)
    const pct = (n, digits = 2) => `${num(n, digits)}%`
    return { lang, setLang, t, num, pct }
  }, [lang])

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useLang() {
  return useContext(LanguageContext)
}
