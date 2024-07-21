import Skeleton from "react-loading-skeleton";

export function InfoSkeleton() {
  return (
    <div className="flex flex-col gap-2">
      <Skeleton
        baseColor="#292929"
        highlightColor="#444"
        width={140}
        height={20}
      />
      <Skeleton
        baseColor="#292929"
        highlightColor="#444"
        width={180}
        height={18}
      />
    </div>
  );
}
