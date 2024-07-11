import Skeleton from "react-loading-skeleton";

export function ActivitySkeleton() {
  return (
    <div className="flex flex-col gap-2">
      <>
        <Skeleton
          baseColor="#292929"
          highlightColor="#444"
          width={145}
          height={24}
        />
        <Skeleton baseColor="#292929" highlightColor="#444" height={44} />
      </>
    </div>
  );
}
