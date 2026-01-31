// // 3. UnsavedChangesModal.jsx (Updated for pendingPath)
// import React, { useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { closeModal, confirmLeave } from '../store/reducer/unSavedChangesSlice';

// const UnsavedChangesModal = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const { showModal, pendingPath, hasUnsavedChanges } = useSelector(
//     (state) => state.unSavedChangesSlice    
//   );

//   // Browser refresh/tab close/external navigation
//   useEffect(() => {
//     const handleBeforeUnload = (e) => {
//       if (hasUnsavedChanges) {
//         e.preventDefault();
//         e.returnValue = ''; // Triggers browser warning
//       }
//     };

//     window.addEventListener('beforeunload', handleBeforeUnload);
//     return () => window.removeEventListener('beforeunload', handleBeforeUnload);
//   }, [hasUnsavedChanges]);

//   const handleLeave = () => {
//     if (pendingPath) {
//       navigate(pendingPath);
//     }
//     dispatch(confirmLeave());
//   };

//   const handleStay = () => {
//     dispatch(closeModal());
//   };

//   if (!showModal) return null;

//   return (
//     <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999 }}>
//       <div style={{ background: 'white', padding: '30px', borderRadius: '8px', minWidth: '400px', textAlign: 'center' }}>
//         <h2>All unsaved changes will be lost</h2>
//         <div style={{ marginTop: '20px' }}>
//           <button onClick={handleLeave} style={{ marginRight: '10px', padding: '10px 20px', background: '#ff4d4f', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
//             Leave
//           </button>
//           <button onClick={handleStay} style={{ padding: '10px 20px', background: '#1890ff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
//             Stay
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UnsavedChangesModal;


// UnsavedChangesModal.jsx
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { FiAlertTriangle } from 'react-icons/fi';

import {
  closeModal,
  confirmLeave,
} from '../store/reducer/unSavedChangesSlice';

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modalVariants = {
  hidden: {
    opacity: 0,
    scale: 0.85,
    y: -20,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: 'spring',
      bounce: 0.4,
      duration: 0.5,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    y: 10,
    transition: { duration: 0.2 },
  },
};

const UnsavedChangesModal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { showModal, pendingPath, hasUnsavedChanges } = useSelector(
    (state) => state.unSavedChangesSlice
  );

  // Warn on browser refresh / tab close
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [hasUnsavedChanges]);

  const handleLeave = () => {
    dispatch(confirmLeave());
    if (pendingPath) navigate(pendingPath);
  };

  const handleStay = () => {
    dispatch(closeModal());
  };

  return (
    <AnimatePresence>
      {showModal && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="w-full max-w-md rounded-2xl bg-white dark:bg-cardBgDark p-6 shadow-2xl"
          >
            {/* Icon */}
            <div className="flex justify-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-100 dark:bg-red-50 text-red-600">
                <FiAlertTriangle size={28} />
              </div>
            </div>

            {/* Title */}
            <h2 className="mt-4 text-center text-xl font-semibold text-gray-900 dark:text-gray-500">
              Unsaved Changes
            </h2>

            {/* Description */}
            <p className="mt-2 text-center text-sm text-gray-600">
              You have unsaved changes. If you leave this page, all changes will
              be lost.
            </p>

            {/* Actions */}
            <div className="mt-6 flex justify-center gap-4">
              <button
                onClick={handleStay}
                className="rounded-lg border border-gray-300 dark:border-gray-600 px-5 py-2 text-sm font-medium text-gray-700 dark:text-gray-500 transition hover:bg-gray-100"
              >
                Stay
              </button>

              <button
                onClick={handleLeave}
                className="rounded-lg bg-red-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-red-700"
              >
                Leave Page
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default UnsavedChangesModal;
