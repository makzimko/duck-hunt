import { type RefObject, useCallback, useEffect, useState } from "react";
import { io, type Socket } from "socket.io-client";
import type { TargetDTO } from "types";
import type { Action } from "./objects/Dog.tsx";
import { useDispatch, useSelector } from "./store";
import { addTarget, hitTarget, missTarget } from "./store/game.ts";

type Game = {
  targets: TargetDTO[];
  onHit: (id: number) => void;
  onMiss: (id: number) => void;
  start: () => void;
  started: boolean;
};

const useGame = (
  action?: RefObject<((action: Action) => void) | null>,
): Game => {
  const [started, setStarted] = useState(false);
  const [socket, setSocket] = useState<Socket>();
  const dispatch = useDispatch();
  const targets = useSelector((state) => state.targets);

  const onHit = useCallback(
    (id: number) => {
      dispatch(hitTarget(id));
      socket?.emit("hit", id);
      action?.current?.("catch");
    },
    [dispatch, socket?.emit, action],
  );

  const onMiss = useCallback(
    (id: number) => {
      dispatch(missTarget(id));
      socket?.emit("miss", id);
      action?.current?.("cry");
    },
    [dispatch, socket?.emit, action],
  );

  const start = useCallback(() => {
    const socket = io();
    setStarted(true);
    setSocket(socket);
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on("target", (target) => dispatch(addTarget(target)));
    }
  }, [socket, dispatch]);

  return {
    targets,
    onHit,
    onMiss,
    start,
    started,
  };
};

export default useGame;
