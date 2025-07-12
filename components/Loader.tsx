import React from 'react';

interface LoaderProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  text?: string;
}

const Loader: React.FC<LoaderProps> = ({
  size = 'md',
  className = '',
  text = 'Loading...',
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-16 h-16',
    lg: 'w-24 h-24',
  };

  return (
    <div
      className={`flex items-center justify-center min-h-screen bg-background ${className}`}
    >
      <div className='flex flex-col items-center space-y-4'>
        <div
          className={`${sizeClasses[size]} border-4 border-blue-500 rounded-full border-t-transparent animate-spin`}
          role='status'
          aria-label='Loading'
        />
        {text && (
          <p className='text-sm text-muted-foreground animate-pulse'>{text}</p>
        )}
      </div>
    </div>
  );
};

export default Loader;
