import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Image } from 'react-native';
import { SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../../styles/theme';
import { Button, Card } from '../../components/ui';

const TABS = ['My PDFs', 'Purchases', 'Settings'];

const MY_PDFS = [
  { id: '1', title: 'My First Ebook', sales: 12, earnings: 60 },
  { id: '2', title: 'Design Templates Pack', sales: 8, earnings: 40 },
];

export default function ProfileScreen() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.avatarContainer}>
            <Ionicons name="person-circle" size={80} color={theme.colors.primary} />
          </View>
          <Text style={styles.name}>Guest User</Text>
          <Text style={styles.email}>guest@pdffarm.com</Text>

          {/* Stats */}
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>0</Text>
              <Text style={styles.statLabel}>PDFs</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>0</Text>
              <Text style={styles.statLabel}>Sales</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>0</Text>
              <Text style={styles.statLabel}>Credits</Text>
            </View>
          </View>

          <Button
            title="Add Credits"
            variant="primary"
            size="md"
            style={styles.addCreditsButton}
          />
        </View>

        {/* Tabs */}
        <View style={styles.tabsContainer}>
          {TABS.map((tab, index) => (
            <Pressable
              key={index}
              style={[styles.tab, activeTab === index && styles.tabActive]}
              onPress={() => setActiveTab(index)}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === index && styles.tabTextActive,
                ]}
              >
                {tab}
              </Text>
            </Pressable>
          ))}
        </View>

        {/* Tab Content */}
        <View style={styles.content}>
          {activeTab === 0 && (
            <View>
              <Text style={styles.sectionTitle}>My Created PDFs</Text>
              {MY_PDFS.length > 0 ? (
                MY_PDFS.map((pdf) => (
                  <Card key={pdf.id} style={styles.pdfCard}>
                    <View style={styles.pdfRow}>
                      <View style={styles.pdfIcon}>
                        <Ionicons
                          name="document-text"
                          size={32}
                          color={theme.colors.primary}
                        />
                      </View>
                      <View style={styles.pdfDetails}>
                        <Text style={styles.pdfTitle}>{pdf.title}</Text>
                        <View style={styles.pdfStats}>
                          <Text style={styles.pdfStat}>
                            {pdf.sales} sales · {pdf.earnings} credits earned
                          </Text>
                        </View>
                      </View>
                      <Ionicons
                        name="chevron-forward"
                        size={24}
                        color={theme.colors.gray[400]}
                      />
                    </View>
                  </Card>
                ))
              ) : (
                <View style={styles.emptyState}>
                  <Ionicons
                    name="documents-outline"
                    size={64}
                    color={theme.colors.gray[300]}
                  />
                  <Text style={styles.emptyText}>No PDFs yet</Text>
                  <Text style={styles.emptySubtext}>
                    Start creating your first PDF
                  </Text>
                </View>
              )}
            </View>
          )}

          {activeTab === 1 && (
            <View style={styles.emptyState}>
              <Ionicons
                name="cart-outline"
                size={64}
                color={theme.colors.gray[300]}
              />
              <Text style={styles.emptyText}>No purchases yet</Text>
              <Text style={styles.emptySubtext}>
                Browse the marketplace to find PDFs
              </Text>
            </View>
          )}

          {activeTab === 2 && (
            <View>
              <Card style={styles.settingCard}>
                <Pressable style={styles.settingRow}>
                  <Ionicons name="person" size={24} color={theme.colors.primary} />
                  <Text style={styles.settingText}>Edit Profile</Text>
                  <Ionicons
                    name="chevron-forward"
                    size={24}
                    color={theme.colors.gray[400]}
                  />
                </Pressable>
              </Card>

              <Card style={styles.settingCard}>
                <Pressable style={styles.settingRow}>
                  <Ionicons name="notifications" size={24} color={theme.colors.primary} />
                  <Text style={styles.settingText}>Notifications</Text>
                  <Ionicons
                    name="chevron-forward"
                    size={24}
                    color={theme.colors.gray[400]}
                  />
                </Pressable>
              </Card>

              <Card style={styles.settingCard}>
                <Pressable style={styles.settingRow}>
                  <Ionicons name="shield-checkmark" size={24} color={theme.colors.primary} />
                  <Text style={styles.settingText}>Privacy & Security</Text>
                  <Ionicons
                    name="chevron-forward"
                    size={24}
                    color={theme.colors.gray[400]}
                  />
                </Pressable>
              </Card>

              <Card style={styles.settingCard}>
                <Pressable style={styles.settingRow}>
                  <Ionicons name="help-circle" size={24} color={theme.colors.primary} />
                  <Text style={styles.settingText}>Help & Support</Text>
                  <Ionicons
                    name="chevron-forward"
                    size={24}
                    color={theme.colors.gray[400]}
                  />
                </Pressable>
              </Card>

              <Button
                title="Sign Out"
                variant="outline"
                size="md"
                style={styles.signOutButton}
              />
            </View>
          )}
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
    alignItems: 'center',
    padding: theme.spacing.xl,
    backgroundColor: theme.colors.white,
  },
  avatarContainer: {
    marginBottom: theme.spacing.md,
  },
  name: {
    fontSize: theme.fontSize.xl,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text,
  },
  email: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.gray[600],
    marginTop: theme.spacing.xs,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: theme.spacing.xl,
    marginBottom: theme.spacing.lg,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: theme.fontSize.xxl,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.primary,
  },
  statLabel: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.gray[600],
    marginTop: theme.spacing.xs,
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: theme.colors.gray[200],
  },
  addCreditsButton: {
    width: '100%',
  },
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: theme.spacing.lg,
    marginTop: theme.spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.gray[200],
  },
  tab: {
    flex: 1,
    paddingVertical: theme.spacing.md,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabActive: {
    borderBottomColor: theme.colors.primary,
  },
  tabText: {
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.medium,
    color: theme.colors.gray[600],
  },
  tabTextActive: {
    color: theme.colors.primary,
    fontWeight: theme.fontWeight.bold,
  },
  content: {
    padding: theme.spacing.lg,
  },
  sectionTitle: {
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
  },
  pdfCard: {
    marginBottom: theme.spacing.md,
  },
  pdfRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pdfIcon: {
    width: 48,
    height: 48,
    backgroundColor: theme.colors.gray[100],
    borderRadius: theme.borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.md,
  },
  pdfDetails: {
    flex: 1,
  },
  pdfTitle: {
    fontSize: theme.fontSize.md,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  pdfStats: {
    flexDirection: 'row',
  },
  pdfStat: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.gray[600],
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: theme.spacing.xxxl,
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
  settingCard: {
    marginBottom: theme.spacing.md,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
  },
  settingText: {
    flex: 1,
    fontSize: theme.fontSize.md,
    color: theme.colors.text,
  },
  signOutButton: {
    marginTop: theme.spacing.xl,
  },
});

