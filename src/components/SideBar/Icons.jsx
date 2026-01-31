import React from 'react';
import PropTypes from 'prop-types';

// Define default icons if needed
const iconStyles = {
  default: {
    width: '24px',
    height: '24px',
    fill: 'currentColor', // This allows color inheritance from parent
  },
};

const Icons = ({
  icon: IconComponent, // Rename to avoid confusion
  color = 'text-gray-600', // Default color
  size = 24,          // Default size in pixels
  className = '',     // Allow custom classes
  style = {},         // Allow custom styles
  ...props            // Spread remaining props
}) => {
  // Basic validation
  if (!IconComponent) {
    console.warn('No icon component provided to Icons');
    return null;
  }

  // Merge default styles with provided styles
  const mergedStyles = {
    ...iconStyles.default,
    width: `${size}px`,
    height: `${size}px`,
    fill: 'currentColor', // Use currentColor to inherit Tailwind color
    ...style,
  };

  return (
    <span className={`icon-wrapper ${color} ${className}`.trim()}>
      <IconComponent style={mergedStyles} {...props} />
    </span>
  );
};

// PropTypes for type checking
Icons.propTypes = {
  icon: PropTypes.elementType.isRequired,
  color: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string,
  style: PropTypes.object,
};

// Default props
Icons.defaultProps = {
  color: 'text-gray-600',
  size: 24,
  className: '',
  style: {},
};

export default Icons;