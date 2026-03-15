/**
 * Web stub for react-native-svg using inline SVG elements.
 */

import React from 'react';

interface SvgProps {
  width?: number;
  height?: number;
  viewBox?: string;
  fill?: string;
  children?: React.ReactNode;
}

const Svg: React.FC<SvgProps> = ({ width, height, viewBox, children }) => (
  <svg width={width} height={height} viewBox={viewBox} xmlns="http://www.w3.org/2000/svg">
    {children}
  </svg>
);

export default Svg;

interface PathProps {
  d: string;
  fill?: string;
}

export const Path: React.FC<PathProps> = ({ d, fill }) => (
  <path d={d} fill={fill} />
);
