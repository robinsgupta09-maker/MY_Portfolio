import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error Boundary caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-4">Oops! Something went wrong</h1>
            <p className="text-gray-400 mb-6">We're having trouble loading the page</p>
            <button
              onClick={() => windows.location.reload()}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
            >
              Reload Page
            </button>
            {process.env.NODE_ENV === 'development' && (
              <pre className="mt-8 text-left bg-slate-900 p-4 rounded text-red-400 text-xs overflow-auto max-w-2xl">
                {this.state.error?.toString()}
              </pre>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
