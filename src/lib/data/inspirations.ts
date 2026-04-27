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
    note: 'Proof that a grid is not a constraint — it is a foundation. Working within strict rules left him free to do everything else perfectly.',
  },
  {
    name: 'FromSoftware',
    nameHtml: 'Fr<span class="hi">o</span>mSoftware',
    category: 'Games',
    note: 'They make you feel things through systems, not cutscenes. Every mechanic is a sentence. Difficulty is a form of respect for the person playing.',
  },
  {
    name: 'Nintendo',
    nameHtml: 'Nint<span class="hi">e</span>ndo',
    category: 'Games',
    note: "Hardware limits as creative engine. The best Nintendo work was made by people who couldn't do the obvious thing and had to find a better one.",
  },
  {
    name: 'Luis Barragán',
    nameHtml: 'Luis Bar<span class="hi">r</span>agán',
    category: 'Architecture',
    note: "Raw concrete and saturated colour shouldn't work together. They do. He built spaces that make you feel something before you understand why.",
  },
]
