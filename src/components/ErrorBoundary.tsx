import React, { Component, ReactNode } from 'react';
import { useNotification } from '../contexts/NotificationContext';

interface ErrorBoundaryProps {
    children: ReactNode;
    showError: (message: string) => void;
}

interface ErrorBoundaryState {
    hasError: boolean;
    error: Error | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error: Error) {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.error("Uncaught error:", error, errorInfo);
        const { showError } = this.props;
        if (showError) {
            showError(`Something went wrong: ${error.message}`);
        }
    }

    render() {
        if (this.state.hasError) {
            return <h1>Something went wrong.</h1>;
        }

        return this.props.children;
    }
}

const ErrorBoundaryWithNotifications = ({ children }: { children: ReactNode }) => {
    const { showError } = useNotification();
    return <ErrorBoundary showError={showError}>{children}</ErrorBoundary>;
};

export default ErrorBoundaryWithNotifications;