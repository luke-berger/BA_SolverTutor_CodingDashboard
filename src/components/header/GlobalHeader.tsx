import { Palette } from 'lucide-react';
import React from 'react';
import {
  MONOKAI_THEME,
  GITHUB_DARK_DEFAULT_THEME,
  ONE_DARK_PRO_THEME,
  DRACULA_THEME,
  AYU_DARK_THEME,
} from '../themes/monacoThemes';

interface GlobalHeaderProps {
  selectedTheme: string;
  onThemeChange: (theme: string) => void;
}

const GlobalHeader: React.FC<GlobalHeaderProps> = ({ selectedTheme, onThemeChange }) => {
  return (
    <header className="border-highlight bg-bgI flex h-10 shrink-0 items-center justify-between border-b px-4">
      <div className="text-lg font-bold text-gray-400"></div>

      <div className="border-highlight text-text/60 border border-dashed p-1 text-sm">
        <Palette className="inline-block h-4 w-4" />

        <select
          className="text-text/70 cursor-pointer bg-transparent font-mono"
          value={selectedTheme}
          onChange={(e) => onThemeChange(e.target.value)}
        >
          <option value={MONOKAI_THEME}>Monokai</option>
          <option value={GITHUB_DARK_DEFAULT_THEME}>GitHub Dark Default</option>
          <option value={ONE_DARK_PRO_THEME}>One Dark Pro</option>
          <option value={DRACULA_THEME}>Dracula</option>
          <option value={AYU_DARK_THEME}>Ayu Dark</option>
        </select>
      </div>
    </header>
  );
};

export default GlobalHeader;
