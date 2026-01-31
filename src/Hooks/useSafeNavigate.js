// 4. useSafeNavigate.js (Custom Hook)
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { openModal } from '../store/reducer/unSavedChangesSlice';

export const useSafeNavigate = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const hasUnsavedChanges = useSelector((state) => state.unSavedChangesSlice.hasUnsavedChanges);

  console.log("hasUnsavedChanges", hasUnsavedChanges);
  

  const safeNavigate = (path) => {
    console.log('path', path);
    
    if (hasUnsavedChanges) {
      dispatch(openModal(path)); // Open modal and store pending path
    } else {
      navigate(path);
    }
  };

  return safeNavigate;
};