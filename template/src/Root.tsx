import { Composition } from 'remotion';
import { VIDEO_COMPOSITIONS } from './video-styles/registry';

export const Root: React.FC = () => {
  return (
    <>
      {VIDEO_COMPOSITIONS.map((route) => (
        <Composition
          key={route.id}
          id={route.id}
          component={route.component}
          durationInFrames={route.durationInFrames}
          fps={route.fps}
          width={route.width}
          height={route.height}
          defaultProps={route.defaultProps}
        />
      ))}
    </>
  );
};
