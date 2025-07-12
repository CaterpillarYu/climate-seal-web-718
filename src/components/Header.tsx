import React, { useState, useEffect } from 'react';
import { Menu, X, Leaf } from 'lucide-react';
import LanguageSelector from './LanguageSelector';
import { useLanguage } from '../contexts/LanguageContext';

interface HeaderProps {
  onViewPricing?: () => void;
  isHomePage?: boolean;
  onGoHome?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onViewPricing, isHomePage = true, onGoHome }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { t } = useLanguage();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleNavClick = (sectionId: string) => {
    if (isHomePage) {
      // 如果在首页，直接滚动到对应部分
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // 如果不在首页，先回到首页再滚动
      if (onGoHome) {
        onGoHome();
        // 延迟滚动，等待页面切换完成
        setTimeout(() => {
          const element = document.getElementById(sectionId);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      }
    }
  };
  useEffect(() => {
    const handleScroll = () => {
      if (isHomePage) {
        // 在首页时，检测是否滚动超过首页区域
        const scrollPosition = window.scrollY;
        const heroHeight = window.innerHeight;
        setIsScrolled(scrollPosition > heroHeight * 0.8);
      } else {
        // 在其他页面时，始终使用深色文字
        setIsScrolled(true);
      }
    };

    // 初始化时立即执行一次
    handleScroll();
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHomePage]);

  return (
    <header className={`backdrop-blur-md border-b fixed w-full top-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 border-gray-200' 
        : 'bg-white/10 border-white/20'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <button 
            onClick={onGoHome}
            className="flex items-center space-x-2 hover:opacity-80 transition-opacity cursor-pointer"
          >
            <div className="bg-emerald-600 p-2 rounded-lg">
              <Leaf className="h-6 w-6 text-white" />
            </div>
            <span className={`text-2xl font-bold transition-colors duration-300 ${
              isScrolled ? 'text-gray-900' : 'text-white'
            }`}>Climate Seal</span>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => handleNavClick('solutions')}
              className={`hover:text-emerald-400 transition-colors font-medium ${
              isScrolled ? 'text-gray-700' : 'text-white/90'
            }`}
            >
              {t('nav.solutions')}
            </button>
            <button 
              onClick={() => handleNavClick('about')}
              className={`hover:text-emerald-400 transition-colors font-medium ${
              isScrolled ? 'text-gray-700' : 'text-white/90'
            }`}
            >
              {t('nav.about')}
            </button>
            <button 
              onClick={() => handleNavClick('contact')}
              className={`hover:text-emerald-400 transition-colors font-medium ${
              isScrolled ? 'text-gray-700' : 'text-white/90'
            }`}
            >
              {t('nav.contact')}
            </button>
            <LanguageSelector isScrolled={isScrolled} />
            <button 
              onClick={onViewPricing}
              className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition-colors font-medium shadow-lg"
            >
              {t('nav.pricing')}
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className={`md:hidden p-2 rounded-lg transition-colors ${
              isScrolled ? 'hover:bg-gray-100' : 'hover:bg-white/10'
            }`}
          >
            {isMenuOpen ? (
              <X className={`h-6 w-6 transition-colors ${isScrolled ? 'text-gray-900' : 'text-white'}`} />
            ) : (
              <Menu className={`h-6 w-6 transition-colors ${isScrolled ? 'text-gray-900' : 'text-white'}`} />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className={`md:hidden py-4 border-t ${
            isScrolled ? 'border-gray-200' : 'border-white/20'
          }`}>
            <nav className="flex flex-col space-y-4">
              <button 
                onClick={() => handleNavClick('solutions')}
                className={`hover:text-emerald-400 transition-colors font-medium text-left ${
                isScrolled ? 'text-gray-700' : 'text-white/90'
              }`}
              >
                {t('nav.solutions')}
              </button>
              <button 
                onClick={() => handleNavClick('about')}
                className={`hover:text-emerald-400 transition-colors font-medium text-left ${
                isScrolled ? 'text-gray-700' : 'text-white/90'
              }`}
              >
                {t('nav.about')}
              </button>
              <button 
                onClick={() => handleNavClick('contact')}
                className={`hover:text-emerald-400 transition-colors font-medium text-left ${
                isScrolled ? 'text-gray-700' : 'text-white/90'
              }`}
              >
                {t('nav.contact')}
              </button>
              <div className="pt-2">
                <LanguageSelector isScrolled={isScrolled} />
              </div>
              <button 
                onClick={onViewPricing}
                className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition-colors font-medium w-fit shadow-lg"
              >
                {t('nav.pricing')}
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;