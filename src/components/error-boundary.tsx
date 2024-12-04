import React, { Component, ReactNode } from "react";

// Define the state and props interfaces (optional for TypeScript)
interface ErrorBoundaryState {
  hasError: boolean;
}

interface ErrorBoundaryProps {
  children: ReactNode;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false }; // Initialize with no error
  }

  // Update state when an error occurs
  static getDerivedStateFromError(error: Error) {
    return { hasError: true };
  }

  // Log the error (optional)
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Render fallback UI when an error occurs
      return <h2>Something went wrong. Please try again later.</h2>;
    }

    // Render children components if no error
    return this.props.children;
  }
}

export default ErrorBoundary;
