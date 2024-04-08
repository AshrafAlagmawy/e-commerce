import { TLoading } from '@customTypes/shared';

type LoadingProps = {
  status: TLoading;
  error: null | string;
  children: React.ReactNode;
};

const Loading = ({ status, error, children }: LoadingProps) => {
  if (status === 'pending') {
    return <p>Loading Please Wait</p>;
  }

  if (status === 'failed') {
    return <p>{error}</p>;
  }

  return <>{children}</>;
};

export default Loading;
