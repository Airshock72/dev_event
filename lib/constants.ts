export type EventItem = {
  title: string
  image: string
  slug: string
  location: string
  date: string
  time: string
}

export const events: Array<EventItem> = [
  {
    title: 'JSConf EU 2025',
    image: '/images/event1.png',
    slug: 'jsconf-eu-2025',
    location: 'Berlin, Germany',
    date: 'Dec 3–5, 2025',
    time: '09:00 – 18:00 CET'
  },
  {
    title: 'AWS re:Invent 2025',
    image: '/images/event2.png',
    slug: 'aws-reinvent-2025',
    location: 'Las Vegas, NV, USA',
    date: 'Dec 1–5, 2025',
    time: '08:30 – 17:30 PST'
  },
  {
    title: 'Hack the North 2026',
    image: '/images/event3.png',
    slug: 'hack-the-north-2026',
    location: 'Waterloo, Canada',
    date: 'Jan 23–25, 2026',
    time: '48-hour Hackathon'
  },
  {
    title: 'FOSDEM 2026',
    image: '/images/event4.png',
    slug: 'fosdem-2026',
    location: 'Brussels, Belgium',
    date: 'Feb 7–8, 2026',
    time: 'All-day CET'
  },
  {
    title: 'Google I/O 2026',
    image: '/images/event5.png',
    slug: 'google-io-2026',
    location: 'Mountain View, CA, USA (Shoreline Amphitheatre) + Online',
    date: 'May 2026 (TBA)',
    time: 'Keynotes & Sessions (TBA)'
  },
  {
    title: 'NodeConf EU 2026',
    image: '/images/event6.png',
    slug: 'nodeconf-eu-2026',
    location: 'Kilkenny, Ireland',
    date: 'Nov 2026 (TBA)',
    time: 'Workshops & Talks (TBA)'
  }
]
