import { useCallback, useEffect, useState } from "react";
import { io, type Socket } from "socket.io-client";
import type { TargetDTO } from "types";
import { useDispatch, useSelector } from "./src/store";
import { addTarget, hitTarget, missTarget } from "./src/store/game.ts";

type Game = {
  targets: TargetDTO[];
  onHit: (id: number) => void;
  onMiss: (id: number) => void;
  start: () => void;
};

const useGame = (): Game => {
  const [socket, setSocket] = useState<Socket>();
  const dispatch = useDispatch();
  const targets = useSelector((state) => state.targets);

  const onHit = useCallback(
    (id: number) => {
      dispatch(hitTarget(id));
      socket?.emit("hit", id);
    },
    [dispatch, socket?.emit],
  );

  const onMiss = useCallback(
    (id: number) => {
      dispatch(missTarget(id));
      socket?.emit("miss", id);
    },
    [dispatch, socket?.emit],
  );

  const start = useCallback(() => {
    const socket = io();
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
  };
};

export default useGame;
