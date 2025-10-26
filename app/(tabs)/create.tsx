import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { theme } from '../../styles/theme';
import { Button, Card, Input } from '../../components/ui';

const STEPS = ['Type', 'Details', 'Content', 'Preview'];

export default function CreateScreen() {
  const [currentStep, setCurrentStep] = useState(0);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Create PDF</Text>
          <Text style={styles.subtitle}>Bring your ideas to life</Text>
        </View>

        {/* Progress Steps */}
        <View style={styles.stepsContainer}>
          {STEPS.map((step, index) => (
            <View key={index} style={styles.stepItem}>
              <View
                style={[
                  styles.stepCircle,
                  index <= currentStep && styles.stepCircleActive,
                ]}
              >
                {index < currentStep ? (
                  <Ionicons name="checkmark" size={16} color={theme.colors.white} />
                ) : (
                  <Text
                    style={[
                      styles.stepNumber,
                      index <= currentStep && styles.stepNumberActive,
                    ]}
                  >
                    {index + 1}
                  </Text>
                )}
              </View>
              <Text
                style={[
                  styles.stepLabel,
                  index <= currentStep && styles.stepLabelActive,
                ]}
              >
                {step}
              </Text>
              {index < STEPS.length - 1 && (
                <View
                  style={[
                    styles.stepLine,
                    index < currentStep && styles.stepLineActive,
                  ]}
                />
              )}
            </View>
          ))}
        </View>

        {/* Content */}
        <View style={styles.content}>
          {currentStep === 0 && (
            <View>
              <Text style={styles.stepTitle}>Choose PDF Type</Text>
              <View style={styles.typeOptions}>
                <Pressable style={styles.typeCard}>
                  <LinearGradient
                    colors={['#5C67F2', '#7C3AED']}
                    style={styles.typeGradient}
                  >
                    <Ionicons name="sparkles" size={40} color={theme.colors.white} />
                  </LinearGradient>
                  <Text style={styles.typeTitle}>AI Generated</Text>
                  <Text style={styles.typeDescription}>
                    Let AI create your PDF with smart content
                  </Text>
                </Pressable>

                <Pressable style={styles.typeCard}>
                  <LinearGradient
                    colors={['#F28D35', '#F59E0B']}
                    style={styles.typeGradient}
                  >
                    <Ionicons name="cloud-upload" size={40} color={theme.colors.white} />
                  </LinearGradient>
                  <Text style={styles.typeTitle}>Upload PDF</Text>
                  <Text style={styles.typeDescription}>
                    Upload an existing PDF file
                  </Text>
                </Pressable>
              </View>
            </View>
          )}

          {currentStep === 1 && (
            <View>
              <Text style={styles.stepTitle}>Add Details</Text>
              <Card style={styles.formCard}>
                <Input label="Title" placeholder="Enter PDF title" />
                <Input
                  label="Description"
                  placeholder="Describe your PDF..."
                  multiline
                  numberOfLines={4}
                  style={styles.textArea}
                />
                <Input label="Category" placeholder="Select category" />
                <Input label="Price (Credits)" placeholder="0" keyboardType="numeric" />
              </Card>
            </View>
          )}
        </View>

        {/* Navigation Buttons */}
        <View style={styles.navigation}>
          {currentStep > 0 && (
            <Button
              title="Back"
              variant="outline"
              onPress={() => setCurrentStep(currentStep - 1)}
              style={styles.navButton}
            />
          )}
          <Button
            title={currentStep === STEPS.length - 1 ? 'Publish' : 'Next'}
            onPress={() =>
              currentStep < STEPS.length - 1
                ? setCurrentStep(currentStep + 1)
                : null
            }
            style={[styles.navButton, currentStep === 0 && styles.navButtonFull]}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    padding: theme.spacing.lg,
  },
  title: {
    fontSize: theme.fontSize.xxl,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text,
  },
  subtitle: {
    fontSize: theme.fontSize.md,
    color: theme.colors.gray[600],
    marginTop: theme.spacing.xs,
  },
  stepsContainer: {
    flexDirection: 'row',
    paddingHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.xl,
  },
  stepItem: {
    flex: 1,
    alignItems: 'center',
    position: 'relative',
  },
  stepCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: theme.colors.gray[200],
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.xs,
  },
  stepCircleActive: {
    backgroundColor: theme.colors.primary,
  },
  stepNumber: {
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.gray[600],
  },
  stepNumberActive: {
    color: theme.colors.white,
  },
  stepLabel: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.gray[600],
  },
  stepLabelActive: {
    color: theme.colors.primary,
    fontWeight: theme.fontWeight.semibold,
  },
  stepLine: {
    position: 'absolute',
    top: 16,
    left: '50%',
    right: '-50%',
    height: 2,
    backgroundColor: theme.colors.gray[200],
    zIndex: -1,
  },
  stepLineActive: {
    backgroundColor: theme.colors.primary,
  },
  content: {
    padding: theme.spacing.lg,
  },
  stepTitle: {
    fontSize: theme.fontSize.xl,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text,
    marginBottom: theme.spacing.lg,
  },
  typeOptions: {
    gap: theme.spacing.md,
  },
  typeCard: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    ...theme.shadows.md,
  },
  typeGradient: {
    width: 80,
    height: 80,
    borderRadius: theme.borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  typeTitle: {
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  typeDescription: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.gray[600],
  },
  formCard: {
    padding: theme.spacing.lg,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  navigation: {
    flexDirection: 'row',
    gap: theme.spacing.md,
    padding: theme.spacing.lg,
  },
  navButton: {
    flex: 1,
  },
  navButtonFull: {
    flex: 1,
  },
});

