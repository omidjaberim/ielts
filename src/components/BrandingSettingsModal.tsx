import React from 'react';
import { X, Building2, RotateCcw } from 'lucide-react';
import { InstituteBranding } from '../types';
import { defaultBranding } from '../data/defaultData';

interface BrandingSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  branding: InstituteBranding;
  onUpdateBranding: (branding: InstituteBranding) => void;
}

export const BrandingSettingsModal: React.FC<BrandingSettingsModalProps> = ({
  isOpen,
  onClose,
  branding,
  onUpdateBranding,
}) => {
  if (!isOpen) return null;

  const handleChange = (field: keyof InstituteBranding, value: string) => {
    onUpdateBranding({
      ...branding,
      [field]: value,
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
        <div className="bg-emerald-950 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Building2 className="w-5 h-5 text-amber-400" />
            <h2 className="text-base font-semibold">Institute & Branding Setup</h2>
          </div>
          <button
            onClick={onClose}
            className="text-slate-300 hover:text-white p-1 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          <div>
            <label className="block text-[11px] font-black uppercase text-emerald-950 tracking-wider mb-1 font-sans">
              Institute / Organization Name
            </label>
            <input
              type="text"
              value={branding.instituteName}
              onChange={(e) => handleChange('instituteName', e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-hidden font-serif"
              placeholder="e.g., Tehran Institute of Technology"
            />
          </div>

          <div>
            <label className="block text-[11px] font-black uppercase text-emerald-950 tracking-wider mb-1 font-sans">
              Department Name
            </label>
            <input
              type="text"
              value={branding.department}
              onChange={(e) => handleChange('department', e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-hidden font-serif"
              placeholder="e.g., English Department"
            />
          </div>

          <div>
            <label className="block text-[11px] font-black uppercase text-emerald-950 tracking-wider mb-1 font-sans">
              Address / Campus Location
            </label>
            <input
              type="text"
              value={branding.address}
              onChange={(e) => handleChange('address', e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-hidden font-serif"
              placeholder="e.g., No.12, Behzad boulevard, Abghari St., Kaj Sq. Tehran, Iran"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-black uppercase text-emerald-950 tracking-wider mb-1 font-sans">
                Telephone Contact
              </label>
              <input
                type="text"
                value={branding.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-hidden font-serif"
                placeholder="+98 21 2729"
              />
            </div>
            <div>
              <label className="block text-[11px] font-black uppercase text-emerald-950 tracking-wider mb-1 font-sans">
                Website Domain
              </label>
              <input
                type="text"
                value={branding.website}
                onChange={(e) => handleChange('website', e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-hidden font-serif"
                placeholder="www.mftplus.com"
              />
            </div>
          </div>
        </div>

        <div className="bg-slate-50 px-6 py-4 flex items-center justify-between border-t border-slate-200">
          <button
            onClick={() => onUpdateBranding({ ...defaultBranding })}
            className="flex items-center gap-1.5 text-xs text-emerald-900 hover:text-emerald-950 font-bold cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset to Uploaded PDF Defaults
          </button>

          <button
            onClick={onClose}
            className="px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-amber-200 font-bold text-sm rounded-lg shadow-xs transition-colors cursor-pointer"
          >
            Save Branding
          </button>
        </div>
      </div>
    </div>
  );
};
