import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../../../styles/theme';
import { Card, Input } from '../../../components/ui';

const CATEGORIES_DATA: { [key: string]: { name: string; emoji: string } } = {
  ebooks: { name: 'Ebooks', emoji: '📚' },
  articles: { name: 'Articles', emoji: '📰' },
  courses: { name: 'Courses', emoji: '🎓' },
  printables: { name: 'Printables', emoji: '🗒️' },
  templates: { name: 'Templates', emoji: '📄' },
  worksheets: { name: 'Worksheets', emoji: '✏️' },
  guides: { name: 'Resource Guides', emoji: '🧭' },
};

const SORT_OPTIONS = ['Popular', 'Newest', 'Price: Low to High', 'Price: High to Low', 'Top Rated'];

const MOCK_PDFS = [
  { id: '1', title: 'Complete Guide to Digital Marketing', price: 5, rating: 4.8, downloads: 234, author: 'Sarah Johnson' },
  { id: '2', title: 'Productivity Planner 2024', price: 3, rating: 4.9, downloads: 567, author: 'Mike Chen' },
  { id: '3', title: 'Business Plan Template Pro', price: 7, rating: 4.7, downloads: 189, author: 'Lisa Anderson' },
  { id: '4', title: 'Social Media Content Calendar', price: 4, rating: 4.8, downloads: 423, author: 'Tom Williams' },
  { id: '5', title: 'Invoice Templates Bundle', price: 6, rating: 4.9, downloads: 312, author: 'Emma Davis' },
  { id: '6', title: 'Project Management Worksheets', price: 5, rating: 4.6, downloads: 198, author: 'Chris Martinez' },
];

export default function CategoryScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSort, setSelectedSort] = useState('Popular');
  const [showSortModal, setShowSortModal] = useState(false);

  const category = CATEGORIES_DATA[id as string] || { name: 'Category', emoji: '📁' };

  const filteredPDFs = MOCK_PDFS.filter(pdf =>
    pdf.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={theme.colors.text} />
        </Pressable>
        <View style={styles.headerContent}>
          <Text style={styles.emoji}>{category.emoji}</Text>
          <Text style={styles.title}>{category.name}</Text>
        </View>
        <View style={styles.headerSpacer} />
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Input
          placeholder={`Search ${category.name.toLowerCase()}...`}
          value={searchQuery}
          onChangeText={setSearchQuery}
          style={styles.searchInput}
        />
      </View>

      {/* Filter Bar */}
      <View style={styles.filterBar}>
        <Pressable
          style={styles.sortButton}
          onPress={() => setShowSortModal(!showSortModal)}
        >
          <Ionicons name="funnel" size={20} color={theme.colors.primary} />
          <Text style={styles.sortButtonText}>{selectedSort}</Text>
          <Ionicons name="chevron-down" size={16} color={theme.colors.gray[600]} />
        </Pressable>

        <View style={styles.resultCount}>
          <Text style={styles.resultText}>{filteredPDFs.length} results</Text>
        </View>
      </View>

      {/* Sort Modal */}
      {showSortModal && (
        <View style={styles.sortModal}>
          {SORT_OPTIONS.map((option) => (
            <Pressable
              key={option}
              style={[
                styles.sortOption,
                selectedSort === option && styles.sortOptionActive,
              ]}
              onPress={() => {
                setSelectedSort(option);
                setShowSortModal(false);
              }}
            >
              <Text
                style={[
                  styles.sortOptionText,
                  selectedSort === option && styles.sortOptionTextActive,
                ]}
              >
                {option}
              </Text>
              {selectedSort === option && (
                <Ionicons name="checkmark" size={20} color={theme.colors.primary} />
              )}
            </Pressable>
          ))}
        </View>
      )}

      {/* PDF Grid */}
      <FlatList
        data={filteredPDFs}
        numColumns={2}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.gridContainer}
        columnWrapperStyle={styles.row}
        renderItem={({ item }) => (
          <Card style={styles.pdfCard}>
            {/* Thumbnail */}
            <View style={styles.thumbnail}>
              <Ionicons name="document-text" size={48} color={theme.colors.primary} />
            </View>

            {/* Info */}
            <View style={styles.pdfInfo}>
              <Text style={styles.pdfTitle} numberOfLines={2}>
                {item.title}
              </Text>
              <Text style={styles.pdfAuthor} numberOfLines={1}>
                {item.author}
              </Text>

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
                  <Ionicons name="add" size={18} color={theme.colors.white} />
                </Pressable>
              </View>
            </View>
          </Card>
        )}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Ionicons name="search" size={64} color={theme.colors.gray[300]} />
            <Text style={styles.emptyText}>No PDFs found</Text>
            <Text style={styles.emptySubtext}>Try adjusting your search</Text>
          </View>
        }
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
    alignItems: 'center',
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.white,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.gray[200],
  },
  backButton: {
    padding: theme.spacing.sm,
  },
  headerContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.sm,
  },
  headerSpacer: {
    width: 40,
  },
  emoji: {
    fontSize: 32,
  },
  title: {
    fontSize: theme.fontSize.xl,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text,
  },
  searchContainer: {
    padding: theme.spacing.lg,
    paddingBottom: theme.spacing.md,
  },
  searchInput: {
    marginBottom: 0,
  },
  filterBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: theme.spacing.md,
  },
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xs,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: theme.colors.gray[300],
    ...theme.shadows.sm,
  },
  sortButtonText: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.text,
    fontWeight: theme.fontWeight.medium,
  },
  resultCount: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  resultText: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.gray[600],
  },
  sortModal: {
    backgroundColor: theme.colors.white,
    marginHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    ...theme.shadows.lg,
    overflow: 'hidden',
  },
  sortOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.gray[100],
  },
  sortOptionActive: {
    backgroundColor: theme.colors.primary + '10',
  },
  sortOptionText: {
    fontSize: theme.fontSize.md,
    color: theme.colors.text,
  },
  sortOptionTextActive: {
    color: theme.colors.primary,
    fontWeight: theme.fontWeight.semibold,
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
  emptyState: {
    alignItems: 'center',
    paddingVertical: theme.spacing.xxxl * 2,
  },
  emptyText: {
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.gray[600],
    marginTop: theme.spacing.md,
  },
  emptySubtext: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.gray[500],
    marginTop: theme.spacing.xs,
  },
});

