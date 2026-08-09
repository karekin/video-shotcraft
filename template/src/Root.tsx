import { Composition } from 'remotion';
import { RENDER_TARGETS } from './core/contracts';
import { VIDEO_COMPOSITIONS } from './video-styles/registry';

export const Root: React.FC = () => {
  return (
    <>
      {VIDEO_COMPOSITIONS.map((route) => {
        const target = RENDER_TARGETS[route.target];
        return <Composition
          key={route.id}
          id={route.id}
          component={route.component}
          durationInFrames={route.durationInFrames}
          fps={target.fps}
          width={target.width}
          height={target.height}
          defaultProps={route.defaultProps as never}
        />;
      })}
    </>
  );
};
