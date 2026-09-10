import React from 'react';
import { LucideIcon, Shield } from 'lucide-react';
import { getServiceIcon, SERVICE_ICON_MAP } from '../../lib/iconMap';

export interface SafeServiceIconProps {
  iconName?: string | null;
  category?: string | null;
  className?: string;
  size?: number | string;
  strokeWidth?: number;
  fallbackIcon?: LucideIcon;
  'aria-label'?: string;
  'aria-hidden'?: boolean | 'true' | 'false';
}

/**
 * Safe, accessible icon component that dynamically and reliably renders
 * Lucide React icons based on service names, categories, or raw icon names.
 */
export function SafeServiceIcon({
  iconName,
  category,
  className = 'h-6 w-6',
  size,
  strokeWidth = 2,
  fallbackIcon = Shield,
  'aria-label': ariaLabel,
  'aria-hidden': ariaHidden = ariaLabel ? undefined : true
}: SafeServiceIconProps) {
  const IconComponent = getServiceIcon(iconName || category, fallbackIcon);

  return (
    <IconComponent
      className={className}
      size={size}
      strokeWidth={strokeWidth}
      aria-label={ariaLabel}
      aria-hidden={ariaHidden}
      role={ariaLabel ? 'img' : undefined}
    />
  );
}

export { SERVICE_ICON_MAP, getServiceIcon };
export default SafeServiceIcon;
