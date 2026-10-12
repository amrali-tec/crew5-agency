import React from 'react';
import { useLocation } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import CustomComponentRenderer from '../builder/CustomComponentRenderer';
import { isItemPubliclyVisible } from '../../utils/publishUtils';

export default function GlobalComponentsRenderer({ position = 'top_bar' }) {
  const { customComponents = [] } = useData();
  const location = useLocation();

  // Don't render global marketing banners on admin routes
  if (location.pathname.startsWith('/admin')) {
    return null;
  }

  // Get matching global components
  const activeComponents = customComponents.filter(comp => {
    if (!comp || !comp.isGlobal || !isItemPubliclyVisible(comp)) return false;
    
    // Check global position
    const compPos = comp.globalPosition || (comp.type === 'announcement_bar' ? 'top_bar' : (comp.type === 'floating_widget' ? 'floating' : 'page_block'));
    if (compPos !== position) return false;

    // Check page targeting if specified
    if (comp.targetPages && comp.targetPages.length > 0 && !comp.targetPages.includes('all')) {
      const currentPath = location.pathname;
      const matchesPage = comp.targetPages.some(pageSlug => {
        if (pageSlug === 'home' && currentPath === '/') return true;
        if (currentPath === `/${pageSlug}` || currentPath === `/p/${pageSlug}`) return true;
        return false;
      });
      if (!matchesPage) return false;
    }

    return true;
  });

  if (activeComponents.length === 0) return null;

  return (
    <>
      {activeComponents.map((comp) => (
        <CustomComponentRenderer key={comp.id} component={comp} />
      ))}
    </>
  );
}
