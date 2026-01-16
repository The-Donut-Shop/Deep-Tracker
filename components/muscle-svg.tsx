import React from 'react';
import { View, Pressable } from 'react-native';
import { SvgXml } from 'react-native-svg';

import { MuscleGroup } from '@/types/workout';

interface MuscleSvgProps {
  svgString: string;
  muscleColors: Record<string, string>;
  onMusclePress?: (muscleGroup: MuscleGroup) => void;
}

export function MuscleSvg({ svgString, muscleColors, onMusclePress }: MuscleSvgProps) {
  if (!svgString) {
    return null;
  }

  // Replace fill colors in each muscle group based on progress
  let coloredSvg = svgString;
  
  Object.entries(muscleColors).forEach(([muscleId, color]) => {
    // Find the <g id="muscleId"> tag and replace all fill="#BDBDBD" within it
    const groupRegex = new RegExp(
      `(<g id="${muscleId}">)(.*?)(<\\/g>)`,
      'gs'
    );
    
    coloredSvg = coloredSvg.replace(groupRegex, (match, opening, content, closing) => {
      // Replace all fill colors within this group
      const updatedContent = content.replace(/fill="#[A-Fa-f0-9]{6}"/g, `fill="${color}"`);
      return opening + updatedContent + closing;
    });
  });

  return (
    <View style={{ width: '100%', aspectRatio: 0.5 }}>
      <SvgXml xml={coloredSvg} width="100%" height="100%" />
    </View>
  );
}
