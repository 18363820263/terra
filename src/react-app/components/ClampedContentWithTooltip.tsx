import React from 'react';

interface ClampedContentWithTooltipProps {
  content: string;
  className?: string;
  /**
   * Maximum number of visible text rows before clamping.
   * If not provided, content will not be clamped.
   */
  rows?: number;
}

export const ClampedContentWithTooltip: React.FC<ClampedContentWithTooltipProps> = ({
  content,
  className = '',
  rows,
}) => {
  const clampClass = rows ? `clamp-${rows}` : '';

  return (
    <p
      className={`${className} ${clampClass}`.trim()}
      title={content}
    >
      {content}
    </p>
  );
};
