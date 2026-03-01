import { type FC, type RefObject, useCallback, useState } from "react";
import { Image } from "react-konva";
import useImage from "use-image";

export type Action = "cry" | "laugh" | "catch";

type DogProps = {
  x: number;
  y: number;
  action: RefObject<((action: Action) => void) | null>;
};

const DOG_OFFSET: Record<Action | "default", number> = {
  default: 0,
  laugh: 100,
  cry: 310,
  catch: 450,
};

const Dog: FC<DogProps> = ({ x, y, action }) => {
  const [state, setState] = useState<"default" | Action>("default");
  const [image] = useImage("/dog.png");

  action.current = useCallback((action: Action) => {
    setState(action);
    setTimeout(() => {
      setState("default");
    }, 3000);
  }, []);

  return (
    <Image
      image={image}
      x={x}
      y={y}
      width={148}
      height={148}
      crop={{ x: DOG_OFFSET[state], y: 0, width: 148, height: 148 }}
    />
  );
};

export default Dog;
