import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../../styles/theme';
import { Card } from '../../components/ui';

const TABS = ['Trending', 'New', 'Top Rated', 'My Uploads'];

const MOCK_PDFS = [
  {
    id: '1',
    title: 'Complete Marketing Guide 2024',
    author: 'John Doe',
    price: 5,
    rating: 4.8,
    downloads: 1234,
  },
  {
    id: '2',
    title: 'Design Principles for Beginners',
    author: 'Jane Smith',
    price: 3,
    rating: 4.9,
    downloads: 890,
  },
  {
    id: '3',
    title: 'Productivity Hacks & Templates',
    author: 'Mike Johnson',
    price: 4,
    rating: 4.7,
    downloads: 567,
  },
  {
    id: '4',
    title: 'Business Plan Template 2024',
    author: 'Sarah Williams',
    price: 6,
    rating: 4.9,
    downloads: 2345,
  },
];

export default function MarketScreen() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>PDF Bazaar</Text>
        <Pressable style={styles.filterButton}>
          <Ionicons name="filter" size={24} color={theme.colors.primary} />
        </Pressable>
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <FlatList
          data={TABS}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <Pressable
              style={[styles.tab, activeTab === index && styles.tabActive]}
              onPress={() => setActiveTab(index)}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === index && styles.tabTextActive,
                ]}
              >
                {item}
              </Text>
            </Pressable>
          )}
        />
      </View>

      {/* PDF Grid */}
      <FlatList
        data={MOCK_PDFS}
        numColumns={2}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.gridContainer}
        columnWrapperStyle={styles.row}
        renderItem={({ item }) => (
          <Card style={styles.pdfCard}>
            {/* Thumbnail */}
            <View style={styles.thumbnail}>
              <Ionicons
                name="document-text"
                size={48}
                color={theme.colors.primary}
              />
            </View>

            {/* Info */}
            <View style={styles.pdfInfo}>
              <Text style={styles.pdfTitle} numberOfLines={2}>
                {item.title}
              </Text>
              <Text style={styles.pdfAuthor}>{item.author}</Text>

              {/* Rating */}
              <View style={styles.ratingRow}>
                <Ionicons name="star" size={14} color={theme.colors.secondary} />
                <Text style={styles.rating}>{item.rating}</Text>
                <Text style={styles.downloads}>({item.downloads})</Text>
              </View>

              {/* Price */}
              <View style={styles.priceRow}>
                <Text style={styles.price}>{item.price} credits</Text>
                <Pressable style={styles.buyButton}>
                  <Ionicons name="cart" size={18} color={theme.colors.white} />
                </Pressable>
              </View>
            </View>
          </Card>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing.lg,
  },
  title: {
    fontSize: theme.fontSize.xxl,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text,
  },
  filterButton: {
    padding: theme.spacing.sm,
  },
  tabsContainer: {
    paddingHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.md,
  },
  tab: {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.sm,
    marginRight: theme.spacing.sm,
    borderRadius: theme.borderRadius.full,
    backgroundColor: theme.colors.white,
  },
  tabActive: {
    backgroundColor: theme.colors.primary,
  },
  tabText: {
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.medium,
    color: theme.colors.gray[600],
  },
  tabTextActive: {
    color: theme.colors.white,
  },
  gridContainer: {
    padding: theme.spacing.lg,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: theme.spacing.md,
  },
  pdfCard: {
    flex: 1,
    marginHorizontal: theme.spacing.xs,
    maxWidth: '48%',
  },
  thumbnail: {
    width: '100%',
    height: 140,
    backgroundColor: theme.colors.gray[100],
    borderRadius: theme.borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  pdfInfo: {
    gap: theme.spacing.xs,
  },
  pdfTitle: {
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.text,
    minHeight: 34,
  },
  pdfAuthor: {
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

