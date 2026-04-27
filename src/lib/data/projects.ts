export interface Project {
  id:          number
  title:       string
  description: string
  tags:        string[]
  year:        number
  link?:       string
}

export const projects: Project[] = [
  {
    id: 1,
    title: 'Personal AI Orchestration System',
    description: 'Multi-agent automation pipeline with 4+ specialist agents covering finance, dev, and university workflows. Integrates Google Workspace, Todoist, Canvas LMS, Up Bank, and Telegram. Runs in production daily.',
    tags: ['AI', 'Go', 'Multi-agent', 'Production'],
    year: 2025,
  },
  {
    id: 2,
    title: 'MRI → CT Synthesis Model',
    description: 'AI model converting MRI scans into synthetic CT images. Achieved ~99% image accuracy (SSIM: 0.9873), outperforming CycleGAN and Pix2Pix baselines. Led team as PM at University of Sydney.',
    tags: ['PyTorch', 'Deep Learning', 'Research', 'USYD'],
    year: 2025,
  },
  {
    id: 3,
    title: 'Rent Manager',
    description: 'Full-stack rental property management platform actively managing 2 properties. Role-based access control, Stripe payment processing, automated receipts. 228 tests across unit, integration, and E2E layers.',
    tags: ['SvelteKit', 'TypeScript', 'Stripe', 'Production'],
    year: 2024,
  },
  {
    id: 4,
    title: 'Janulus — AI Language Learning',
    description: 'AI-powered language learning app built at SYNCS Hackathon. Finalist and People\'s Choice winner out of 30 projects and 150+ participants. Features AI chat, TTS, progress tracking, and analytics.',
    tags: ['Hackathon', 'AI', 'React', 'Winner'],
    year: 2023,
  },
]
