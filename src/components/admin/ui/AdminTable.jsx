import React, { useState } from 'react';
import { Search, Edit2, Trash2, Eye, Filter } from 'lucide-react';
import Card from '../../ui/Card';
import { useLanguage } from '../../../context/LanguageContext';

export default function AdminTable({
  columns = [],
  data = [],
  onEdit,
  onDelete,
  onView,
  searchPlaceholder,
  searchKey = 'title',
  actions = true,
  emptyMessage
}) {
  const { language, isRTL } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');

  const defaultSearchPlaceholder = searchPlaceholder || (language === 'en' ? 'Search records...' : 'بحث في السجلات...');
  const defaultEmptyMessage = emptyMessage || (language === 'en' ? 'No records recorded currently.' : 'لا توجد بيانات مسجلة حالياً.');

  const filteredData = data.filter((item) => {
    if (!searchTerm) return true;
    const val = item[searchKey];
    if (typeof val === 'string') {
      return val.toLowerCase().includes(searchTerm.toLowerCase());
    }
    return JSON.stringify(item).toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <Card className="p-0 overflow-hidden border-white/[0.08] shadow-lg">
      
      {/* Search Header Bar */}
      <div className="p-4 bg-dark-900 border-b border-white/[0.08] flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className={`absolute ${isRTL ? 'right-3.5' : 'left-3.5'} top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400`} />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={defaultSearchPlaceholder}
            className={`w-full bg-dark-950 border border-white/10 rounded-xl ${isRTL ? 'pr-10 pl-4 text-right' : 'pl-10 pr-4 text-left'} py-2 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-green`}
          />
        </div>

        <div className="text-xs text-slate-400 font-semibold font-montserrat">
          {filteredData.length} {language === 'en' ? 'records' : 'سجل'}
        </div>
      </div>

      {/* Table Body */}
      <div className="overflow-x-auto">
        <table className={`w-full ${isRTL ? 'text-right' : 'text-left'} text-sm`}>
          <thead className="bg-dark-950/60 border-b border-white/[0.08] text-slate-400 text-xs">
            <tr>
              {columns.map((col, idx) => (
                <th key={idx} className={`py-3.5 px-6 font-bold ${col.align === 'center' ? 'text-center' : ''}`}>
                  {col.header}
                </th>
              ))}
              {actions && (
                <th className="py-3.5 px-6 text-center font-bold">
                  {language === 'en' ? 'Actions' : 'الإجراءات'}
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.04]">
            {filteredData.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + (actions ? 1 : 0)}
                  className="py-12 text-center text-slate-400 text-sm"
                >
                  {defaultEmptyMessage}
                </td>
              </tr>
            ) : (
              filteredData.map((row, rowIdx) => (
                <tr key={row.id || rowIdx} className="hover:bg-white/[0.02] transition-colors">
                  {columns.map((col, colIdx) => (
                    <td key={colIdx} className={`py-4 px-6 ${col.align === 'center' ? 'text-center' : ''}`}>
                      {col.render ? col.render(row[col.accessor], row) : row[col.accessor]}
                    </td>
                  ))}
                  
                  {actions && (
                    <td className="py-4 px-6 text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        {onView && (
                          <button
                            type="button"
                            onClick={() => onView(row)}
                            className="p-2 rounded-lg bg-white/5 hover:bg-blue-500/20 hover:text-blue-400 text-slate-400 transition-colors"
                            title={language === 'en' ? 'Preview' : 'معاينة'}
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                        )}
                        {onEdit && (
                          <button
                            type="button"
                            onClick={() => onEdit(row)}
                            className="p-2 rounded-lg bg-white/5 hover:bg-brand-green/20 hover:text-brand-green text-slate-400 transition-colors"
                            title={language === 'en' ? 'Edit' : 'تعديل'}
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                        )}
                        {onDelete && (
                          <button
                            type="button"
                            onClick={() => onDelete(row)}
                            className="p-2 rounded-lg bg-white/5 hover:bg-rose-500/20 hover:text-rose-400 text-slate-400 transition-colors"
                            title={language === 'en' ? 'Delete' : 'حذف'}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

    </Card>
  );
}
