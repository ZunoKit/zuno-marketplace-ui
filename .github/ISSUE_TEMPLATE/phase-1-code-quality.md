---
name: 🔧 Phase 1 - Code Quality Fixes
about: Fix ESLint warnings and complete TODOs for better code quality
title: "[PHASE 1] Fix Code Quality Issues"
labels: "bug, phase-1, code-quality, medium-priority"
assignees: ""
---

## 🎯 **Objective**

Clean up existing code issues, fix ESLint warnings, and complete TODO items.

## 📋 **Current Issues to Fix**

### **1.1 ESLint Warnings (6 total)**

- [ ] **MintDetails.tsx:265** - Remove unused variable `presale`
- [ ] **CollectionImageCarousel.tsx:43** - Fix missing dependencies in useEffect hook
- [ ] **MintPanel.tsx:32** - Remove unused variable `currentGalleryImage`
- [ ] **mockCollection.ts:43** - Remove unused variable `KindSpec`
- [ ] **mockCollection.ts:115** - Remove unused variable `primary`
- [ ] **mockCollection.ts:118** - Remove unused variable `maybeExtra`

### **1.2 Complete TODOs**

- [ ] **AllowlistStage.tsx** - Implement save allowlist stage data to form
- [ ] **PublicStage.tsx** - Implement save public stage data to form

### **1.3 Code Cleanup**

- [ ] Remove unused imports across components
- [ ] Clean up mock data that's not being used
- [ ] Standardize component prop types
- [ ] Add proper JSDoc comments to complex functions
- [ ] Ensure all async functions have proper error handling

### **1.4 TypeScript Improvements**

- [ ] Add strict null checks where missing
- [ ] Fix any remaining `any` types
- [ ] Ensure all props have proper interface definitions
- [ ] Add return type annotations for complex functions

## **📝 Detailed Fix Instructions**

### **Fix 1: MintDetails.tsx unused variable**

```typescript
// Line 265 - Remove this line:
const presale = watch("presale");
```

### **Fix 2: CollectionImageCarousel.tsx useEffect dependencies**

```typescript
// Add missing dependencies or use useCallback
useEffect(() => {
  // existing code
}, [handleNext, handlePrevious, autoPlay]); // Add missing deps
```

### **Fix 3: Complete AllowlistStage TODO**

```typescript
// In AllowlistStage.tsx, implement:
const handleSaveAllowlist = (data: AllowlistData) => {
  // Save to form context or parent component
  onSave?.(data);
};
```

### **Fix 4: Complete PublicStage TODO**

```typescript
// In PublicStage.tsx, implement:
const handleSavePublicStage = (data: PublicStageData) => {
  // Save to form context or parent component
  onSave?.(data);
};
```

## **🧹 Cleanup Tasks**

- [ ] Run `pnpm lint:fix` and ensure no warnings
- [ ] Run type checking and fix any errors
- [ ] Update component documentation
- [ ] Ensure all components have proper error boundaries
- [ ] Add loading states where missing

## **✅ Acceptance Criteria**

- [ ] ESLint runs with 0 warnings
- [ ] TypeScript compiles with 0 errors
- [ ] All TODOs are completed or have tracking issues
- [ ] Code follows project conventions
- [ ] All functions have proper error handling
- [ ] Components are properly documented

## **🔗 Related Issues**

- Blocks: All other Phase 1 tasks

## **⏱️ Estimated Time**

**1-2 days**

## **🏷️ Labels**

`bug` `phase-1` `code-quality` `medium-priority` `eslint` `typescript`
