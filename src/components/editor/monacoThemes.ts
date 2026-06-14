import type { Monaco } from '@monaco-editor/react';
import type { editor } from 'monaco-editor';

export const MONOKAI_THEME = 'monokai';
export const GITHUB_DARK_DEFAULT_THEME = 'github-dark-default';
export const ONE_DARK_PRO_THEME = 'one-dark-pro';
export const DRACULA_THEME = 'dracula';
export const ONE_DARK_THEME = 'one-dark';

type ThemePalette = {
  background: string;
  foreground: string;
  comment: string;
  string: string;
  number: string;
  keyword: string;
  typeName: string;
  variable: string;
  functionName: string;
  operator: string;
  lineNumber: string;
  selection: string;
  lineHighlight: string;
  cursor: string;
  whitespace: string;
  gutter?: string;
};

const tokenColor = (color: string) => color.replace(/^#/, '').slice(0, 6);

const createDarkTheme = (palette: ThemePalette): editor.IStandaloneThemeData => ({
  base: 'vs-dark',
  inherit: true,
  rules: [
    { token: 'comment', foreground: tokenColor(palette.comment) },
    { token: 'string', foreground: tokenColor(palette.string) },
    { token: 'number', foreground: tokenColor(palette.number) },
    { token: 'constant', foreground: tokenColor(palette.number) },
    { token: 'keyword', foreground: tokenColor(palette.keyword) },
    { token: 'type', foreground: tokenColor(palette.typeName) },
    { token: 'variable', foreground: tokenColor(palette.variable) },
    { token: 'identifier', foreground: tokenColor(palette.variable) },
    { token: 'function', foreground: tokenColor(palette.functionName) },
    { token: 'operator', foreground: tokenColor(palette.operator) },
  ],
  colors: {
    'editor.background': palette.background,
    'editor.foreground': palette.foreground,
    'editorGutter.background': palette.gutter ?? palette.background,
    'editorLineNumber.foreground': palette.lineNumber,
    'editor.selectionBackground': palette.selection,
    'editor.lineHighlightBackground': palette.lineHighlight,
    'editorCursor.foreground': palette.cursor,
    'editorWhitespace.foreground': palette.whitespace,
  },
});

const themes: Record<string, editor.IStandaloneThemeData> = {
  [MONOKAI_THEME]: createDarkTheme({
    background: '#272822',
    foreground: '#F8F8F2',
    comment: '#75715E',
    string: '#E6DB74',
    number: '#AE81FF',
    keyword: '#F92672',
    typeName: '#66D9EF',
    variable: '#F8F8F2',
    functionName: '#A6E22E',
    operator: '#F92672',
    lineNumber: '#8F908A',
    selection: '#49483E',
    lineHighlight: '#3E3D32',
    cursor: '#F8F8F0',
    whitespace: '#3E3D32',
  }),

  [GITHUB_DARK_DEFAULT_THEME]: createDarkTheme({
    background: '#0d1117',
    foreground: '#e6edf3',
    comment: '#8b949e',
    string: '#a5d6ff',
    number: '#79c0ff',
    keyword: '#ff7b72',
    typeName: '#7ee787',
    variable: '#ffa657',
    functionName: '#d2a8ff',
    operator: '#ff7b72',
    lineNumber: '#6e7681',
    selection: '#2f81f733',
    lineHighlight: '#6e76811a',
    cursor: '#2f81f7',
    whitespace: '#484f58',
  }),

  [ONE_DARK_PRO_THEME]: createDarkTheme({
    background: '#282c34',
    foreground: '#abb2bf',
    comment: '#5c6370',
    string: '#98c379',
    number: '#d19a66',
    keyword: '#c678dd',
    typeName: '#e5c07b',
    variable: '#e06c75',
    functionName: '#61afef',
    operator: '#56b6c2',
    lineNumber: '#495162',
    selection: '#67769660',
    lineHighlight: '#2c313c',
    cursor: '#528bff',
    whitespace: '#ffffff1d',
  }),

  [DRACULA_THEME]: createDarkTheme({
    background: '#282A36',
    foreground: '#F8F8F2',
    comment: '#6272A4',
    string: '#F1FA8C',
    number: '#BD93F9',
    keyword: '#FF79C6',
    typeName: '#8BE9FD',
    variable: '#F8F8F2',
    functionName: '#50FA7B',
    operator: '#FF79C6',
    lineNumber: '#6272A4',
    selection: '#44475A',
    lineHighlight: '#44475A75',
    cursor: '#F8F8F2',
    whitespace: '#FFFFFF1A',
  }),

  [ONE_DARK_THEME]: createDarkTheme({
    background: '#282C34',
    foreground: '#ABB2BF',
    comment: '#5C6370',
    string: '#98C379',
    number: '#D19A66',
    keyword: '#C678DD',
    typeName: '#E5C07B',
    variable: '#E06C75',
    functionName: '#61AFEF',
    operator: '#C678DD',
    lineNumber: '#636D83',
    selection: '#3E4451',
    lineHighlight: '#99BBFF0A',
    cursor: '#528BFF',
    whitespace: '#ABB2BF26',
  }),
};

export function registerMonacoThemes(monaco: Monaco) {
  Object.entries(themes).forEach(([name, theme]) => {
    monaco.editor.defineTheme(name, theme);
  });
}
