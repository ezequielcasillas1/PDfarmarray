import { Redirect } from 'expo-router';

// Redirect to onboarding screen
// Later, we can add logic to check if user is authenticated
// and redirect to tabs or onboarding accordingly
export default function Index() {
  return <Redirect href="/auth/onboarding" />;
}

