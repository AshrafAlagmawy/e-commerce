import { memo } from 'react';

const Heading = memo(({ title }: { title: string }) => {
  console.log('Rendering');
  return (
    <h2 className="mb-3" style={{ fontSize: '26px' }}>
      <span style={{ textTransform: 'capitalize' }}>{title}</span>
    </h2>
  );
});

export default Heading;
