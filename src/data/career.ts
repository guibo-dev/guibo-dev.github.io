/** Experience & Education timeline for the homepage. Logos live in
 *  public/images/career/. `dark` gives a logo a dark tile (e.g. RAVR). */
export interface CareerItem {
  /** Single-role entry. Omit when `roles` is given (a promotion stack). */
  role?: string;
  note?: string;
  org: string;
  location: string;
  /** Date range for a single-role entry. Omit when `roles` is given. */
  dates?: string;
  /** Promotion progression at one org, most recent first — the org becomes
   *  the entry's headline and these render as a connected timeline. */
  roles?: { title: string; dates: string }[];
  logo: string;
  url: string;
  dark?: boolean;
  description: string;
}

export const EXPERIENCE: CareerItem[] = [
  {
    org: 'Human Rights Foundation',
    location: 'New York, NY',
    roles: [
      { title: 'Marketing Manager', dates: 'Oct 2026 – Present' },
      { title: 'Marketing Specialist', dates: 'Jan 2026 – Sep 2026' },
      { title: 'Marketing and Communications Assistant', dates: 'Jun 2024 – Dec 2025' },
      { title: 'Marketing and Communications Intern', dates: 'Oct 2023 – May 2024' },
    ],
    logo: 'career-hrf',
    url: 'https://hrf.org',
    description:
      'International nonprofit organization dedicated to promoting and protecting human rights in countries under authoritarian rule.',
  },
  {
    role: 'Head of Growth',
    note: 'Part-time',
    org: 'RAVR',
    location: 'New York, NY',
    dates: 'Jan 2025 – Jan 2026',
    logo: 'career-ravr',
    url: 'https://apps.apple.com/us/app/ravr/id6745794793',
    dark: true,
    description:
      'Consumer technology startup building a social platform for live music fans to archive, review, and share concert experiences.',
  },
  {
    role: 'Public Relations Intern',
    org: 'Ketchum',
    location: 'New York, NY',
    dates: 'Dec 2022 – Apr 2023',
    logo: 'career-ketchum',
    url: 'https://golinketchum.com',
    description:
      'Global public relations and communications agency specializing in brand strategy, corporate communications, and integrated marketing campaigns.',
  },
];

export const EDUCATION: CareerItem[] = [
  {
    role: 'B.A., Diplomacy & World Affairs',
    org: 'Occidental College',
    location: 'Los Angeles, CA',
    dates: 'Aug 2019 – May 2023',
    logo: 'career-occidental',
    url: 'https://www.oxy.edu',
    description: 'Private liberal arts college in Los Angeles.',
  },
  {
    role: 'Mini MBA in Marketing',
    org: 'Mark Ritson · Marketing Week',
    location: 'Online',
    dates: 'Sep 2023 – Dec 2023',
    logo: 'career-marketing-week',
    url: 'https://minimba.com/',
    description:
      'Executive-level marketing program covering evidence-based brand strategy, customer insights, positioning, and marketing effectiveness.',
  },
];
