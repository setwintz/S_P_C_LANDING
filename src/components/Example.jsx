// Any component
import { useDispatch } from 'react-redux';
import { addToast } from '../store/reducer/toastSlice';

function Example() {
    const dispatch = useDispatch();

    const showSuccess = () => {
        dispatch(
            addToast({
                message: 'Profile updated successfully!',
                variant: 'success',
                duration: 1000,
            })
        );
    };

    const showError = () => {
        dispatch(
            addToast({
                message: 'Failed to save changes',
                variant: 'error',
                duration: 1000,
            })
        );
    };

    const showWarning = () => {
        dispatch(
            addToast({
                message: 'Failed to save changes',
                variant: 'warning',
                duration: 1000,
            })
        );
    };

    const showInfo = () => {
        dispatch(
            addToast({
                message: 'Failed to save changes',
                variant: 'info',
                duration: 1000,
            })
        );
    };

    const showDefault = () => {
        dispatch(
            addToast({
                message: 'Failed to save changes',
                variant: 'default',
                duration: 1000,
            })
        );
    };

    return (
        <div className="p-6">
            <button
                onClick={showSuccess}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 mr-3"
            >
                Success Toast
            </button>

            <button
                onClick={showError}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
                Error Toast
            </button>

            <button
                onClick={showWarning}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
                Warning Toast
            </button>

            <button
                onClick={showInfo}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
                info Toast
            </button>

            <button
                onClick={showDefault}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
                default Toast
            </button>

        </div>
    );
}

export default Example