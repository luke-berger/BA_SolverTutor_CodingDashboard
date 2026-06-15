import { Palette } from 'lucide-react';
import React from 'react';
import {
  MONOKAI_THEME,
  GITHUB_DARK_DEFAULT_THEME,
  ONE_DARK_PRO_THEME,
  DRACULA_THEME,
  ONE_DARK_THEME,
} from '../editor/monacoThemes';

interface GlobalHeaderProps {
  selectedTheme: string;
  onThemeChange: (theme: string) => void;
}

const GlobalHeader: React.FC<GlobalHeaderProps> = ({ selectedTheme, onThemeChange }) => {
  return (
    <header className="border-monokai-highlight bg-monokai-bgI flex h-10 shrink-0 items-center justify-between border-b px-4">
      <div className="text-lg font-bold text-gray-400"></div>
      <div className="border-monokai-highlight text-monokai-text/60 border border-dashed p-1 text-sm">
        <Palette size={16} className="inline-block" />
        <select
          className="text-monokai-text cursor-pointer bg-transparent font-mono text-sm"
          value={selectedTheme}
          onChange={(e) => onThemeChange(e.target.value)}
        >
          <option value={MONOKAI_THEME}>Monokai</option>
          <option value={GITHUB_DARK_DEFAULT_THEME}>GitHub Dark Default</option>
          <option value={ONE_DARK_PRO_THEME}>One Dark Pro</option>
          <option value={DRACULA_THEME}>Dracula</option>
          <option value={ONE_DARK_THEME}>One Dark</option>
        </select>
      </div>
    </header>
  );
};

export default GlobalHeader;
