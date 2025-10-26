import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../../styles/theme';

interface CanvasElement {
  id: string;
  type: 'text' | 'heading' | 'image' | 'shape';
  content: string;
  x: number;
  y: number;
  width?: number;
  height?: number;
}

interface PDFCanvasProps {
  onElementsChange?: (elements: CanvasElement[]) => void;
}

export const PDFCanvas: React.FC<PDFCanvasProps> = ({ onElementsChange }) => {
  const [elements, setElements] = useState<CanvasElement[]>([]);
  const [selectedElement, setSelectedElement] = useState<string | null>(null);

  const addElement = (type: CanvasElement['type']) => {
    const newElement: CanvasElement = {
      id: Date.now().toString(),
      type,
      content: type === 'text' ? 'Tap to edit text' : type === 'heading' ? 'Heading' : '',
      x: 50,
      y: 50 + elements.length * 60,
    };
    
    const updatedElements = [...elements, newElement];
    setElements(updatedElements);
    setSelectedElement(newElement.id);
    onElementsChange?.(updatedElements);
  };

  const updateElement = (id: string, updates: Partial<CanvasElement>) => {
    const updatedElements = elements.map(el => 
      el.id === id ? { ...el, ...updates } : el
    );
    setElements(updatedElements);
    onElementsChange?.(updatedElements);
  };

  const deleteElement = (id: string) => {
    const updatedElements = elements.filter(el => el.id !== id);
    setElements(updatedElements);
    setSelectedElement(null);
    onElementsChange?.(updatedElements);
  };

  return (
    <View style={styles.container}>
      {/* Toolbar */}
      <View style={styles.toolbar}>
        <Text style={styles.toolbarTitle}>Add Elements</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <Pressable
            style={styles.toolButton}
            onPress={() => addElement('heading')}
          >
            <Ionicons name="text" size={24} color={theme.colors.primary} />
            <Text style={styles.toolButtonText}>Heading</Text>
          </Pressable>

          <Pressable
            style={styles.toolButton}
            onPress={() => addElement('text')}
          >
            <Ionicons name="document-text" size={24} color={theme.colors.primary} />
            <Text style={styles.toolButtonText}>Text</Text>
          </Pressable>

          <Pressable
            style={styles.toolButton}
            onPress={() => addElement('image')}
          >
            <Ionicons name="image" size={24} color={theme.colors.primary} />
            <Text style={styles.toolButtonText}>Image</Text>
          </Pressable>

          <Pressable
            style={styles.toolButton}
            onPress={() => addElement('shape')}
          >
            <Ionicons name="shapes" size={24} color={theme.colors.primary} />
            <Text style={styles.toolButtonText}>Shape</Text>
          </Pressable>
        </ScrollView>
      </View>

      {/* Canvas */}
      <ScrollView style={styles.canvasScroll}>
        <View style={styles.canvas}>
          {elements.length === 0 ? (
            <View style={styles.emptyCanvas}>
              <Ionicons name="add-circle-outline" size={64} color={theme.colors.gray[300]} />
              <Text style={styles.emptyText}>
                Tap the buttons above to add elements to your PDF
              </Text>
              <Text style={styles.emptySubtext}>
                Add headings, text, images, and shapes
              </Text>
            </View>
          ) : (
            elements.map((element) => (
              <Pressable
                key={element.id}
                style={[
                  styles.element,
                  selectedElement === element.id && styles.elementSelected,
                  { top: element.y, left: element.x },
                ]}
                onPress={() => setSelectedElement(element.id)}
              >
                {element.type === 'heading' ? (
                  <TextInput
                    style={styles.headingInput}
                    value={element.content}
                    onChangeText={(text) => updateElement(element.id, { content: text })}
                    placeholder="Heading"
                    multiline
                  />
                ) : element.type === 'text' ? (
                  <TextInput
                    style={styles.textInput}
                    value={element.content}
                    onChangeText={(text) => updateElement(element.id, { content: text })}
                    placeholder="Enter text..."
                    multiline
                  />
                ) : element.type === 'image' ? (
                  <View style={styles.imagePlaceholder}>
                    <Ionicons name="image" size={48} color={theme.colors.gray[400]} />
                    <Text style={styles.imagePlaceholderText}>Tap to add image</Text>
                  </View>
                ) : (
                  <View style={styles.shapePlaceholder} />
                )}

                {selectedElement === element.id && (
                  <Pressable
                    style={styles.deleteButton}
                    onPress={() => deleteElement(element.id)}
                  >
                    <Ionicons name="close-circle" size={24} color={theme.colors.error} />
                  </Pressable>
                )}
              </Pressable>
            ))
          )}
        </View>
      </ScrollView>

      {/* Info Bar */}
      <View style={styles.infoBar}>
        <View style={styles.infoItem}>
          <Ionicons name="layers" size={16} color={theme.colors.gray[600]} />
          <Text style={styles.infoText}>{elements.length} elements</Text>
        </View>
        {selectedElement && (
          <Text style={styles.infoText}>
            Selected: {elements.find(e => e.id === selectedElement)?.type}
          </Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  toolbar: {
    backgroundColor: theme.colors.white,
    padding: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.gray[200],
    ...theme.shadows.sm,
  },
  toolbarTitle: {
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
  },
  toolButton: {
    alignItems: 'center',
    padding: theme.spacing.md,
    marginRight: theme.spacing.sm,
    backgroundColor: theme.colors.gray[50],
    borderRadius: theme.borderRadius.md,
    minWidth: 80,
  },
  toolButtonText: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.text,
    marginTop: theme.spacing.xs,
  },
  canvasScroll: {
    flex: 1,
  },
  canvas: {
    minHeight: 600,
    backgroundColor: theme.colors.white,
    margin: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    position: 'relative',
    ...theme.shadows.md,
  },
  emptyCanvas: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: theme.spacing.xxxl * 2,
  },
  emptyText: {
    fontSize: theme.fontSize.md,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.gray[600],
    marginTop: theme.spacing.lg,
    textAlign: 'center',
  },
  emptySubtext: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.gray[500],
    marginTop: theme.spacing.xs,
    textAlign: 'center',
  },
  element: {
    position: 'absolute',
    minWidth: 200,
    backgroundColor: theme.colors.white,
    borderWidth: 2,
    borderColor: 'transparent',
    borderRadius: theme.borderRadius.sm,
    padding: theme.spacing.sm,
  },
  elementSelected: {
    borderColor: theme.colors.primary,
    borderStyle: 'dashed',
  },
  headingInput: {
    fontSize: theme.fontSize.xl,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text,
    padding: theme.spacing.xs,
  },
  textInput: {
    fontSize: theme.fontSize.md,
    color: theme.colors.text,
    padding: theme.spacing.xs,
    minHeight: 60,
  },
  imagePlaceholder: {
    width: 200,
    height: 150,
    backgroundColor: theme.colors.gray[100],
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: theme.colors.gray[300],
  },
  imagePlaceholderText: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.gray[600],
    marginTop: theme.spacing.sm,
  },
  shapePlaceholder: {
    width: 150,
    height: 150,
    backgroundColor: theme.colors.primary + '20',
    borderRadius: theme.borderRadius.md,
  },
  deleteButton: {
    position: 'absolute',
    top: -12,
    right: -12,
    backgroundColor: theme.colors.white,
    borderRadius: 12,
    ...theme.shadows.md,
  },
  infoBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme.colors.white,
    padding: theme.spacing.md,
    borderTopWidth: 1,
    borderTopColor: theme.colors.gray[200],
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xs,
  },
  infoText: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.gray[600],
  },
});

