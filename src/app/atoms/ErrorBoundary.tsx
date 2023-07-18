import React, { Component } from "react";

type ErrorBoundaryProps = {
  fallback: React.ReactNode;
  children: React.ReactNode;
};

type ErrorBoundaryState = { didCatch: boolean };

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);

    this.state = { didCatch: false };
  }

  static getDerivedStateFromError() {
    return { didCatch: true };
  }

  render() {
    if (this.state.didCatch) {
      return this.props.fallback;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
