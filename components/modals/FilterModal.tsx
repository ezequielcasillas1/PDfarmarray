import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, Pressable, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../../styles/theme';
import { Button } from '../ui';

interface FilterModalProps {
  visible: boolean;
  onClose: () => void;
  onApplyFilters: (filters: FilterOptions) => void;
}

export interface FilterOptions {
  priceRange: { min: number; max: number };
  categories: string[];
  rating: number;
  sortBy: string;
  showFreeOnly: boolean;
}

const CATEGORIES = [
  'Ebooks', 'Articles', 'Courses', 'Printables', 
  'Templates', 'Worksheets', 'Resource Guides'
];

const PRICE_RANGES = [
  { label: 'Free', min: 0, max: 0 },
  { label: '1-5 Credits', min: 1, max: 5 },
  { label: '6-10 Credits', min: 6, max: 10 },
  { label: '11-20 Credits', min: 11, max: 20 },
  { label: '20+ Credits', min: 21, max: 999 },
];

const SORT_OPTIONS = [
  'Popular',
  'Newest',
  'Price: Low to High',
  'Price: High to Low',
  'Top Rated',
  'Most Downloaded',
];

export const FilterModal: React.FC<FilterModalProps> = ({
  visible,
  onClose,
  onApplyFilters,
}) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState<{ min: number; max: number } | null>(null);
  const [minRating, setMinRating] = useState(0);
  const [selectedSort, setSelectedSort] = useState('Popular');
  const [showFreeOnly, setShowFreeOnly] = useState(false);

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const handleReset = () => {
    setSelectedCategories([]);
    setSelectedPriceRange(null);
    setMinRating(0);
    setSelectedSort('Popular');
    setShowFreeOnly(false);
  };

  const handleApply = () => {
    onApplyFilters({
      priceRange: selectedPriceRange || { min: 0, max: 999 },
      categories: selectedCategories,
      rating: minRating,
      sortBy: selectedSort,
      showFreeOnly,
    });
    onClose();
  };

  const activeFiltersCount = 
    selectedCategories.length + 
    (selectedPriceRange ? 1 : 0) + 
    (minRating > 0 ? 1 : 0) +
    (showFreeOnly ? 1 : 0);

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          {/* Header */}
          <View style={styles.header}>
            <View>
              <Text style={styles.title}>Filters</Text>
              {activeFiltersCount > 0 && (
                <Text style={styles.activeFilters}>
                  {activeFiltersCount} active {activeFiltersCount === 1 ? 'filter' : 'filters'}
                </Text>
              )}
            </View>
            <Pressable style={styles.closeButton} onPress={onClose}>
              <Ionicons name="close" size={24} color={theme.colors.text} />
            </Pressable>
          </View>

          <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            {/* Free PDFs Toggle */}
            <View style={styles.section}>
              <Pressable
                style={styles.toggleRow}
                onPress={() => setShowFreeOnly(!showFreeOnly)}
              >
                <View style={styles.toggleLeft}>
                  <Ionicons name="gift" size={24} color={theme.colors.success} />
                  <View>
                    <Text style={styles.sectionTitle}>Free PDFs Only</Text>
                    <Text style={styles.sectionSubtitle}>Show only free content</Text>
                  </View>
                </View>
                <View style={[styles.toggle, showFreeOnly && styles.toggleActive]}>
                  <View style={[styles.toggleKnob, showFreeOnly && styles.toggleKnobActive]} />
                </View>
              </Pressable>
            </View>

            {/* Sort By */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Sort By</Text>
              {SORT_OPTIONS.map((option) => (
                <Pressable
                  key={option}
                  style={[
                    styles.option,
                    selectedSort === option && styles.optionSelected,
                  ]}
                  onPress={() => setSelectedSort(option)}
                >
                  <Text
                    style={[
                      styles.optionText,
                      selectedSort === option && styles.optionTextSelected,
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

            {/* Price Range */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Price Range</Text>
              <View style={styles.chipContainer}>
                {PRICE_RANGES.map((range) => (
                  <Pressable
                    key={range.label}
                    style={[
                      styles.chip,
                      selectedPriceRange?.min === range.min && styles.chipSelected,
                    ]}
                    onPress={() => setSelectedPriceRange(range)}
                  >
                    <Text
                      style={[
                        styles.chipText,
                        selectedPriceRange?.min === range.min && styles.chipTextSelected,
                      ]}
                    >
                      {range.label}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </View>

            {/* Categories */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Categories</Text>
              <View style={styles.chipContainer}>
                {CATEGORIES.map((category) => (
                  <Pressable
                    key={category}
                    style={[
                      styles.chip,
                      selectedCategories.includes(category) && styles.chipSelected,
                    ]}
                    onPress={() => toggleCategory(category)}
                  >
                    <Text
                      style={[
                        styles.chipText,
                        selectedCategories.includes(category) && styles.chipTextSelected,
                      ]}
                    >
                      {category}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </View>

            {/* Minimum Rating */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Minimum Rating</Text>
              <View style={styles.ratingContainer}>
                {[1, 2, 3, 4, 5].map((rating) => (
                  <Pressable
                    key={rating}
                    style={styles.ratingOption}
                    onPress={() => setMinRating(rating)}
                  >
                    <Ionicons
                      name={minRating >= rating ? 'star' : 'star-outline'}
                      size={32}
                      color={minRating >= rating ? theme.colors.secondary : theme.colors.gray[300]}
                    />
                  </Pressable>
                ))}
              </View>
              {minRating > 0 && (
                <Text style={styles.ratingText}>
                  {minRating}.0 stars and above
                </Text>
              )}
            </View>
          </ScrollView>

          {/* Footer */}
          <View style={styles.footer}>
            <Button
              title="Reset"
              variant="outline"
              size="md"
              onPress={handleReset}
              style={styles.resetButton}
            />
            <Button
              title={`Apply Filters${activeFiltersCount > 0 ? ` (${activeFiltersCount})` : ''}`}
              size="md"
              onPress={handleApply}
              style={styles.applyButton}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: theme.colors.background,
    borderTopLeftRadius: theme.borderRadius.lg * 2,
    borderTopRightRadius: theme.borderRadius.lg * 2,
    maxHeight: '90%',
    ...theme.shadows.lg,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    padding: theme.spacing.lg,
    paddingBottom: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.gray[200],
    backgroundColor: theme.colors.white,
  },
  title: {
    fontSize: theme.fontSize.xl,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text,
  },
  activeFilters: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.primary,
    marginTop: theme.spacing.xs,
  },
  closeButton: {
    padding: theme.spacing.sm,
  },
  content: {
    flex: 1,
    padding: theme.spacing.lg,
  },
  section: {
    marginBottom: theme.spacing.xl,
  },
  sectionTitle: {
    fontSize: theme.fontSize.md,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
  },
  sectionSubtitle: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.gray[600],
  },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme.colors.white,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
  },
  toggleLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
    flex: 1,
  },
  toggle: {
    width: 50,
    height: 28,
    borderRadius: 14,
    backgroundColor: theme.colors.gray[300],
    padding: 2,
    justifyContent: 'center',
  },
  toggleActive: {
    backgroundColor: theme.colors.primary,
  },
  toggleKnob: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: theme.colors.white,
    ...theme.shadows.sm,
  },
  toggleKnobActive: {
    alignSelf: 'flex-end',
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme.colors.white,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    marginBottom: theme.spacing.sm,
  },
  optionSelected: {
    backgroundColor: theme.colors.primary + '10',
    borderWidth: 1,
    borderColor: theme.colors.primary,
  },
  optionText: {
    fontSize: theme.fontSize.md,
    color: theme.colors.text,
  },
  optionTextSelected: {
    color: theme.colors.primary,
    fontWeight: theme.fontWeight.semibold,
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
  },
  chip: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.full,
    borderWidth: 1,
    borderColor: theme.colors.gray[300],
  },
  chipSelected: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  chipText: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.text,
  },
  chipTextSelected: {
    color: theme.colors.white,
    fontWeight: theme.fontWeight.semibold,
  },
  ratingContainer: {
    flexDirection: 'row',
    gap: theme.spacing.xs,
    justifyContent: 'center',
    backgroundColor: theme.colors.white,
    padding: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
  },
  ratingOption: {
    padding: theme.spacing.xs,
  },
  ratingText: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.text,
    textAlign: 'center',
    marginTop: theme.spacing.sm,
  },
  footer: {
    flexDirection: 'row',
    gap: theme.spacing.md,
    padding: theme.spacing.lg,
    paddingTop: theme.spacing.md,
    borderTopWidth: 1,
    borderTopColor: theme.colors.gray[200],
    backgroundColor: theme.colors.white,
  },
  resetButton: {
    flex: 1,
  },
  applyButton: {
    flex: 2,
  },
});

