import Konva from "konva";
import { type FC, useCallback, useEffect, useRef, useState } from "react";
import { Group, Rect } from "react-konva";
import type { TargetDTO } from "types";

type TargetProps = TargetDTO & {
  layoutWidth: number;
  layoutHeight: number;
  onHit: (id: number) => void;
  onMiss: (id: number) => void;
};

const HEIGHT = 100;

const Target: FC<TargetProps> = ({
  onHit,
  onMiss,
  id,
  duration,
  layoutWidth,
  layoutHeight,
}) => {
  const [animation, setAnimation] = useState<Konva.Animation>();
  const ref = useRef<Konva.Rect>(null);
  const hitHandler = useCallback(() => {
    animation?.stop();
    if (ref.current) {
      const tween = new Konva.Tween({
        node: ref.current,
        duration: 2,
        y: layoutHeight,
      });
      setTimeout(() => tween.play(), 500);
    }
    onHit(id);
  }, [onHit, id, animation, layoutHeight]);

  useEffect(() => {
    const animation = new Konva.Animation(({ time }) => {
      if (time > duration) {
        onMiss(id);
      }
      const position = {
        x: (layoutWidth * time) / duration,
        y: 50 * Math.cos(time / 300) + HEIGHT / 2,
      };
      ref.current?.position(position);
    });
    setAnimation(animation);
    animation.start();
  }, [duration, layoutWidth, onMiss, id]);

  return (
    <Group width={layoutWidth} height={HEIGHT}>
      <Rect width={30} height={30} fill="red" onClick={hitHandler} ref={ref} />
    </Group>
  );
};

export default Target;
