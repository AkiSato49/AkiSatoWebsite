export const asciiSets = {
  hero:         ['█', '▓', '▒', '░', '—', '|', '╋', '┃'] as const,
  about:        ['○', '◉', '·', '∘', '◌', '◎', '●', '◐'] as const,
  projects:     ['▪', '▫', '┼', '┤', '├', '─', '│', '╬'] as const,
  inspirations: ['✦', '+', '×', '◆', '·', '✚', '❖', '✕'] as const,
  contact:      ['→', '←', '↗', '↙', '~', '≈', '·', '—'] as const,
} as const

export type AsciiTheme = keyof typeof asciiSets

export function generateAsciiGrid(
  w: number,
  h: number,
  theme: AsciiTheme,
  charW = 10,
  charH = 14
): string {
  const chars = asciiSets[theme]
  const cols = Math.max(1, Math.floor(w / charW))
  const rows = Math.max(1, Math.floor(h / charH))
  const lines: string[] = []
  for (let r = 0; r < rows; r++) {
    let line = ''
    for (let c = 0; c < cols; c++) {
      // denser toward center, sparser toward edges
      const edge = Math.min(c, cols - c - 1, r, rows - r - 1)
      const idx = edge < 2
        ? Math.floor(Math.random() * 3) + 4  // sparse chars at edges
        : Math.floor(Math.random() * 4)       // dense chars inside
      line += chars[Math.min(idx, chars.length - 1)]
    }
    lines.push(line)
  }
  return lines.join('\n')
}

export function randomChar(theme: AsciiTheme): string {
  const chars = asciiSets[theme]
  return chars[Math.floor(Math.random() * chars.length)]
}
