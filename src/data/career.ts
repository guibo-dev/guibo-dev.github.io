/** Experience & Education timeline for the homepage. Logos live in
 *  public/images/career/. `dark` gives a logo a dark tile (e.g. RAVR). */
export interface CareerItem {
  role: string;
  note?: string;
  org: string;
  location: string;
  dates: string;
  logo: string;
  url: string;
  dark?: boolean;
  description: string;
}

export const EXPERIENCE: CareerItem[] = [
  {
    role: 'Marketing Specialist',
    org: 'Human Rights Foundation',
    location: 'New York, NY',
    dates: 'Oct 2023 – Present',
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
