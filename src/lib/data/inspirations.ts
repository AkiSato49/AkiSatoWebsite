export interface Inspiration {
  name: string
  nameHtml: string
  category: string
  note: string
}

export const inspirations: Inspiration[] = [
  {
    name: 'Josef Müller-Brockmann',
    nameHtml: 'Josef Mü<span class="hi">l</span>ler-Brockmann',
    category: 'Design',
    note: 'Restrictions spark creativity. Every element in his work is there for a reason. He taught me that intentional design is not about adding. It is about knowing what to leave out.',
  },
  {
    name: 'FromSoftware',
    nameHtml: 'Fr<span class="hi">o</span>mSoftware',
    category: 'Games',
    note: 'The big picture only works because every small detail is considered. Their games are proof that a great result is not a stroke of luck. It is the sum of a thousand intentional decisions.',
  },
  {
    name: 'Nintendo',
    nameHtml: 'Nint<span class="hi">e</span>ndo',
    category: 'Games',
    note: 'When someone loves something you made, you feel it. Nintendo games have that. There is a warmth in the craft that only comes from people who genuinely cared about the person on the other side.',
  },
  {
    name: 'Luis Barragán',
    nameHtml: 'Luis Bar<span class="hi">r</span>agán',
    category: 'Architecture',
    note: 'He did more with less than almost anyone. Simple materials, simple forms. Yet you walk into one of his spaces and something shifts. Simplicity is not the absence of thought. It is the result of it.',
  },
]
