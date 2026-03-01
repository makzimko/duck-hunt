import Konva from "konva";
import { type FC, useCallback, useEffect, useRef, useState } from "react";
import { Group, Sprite } from "react-konva";
import type { TargetDTO } from "types";
import useImage from "use-image";

type TargetProps = TargetDTO & {
  layoutWidth: number;
  layoutHeight: number;
  onHit: (id: number) => void;
  onMiss: (id: number) => void;
};

const WIDTH = 115;
const HEIGHT = 100;

const animations = {
  flying: [7, 9, WIDTH, HEIGHT, 7, 145, WIDTH, HEIGHT],
  hit: [7, 260, WIDTH, WIDTH],
};

const Target: FC<TargetProps> = ({
  onHit,
  onMiss,
  id,
  duration,
  layoutWidth,
  layoutHeight,
}) => {
  const [image] = useImage("/duck.png");
  const audio = useRef(new Audio());
  const [targetState, setTargetState] = useState<"flying" | "hit">("flying");
  const animationRef = useRef<Konva.Animation>(null);
  const ref = useRef<Konva.Sprite>(null);
  const hitHandler = useCallback(() => {
    animationRef.current?.stop();
    setTargetState("hit");
    audio.current.loop = false;
    audio.current = new Audio("/shot.mp3");
    audio.current.loop = false;
    void audio.current.play();
    if (ref.current) {
      const tween = new Konva.Tween({
        node: ref.current,
        duration: 2,
        y: layoutHeight,
        onFinish: () => onHit(id),
      });
      setTimeout(() => tween.play(), 500);
    }
  }, [onHit, id, layoutHeight]);
  const missHandler = useCallback(
    (id: number) => {
      audio.current.loop = false;
      animationRef.current?.stop();
      onMiss(id);
    },
    [onMiss],
  );

  // useEffect(() => {
  //   if (image) {
  //     void audio.current.play();
  //     ref.current?.start();
  //   }
  // }, [image]);

  // useEffect(() => {
  //   const track = new Audio("/quack.mp3");
  //   track.loop = true;
  //   void track.play();
  //
  //   audio.current = track;
  //
  //   return () => {
  //     if (!audio.current.paused) {
  //       audio.current.pause();
  //       audio.current = new Audio();
  //     }
  //   };
  // }, []);

  useEffect(() => {
    const animation = new Konva.Animation(({ time }) => {
      if (time > duration) {
        animation.stop();
        missHandler(id);
      }
      const position = {
        x: (layoutWidth * time) / duration,
        y: 50 * Math.cos(time / 300) + HEIGHT / 2,
      };
      ref.current?.position(position);
    });
    animation.start();
    animationRef.current = animation;
  }, [duration, layoutWidth, id, missHandler]);

  return (
    <Group width={layoutWidth} height={HEIGHT}>
      {image && (
        <Sprite
          image={image}
          animation={targetState}
          animations={animations}
          frameRate={2}
          ref={ref}
          onClick={hitHandler}
        />
      )}
    </Group>
  );
};

export default Target;
