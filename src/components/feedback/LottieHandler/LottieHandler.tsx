import Lottie from 'lottie-react';
import empty from '@assets/lottieFiles/empty.json';
import loading from '@assets/lottieFiles/loading.json';
import error from '@assets/lottieFiles/error.json';
import notFound from '@assets/lottieFiles/notFound.json';

const lottieFilesMap = {
  notFound,
  error,
  loading,
  empty,
};

type LottieHandlerProps = {
  type: keyof typeof lottieFilesMap;
  message?: string;
  className?: string;
};

const LottieHandler = ({ type, message, className }: LottieHandlerProps) => {
  const lottie = lottieFilesMap[type];
  const messageStyle =
    type === 'error'
      ? { fontSize: '19px', color: 'red' }
      : { fontSize: '19px', marginTop: '30px' };

  return (
    <div className={`d-flex flex-column align-items-center ${className}`}>
      <Lottie animationData={lottie} style={{ width: '400px' }} />
      {message && <h3 style={messageStyle}>{message}</h3>}
    </div>
  );
};

export default LottieHandler;
