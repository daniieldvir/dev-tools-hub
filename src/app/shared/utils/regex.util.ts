export interface RegexExplanation {
  token: string;
  description: string;
}

export interface RegexPart {
  label: string;
  value: string;
}

// ---------------- Generator ----------------

export function buildValidRegex(pattern: string): string | null {
  try {
    new RegExp(pattern);
    return pattern;
  } catch {
    return null;
  }
}

export function copyToClipboard(text: string) {
  if (text) navigator.clipboard.writeText(text);
}

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

export function addPartFromInputSequenceSingle(input: string): RegexPart | null {
  const trimmed = input.trim();
  if (!trimmed) return null;

  const tokens = trimmed.toLowerCase().split(/\s+/);

  let i = 0;
  let pattern = '';

  while (i < tokens.length) {
    const token = tokens[i];
    const mapped = REGEX_TOKEN_MAP[token];

    if (mapped) {
      let value = mapped;

      if (tokens[i + 2] === 'times') {
        const count = Number(tokens[i + 1]);
        if (!Number.isNaN(count)) {
          value += `{${count}}`;
          i += 3;
          pattern += value;
          continue;
        }
      }

      if (tokens[i + 1] === 'optional') {
        value += '?';
        i += 2;
        pattern += value;
        continue;
      }

      pattern += value;
      i++;
    } else {
      pattern += escapeRegex(token);
      i++;
    }
  }

  return pattern ? { label: trimmed, value: pattern } : null;
}

function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// ---------------- Validators ----------------

export function createSafeRegex(pattern: string, flags: string): RegExp {
  return new RegExp(pattern, flags);
}

export function getRegexMatches(regex: RegExp, text: string): string[] {
  return text.match(regex) ?? [];
}

export function highlightMatches(text: string, regex: RegExp): string {
  return text.replace(regex, (match) => `<mark>${match}</mark>`);
}

export function toggleRegexFlag(flags: string, flag: string): string {
  return flags.includes(flag) ? flags.replace(flag, '') : flags + flag;
}

export function hasRegexFlag(flags: string, flag: string): boolean {
  return flags.includes(flag);
}

// ---------------- Regex → Text ----------------

const ESCAPE_MAP: Record<string, string> = {
  '\\d': 'Digit (0-9)',
  '\\D': 'Non-digit',
  '\\w': 'Word character (a-z, A-Z, 0-9, _)',
  '\\W': 'Non-word character',
  '\\s': 'Whitespace (space, tab, newline)',
  '\\S': 'Non-whitespace',
  '\\b': 'Word boundary',
  '\\B': 'Non-word boundary',
  '\\n': 'Newline',
  '\\t': 'Tab',
  '\\r': 'Carriage return',
};

export function validateRegex(pattern: string): string | null {
  try {
    new RegExp(pattern);
    return null;
  } catch (e: any) {
    return e?.message ?? 'Invalid regex';
  }
}

export function explainRegex(pattern: string): RegexExplanation[] {
  const explanations: RegexExplanation[] = [];
  let i = 0;

  while (i < pattern.length) {
    const char = pattern[i];

    if (char === '^') {
      explanations.push({ token: '^', description: 'Start of string' });
      i++;
      continue;
    }

    if (char === '$') {
      explanations.push({ token: '$', description: 'End of string' });
      i++;
      continue;
    }

    if (char === '.') {
      explanations.push({
        token: '.',
        description: 'Any character (except newline)',
      });
      i++;
      continue;
    }

    if (char === '\\' && i + 1 < pattern.length) {
      const escaped = `\\${pattern[i + 1]}`;

      explanations.push({
        token: escaped,
        description: ESCAPE_MAP[escaped] ?? `Literal "${pattern[i + 1]}"`,
      });

      i += 2;
      continue;
    }

    if (char === '*' || char === '+' || char === '?' || char === '|') {
      const descriptions: Record<string, string> = {
        '*': 'Zero or more times',
        '+': 'One or more times',
        '?': 'Optional (zero or one time)',
        '|': 'OR (alternative)',
      };

      explanations.push({
        token: char,
        description: descriptions[char],
      });

      i++;
      continue;
    }

    explanations.push({
      token: char,
      description: `Literal "${char}"`,
    });

    i++;
  }

  return explanations;
}
