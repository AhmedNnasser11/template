import { create } from 'zustand';
import React from 'react';

export type AlertType = 'success' | 'error' | 'warning' | 'info';

interface AlertState {
  isVisible: boolean;
  type: AlertType;
  title: string;
  message: string;
}

interface ConfirmDialogState {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  confirmText?: string;
  cancelText?: string;
  variant?: 'danger' | 'primary';
}

interface ModalState {
  isOpen: boolean;
  title?: string;
  description?: string;
  content?: React.ReactNode;
}

interface DrawerState {
  isOpen: boolean;
  view: 'mobile-nav' | 'filter' | 'details' | null;
  data?: any;
}

interface UiStore {
  // Global Inline Alert
  alert: AlertState;
  showAlert: (type: AlertType, title: string, message: string) => void;
  hideAlert: () => void;

  // Global Confirm Dialog
  confirmDialog: ConfirmDialogState;
  askConfirm: (params: Omit<ConfirmDialogState, 'isOpen'>) => void;
  closeConfirm: () => void;

  // Generic Global Modal
  modal: ModalState;
  openModal: (params: Omit<ModalState, 'isOpen'>) => void;
  closeModal: () => void;

  // Global Drawer (Sheet)
  drawer: DrawerState;
  openDrawer: (view: DrawerState['view'], data?: any) => void;
  closeDrawer: () => void;
}

export const useUiStore = create<UiStore>((set) => ({
  // Alert
  alert: {
    isVisible: false,
    type: 'info',
    title: '',
    message: '',
  },
  showAlert: (type, title, message) => 
    set({ alert: { isVisible: true, type, title, message } }),
  hideAlert: () => 
    set((state) => ({ alert: { ...state.alert, isVisible: false } })),

  // Confirm Dialog
  confirmDialog: {
    isOpen: false,
    title: '',
    message: '',
    onConfirm: () => {},
    confirmText: 'تأكيد',
    cancelText: 'إلغاء',
    variant: 'primary',
  },
  askConfirm: (params) => 
    set({ confirmDialog: { ...params, isOpen: true, confirmText: params.confirmText || 'تأكيد', cancelText: params.cancelText || 'إلغاء' } }),
  closeConfirm: () => 
    set((state) => ({ confirmDialog: { ...state.confirmDialog, isOpen: false } })),

  // Generic Modal
  modal: {
    isOpen: false,
    title: '',
    description: '',
    content: null,
  },
  openModal: (params) => 
    set({ modal: { ...params, isOpen: true } }),
  closeModal: () => 
    set((state) => ({ modal: { ...state.modal, isOpen: false } })),

  // Drawer
  drawer: {
    isOpen: false,
    view: null,
  },
  openDrawer: (view, data) => 
    set({ drawer: { isOpen: true, view, data } }),
  closeDrawer: () => 
    set((state) => ({ drawer: { ...state.drawer, isOpen: false } })),
}));