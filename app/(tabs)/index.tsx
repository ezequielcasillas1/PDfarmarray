import React from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../../styles/theme';
import { Input, Card } from '../../components/ui';

const CATEGORIES = [
  { id: '1', title: 'Ebooks', icon: 'book', emoji: '📚' },
  { id: '2', title: 'Articles', icon: 'newspaper', emoji: '📰' },
  { id: '3', title: 'Courses', icon: 'school', emoji: '🎓' },
  { id: '4', title: 'Printables', icon: 'print', emoji: '🗒️' },
  { id: '5', title: 'Templates', icon: 'document-text', emoji: '📄' },
  { id: '6', title: 'Worksheets', icon: 'pencil', emoji: '✏️' },
  { id: '7', title: 'Resource Guides', icon: 'compass', emoji: '🧭' },
];

const FEATURED_PDFS = [
  { id: '1', title: 'Marketing Guide 2024', price: 5, author: 'John Doe' },
  { id: '2', title: 'Design Principles', price: 3, author: 'Jane Smith' },
  { id: '3', title: 'Productivity Hacks', price: 4, author: 'Mike Johnson' },
];

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Welcome to</Text>
            <Text style={styles.title}>PDF Farm 🌱</Text>
          </View>
          <Pressable style={styles.walletButton}>
            <Ionicons name="wallet" size={24} color={theme.colors.primary} />
            <Text style={styles.walletText}>0</Text>
          </Pressable>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Input
            placeholder="Search PDFs, creators..."
            style={styles.searchInput}
          />
        </View>

        {/* Categories */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Browse Categories</Text>
          <FlatList
            data={CATEGORIES}
            numColumns={2}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            columnWrapperStyle={styles.categoryRow}
            renderItem={({ item }) => (
              <Pressable style={styles.categoryCard}>
                <Text style={styles.categoryEmoji}>{item.emoji}</Text>
                <Text style={styles.categoryTitle}>{item.title}</Text>
              </Pressable>
            )}
          />
        </View>

        {/* Featured PDFs */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Featured PDFs</Text>
          <FlatList
            data={FEATURED_PDFS}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <Card style={styles.featuredCard}>
                <View style={styles.pdfThumbnail}>
                  <Ionicons name="document-text" size={40} color={theme.colors.primary} />
                </View>
                <Text style={styles.pdfTitle} numberOfLines={2}>
                  {item.title}
                </Text>
                <Text style={styles.pdfAuthor}>{item.author}</Text>
                <View style={styles.pdfFooter}>
                  <Text style={styles.pdfPrice}>{item.price} credits</Text>
                  <Ionicons name="star" size={16} color={theme.colors.secondary} />
                </View>
              </Card>
            )}
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing.lg,
  },
  greeting: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.gray[600],
  },
  title: {
    fontSize: theme.fontSize.xxl,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text,
  },
  walletButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.white,
    padding: theme.spacing.sm,
    borderRadius: theme.borderRadius.md,
    gap: theme.spacing.xs,
    ...theme.shadows.sm,
  },
  walletText: {
    fontSize: theme.fontSize.md,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.text,
  },
  searchContainer: {
    paddingHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.md,
  },
  searchInput: {
    marginBottom: 0,
  },
  section: {
    padding: theme.spacing.lg,
  },
  sectionTitle: {
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
  },
  categoryRow: {
    justifyContent: 'space-between',
    marginBottom: theme.spacing.md,
  },
  categoryCard: {
    flex: 1,
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    margin: theme.spacing.xs,
    alignItems: 'center',
    ...theme.shadows.sm,
  },
  categoryEmoji: {
    fontSize: 40,
    marginBottom: theme.spacing.sm,
  },
  categoryTitle: {
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.medium,
    color: theme.colors.text,
    textAlign: 'center',
  },
  featuredCard: {
    width: 180,
    marginRight: theme.spacing.md,
  },
  pdfThumbnail: {
    width: '100%',
    height: 120,
    backgroundColor: theme.colors.gray[100],
    borderRadius: theme.borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  pdfTitle: {
    fontSize: theme.fontSize.md,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  pdfAuthor: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.gray[600],
    marginBottom: theme.spacing.sm,
  },
  pdfFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pdfPrice: {
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.primary,
  },
});

