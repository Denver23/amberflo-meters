import React, { ErrorInfo } from "react";
import { Alert, message } from "antd";

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: { hasError: boolean };
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    message.error(error.message);
  }

  render(): React.ReactNode {
    const { hasError } = this.state;
    const { children } = this.props;

    if (hasError) {
      return (
        <Alert
          message="Oops. Something went wrong"
          description={"Keep calm and refresh the page"}
          type="error"
          showIcon
        />
      );
    }

    return children;
  }
}
