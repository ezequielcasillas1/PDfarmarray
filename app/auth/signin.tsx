import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { theme } from '../../styles/theme';
import { Button } from '../../components/ui';

export default function SignInScreen() {
  const router = useRouter();

  const handleGoogleSignIn = () => {
    // TODO: Implement Google OAuth later
    console.log('Google Sign In clicked');
    // For now, redirect to main app
    router.push('/(tabs)');
  };

  const handleGuestContinue = () => {
    router.push('/(tabs)');
  };

  return (
    <LinearGradient
      colors={[theme.colors.primary, '#7C3AED']}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.content}>
          {/* Logo/Icon */}
          <View style={styles.logoContainer}>
            <View style={styles.logoCircle}>
              <Text style={styles.logoText}>🌱</Text>
            </View>
            <Text style={styles.appName}>PDF Farm</Text>
            <Text style={styles.tagline}>
              Where Ideas Become Shared PDFs
            </Text>
          </View>

          {/* Sign In Section */}
          <View style={styles.signInSection}>
            <Text style={styles.welcomeText}>Welcome!</Text>
            <Text style={styles.subtitle}>
              Sign in to create, sell, and discover amazing PDFs
            </Text>

            {/* Google Sign In Button */}
            <Button
              title="Continue with Google"
              variant="primary"
              size="lg"
              onPress={handleGoogleSignIn}
              style={styles.googleButton}
            />

            {/* Divider */}
            <View style={styles.divider}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>OR</Text>
              <View style={styles.dividerLine} />
            </View>

            {/* Guest Continue */}
            <Button
              title="Continue as Guest"
              variant="outline"
              size="lg"
              onPress={handleGuestContinue}
              style={styles.guestButton}
            />

            {/* Terms */}
            <Text style={styles.terms}>
              By continuing, you agree to our{' '}
              <Text style={styles.termsLink}>Terms of Service</Text> and{' '}
              <Text style={styles.termsLink}>Privacy Policy</Text>
            </Text>
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: theme.spacing.xl,
    paddingTop: theme.spacing.xxxl,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: theme.spacing.xxxl,
  },
  logoCircle: {
    width: 120,
    height: 120,
    backgroundColor: theme.colors.white,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
    ...theme.shadows.lg,
  },
  logoText: {
    fontSize: 60,
  },
  appName: {
    fontSize: theme.fontSize.xxxl,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.white,
    marginBottom: theme.spacing.xs,
  },
  tagline: {
    fontSize: theme.fontSize.md,
    color: theme.colors.white,
    opacity: 0.9,
    textAlign: 'center',
  },
  signInSection: {
    flex: 1,
    backgroundColor: theme.colors.white,
    borderTopLeftRadius: theme.borderRadius.lg * 2,
    borderTopRightRadius: theme.borderRadius.lg * 2,
    padding: theme.spacing.xl,
    ...theme.shadows.lg,
  },
  welcomeText: {
    fontSize: theme.fontSize.xxl,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  subtitle: {
    fontSize: theme.fontSize.md,
    color: theme.colors.gray[600],
    marginBottom: theme.spacing.xl,
  },
  googleButton: {
    marginBottom: theme.spacing.lg,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: theme.spacing.lg,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: theme.colors.gray[300],
  },
  dividerText: {
    marginHorizontal: theme.spacing.md,
    fontSize: theme.fontSize.sm,
    color: theme.colors.gray[500],
    fontWeight: theme.fontWeight.medium,
  },
  guestButton: {
    marginBottom: theme.spacing.lg,
  },
  terms: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.gray[600],
    textAlign: 'center',
    lineHeight: 18,
  },
  termsLink: {
    color: theme.colors.primary,
    fontWeight: theme.fontWeight.semibold,
  },
});

