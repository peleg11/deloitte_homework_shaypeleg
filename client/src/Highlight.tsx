interface Props {
  query: string;
  text: string;
}

export const Highlight = ({ query, text }: Props) => {
  if (!query) return text;

  const reg = new RegExp(query, 'gi');

  //mark substring to highlight
  const marked_str = text.replace(reg, str => {
    return '|[' + str + ']|';
  });
  //
  const arr = marked_str.split('|');

  const result = arr.map(s => {
    if (s.startsWith('[') && s.endsWith(']')) {
      // remove |,[ or ]
      s = s.replace(/\||\[|\]/g, '');
      //return the highlighted
      return <mark key={Math.random() * 10}>{s}</mark>;
    } else {
      //If it's a normal entry, just return it.
      return <span key={Math.random() * 10}>{s}</span>;
    }
  });

  return <span>{result}</span>;
};
