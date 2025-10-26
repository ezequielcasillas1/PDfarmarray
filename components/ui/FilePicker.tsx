import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';
import { theme } from '../../styles/theme';

interface FilePickerProps {
  onFileSelect: (file: DocumentPicker.DocumentPickerAsset) => void;
}

export const FilePicker: React.FC<FilePickerProps> = ({ onFileSelect }) => {
  const [selectedFile, setSelectedFile] = useState<DocumentPicker.DocumentPickerAsset | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'application/pdf',
        copyToCacheDirectory: true,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const file = result.assets[0];
        setSelectedFile(file);
        onFileSelect(file);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to pick document');
      console.error(error);
    }
  };

  const formatFileSize = (bytes: number | undefined) => {
    if (!bytes) return '0 KB';
    const kb = bytes / 1024;
    if (kb < 1024) return `${kb.toFixed(1)} KB`;
    return `${(kb / 1024).toFixed(1)} MB`;
  };

  return (
    <View style={styles.container}>
      <Pressable
        style={({ pressed }) => [
          styles.dropZone,
          isDragging && styles.dropZoneDragging,
          pressed && styles.dropZonePressed,
        ]}
        onPress={pickDocument}
        onPressIn={() => setIsDragging(true)}
        onPressOut={() => setIsDragging(false)}
      >
        {selectedFile ? (
          <View style={styles.fileInfo}>
            <View style={styles.fileIcon}>
              <Ionicons name="document-text" size={48} color={theme.colors.primary} />
            </View>
            <Text style={styles.fileName} numberOfLines={2}>
              {selectedFile.name}
            </Text>
            <Text style={styles.fileSize}>
              {formatFileSize(selectedFile.size)}
            </Text>
            <Pressable
              style={styles.changeButton}
              onPress={pickDocument}
            >
              <Text style={styles.changeButtonText}>Change File</Text>
            </Pressable>
          </View>
        ) : (
          <View style={styles.uploadPrompt}>
            <View style={styles.uploadIcon}>
              <Ionicons name="cloud-upload-outline" size={64} color={theme.colors.primary} />
            </View>
            <Text style={styles.uploadTitle}>Tap to Select PDF</Text>
            <Text style={styles.uploadSubtitle}>
              Choose a PDF file from your device
            </Text>
            <View style={styles.supportedFormats}>
              <Ionicons name="document" size={16} color={theme.colors.gray[600]} />
              <Text style={styles.supportedText}>PDF files only</Text>
            </View>
          </View>
        )}
      </Pressable>

      {selectedFile && (
        <Pressable
          style={styles.removeButton}
          onPress={() => {
            setSelectedFile(null);
          }}
        >
          <Ionicons name="close-circle" size={24} color={theme.colors.error} />
          <Text style={styles.removeText}>Remove File</Text>
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  dropZone: {
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: theme.colors.gray[300],
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 200,
    backgroundColor: theme.colors.gray[50],
  },
  dropZoneDragging: {
    borderColor: theme.colors.primary,
    backgroundColor: theme.colors.primary + '10',
  },
  dropZonePressed: {
    opacity: 0.8,
  },
  uploadPrompt: {
    alignItems: 'center',
  },
  uploadIcon: {
    marginBottom: theme.spacing.md,
  },
  uploadTitle: {
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  uploadSubtitle: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.gray[600],
    textAlign: 'center',
    marginBottom: theme.spacing.lg,
  },
  supportedFormats: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xs,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.md,
  },
  supportedText: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.gray[600],
  },
  fileInfo: {
    alignItems: 'center',
    width: '100%',
  },
  fileIcon: {
    width: 80,
    height: 80,
    backgroundColor: theme.colors.primary + '20',
    borderRadius: theme.borderRadius.lg,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  fileName: {
    fontSize: theme.fontSize.md,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.text,
    textAlign: 'center',
    marginBottom: theme.spacing.xs,
  },
  fileSize: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.gray[600],
    marginBottom: theme.spacing.md,
  },
  changeButton: {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.sm,
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.md,
  },
  changeButtonText: {
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.white,
  },
  removeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.xs,
    marginTop: theme.spacing.md,
    padding: theme.spacing.sm,
  },
  removeText: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.error,
    fontWeight: theme.fontWeight.medium,
  },
});

