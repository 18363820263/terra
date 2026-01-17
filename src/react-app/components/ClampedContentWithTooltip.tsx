import React from 'react';

interface ClampedContentWithTooltipProps {
  content: string;
  className?: string;
  rows?: number;
}

export const ClampedContentWithTooltip: React.FC<ClampedContentWithTooltipProps> = ({
  content,
  className = ''
}) => {

  return (
    <p
      className={`${className}`}
      title={content}
    >
      {content}
    </p>
  );
};
