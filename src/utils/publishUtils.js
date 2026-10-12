/**
 * Utilities for Handling Publication, Archival, and Scheduling across the platform.
 */

export function getPublishStatus(item) {
  if (!item) return 'published';
  
  if (item.status === 'archived' || item.status === 'draft') return 'archived';
  if (item.status === 'scheduled') return 'scheduled';
  if (item.status === 'published') return 'published';

  // Legacy fallback
  if (item.isPublished !== undefined) {
    return item.isPublished ? 'published' : 'archived';
  }
  if (item.isEnabled !== undefined) {
    return item.isEnabled ? 'published' : 'archived';
  }

  return 'published';
}

export function isItemPubliclyVisible(item) {
  if (!item) return false;

  const status = getPublishStatus(item);

  if (status === 'archived') {
    return false;
  }

  if (status === 'scheduled') {
    if (!item.scheduledAt) return false;
    const scheduleDate = new Date(item.scheduledAt);
    const scheduleTime = scheduleDate.getTime();
    if (isNaN(scheduleTime)) return false;
    // Visible only if scheduled time has passed
    return scheduleTime <= Date.now();
  }

  return true; // published
}

export function formatScheduleDate(scheduledAt) {
  if (!scheduledAt) return 'تاريخ غير محدد';
  try {
    const d = new Date(scheduledAt);
    if (isNaN(d.getTime())) return scheduledAt;
    return d.toLocaleString('ar-SA', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  } catch {
    return scheduledAt;
  }
}
