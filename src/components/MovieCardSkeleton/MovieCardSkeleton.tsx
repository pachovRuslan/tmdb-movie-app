import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import s from "./MovieCardSkeleton.module.css";

export const MovieCardSkeleton = () => {
  return (
    <div className={s.card}>
      <Skeleton className={s.poster} />
      <div className={s.info}>
        <Skeleton className={s.line} />
        <Skeleton className={`${s.line} ${s.lineShort}`} />
      </div>
    </div>
  );
};
