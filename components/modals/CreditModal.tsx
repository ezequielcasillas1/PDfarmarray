import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, Pressable, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { theme } from '../../styles/theme';
import { Button } from '../ui';

interface CreditModalProps {
  visible: boolean;
  onClose: () => void;
  currentCredits?: number;
}

const CREDIT_PACKAGES = [
  { 
    id: '1', 
    credits: 10, 
    price: 1.99, 
    popular: false,
    bonus: 0,
  },
  { 
    id: '2', 
    credits: 50, 
    price: 7.99, 
    popular: true,
    bonus: 5,
    savings: 20,
  },
  { 
    id: '3', 
    credits: 100, 
    price: 12.99, 
    popular: false,
    bonus: 15,
    savings: 35,
  },
  { 
    id: '4', 
    credits: 250, 
    price: 24.99, 
    popular: false,
    bonus: 50,
    savings: 50,
  },
];

export const CreditModal: React.FC<CreditModalProps> = ({ 
  visible, 
  onClose,
  currentCredits = 0,
}) => {
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);

  const handlePurchase = () => {
    // TODO: Implement purchase logic
    console.log('Purchase package:', selectedPackage);
    onClose();
  };

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
            <View style={styles.headerContent}>
              <View style={styles.walletIcon}>
                <Ionicons name="wallet" size={32} color={theme.colors.primary} />
              </View>
              <View>
                <Text style={styles.title}>Purchase Credits</Text>
                <Text style={styles.subtitle}>
                  Current Balance: {currentCredits} credits
                </Text>
              </View>
            </View>
            <Pressable style={styles.closeButton} onPress={onClose}>
              <Ionicons name="close" size={24} color={theme.colors.text} />
            </Pressable>
          </View>

          {/* Packages */}
          <ScrollView 
            style={styles.packagesContainer}
            showsVerticalScrollIndicator={false}
          >
            <Text style={styles.sectionTitle}>Choose a package</Text>
            
            {CREDIT_PACKAGES.map((pkg) => (
              <Pressable
                key={pkg.id}
                style={[
                  styles.package,
                  selectedPackage === pkg.id && styles.packageSelected,
                ]}
                onPress={() => setSelectedPackage(pkg.id)}
              >
                {pkg.popular && (
                  <View style={styles.popularBadge}>
                    <Text style={styles.popularText}>Most Popular</Text>
                  </View>
                )}

                <View style={styles.packageContent}>
                  <View style={styles.packageLeft}>
                    <View style={styles.creditsRow}>
                      <Text style={styles.creditsAmount}>{pkg.credits}</Text>
                      <Text style={styles.creditsLabel}>Credits</Text>
                      {pkg.bonus > 0 && (
                        <View style={styles.bonusBadge}>
                          <Text style={styles.bonusText}>+{pkg.bonus} Bonus</Text>
                        </View>
                      )}
                    </View>
                    {pkg.savings && (
                      <Text style={styles.savings}>Save {pkg.savings}%</Text>
                    )}
                  </View>

                  <View style={styles.packageRight}>
                    <Text style={styles.price}>${pkg.price}</Text>
                    <Text style={styles.pricePerCredit}>
                      ${(pkg.price / (pkg.credits + pkg.bonus)).toFixed(2)}/credit
                    </Text>
                  </View>

                  {selectedPackage === pkg.id && (
                    <View style={styles.checkmark}>
                      <Ionicons name="checkmark-circle" size={24} color={theme.colors.primary} />
                    </View>
                  )}
                </View>
              </Pressable>
            ))}

            {/* Info */}
            <View style={styles.infoCard}>
              <Ionicons name="information-circle" size={24} color={theme.colors.info} />
              <View style={styles.infoText}>
                <Text style={styles.infoTitle}>How Credits Work</Text>
                <Text style={styles.infoDescription}>
                  Use credits to purchase and download PDFs from the marketplace. Earn credits by selling your own PDFs!
                </Text>
              </View>
            </View>

            {/* Features */}
            <View style={styles.features}>
              <View style={styles.feature}>
                <Ionicons name="shield-checkmark" size={20} color={theme.colors.success} />
                <Text style={styles.featureText}>Secure payment</Text>
              </View>
              <View style={styles.feature}>
                <Ionicons name="time" size={20} color={theme.colors.success} />
                <Text style={styles.featureText}>Instant delivery</Text>
              </View>
              <View style={styles.feature}>
                <Ionicons name="sync" size={20} color={theme.colors.success} />
                <Text style={styles.featureText}>Never expires</Text>
              </View>
            </View>
          </ScrollView>

          {/* Footer */}
          <View style={styles.footer}>
            <Button
              title={selectedPackage ? 'Continue to Payment' : 'Select a Package'}
              disabled={!selectedPackage}
              onPress={handlePurchase}
              size="lg"
            />
            <Text style={styles.footerText}>
              Secure payment powered by Stripe
            </Text>
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
  },
  headerContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
  },
  walletIcon: {
    width: 56,
    height: 56,
    backgroundColor: theme.colors.primary + '20',
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: theme.fontSize.xl,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text,
  },
  subtitle: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.gray[600],
    marginTop: theme.spacing.xs,
  },
  closeButton: {
    padding: theme.spacing.sm,
  },
  packagesContainer: {
    flex: 1,
    padding: theme.spacing.lg,
  },
  sectionTitle: {
    fontSize: theme.fontSize.md,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
  },
  package: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.md,
    borderWidth: 2,
    borderColor: theme.colors.gray[200],
    position: 'relative',
  },
  packageSelected: {
    borderColor: theme.colors.primary,
    backgroundColor: theme.colors.primary + '05',
  },
  popularBadge: {
    position: 'absolute',
    top: -10,
    right: theme.spacing.lg,
    backgroundColor: theme.colors.secondary,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.full,
  },
  popularText: {
    fontSize: theme.fontSize.xs,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.white,
  },
  packageContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  packageLeft: {
    flex: 1,
  },
  creditsRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: theme.spacing.sm,
    marginBottom: theme.spacing.xs,
  },
  creditsAmount: {
    fontSize: theme.fontSize.xxxl,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text,
  },
  creditsLabel: {
    fontSize: theme.fontSize.md,
    color: theme.colors.gray[600],
  },
  bonusBadge: {
    backgroundColor: theme.colors.success + '20',
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.sm,
  },
  bonusText: {
    fontSize: theme.fontSize.xs,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.success,
  },
  savings: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.success,
    fontWeight: theme.fontWeight.semibold,
  },
  packageRight: {
    alignItems: 'flex-end',
  },
  price: {
    fontSize: theme.fontSize.xxl,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.primary,
  },
  pricePerCredit: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.gray[600],
    marginTop: theme.spacing.xs,
  },
  checkmark: {
    position: 'absolute',
    top: theme.spacing.md,
    right: theme.spacing.md,
  },
  infoCard: {
    flexDirection: 'row',
    gap: theme.spacing.md,
    backgroundColor: theme.colors.info + '10',
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    marginTop: theme.spacing.lg,
    marginBottom: theme.spacing.md,
  },
  infoText: {
    flex: 1,
  },
  infoTitle: {
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  infoDescription: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.gray[600],
    lineHeight: 18,
  },
  features: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: theme.spacing.md,
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xs,
  },
  featureText: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.gray[600],
  },
  footer: {
    padding: theme.spacing.lg,
    paddingTop: theme.spacing.md,
    borderTopWidth: 1,
    borderTopColor: theme.colors.gray[200],
    backgroundColor: theme.colors.white,
  },
  footerText: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.gray[500],
    textAlign: 'center',
    marginTop: theme.spacing.sm,
  },
});

