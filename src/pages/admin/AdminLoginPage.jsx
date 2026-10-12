import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Lock, Mail, ArrowLeft, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import AdminInput from '../../components/admin/ui/AdminInput';
import SeoHead from '../../components/ui/SeoHead';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('admin@crew5.agency');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await login(email, password);
      if (res.success) {
        navigate('/admin/dashboard');
      } else {
        setError(res.message || 'بيانات الدخول غير صحيحة');
      }
    } catch (err) {
      setError('حدث خطأ أثناء الاتصال بالخادم');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark-950 flex items-center justify-center p-4 relative overflow-hidden">
      <SeoHead
        title="تسجيل الدخول للوحة التحكم | Crew5 Admin Login"
        noindex={true}
      />
      
      {/* Background glow effects */}
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-brand-green/10 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="w-full max-w-md relative z-10">
        
        {/* Header Branding */}
        <div className="text-center mb-8 space-y-3">
          <div className="w-16 h-16 rounded-2xl bg-brand-green flex items-center justify-center p-1 mx-auto shadow-neon">
            <div className="w-full h-full bg-dark-950 rounded-[12px] flex items-center justify-center">
              <span className="font-montserrat font-extrabold text-3xl text-brand-green">5</span>
            </div>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-white">
            لوحة تحكم <span className="text-brand-green">Crew5</span>
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm">
            أدخل بيانات حساب المشرف لإدارة وتحديث محتوى الموقع
          </p>
        </div>

        {/* Login Form Card */}
        <Card className="p-8 border-brand-green/30 bg-dark-900/90 shadow-2xl">
          {error && (
            <div className="mb-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center gap-3 text-rose-400 text-xs sm:text-sm">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-right">
            <AdminInput
              label="البريد الإلكتروني"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@crew5.agency"
              icon={Mail}
              dir="ltr"
            />

            <AdminInput
              label="كلمة المرور"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              icon={Lock}
              dir="ltr"
            />

            <Button
              type="submit"
              variant="glow"
              size="lg"
              disabled={loading}
              className="w-full mt-4"
              icon={ArrowLeft}
            >
              {loading ? 'جارٍ تسجيل الدخول...' : 'دخول لوحة التحكم'}
            </Button>
          </form>

          {/* Quick Helper */}
          <div className="mt-6 pt-4 border-t border-white/[0.08] text-center text-xs text-slate-400">
            <span>البيانات الافتراضية: </span>
            <code className="text-brand-green bg-brand-green/10 px-2 py-0.5 rounded font-mono">admin123</code>
          </div>
        </Card>

      </div>
    </div>
  );
}
