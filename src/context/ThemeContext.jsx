import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const DARK_MOODS = [
  {
    id: 'midnight',
    nameAr: 'منتصف الليل (Cyber)',
    nameEn: 'Cyber Midnight',
    bg: '#07090e',
    card: '#0c101a',
    preview: 'from-[#07090e] to-[#0c101a]',
    badge: '✨ الافتراضي'
  },
  {
    id: 'oled',
    nameAr: 'الأسود المطلق (OLED)',
    nameEn: 'OLED Pure Black',
    bg: '#000000',
    card: '#080808',
    preview: 'from-[#000000] to-[#0a0a0a]',
    badge: '⚡ موفر للطاقة'
  },
  {
    id: 'sapphire',
    nameAr: 'الأزرق الملكي (Sapphire)',
    nameEn: 'Royal Sapphire',
    bg: '#060b17',
    card: '#0b1426',
    preview: 'from-[#060b17] to-[#0d1c38]',
    badge: '🌊 كحلي ملكي'
  },
  {
    id: 'titanium',
    nameAr: 'الفحم التيتانيوم (Titanium)',
    nameEn: 'Titanium Charcoal',
    bg: '#101216',
    card: '#171a20',
    preview: 'from-[#101216] to-[#1a1d24]',
    badge: '🛡️ رمادي مهدئ'
  }
];

export const LIGHT_MOODS = [
  {
    id: 'studio',
    nameAr: 'الأبيض النقي (Studio)',
    nameEn: 'Crisp Studio',
    bg: '#F8FAFC',
    card: '#FFFFFF',
    preview: 'from-[#F8FAFC] to-[#FFFFFF]',
    badge: '🏢 ناصع وعصري'
  },
  {
    id: 'warm',
    nameAr: 'مريح للعين (Warm Eye-Care)',
    nameEn: 'Warm Eye-Care',
    bg: '#F6F4EE',
    card: '#FDFBF7',
    preview: 'from-[#F6F4EE] to-[#FAF8F5]',
    badge: '🌿 حماية العين'
  },
  {
    id: 'fog',
    nameAr: 'الضباب الهادئ (Soft Fog)',
    nameEn: 'Soft Slate Fog',
    bg: '#EFF2F6',
    card: '#F8FAFC',
    preview: 'from-[#EFF2F6] to-[#E2E8F0]',
    badge: '☁️ سحابي ناعم'
  }
];

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('crew5_theme') || 'dark';
  });

  const [darkMood, setDarkMood] = useState(() => {
    return localStorage.getItem('crew5_dark_mood') || 'midnight';
  });

  const [lightMood, setLightMood] = useState(() => {
    return localStorage.getItem('crew5_light_mood') || 'studio';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
      root.style.colorScheme = 'dark';
      root.setAttribute('data-mood', darkMood);
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
      root.style.colorScheme = 'light';
      root.setAttribute('data-mood', lightMood);
    }
    localStorage.setItem('crew5_theme', theme);
  }, [theme, darkMood, lightMood]);

  const setDarkMoodPreference = (moodId) => {
    setDarkMood(moodId);
    localStorage.setItem('crew5_dark_mood', moodId);
  };

  const setLightMoodPreference = (moodId) => {
    setLightMood(moodId);
    localStorage.setItem('crew5_light_mood', moodId);
  };

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const isDark = theme === 'dark';
  const currentMood = isDark ? darkMood : lightMood;

  return (
    <ThemeContext.Provider value={{ 
      theme, 
      setTheme, 
      toggleTheme, 
      isDark,
      darkMood,
      lightMood,
      currentMood,
      setDarkMood: setDarkMoodPreference,
      setLightMood: setLightMoodPreference,
      DARK_MOODS,
      LIGHT_MOODS
    }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
