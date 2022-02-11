import { Component, ErrorInfo } from 'react';

interface Props {
  children: React.ReactNode;
}

interface State {
  isError: boolean;
  error: any;
}

export default class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    error: null,
    isError: false,
  };

  static getDerivedStateFromError(error: any): State {
    return { isError: true, error };
  }

  public componentDidCatch(error: any, errorInfo: ErrorInfo) {
    console.error('error:', error, errorInfo);
  }

  render() {
    const { isError } = this.state;
    const { children } = this.props;
    if (isError)
      return (
        <div className="w-screen h-screen flex flex-col space-y-10 justify-center items-center text-black ">
          <div>
            <span className="text-3xl">에러가 발생하였습니다.</span>
          </div>
          <div>
            <span className="text-xl">죄송합니다. 🙏</span>
          </div>
          <div>
            <span className="text-xl">예상치 못한 에러가 발생하였습니다.</span>
          </div>
        </div>
      );
    return children;
  }
}
