export const REGEX_TOKEN_MAP: Record<string, string> = {
    digit: '\\d',
    digits: '\\d+',
    letter: '[a-zA-Z]',
    letters: '[a-zA-Z]+',
    whitespace: '\\s',
    word: '\\w',
    words: '\\w+',
    any: '.',
    start: '^',
    end: '$',
    dot: '\\.',
    email: '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}',
    url: 'https?:\\/\\/[\\w\\-]+(\\.[\\w\\-]+)+[\\/\\w\\-.,@?^=%&:~+#]*',
    phone: '\\+?\\d{1,4}[-.\\s]?\\(?\\d{1,4}\\)?[-.\\s]?\\d{1,9}',
    ip: '\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}',
    date: '\\d{4}[-/]\\d{2}[-/]\\d{2}',
    hex: '#?[0-9a-fA-F]+',
    newline: '\\n',
    tab: '\\t',
    optional: '?',
    'one-or-more': '+',
    'zero-or-more': '*',
  };

export function addPartFromInputSequenceSingle(input: string) {
    if (!input.trim()) return;
    const tokens = input.toLowerCase().trim().split(/\s+/);
    let i = 0;
    let pattern = '';
    let label = input.trim();

    while (i < tokens.length) {
      const token = tokens[i];

      if (REGEX_TOKEN_MAP[token]) {
        let value = REGEX_TOKEN_MAP[token];

        if (i + 2 < tokens.length && tokens[i + 2] === 'times') {
          const count = parseInt(tokens[i + 1], 10);
          if (!isNaN(count)) {
            value += `{${count}}`;
            i += 3;
            continue;
          }
        }

        if (i + 1 < tokens.length && tokens[i + 1] === 'optional') {
          value += '?';
          i += 2;
          continue;
        }

        pattern += value;
        i++;
      } else {
        pattern += escapeRegex(token);
        i++;
      }
    }

    if (pattern) {
      return { label, value: pattern };
    }
    return null;
 }

 function escapeRegex(str: string): string {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }