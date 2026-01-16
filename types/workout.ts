export type MuscleGroup = 
  | 'forearm' 
  | 'bicep' 
  | 'abs' 
  | 'shoulder' 
  | 'chest'
  | 'calves'
  | 'hamstrings'
  | 'glutes'
  | 'triceps'
  | 'lats'
  | 'quads'
  | 'traps';

export interface Exercise {
  id: string;
  name: string;
  muscleGroup: MuscleGroup;
}

export interface WorkoutProgress {
  muscleGroup: MuscleGroup;
  count: number;
  lastWorkout?: Date;
}

export const exercises: Exercise[] = [
  // Bicep exercises
  { id: 'hammer-curls', name: 'Hammer Curls', muscleGroup: 'bicep' },
  { id: 'bicep-curls', name: 'Bicep Curls', muscleGroup: 'bicep' },
  { id: 'preacher-curls', name: 'Preacher Curls', muscleGroup: 'bicep' },
  
  // Tricep exercises
  { id: 'tricep-dips', name: 'Tricep Dips', muscleGroup: 'triceps' },
  { id: 'overhead-extension', name: 'Overhead Extension', muscleGroup: 'triceps' },
  { id: 'tricep-pushdown', name: 'Tricep Pushdown', muscleGroup: 'triceps' },
  
  // Chest exercises
  { id: 'bench-press', name: 'Bench Press', muscleGroup: 'chest' },
  { id: 'push-ups', name: 'Push Ups', muscleGroup: 'chest' },
  { id: 'chest-fly', name: 'Chest Fly', muscleGroup: 'chest' },
  
  // Shoulder exercises
  { id: 'shoulder-press', name: 'Shoulder Press', muscleGroup: 'shoulder' },
  { id: 'lateral-raise', name: 'Lateral Raise', muscleGroup: 'shoulder' },
  { id: 'front-raise', name: 'Front Raise', muscleGroup: 'shoulder' },
  
  // Back exercises
  { id: 'pull-ups', name: 'Pull Ups', muscleGroup: 'lats' },
  { id: 'lat-pulldown', name: 'Lat Pulldown', muscleGroup: 'lats' },
  { id: 'rows', name: 'Rows', muscleGroup: 'lats' },
  
  // Abs exercises
  { id: 'crunches', name: 'Crunches', muscleGroup: 'abs' },
  { id: 'planks', name: 'Planks', muscleGroup: 'abs' },
  { id: 'leg-raises', name: 'Leg Raises', muscleGroup: 'abs' },
  
  // Leg exercises
  { id: 'squats', name: 'Squats', muscleGroup: 'quads' },
  { id: 'lunges', name: 'Lunges', muscleGroup: 'quads' },
  { id: 'leg-press', name: 'Leg Press', muscleGroup: 'quads' },
  { id: 'leg-extension', name: 'Leg Extension', muscleGroup: 'quads' },
  { id: 'deadlifts', name: 'Deadlifts', muscleGroup: 'hamstrings' },
  { id: 'leg-curls', name: 'Leg Curls', muscleGroup: 'hamstrings' },
  { id: 'hip-thrust', name: 'Hip Thrust', muscleGroup: 'glutes' },
  { id: 'glute-bridge', name: 'Glute Bridge', muscleGroup: 'glutes' },
  { id: 'calf-raises', name: 'Calf Raises', muscleGroup: 'calves' },
  
  // Forearm exercises
  { id: 'wrist-curls', name: 'Wrist Curls', muscleGroup: 'forearm' },
  { id: 'reverse-curls', name: 'Reverse Curls', muscleGroup: 'forearm' },
  
  // Trap exercises
  { id: 'shrugs', name: 'Shrugs', muscleGroup: 'traps' },
  { id: 'upright-row', name: 'Upright Row', muscleGroup: 'traps' },
  { id: 'farmer-carry', name: 'Farmer Carry', muscleGroup: 'traps' },
];
