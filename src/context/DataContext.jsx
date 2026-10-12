import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';
import { siteConfig as defaultSiteConfig } from '../data/siteConfig';
import { projectsData as defaultProjects } from '../data/projects';
import { blogArticles as defaultBlogs } from '../data/blogs';
import { servicesCategories as defaultServices } from '../data/services';
import { teamMembers as defaultTeam } from '../data/team';
import { testimonialsData as defaultTestimonials } from '../data/testimonials';
import { defaultPages } from '../data/pages';
import { defaultSiteSections } from '../data/siteSections';

const DataContext = createContext(null);

export function DataProvider({ children }) {
  const [settings, setSettings] = useState(defaultSiteConfig);
  const [sections, setSections] = useState(defaultSiteSections);
  const [projects, setProjects] = useState(defaultProjects);
  const [blogs, setBlogs] = useState(defaultBlogs);
  const [services, setServices] = useState(defaultServices);
  const [team, setTeam] = useState(defaultTeam);
  const [testimonials, setTestimonials] = useState(defaultTestimonials);
  const [messages, setMessages] = useState([]);
  const [pages, setPages] = useState(defaultPages);
  const [customComponents, setCustomComponents] = useState([]);
  const [clientProjects, setClientProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const refreshAllData = async () => {
    try {
      const [settingsRes, projectsRes, blogsRes, servicesRes, teamRes, testRes, msgRes, pagesRes, compsRes, clientProjRes] = await Promise.allSettled([
        api.getSettings(),
        api.getProjects(),
        api.getBlogs(),
        api.getServices(),
        api.getTeam(),
        api.getTestimonials(),
        api.getMessages(),
        api.getPages(),
        api.getComponents(),
        api.getClientProjects()
      ]);

      if (settingsRes.status === 'fulfilled' && settingsRes.value?.success && settingsRes.value?.data) {
        const data = settingsRes.value.data;
        setSettings(prev => ({ ...prev, ...data }));
        if (data.site_sections) {
          setSections(prev => ({ ...prev, ...data.site_sections }));
        }
      }
      if (projectsRes.status === 'fulfilled' && projectsRes.value?.success && Array.isArray(projectsRes.value?.data)) {
        const mergedProjects = projectsRes.value.data.map(p => {
          const def = defaultProjects.find(d => d.id === p.id || d.slug === p.slug) || {};
          return {
            ...def,
            ...p,
            imageUrl: (p.imageUrl && !p.imageUrl.includes('hero_team')) ? p.imageUrl : (p.image_url || def.imageUrl),
            titleEn: p.titleEn || p.title_en || def.titleEn || p.title,
            categoryEn: p.categoryEn || p.category_en || def.categoryEn || p.category,
            descriptionEn: p.descriptionEn || p.description_en || def.descriptionEn || p.description,
            fullDetailsEn: p.fullDetailsEn || p.full_details_en || def.fullDetailsEn || p.fullDetails,
            tagsEn: p.tagsEn || def.tagsEn || [],
            resultsEn: p.resultsEn || def.resultsEn || []
          };
        });
        setProjects(mergedProjects.length > 0 ? mergedProjects : defaultProjects);
      }
      if (blogsRes.status === 'fulfilled' && blogsRes.value?.success && Array.isArray(blogsRes.value?.data)) {
        const mergedBlogs = blogsRes.value.data.map(b => {
          const def = defaultBlogs.find(d => d.id === b.id || d.slug === b.slug) || {};
          return {
            ...def,
            ...b,
            imageUrl: (b.imageUrl && !b.imageUrl.includes('hero_team')) ? b.imageUrl : (b.image_url || def.imageUrl),
            titleEn: b.titleEn || b.title_en || def.titleEn || b.title,
            excerptEn: b.excerptEn || b.excerpt_en || def.excerptEn || b.excerpt,
            contentEn: b.contentEn || b.content_en || def.contentEn || b.content,
            categoryEn: b.categoryEn || b.category_en || def.categoryEn || b.category,
            readTimeEn: b.readTimeEn || b.read_time_en || def.readTimeEn || b.readTime,
            dateEn: b.dateEn || b.date_en || def.dateEn || b.date,
            tagsEn: b.tagsEn || def.tagsEn || [],
            author: {
              ...(def.author || {}),
              ...(b.author || {}),
              nameEn: b.author?.nameEn || def.author?.nameEn,
              roleEn: b.author?.roleEn || def.author?.roleEn
            }
          };
        });
        setBlogs(mergedBlogs.length > 0 ? mergedBlogs : defaultBlogs);
      }
      if (servicesRes.status === 'fulfilled' && servicesRes.value?.success && Array.isArray(servicesRes.value?.data)) {
        setServices(servicesRes.value.data);
      }
      if (teamRes.status === 'fulfilled' && teamRes.value?.success && Array.isArray(teamRes.value?.data)) {
        const mergedTeam = teamRes.value.data.map(m => {
          const def = defaultTeam.find(d => d.id === m.id) || {};
          return {
            ...def,
            ...m,
            nameEn: m.nameEn || m.name_en || def.nameEn || m.name,
            roleEn: m.roleEn || m.role_en || def.roleEn || m.role,
            bioEn: m.bioEn || m.bio_en || def.bioEn || m.bio,
            skillsEn: m.skillsEn || def.skillsEn || []
          };
        });
        setTeam(mergedTeam.length > 0 ? mergedTeam : defaultTeam);
      }
      if (testRes.status === 'fulfilled' && testRes.value?.success && Array.isArray(testRes.value?.data)) {
        const rawList = testRes.value.data.length > 0 ? testRes.value.data : defaultTestimonials;
        const mergedTestimonials = rawList.map(t => {
          const def = defaultTestimonials.find(d => d.id === t.id) || {};
          return {
            ...def,
            ...t,
            nameEn: t.nameEn || t.name_en || def.nameEn || t.name,
            roleEn: t.roleEn || t.role_en || def.roleEn || t.role,
            reviewEn: t.reviewEn || t.review_en || def.reviewEn || t.review,
            projectEn: t.projectEn || t.project_en || def.projectEn || t.project,
            avatar: t.avatar || def.avatar
          };
        });
        const uniqueTestimonials = Array.from(new Map(mergedTestimonials.map(item => [item.id, item])).values());
        setTestimonials(uniqueTestimonials.length > 0 ? uniqueTestimonials : defaultTestimonials);
      }
      if (msgRes.status === 'fulfilled' && msgRes.value?.success && Array.isArray(msgRes.value?.data)) {
        setMessages(msgRes.value.data);
      }
      if (pagesRes.status === 'fulfilled' && pagesRes.value?.success && Array.isArray(pagesRes.value?.data) && pagesRes.value.data.length > 0) {
        setPages(pagesRes.value.data);
      }
      if (compsRes.status === 'fulfilled' && compsRes.value?.success && Array.isArray(compsRes.value?.data)) {
        setCustomComponents(compsRes.value.data);
      }
      if (clientProjRes.status === 'fulfilled' && clientProjRes.value?.success && Array.isArray(clientProjRes.value?.data)) {
        setClientProjects(clientProjRes.value.data);
      }
    } catch (err) {
      console.warn('API data fetch fallback:', err);
    } finally {
      setLoading(false);
    }
  };

  const updateSectionData = async (sectionKey, newSectionData) => {
    const updatedSections = {
      ...sections,
      [sectionKey]: newSectionData
    };
    setSections(updatedSections);

    const updatedSettings = {
      ...settings,
      site_sections: updatedSections
    };
    setSettings(updatedSettings);

    try {
      await api.updateSettings(updatedSettings);
      return { success: true };
    } catch (err) {
      console.error('Failed to persist section to backend:', err);
      return { success: false, error: err };
    }
  };

  const insertComponentToPage = async (componentId, pageSlugOrId, position = 'bottom') => {
    try {
      const res = await api.insertComponentToPage(componentId, pageSlugOrId, position);
      if (res.success && res.data?.page) {
        setPages(prev => prev.map(p => (p.id === res.data.page.id || p.slug === res.data.page.slug) ? res.data.page : p));
        return { success: true, message: res.message, page: res.data.page };
      }
      return { success: false, message: res.message || 'فشل إدراج المكون' };
    } catch (err) {
      console.error('Insert component error:', err);
      return { success: false, message: 'حدث خطأ أثناء الإدراج' };
    }
  };

  useEffect(() => {
    refreshAllData();
  }, []);

  return (
    <DataContext.Provider value={{
      settings: settings || defaultSiteConfig,
      sections: sections || defaultSiteSections,
      projects: projects || [],
      blogs: blogs || [],
      services: services || [],
      team: team || [],
      testimonials: testimonials || [],
      messages: messages || [],
      pages: pages || defaultPages,
      customComponents: customComponents || [],
      clientProjects: clientProjects || [],
      loading,
      refreshAllData,
      updateSectionData,
      insertComponentToPage,
      setProjects,
      setBlogs,
      setServices,
      setTeam,
      setTestimonials,
      setMessages,
      setPages,
      setCustomComponents,
      setClientProjects,
      setSettings,
      setSections
    }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}
