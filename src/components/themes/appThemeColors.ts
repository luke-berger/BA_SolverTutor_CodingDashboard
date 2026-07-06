import type { CSSProperties } from 'react';
import {
  AYU_DARK_THEME,
  DRACULA_THEME,
  GITHUB_DARK_DEFAULT_THEME,
  MONOKAI_THEME,
  ONE_DARK_PRO_THEME,
} from './monacoThemes';

type ThemeVariables = CSSProperties & {
  '--color-bgI': string;
  '--color-bgII': string;
  '--color-highlight': string;
  '--color-text': string;
  '--color-chat-bg': string;
};

export const appThemeColors: Record<string, ThemeVariables> = {
  [MONOKAI_THEME]: {
    '--color-bgI': '#1F201F',
    '--color-bgII': '#272822',
    '--color-highlight': '#414338',
    '--color-text': '#DEDEDE',
    '--color-chat-bg': '#2F312F',
  },

  [GITHUB_DARK_DEFAULT_THEME]: {
    '--color-bgI': '#010409',
    '--color-bgII': '#0D1117',
    '--color-highlight': '#30363D',
    '--color-text': '#E6EDF3',
    '--color-chat-bg': '#161B22',
  },

  [ONE_DARK_PRO_THEME]: {
    '--color-bgI': '#21252B',
    '--color-bgII': '#282C34',
    '--color-highlight': '#3E4451',
    '--color-text': '#D7DAE0',
    '--color-chat-bg': '#2C313A',
  },

  [DRACULA_THEME]: {
    '--color-bgI': '#21222C',
    '--color-bgII': '#282A36',
    '--color-highlight': '#44475A',
    '--color-text': '#F8F8F2',
    '--color-chat-bg': '#343746',
  },

  [AYU_DARK_THEME]: {
    '--color-bgI': '#0D1017',
    '--color-bgII': '#10141C',
    '--color-highlight': '#1B1F29',
    '--color-text': '#BFBDB6',
    '--color-chat-bg': '#141821',
  },
};
