import { Suspense } from 'react';
import LottieHandler from '../LottieHandler/LottieHandler';

const PageSuspenseFallback = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Suspense
        fallback={
          <LottieHandler type="loading" message="Loading Please Wait .." />
        }
      >
        {children}
      </Suspense>
    </div>
  );
};

export default PageSuspenseFallback;
