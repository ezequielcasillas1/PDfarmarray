import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../../styles/theme';
import { Card, Input } from '../../components/ui';
import { FilterModal, FilterOptions } from '../../components/modals/FilterModal';

const TABS = ['Trending', 'New', 'Top Rated', 'Free PDFs', 'My Uploads'];

const MOCK_PDFS = [
  {
    id: '1',
    title: 'Complete Marketing Guide 2024',
    author: 'John Doe',
    price: 5,
    rating: 4.8,
    downloads: 1234,
    category: 'Ebooks',
  },
  {
    id: '2',
    title: 'Design Principles for Beginners',
    author: 'Jane Smith',
    price: 3,
    rating: 4.9,
    downloads: 890,
    category: 'Articles',
  },
  {
    id: '3',
    title: 'Productivity Hacks & Templates',
    author: 'Mike Johnson',
    price: 4,
    rating: 4.7,
    downloads: 567,
    category: 'Templates',
  },
  {
    id: '4',
    title: 'Business Plan Template 2024',
    author: 'Sarah Williams',
    price: 6,
    rating: 4.9,
    downloads: 2345,
    category: 'Templates',
  },
  {
    id: '5',
    title: 'Free Starter Guide to SEO',
    author: 'Tom Anderson',
    price: 0,
    rating: 4.6,
    downloads: 3456,
    category: 'Resource Guides',
  },
  {
    id: '6',
    title: 'Free Budget Planner',
    author: 'Lisa Brown',
    price: 0,
    rating: 4.8,
    downloads: 2890,
    category: 'Printables',
  },
  {
    id: '7',
    title: 'Free Meal Prep Worksheet',
    author: 'Chris Green',
    price: 0,
    rating: 4.7,
    downloads: 1678,
    category: 'Worksheets',
  },
];

export default function MarketScreen() {
  const [activeTab, setActiveTab] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({
    priceRange: { min: 0, max: 999 },
    categories: [],
    rating: 0,
    sortBy: 'Popular',
    showFreeOnly: false,
  });

  const handleApplyFilters = (newFilters: FilterOptions) => {
    setFilters(newFilters);
  };

  const getFilteredPDFs = () => {
    let filtered = MOCK_PDFS;

    // Filter by tab
    if (activeTab === 0) { // Trending
      filtered = filtered.sort((a, b) => b.downloads - a.downloads);
    } else if (activeTab === 1) { // New
      filtered = [...filtered].reverse();
    } else if (activeTab === 2) { // Top Rated
      filtered = filtered.sort((a, b) => b.rating - a.rating);
    } else if (activeTab === 3) { // Free PDFs
      filtered = filtered.filter(pdf => pdf.price === 0);
    } else if (activeTab === 4) { // My Uploads
      filtered = [];
    }

    // Apply search
    if (searchQuery) {
      filtered = filtered.filter(pdf =>
        pdf.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pdf.author.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply filters
    if (filters.showFreeOnly) {
      filtered = filtered.filter(pdf => pdf.price === 0);
    }
    if (filters.priceRange.min > 0 || filters.priceRange.max < 999) {
      filtered = filtered.filter(
        pdf => pdf.price >= filters.priceRange.min && pdf.price <= filters.priceRange.max
      );
    }
    if (filters.categories.length > 0) {
      filtered = filtered.filter(pdf => filters.categories.includes(pdf.category));
    }
    if (filters.rating > 0) {
      filtered = filtered.filter(pdf => pdf.rating >= filters.rating);
    }

    return filtered;
  };

  const filteredPDFs = getFilteredPDFs();

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>PDF Bazaar</Text>
        <Pressable 
          style={styles.filterButton}
          onPress={() => setShowFilterModal(true)}
        >
          <Ionicons name="filter" size={24} color={theme.colors.primary} />
          {(filters.categories.length > 0 || filters.rating > 0 || filters.showFreeOnly || 
            filters.priceRange.min > 0 || filters.priceRange.max < 999) && (
            <View style={styles.filterBadge}>
              <Text style={styles.filterBadgeText}>
                {filters.categories.length + (filters.rating > 0 ? 1 : 0) + 
                 (filters.showFreeOnly ? 1 : 0) + 
                 (filters.priceRange.min > 0 || filters.priceRange.max < 999 ? 1 : 0)}
              </Text>
            </View>
          )}
        </Pressable>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Input
          placeholder="Search PDFs, creators..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          style={styles.searchInput}
        />
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

      {/* Result Count */}
      <View style={styles.resultBar}>
        <Text style={styles.resultText}>{filteredPDFs.length} results</Text>
      </View>

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
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Ionicons name="search" size={64} color={theme.colors.gray[300]} />
            <Text style={styles.emptyText}>
              {activeTab === 4 ? 'No uploads yet' : 'No PDFs found'}
            </Text>
            <Text style={styles.emptySubtext}>
              {activeTab === 4 
                ? 'Start creating your first PDF' 
                : 'Try adjusting your filters'}
            </Text>
          </View>
        }
      />

      {/* Filter Modal */}
      <FilterModal
        visible={showFilterModal}
        onClose={() => setShowFilterModal(false)}
        onApplyFilters={handleApplyFilters}
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
    position: 'relative',
  },
  filterBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: theme.colors.error,
    width: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterBadgeText: {
    fontSize: 10,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.white,
  },
  searchContainer: {
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: theme.spacing.md,
  },
  searchInput: {
    marginBottom: 0,
  },
  resultBar: {
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: theme.spacing.sm,
  },
  resultText: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.gray[600],
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

