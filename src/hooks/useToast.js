'use client';

import React, { createContext, useCallback, useContext, useRef, useState } from 'react';

const ToastContext = createContext(null);

let toastIdSeq = 0;

/**
 * Wrap the app (or just the plot management page) with <ToastProvider>,
 * then call useToast() anywhere inside to push notifications. The
 * <PlotToast /> component renders whatever is in the queue.
 */
export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const timers = useRef(new Map());

  const dismiss = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
    const timer = timers.current.get(id);
    if (timer) {
      clearTimeout(timer);
      timers.current.delete(id);
    }
  }, []);

  const push = useCallback(
    (message, { type = 'success', duration = 3000 } = {}) => {
      const id = ++toastIdSeq;
      setToasts((prev) => [...prev, { id, message, type }]);
      if (duration > 0) {
        const timer = setTimeout(() => dismiss(id), duration);
        timers.current.set(id, timer);
      }
      return id;
    },
    [dismiss]
  );

  const value = { toasts, push, dismiss };

  return <ToastContext.Provider value={value}>{children}</ToastContext.Provider>;
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error('useToast() must be used inside a <ToastProvider>');
  }
  return ctx;
}
