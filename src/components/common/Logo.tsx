import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  customLogoUrl?: string;
}

export const Logo: React.FC<LogoProps> = ({ className = '', size = 'md', customLogoUrl }) => {
  if (customLogoUrl && customLogoUrl.trim()) {
    return (
      <img
        src={customLogoUrl}
        alt="HIOMEGA Logo"
        className={`object-contain ${
          size === 'sm' ? 'h-8' : size === 'md' ? 'h-11' : size === 'lg' ? 'h-16' : 'h-24'
        } ${className}`}
      />
    );
  }

  // Exact vector rendering matching user's uploaded "LOGO 2.jpeg":
  // Bold, italicized teal letters "HIOMEGA" with dynamic underline taper
  const scale = size === 'sm' ? 0.7 : size === 'md' ? 1 : size === 'lg' ? 1.4 : 2;

  return (
    <div className={`inline-flex flex-col items-start select-none ${className}`}>
      <div 
        style={{ transform: `scale(${scale})`, transformOrigin: 'left center' }}
        className="relative flex flex-col font-black italic tracking-tighter"
      >
        <span className="text-3xl font-extrabold text-teal-700 tracking-tight leading-none drop-shadow-sm font-sans">
          HIOMEGA
        </span>
        {/* Dynamic signature swoosh line under HIOMEGA */}
        <div 
          className="h-[3.5px] bg-teal-700 w-full mt-[2px] rounded-full transform -skew-x-12 origin-left"
          style={{
            clipPath: 'polygon(0% 0%, 100% 40%, 100% 70%, 0% 100%)'
          }}
        />
      </div>
    </div>
  );
};
