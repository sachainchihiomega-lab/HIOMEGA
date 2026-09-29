import React, { useState } from 'react';
import { CurrentUserSession, saveCurrentUser } from '../../utils/storage';
import { Member } from '../../types';
import { X, Lock, User, KeyRound, ShieldCheck, CheckCircle } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  members: Member[];
  onLoginSuccess: (user: CurrentUserSession) => void;
  onSwitchToRegister: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  members,
  onLoginSuccess,
  onSwitchToRegister
}) => {
  if (!isOpen) return null;

  const [loginRole, setLoginRole] = useState<'superadmin' | 'admin' | 'member'>('superadmin');
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');

  const handleQuickFill = (role: 'superadmin' | 'admin') => {
    if (role === 'superadmin') {
      setUsername('SUPERADMIN');
      setPassword('BISMILLAHSUKSES100M');
      setLoginRole('superadmin');
    } else {
      setUsername('ADMIN1');
      setPassword('AKUADMINHEBAT1');
      setLoginRole('admin');
    }
    setErrorMsg('');
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    const cleanUser = username.trim().toUpperCase();
    const cleanPass = password.trim();

    if (loginRole === 'superadmin') {
      if (cleanUser === 'SUPERADMIN' && cleanPass === 'BISMILLAHSUKSES100M') {
        const session: CurrentUserSession = {
          role: 'SUPERADMIN',
          username: 'SUPERADMIN',
          fullName: 'Owner & SuperAdmin'
        };
        saveCurrentUser(session);
        onLoginSuccess(session);
        onClose();
        return;
      } else {
        setErrorMsg('Username atau Password Superadmin salah. (Gunakan: SUPERADMIN / BISMILLAHSUKSES100M)');
        return;
      }
    }

    if (loginRole === 'admin') {
      if (cleanUser === 'ADMIN1' && cleanPass === 'AKUADMINHEBAT1') {
        const session: CurrentUserSession = {
          role: 'ADMIN',
          username: 'ADMIN1',
          fullName: 'Admin Operasional 1'
        };
        saveCurrentUser(session);
        onLoginSuccess(session);
        onClose();
        return;
      } else {
        setErrorMsg('Username atau Password Admin salah. (Gunakan: ADMIN1 / AKUADMINHEBAT1)');
        return;
      }
    }

    if (loginRole === 'member') {
      const match = members.find(
        (m) => m.username.toLowerCase() === username.trim().toLowerCase() || m.whatsapp === username.trim()
      );
      if (match) {
        if (match.status === 'suspended') {
          setErrorMsg('Akun member ini sedang ditangguhkan. Silakan hubungi admin pusat.');
          return;
        }
        const session: CurrentUserSession = {
          role: 'MEMBER',
          username: match.username,
          fullName: match.fullName,
          memberId: match.id,
          memberSlug: match.customSlug,
          whatsapp: match.whatsapp
        };
        saveCurrentUser(session);
        onLoginSuccess(session);
        onClose();
        return;
      } else {
        setErrorMsg('Username member atau nomor WhatsApp tidak ditemukan dalam database.');
        return;
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border-4 border-emerald-600 overflow-hidden my-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 px-6 py-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Lock className="w-5 h-5 text-emerald-400" />
            <h3 className="text-xl font-black">Portal Masuk HI-OMEGA</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-white/80 hover:text-white hover:bg-white/20 rounded-full transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Role Selector Tabs */}
        <div className="flex border-b border-slate-200 bg-slate-50 text-xs font-black">
          <button
            type="button"
            onClick={() => { setLoginRole('superadmin'); setErrorMsg(''); }}
            className={`flex-1 py-3 text-center transition ${
              loginRole === 'superadmin' ? 'bg-white text-emerald-800 border-b-2 border-emerald-600 shadow-xs' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Owner / SuperAdmin
          </button>
          <button
            type="button"
            onClick={() => { setLoginRole('admin'); setErrorMsg(''); }}
            className={`flex-1 py-3 text-center transition ${
              loginRole === 'admin' ? 'bg-white text-teal-800 border-b-2 border-teal-600 shadow-xs' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Admin 1
          </button>
          <button
            type="button"
            onClick={() => { setLoginRole('member'); setErrorMsg(''); }}
            className={`flex-1 py-3 text-center transition ${
              loginRole === 'member' ? 'bg-white text-emerald-800 border-b-2 border-emerald-600 shadow-xs' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Member Affiliate
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleLogin} className="p-6 space-y-4">
          {errorMsg && (
            <div className="p-3 bg-rose-50 border border-rose-300 text-rose-800 rounded-xl text-xs font-bold leading-normal">
              ⚠️ {errorMsg}
            </div>
          )}

          {/* Quick-fill button helper */}
          {loginRole === 'superadmin' && (
            <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs flex items-center justify-between">
              <div>
                <span className="font-extrabold text-emerald-900 block">Kredensial Superadmin:</span>
                <span className="text-slate-600 font-mono">SUPERADMIN / BISMILLAHSUKSES100M</span>
              </div>
              <button
                type="button"
                onClick={() => handleQuickFill('superadmin')}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold px-3 py-1.5 rounded-xl text-[11px] shadow-xs"
              >
                Isi Otomatis
              </button>
            </div>
          )}

          {loginRole === 'admin' && (
            <div className="p-3 bg-teal-50 rounded-2xl border border-teal-200 text-xs flex items-center justify-between">
              <div>
                <span className="font-extrabold text-teal-900 block">Kredensial Admin1:</span>
                <span className="text-slate-600 font-mono">ADMIN1 / AKUADMINHEBAT1</span>
              </div>
              <button
                type="button"
                onClick={() => handleQuickFill('admin')}
                className="bg-teal-600 hover:bg-teal-700 text-white font-extrabold px-3 py-1.5 rounded-xl text-[11px] shadow-xs"
              >
                Isi Otomatis
              </button>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              {loginRole === 'member' ? 'Username / Nomor WhatsApp Member:' : 'Username Akses:'}
            </label>
            <div className="relative">
              <User className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                placeholder={loginRole === 'member' ? 'Contoh: ahmadherbal atau 081234567890' : 'Masukkan username'}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-slate-50 border-2 border-slate-300 focus:border-emerald-600 rounded-xl pl-10 pr-4 py-2.5 text-sm font-semibold text-slate-900 focus:outline-none"
              />
            </div>
          </div>

          {loginRole !== 'member' && (
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Password:
              </label>
              <div className="relative">
                <KeyRound className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  placeholder="Masukkan password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-50 border-2 border-slate-300 focus:border-emerald-600 rounded-xl pl-10 pr-4 py-2.5 text-sm font-semibold text-slate-900 focus:outline-none"
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-black py-3.5 px-4 rounded-xl text-base shadow-lg transition"
          >
            Masuk ke Panel {loginRole.toUpperCase()}
          </button>

          {loginRole === 'member' && (
            <div className="text-center pt-2 border-t border-slate-200">
              <p className="text-xs text-slate-500">
                Belum terdaftar sebagai member resmi?
              </p>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onSwitchToRegister();
                }}
                className="mt-1 text-xs font-bold text-emerald-700 hover:text-emerald-800 underline"
              >
                Daftar Kemitraan Member (Min. 5 Pcs) →
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};
