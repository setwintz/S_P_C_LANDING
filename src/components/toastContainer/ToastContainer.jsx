// src/components/ToastContainer.jsx
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeToast } from '../../store/reducer/toastSlice';
import { motion, AnimatePresence } from 'framer-motion';

const toastVariants = {
  initial: {
    opacity: 0,
    y: -40,
    scale: 0.95,
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 30,
    },
  },
  exit: {
    opacity: 0,
    y: -40,
    scale: 0.95,
    transition: {
      duration: 0.2,
    },
  },
};

function ToastItem({ toast }) {
  const dispatch = useDispatch();

  useEffect(() => {
    if (toast.duration > 0) {
      const timer = setTimeout(() => {
        dispatch(removeToast(toast.id));
      }, toast.duration);

      return () => clearTimeout(timer);
    }
  }, [toast.id, toast.duration, dispatch]);

  const variants = {
    success: 'bg-green-50 border-green-700 text-green-600',
    error: 'bg-red-50 border-red-700 text-red-600',
    warning: 'bg-amber-50 border-amber-700 text-amber-600',
    info: 'bg-blue-50 border-blue-700 text-blue-600',
    default: 'bg-gray-50 border-gray-700 text-gray-600',
  };

  const icons = {
    success: '✓',
    error: '✕',
    warning: '⚠',
    info: 'ℹ',
    default: '!',
  };

  const variant = toast.variant || 'default';

  return (
    <motion.div
      layout
      variants={toastVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className={`
        flex items-center relative gap-3 px-4 py-3 rounded-lg border shadow-xl border-l-[4px] border-b-[4px]
        pointer-events-auto ${variants[variant]}
      `}
      role="alert"
    >
      <div className="text-xl font-bold min-w-[1.5rem] text-center">
        {icons[variant]}
      </div>

      <div className="flex-1 text-sm font-medium pr-2">
        {toast.message}
      </div>

      <button
        onClick={() => dispatch(removeToast(toast.id))}
        className="text-black/80 absolute right-0 top-0 hover:text-black rounded-full p-1 transition-colors"
        aria-label="Close toast"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </motion.div>
  );
}

export default function ToastContainer() {
  const toasts = useSelector((state) => state.toastSlice.toasts);

  return (
    <div className="fixed top-6 right-6 z-[1000] flex flex-col-reverse gap-3 max-w-md pointer-events-none">
      <AnimatePresence initial={false}>
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} />
        ))}
      </AnimatePresence>
    </div>
  );
}