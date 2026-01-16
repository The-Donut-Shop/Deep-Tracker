import { MuscleGroup, WorkoutProgress } from '@/types/workout';
import { Stack } from 'expo-router';
import { useState, useMemo, useEffect } from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MuscleSvg } from '@/components/muscle-svg';
import { getColorForWorkoutCount } from '@/utils/color-utils';
import { Asset } from 'expo-asset';
import * as FileSystem from 'expo-file-system/legacy';

const { width } = Dimensions.get('window');
const diagramWidth = (width - 48) / 2; // 48 = padding

export default function WorkoutsScreen() {
  const [frontSvg, setFrontSvg] = useState<string>('');
  const [backSvg, setBackSvg] = useState<string>('');
  
  const [progress, setProgress] = useState<WorkoutProgress[]>([
    { muscleGroup: 'bicep', count: 0 },
    { muscleGroup: 'triceps', count: 0 },
    { muscleGroup: 'chest', count: 0 },
    { muscleGroup: 'shoulder', count: 0 },
    { muscleGroup: 'abs', count: 0 },
    { muscleGroup: 'lats', count: 0 },
    { muscleGroup: 'forearm', count: 0 },
    { muscleGroup: 'glutes', count: 0 },
    { muscleGroup: 'hamstrings', count: 0 },
    { muscleGroup: 'calves', count: 0 },
    { muscleGroup: 'quads', count: 0 },
    { muscleGroup: 'traps', count: 0 },
  ]);

  // Load SVG files
  useEffect(() => {
    const loadSvgs = async () => {
      try {
        const assets = await Asset.loadAsync([
          require('@/assets/front.svg'),
          require('@/assets/back.svg'),
        ]);
        
        const frontAsset = Array.isArray(assets) ? assets[0] : assets;
        const backAsset = Array.isArray(assets) ? assets[1] : assets;
        
        const frontUri = frontAsset.localUri;
        const backUri = backAsset.localUri;
        
        console.log('Loading SVGs from:', { frontUri, backUri });
        
        if (frontUri && backUri) {
          const frontContent = await FileSystem.readAsStringAsync(frontUri);
          const backContent = await FileSystem.readAsStringAsync(backUri);
          
          console.log('SVG loaded, front length:', frontContent.length, 'back length:', backContent.length);
          
          setFrontSvg(frontContent);
          setBackSvg(backContent);
        }
      } catch (error) {
        console.error('Error loading SVG files:', error);
      }
    };
    
    loadSvgs();
  }, []);

  const incrementMuscleGroup = (muscleGroup: MuscleGroup) => {
    setProgress((prev) =>
      prev.map((item) =>
        item.muscleGroup === muscleGroup
          ? { ...item, count: item.count + 1, lastWorkout: new Date() }
          : item
      )
    );
  };

  const getMuscleProgress = (muscleGroup: MuscleGroup) => {
    return progress.find((p) => p.muscleGroup === muscleGroup)?.count || 0;
  };

  // Calculate colors for each muscle group based on workout count
  const muscleColors = useMemo(() => {
    const colors: Record<string, string> = {};
    progress.forEach((item) => {
      colors[item.muscleGroup] = getColorForWorkoutCount(item.count);
    });
    return colors;
  }, [progress]);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Stack.Screen options={{ headerShown: false }} />
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.title}>Workout Tracker</Text>
        </View>

        {/* Muscle Diagrams */}
        <View style={styles.diagramsContainer}>
          <View style={styles.diagramWrapper}>
            <Text style={styles.diagramTitle}>Front</Text>
            {frontSvg ? (
              <View style={styles.svgContainer}>
                <MuscleSvg 
                  svgString={frontSvg} 
                  muscleColors={muscleColors}
                  onMusclePress={incrementMuscleGroup}
                />
              </View>
            ) : (
              <View style={styles.svgPlaceholder}>
                <Text style={styles.placeholderText}>Loading...</Text>
              </View>
            )}
          </View>
          
          <View style={styles.diagramWrapper}>
            <Text style={styles.diagramTitle}>Back</Text>
            {backSvg ? (
              <View style={styles.svgContainer}>
                <MuscleSvg 
                  svgString={backSvg} 
                  muscleColors={muscleColors}
                  onMusclePress={incrementMuscleGroup}
                />
              </View>
            ) : (
              <View style={styles.svgPlaceholder}>
                <Text style={styles.placeholderText}>Loading...</Text>
              </View>
            )}
          </View>
        </View>

        {/* Metrics Section */}
        <View style={styles.metricsContainer}>
          <Text style={styles.sectionTitle}>Progress by Muscle Group</Text>
          
          {progress.map((item) => (
            <View key={item.muscleGroup} style={styles.metricRow}>
              <View style={styles.metricInfo}>
                <Text style={styles.metricLabel}>
                  {item.muscleGroup.charAt(0).toUpperCase() + item.muscleGroup.slice(1)}
                </Text>
                <Text style={styles.metricCount}>{item.count} workouts</Text>
              </View>
              <TouchableOpacity
                style={styles.incrementButton}
                onPress={() => incrementMuscleGroup(item.muscleGroup)}>
                <Text style={styles.incrementButtonText}>+</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingBottom: 10,
  },
  title: {
    fontSize: 28,
    fontFamily: 'NotoSans_700Bold',
    color: '#212121',
  },
  diagramsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  diagramWrapper: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 8,
  },
  diagramTitle: {
    fontSize: 16,
    fContainer: {
    width: diagramWidth,
    height: diagramWidth * 1.9,
    backgroundColor: '#fafafa',
    borderRadius: 12,
    overflow: 'hidden',
  },
  svgontFamily: 'NotoSans_600SemiBold',
    marginBottom: 8,
    color: '#424242',
  },
  svgPlaceholder: {
    width: diagramWidth,
    height: diagramWidth * 1.5,
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  placeholderText: {
    fontSize: 18,
    fontFamily: 'NotoSans_600SemiBold',
    color: '#757575',
  },
  placeholderSubtext: {
    fontSize: 14,
    fontFamily: 'NotoSans_400Regular',
    color: '#9e9e9e',
    marginTop: 4,
  },
  metricsContainer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'NotoSans_700Bold',
    marginBottom: 16,
    color: '#212121',
  },
  metricRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    marginBottom: 12,
  },
  metricInfo: {
    flex: 1,
  },
  metricLabel: {
    fontSize: 16,
    fontFamily: 'NotoSans_600SemiBold',
    color: '#212121',
  },
  metricCount: {
    fontSize: 14,
    fontFamily: 'NotoSans_400Regular',
    color: '#757575',
    marginTop: 4,
  },
  incrementButton: {
    width: 48,
    height: 48,
    backgroundColor: '#4285F4',
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  incrementButtonText: {
    fontSize: 24,
    fontFamily: 'NotoSans_600SemiBold',
    color: '#fff',
  },
});
