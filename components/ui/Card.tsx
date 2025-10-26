import React from 'react';
import { View, StyleSheet, ViewProps } from 'react-native';
import { theme } from '../../styles/theme';

interface CardProps extends ViewProps {
  elevated?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  elevated = true,
  style,
  ...props
}) => {
  return (
    <View
      style={[
        styles.card,
        elevated && theme.shadows.md,
        style,
      ]}
      {...props}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
  },
});

