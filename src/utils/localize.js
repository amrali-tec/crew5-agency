/**
 * Localization helper utilities for Crew5 Agency
 * Seamlessly resolves bilingual strings and arrays for Services, Projects, Blogs, Testimonials, Team, FAQ, and Partners.
 */

export function localizeService(service, language) {
  if (!service) return service;
  if (language !== 'en') return service;

  return {
    ...service,
    title: service.titleEn || service.title,
    shortTitle: service.shortTitleEn || service.shortTitle || service.titleEn || service.title,
    categoryTitle: service.categoryTitleEn || service.categoryTitle,
    badge: service.badgeEn || service.badge,
    description: service.descriptionEn || service.description,
    heroSubtitle: service.heroSubtitleEn || service.heroSubtitle || service.descriptionEn || service.description,
    estimatedTimeline: service.estimatedTimelineEn || service.estimatedTimeline,
    pricingTier: service.pricingTierEn || service.pricingTier,
    features: (service.featuresEn && service.featuresEn.length > 0) ? service.featuresEn : service.features,
    problemsSolved: (service.problemsSolvedEn && service.problemsSolvedEn.length > 0) 
      ? service.problemsSolvedEn.map(p => ({
          problem: p.problemEn || p.problem,
          solution: p.solutionEn || p.solution
        }))
      : (service.problemsSolved || []).map(p => ({
          problem: p.problemEn || p.problem,
          solution: p.solutionEn || p.solution
        })),
    deliverables: (service.deliverablesEn && service.deliverablesEn.length > 0) ? service.deliverablesEn : service.deliverables,
    processSteps: (service.processStepsEn && service.processStepsEn.length > 0)
      ? service.processStepsEn.map(st => ({
          step: st.step,
          title: st.titleEn || st.title,
          desc: st.descEn || st.desc
        }))
      : (service.processSteps || []).map(st => ({
          step: st.step,
          title: st.titleEn || st.title,
          desc: st.descEn || st.desc
        })),
    benefits: (service.benefitsEn && service.benefitsEn.length > 0) ? service.benefitsEn : service.benefits,
    faqs: (service.faqsEn && service.faqsEn.length > 0)
      ? service.faqsEn.map(f => ({
          q: f.qEn || f.q,
          a: f.aEn || f.a
        }))
      : (service.faqs || []).map(f => ({
          q: f.qEn || f.q,
          a: f.aEn || f.a
        }))
  };
}

export function localizeCategory(category, language) {
  if (!category) return category;
  if (language !== 'en') return category;

  return {
    ...category,
    title: category.titleEn || category.title,
    description: category.descriptionEn || category.description,
    badge: category.badgeEn || category.badge,
    services: (category.services || []).map(s => localizeService(s, language))
  };
}

export function localizeProject(project, language) {
  if (!project) return project;
  if (language !== 'en') return project;

  return {
    ...project,
    title: project.titleEn || project.title,
    category: project.categoryEn || project.category,
    description: project.descriptionEn || project.description,
    fullDetails: project.fullDetailsEn || project.fullDetails || project.descriptionEn || project.description,
    client: project.clientEn || project.client,
    challenge: project.challengeEn || project.challenge,
    solution: project.solutionEn || project.solution,
    duration: project.durationEn || project.duration,
    completionDate: project.completionDateEn || project.completionDate,
    deliverables: (project.deliverablesEn && project.deliverablesEn.length > 0) ? project.deliverablesEn : project.deliverables,
    processSteps: (project.processStepsEn && project.processStepsEn.length > 0)
      ? project.processStepsEn.map(st => ({
          step: st.step,
          title: st.titleEn || st.title,
          desc: st.descEn || st.desc
        }))
      : (project.processSteps || []).map(st => ({
          step: st.step,
          title: st.titleEn || st.title,
          desc: st.descEn || st.desc
        })),
    testimonial: project.testimonial ? {
      ...project.testimonial,
      name: project.testimonial.nameEn || project.testimonial.name,
      role: project.testimonial.roleEn || project.testimonial.role,
      quote: project.testimonial.quoteEn || project.testimonial.quote
    } : project.testimonial,
    tags: (project.tagsEn && project.tagsEn.length > 0) ? project.tagsEn : project.tags,
    results: (project.resultsEn && project.resultsEn.length > 0)
      ? project.resultsEn
      : (project.results || []).map(r => ({
          ...r,
          label: r.labelEn || r.label,
          value: r.valueEn || (r.value
            ? String(r.value)
                .replace('ثانية', 's')
                .replace('كلمة طبية', 'Keywords')
                .replace('كلمة', 'Keywords')
                .replace('أسابيع', 'Weeks')
                .replace('مشاهدة', 'Views')
                .replace('عميل', 'Clients')
                .replace('أيام عمل', 'Days')
            : r.value)
        }))
  };
}

export function localizeBlog(blog, language) {
  if (!blog) return blog;
  if (language !== 'en') return blog;

  return {
    ...blog,
    title: blog.titleEn || blog.title,
    excerpt: blog.excerptEn || blog.excerpt,
    content: blog.contentEn || blog.content,
    category: blog.categoryEn || blog.category,
    readTime: blog.readTimeEn || blog.readTime,
    date: blog.dateEn || blog.date,
    tags: (blog.tagsEn && blog.tagsEn.length > 0) ? blog.tagsEn : blog.tags,
    author: blog.author ? {
      ...blog.author,
      name: blog.author.nameEn || blog.author.name,
      role: blog.author.roleEn || blog.author.role
    } : blog.author
  };
}

export function localizeTeamMember(member, language) {
  if (!member) return member;
  if (language !== 'en') return member;

  return {
    ...member,
    name: member.nameEn || member.name,
    role: member.roleEn || member.role,
    bio: member.bioEn || member.bio,
    skills: (member.skillsEn && member.skillsEn.length > 0) ? member.skillsEn : member.skills
  };
}

export function localizeTestimonial(testimonial, language) {
  if (!testimonial) return testimonial;
  if (language !== 'en') return testimonial;

  return {
    ...testimonial,
    name: testimonial.nameEn || testimonial.name,
    role: testimonial.roleEn || testimonial.role,
    review: testimonial.reviewEn || testimonial.review,
    project: testimonial.projectEn || testimonial.project
  };
}

export function localizeFaqCategory(category, language) {
  if (!category) return category;
  if (language !== 'en') return category;

  return {
    ...category,
    category: category.categoryEn || category.category,
    questions: (category.questions || []).map(q => ({
      q: q.qEn || q.q,
      a: q.aEn || q.a
    }))
  };
}

export function localizePartner(partner, language) {
  if (!partner) return partner;
  if (language !== 'en') return partner;

  return {
    ...partner,
    name: partner.nameEn || partner.name,
    category: partner.categoryEn || partner.category
  };
}

export function localizeServiceName(service, language) {
  if (!service || language !== 'en') return service || (language === 'en' ? 'General' : 'عام');
  const map = {
    'تصميم الهوية البصرية': 'Brand Identity Design',
    'بناء الهوية والتصميم': 'Brand Identity & Design',
    'الإنتاج المرئي والمونتاج': 'Video Production & Motion',
    'التطوير البرمجي والحلول السحابية': 'Software & Cloud Engineering',
    'التطوير البرمجي والويب': 'Web & Software Engineering',
    'تصميم وتطوير المواقع': 'Web & Store Engineering',
    'التسويق الرقمي وإدارة الحملات': 'Performance Marketing & Ads',
    'إدارة المحتوى والتسويق الرقمي': 'Content & Growth Marketing',
    'التحول الرقمي وأتمتة الأعمال': 'Digital Transformation',
    'عام': 'General',
    'استفسار عام': 'General Inquiry'
  };
  return map[service] || service;
}
