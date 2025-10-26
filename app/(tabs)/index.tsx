import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../../styles/theme';
import { Input, Card } from '../../components/ui';
import { CreditModal } from '../../components/modals/CreditModal';

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

const MY_CREATED_PDFS = [
  { 
    id: '1', 
    title: 'My AI Generated Ebook', 
    type: 'ai', 
    status: 'published',
    sales: 12,
    earnings: 60,
    createdAt: '2 days ago',
  },
  { 
    id: '2', 
    title: 'Custom Business Template', 
    type: 'build', 
    status: 'draft',
    sales: 0,
    earnings: 0,
    createdAt: '1 week ago',
  },
];

export default function HomeScreen() {
  const router = useRouter();
  const [creditModalVisible, setCreditModalVisible] = useState(false);
  const [currentCredits] = useState(0);

  const navigateToCategory = (categoryId: string) => {
    // Navigate to marketplace instead
    router.push('/(tabs)/market');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Welcome to</Text>
            <Text style={styles.title}>PDF Farm 🌱</Text>
          </View>
          <Pressable 
            style={styles.walletButton}
            onPress={() => setCreditModalVisible(true)}
          >
            <Ionicons name="wallet" size={24} color={theme.colors.primary} />
            <Text style={styles.walletText}>{currentCredits}</Text>
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
              <Pressable 
                style={styles.categoryCard}
                onPress={() => navigateToCategory(item.id)}
              >
                <Text style={styles.categoryEmoji}>{item.emoji}</Text>
                <Text style={styles.categoryTitle}>{item.title}</Text>
              </Pressable>
            )}
          />
        </View>

        {/* Your Created PDFs */}
        {MY_CREATED_PDFS.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Your Created PDFs</Text>
              <Pressable onPress={() => router.push('/(tabs)/profile')}>
                <Text style={styles.seeAllText}>See All</Text>
              </Pressable>
            </View>
            {MY_CREATED_PDFS.map((pdf) => (
              <Card key={pdf.id} style={styles.createdPdfCard}>
                <View style={styles.createdPdfRow}>
                  <View style={[
                    styles.typeIcon,
                    pdf.type === 'ai' ? styles.typeIconAi : styles.typeIconBuild
                  ]}>
                    <Ionicons 
                      name={pdf.type === 'ai' ? 'sparkles' : 'construct'} 
                      size={24} 
                      color={theme.colors.white} 
                    />
                  </View>
                  
                  <View style={styles.createdPdfInfo}>
                    <Text style={styles.createdPdfTitle} numberOfLines={1}>
                      {pdf.title}
                    </Text>
                    <View style={styles.createdPdfMeta}>
                      <View style={[
                        styles.statusBadge,
                        pdf.status === 'published' ? styles.statusPublished : styles.statusDraft
                      ]}>
                        <Text style={[
                          styles.statusText,
                          pdf.status === 'published' ? styles.statusTextPublished : styles.statusTextDraft
                        ]}>
                          {pdf.status === 'published' ? 'Published' : 'Draft'}
                        </Text>
                      </View>
                      <Text style={styles.createdDate}>{pdf.createdAt}</Text>
                    </View>
                    {pdf.status === 'published' && (
                      <View style={styles.createdPdfStats}>
                        <Text style={styles.statText}>
                          💰 {pdf.earnings} credits earned
                        </Text>
                        <Text style={styles.statText}>
                          📥 {pdf.sales} downloads
                        </Text>
                      </View>
                    )}
                  </View>

                  <Ionicons 
                    name="chevron-forward" 
                    size={24} 
                    color={theme.colors.gray[400]} 
                  />
                </View>
              </Card>
            ))}
          </View>
        )}

        {/* Featured PDFs */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Featured PDFs</Text>
            <Pressable onPress={() => router.push('/(tabs)/market')}>
              <Text style={styles.seeAllText}>See All</Text>
            </Pressable>
          </View>
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

    {/* Credit Modal */}
    <CreditModal 
      visible={creditModalVisible}
      onClose={() => setCreditModalVisible(false)}
      currentCredits={currentCredits}
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
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  sectionTitle: {
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text,
  },
  seeAllText: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.primary,
    fontWeight: theme.fontWeight.semibold,
  },
  createdPdfCard: {
    marginBottom: theme.spacing.md,
  },
  createdPdfRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
  },
  typeIcon: {
    width: 48,
    height: 48,
    borderRadius: theme.borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  typeIconAi: {
    backgroundColor: '#5C67F2',
  },
  typeIconBuild: {
    backgroundColor: '#10B981',
  },
  createdPdfInfo: {
    flex: 1,
  },
  createdPdfTitle: {
    fontSize: theme.fontSize.md,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  createdPdfMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
    marginBottom: theme.spacing.xs,
  },
  statusBadge: {
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 2,
    borderRadius: theme.borderRadius.sm,
  },
  statusPublished: {
    backgroundColor: theme.colors.success + '20',
  },
  statusDraft: {
    backgroundColor: theme.colors.gray[200],
  },
  statusText: {
    fontSize: theme.fontSize.xs,
    fontWeight: theme.fontWeight.semibold,
  },
  statusTextPublished: {
    color: theme.colors.success,
  },
  statusTextDraft: {
    color: theme.colors.gray[600],
  },
  createdDate: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.gray[500],
  },
  createdPdfStats: {
    flexDirection: 'row',
    gap: theme.spacing.md,
  },
  statText: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.gray[600],
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

