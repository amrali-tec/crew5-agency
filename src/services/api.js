const API_BASE = '/api';

function getAuthHeader() {
  const token = localStorage.getItem('crew5_admin_token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export const api = {
  // Auth
  async login(email, password) {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    return res.json();
  },

  async getMe() {
    const res = await fetch(`${API_BASE}/auth/me`, {
      headers: getAuthHeader()
    });
    return res.json();
  },

  async updatePassword(currentPassword, newPassword) {
    const res = await fetch(`${API_BASE}/auth/update-password`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
      body: JSON.stringify({ currentPassword, newPassword })
    });
    return res.json();
  },

  // Users & Roles Management
  async getUsers() {
    const res = await fetch(`${API_BASE}/users`, {
      headers: getAuthHeader()
    });
    return res.json();
  },

  async getUser(id) {
    const res = await fetch(`${API_BASE}/users/${id}`, {
      headers: getAuthHeader()
    });
    return res.json();
  },

  async createUser(data) {
    const res = await fetch(`${API_BASE}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
      body: JSON.stringify(data)
    });
    return res.json();
  },

  async updateUser(id, data) {
    const res = await fetch(`${API_BASE}/users/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
      body: JSON.stringify(data)
    });
    return res.json();
  },

  async resetUserPassword(id, newPassword) {
    const res = await fetch(`${API_BASE}/users/${id}/password`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
      body: JSON.stringify({ newPassword })
    });
    return res.json();
  },

  async deleteUser(id) {
    const res = await fetch(`${API_BASE}/users/${id}`, {
      method: 'DELETE',
      headers: getAuthHeader()
    });
    return res.json();
  },

  // Security Audit & Health
  async getAuditLogs() {
    const res = await fetch(`${API_BASE}/audit-logs`, {
      headers: getAuthHeader()
    });
    return res.json();
  },

  async getSecurityStats() {
    const res = await fetch(`${API_BASE}/security/stats`, {
      headers: getAuthHeader()
    });
    return res.json();
  },

  // Stats
  async getStats() {
    const res = await fetch(`${API_BASE}/stats`);
    return res.json();
  },

  // Projects
  async getProjects() {
    const res = await fetch(`${API_BASE}/projects`);
    return res.json();
  },

  async getProject(id) {
    const res = await fetch(`${API_BASE}/projects/${id}`);
    return res.json();
  },

  async createProject(data) {
    const res = await fetch(`${API_BASE}/projects`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
      body: JSON.stringify(data)
    });
    return res.json();
  },

  async updateProject(id, data) {
    const res = await fetch(`${API_BASE}/projects/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
      body: JSON.stringify(data)
    });
    return res.json();
  },

  async deleteProject(id) {
    const res = await fetch(`${API_BASE}/projects/${id}`, {
      method: 'DELETE',
      headers: getAuthHeader()
    });
    return res.json();
  },

  // Custom Pages (Page Builder)
  async getPages() {
    const res = await fetch(`${API_BASE}/pages`);
    return res.json();
  },

  async getPage(slugOrId) {
    const res = await fetch(`${API_BASE}/pages/${slugOrId}`);
    return res.json();
  },

  async createPage(data) {
    const res = await fetch(`${API_BASE}/pages`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
      body: JSON.stringify(data)
    });
    return res.json();
  },

  async updatePage(id, data) {
    const res = await fetch(`${API_BASE}/pages/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
      body: JSON.stringify(data)
    });
    return res.json();
  },

  async deletePage(id) {
    const res = await fetch(`${API_BASE}/pages/${id}`, {
      method: 'DELETE',
      headers: getAuthHeader()
    });
    return res.json();
  },

  // Blogs
  async getBlogs() {
    const res = await fetch(`${API_BASE}/blogs`);
    return res.json();
  },

  async getBlog(slugOrId) {
    const res = await fetch(`${API_BASE}/blogs/${slugOrId}`);
    return res.json();
  },

  async createBlog(data) {
    const res = await fetch(`${API_BASE}/blogs`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
      body: JSON.stringify(data)
    });
    return res.json();
  },

  async updateBlog(id, data) {
    const res = await fetch(`${API_BASE}/blogs/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
      body: JSON.stringify(data)
    });
    return res.json();
  },

  async deleteBlog(id) {
    const res = await fetch(`${API_BASE}/blogs/${id}`, {
      method: 'DELETE',
      headers: getAuthHeader()
    });
    return res.json();
  },

  // Services
  async getServices() {
    const res = await fetch(`${API_BASE}/services`);
    return res.json();
  },

  async updateServices(data) {
    const res = await fetch(`${API_BASE}/services`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
      body: JSON.stringify(data)
    });
    return res.json();
  },

  // Messages
  async getMessages() {
    const res = await fetch(`${API_BASE}/messages`, {
      headers: getAuthHeader()
    });
    return res.json();
  },

  async sendMessage(data) {
    const res = await fetch(`${API_BASE}/messages`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return res.json();
  },

  async updateMessageStatus(id, status) {
    const res = await fetch(`${API_BASE}/messages/${id}/status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
      body: JSON.stringify({ status })
    });
    return res.json();
  },

  async deleteMessage(id) {
    const res = await fetch(`${API_BASE}/messages/${id}`, {
      method: 'DELETE',
      headers: getAuthHeader()
    });
    return res.json();
  },

  // Team
  async getTeam() {
    const res = await fetch(`${API_BASE}/team`);
    return res.json();
  },

  async createTeamMember(data) {
    const res = await fetch(`${API_BASE}/team`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
      body: JSON.stringify(data)
    });
    return res.json();
  },

  async updateTeamMember(id, data) {
    const res = await fetch(`${API_BASE}/team/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
      body: JSON.stringify(data)
    });
    return res.json();
  },

  async deleteTeamMember(id) {
    const res = await fetch(`${API_BASE}/team/${id}`, {
      method: 'DELETE',
      headers: getAuthHeader()
    });
    return res.json();
  },

  // Testimonials
  async getTestimonials() {
    const res = await fetch(`${API_BASE}/testimonials`);
    return res.json();
  },

  async createTestimonial(data) {
    const res = await fetch(`${API_BASE}/testimonials`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
      body: JSON.stringify(data)
    });
    return res.json();
  },

  async updateTestimonial(id, data) {
    const res = await fetch(`${API_BASE}/testimonials/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
      body: JSON.stringify(data)
    });
    return res.json();
  },

  async deleteTestimonial(id) {
    const res = await fetch(`${API_BASE}/testimonials/${id}`, {
      method: 'DELETE',
      headers: getAuthHeader()
    });
    return res.json();
  },

  // Settings
  async getSettings() {
    const res = await fetch(`${API_BASE}/settings`);
    return res.json();
  },

  async updateSettings(data) {
    const res = await fetch(`${API_BASE}/settings`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
      body: JSON.stringify(data)
    });
    return res.json();
  },

  // Custom & Global Components
  async getComponents() {
    const res = await fetch(`${API_BASE}/components`);
    return res.json();
  },

  async getComponent(id) {
    const res = await fetch(`${API_BASE}/components/${id}`);
    return res.json();
  },

  async createComponent(data) {
    const res = await fetch(`${API_BASE}/components`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
      body: JSON.stringify(data)
    });
    return res.json();
  },

  async updateComponent(id, data) {
    const res = await fetch(`${API_BASE}/components/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
      body: JSON.stringify(data)
    });
    return res.json();
  },

  async deleteComponent(id) {
    const res = await fetch(`${API_BASE}/components/${id}`, {
      method: 'DELETE',
      headers: getAuthHeader()
    });
    return res.json();
  },

  async toggleComponentGlobal(id) {
    const res = await fetch(`${API_BASE}/components/${id}/toggle-global`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', ...getAuthHeader() }
    });
    return res.json();
  },

  async insertComponentToPage(id, pageSlugOrId, position = 'bottom') {
    const res = await fetch(`${API_BASE}/components/${id}/insert-to-page`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
      body: JSON.stringify({ pageSlugOrId, position })
    });
    return res.json();
  },

  // Upload file
  async uploadFile(file) {
    const formData = new FormData();
    formData.append('file', file);
    const res = await fetch(`${API_BASE}/upload`, {
      method: 'POST',
      headers: getAuthHeader(),
      body: formData
    });
    return res.json();
  },

  // Client Projects & Milestones Tracking
  async getClientProjects() {
    const res = await fetch(`${API_BASE}/client-projects`);
    return res.json();
  },

  async getClientProjectByCode(codeOrId) {
    const res = await fetch(`${API_BASE}/client-projects/${encodeURIComponent(codeOrId)}`);
    return res.json();
  },

  async createClientProject(data) {
    const res = await fetch(`${API_BASE}/client-projects`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
      body: JSON.stringify(data)
    });
    return res.json();
  },

  async updateClientProject(id, data) {
    const res = await fetch(`${API_BASE}/client-projects/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
      body: JSON.stringify(data)
    });
    return res.json();
  },

  async deleteClientProject(id) {
    const res = await fetch(`${API_BASE}/client-projects/${id}`, {
      method: 'DELETE',
      headers: getAuthHeader()
    });
    return res.json();
  },

  async approveMilestone(projectId, milestoneId) {
    const res = await fetch(`${API_BASE}/client-projects/${projectId}/milestones/${milestoneId}/approve`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    });
    return res.json();
  },

  async addProjectNote(projectId, noteData) {
    const res = await fetch(`${API_BASE}/client-projects/${projectId}/notes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(noteData)
    });
    return res.json();
  },

  // Consultations & Estimator
  async bookConsultation(data) {
    const res = await fetch(`${API_BASE}/consultations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return res.json();
  },

  async submitEstimatorQuote(data) {
    const res = await fetch(`${API_BASE}/estimator`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return res.json();
  },

  async testTelegram(botToken, chatId) {
    const res = await fetch(`${API_BASE}/settings/test-telegram`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ botToken, chatId })
    });
    return res.json();
  }
};
