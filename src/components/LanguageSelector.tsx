import React from 'react';
import { ChevronDown } from 'lucide-react';
import { useLanguage, languages, Language } from '../contexts/LanguageContext';

interface LanguageSelectorProps {
  isScrolled?: boolean;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ isScrolled = false }) => {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = React.useState(false);

  const handleLanguageChange = (newLanguage: Language) => {
    setLanguage(newLanguage);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center space-x-2 px-3 py-2 text-sm font-medium transition-colors ${
          isScrolled 
            ? 'text-gray-700 hover:text-gray-900' 
            : 'text-white/90 hover:text-white'
        }`}
      >
        <span>{language.flag}</span>
        <span>{language.name}</span>
        <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-50">
          <div className="py-1">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang)}
                className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 flex items-center space-x-2 ${
                  language.code === lang.code ? 'bg-emerald-50 text-emerald-700' : 'text-gray-700'
                }`}
              >
                <span>{lang.flag}</span>
                <span>{lang.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;