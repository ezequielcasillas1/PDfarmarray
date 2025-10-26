import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../../styles/theme';
import { Card } from '../ui';

interface PDFCardProps {
  title: string;
  author: string;
  price: number;
  rating: number;
  downloads: number;
  onPress?: () => void;
}

export const PDFCard: React.FC<PDFCardProps> = ({
  title,
  author,
  price,
  rating,
  downloads,
  onPress,
}) => {
  return (
    <Pressable onPress={onPress}>
      <Card style={styles.card}>
        {/* Thumbnail */}
        <View style={styles.thumbnail}>
          {price === 0 && (
            <View style={styles.freeBadge}>
              <Text style={styles.freeText}>FREE</Text>
            </View>
          )}
          <Ionicons name="document-text" size={48} color={theme.colors.primary} />
        </View>

        {/* Info */}
        <View style={styles.info}>
          <Text style={styles.title} numberOfLines={2}>
            {title}
          </Text>
          <Text style={styles.author} numberOfLines={1}>
            {author}
          </Text>

          {/* Rating */}
          <View style={styles.ratingRow}>
            <Ionicons name="star" size={14} color={theme.colors.secondary} />
            <Text style={styles.rating}>{rating}</Text>
            <Text style={styles.downloads}>({downloads})</Text>
          </View>

          {/* Price */}
          <View style={styles.priceRow}>
            <Text style={styles.price}>
              {price === 0 ? 'FREE' : `${price} credits`}
            </Text>
            <Pressable style={styles.buyButton}>
              <Ionicons 
                name={price === 0 ? 'download' : 'cart'} 
                size={18} 
                color={theme.colors.white} 
              />
            </Pressable>
          </View>
        </View>
      </Card>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    marginHorizontal: theme.spacing.xs,
  },
  thumbnail: {
    width: '100%',
    height: 140,
    backgroundColor: theme.colors.gray[100],
    borderRadius: theme.borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
    position: 'relative',
  },
  freeBadge: {
    position: 'absolute',
    top: theme.spacing.sm,
    right: theme.spacing.sm,
    backgroundColor: theme.colors.success,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.sm,
  },
  freeText: {
    fontSize: theme.fontSize.xs,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.white,
  },
  info: {
    gap: theme.spacing.xs,
  },
  title: {
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.text,
    minHeight: 34,
  },
  author: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.gray[600],
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  rating: {
    fontSize: theme.fontSize.xs,
    fontWeight: theme.fontWeight.medium,
    color: theme.colors.text,
  },
  downloads: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.gray[500],
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: theme.spacing.xs,
  },
  price: {
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.primary,
  },
  buyButton: {
    backgroundColor: theme.colors.primary,
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

