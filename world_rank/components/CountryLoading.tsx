import { Card, Skeleton } from "@heroui/react";

export default function CountryLoading() {
  return (
    <Card className="h-[600px] w-full space-y-6 p-4" radius="lg">
      <Skeleton className="mx-auto w-[200px] rounded-lg">
        <div className="h-[100px] rounded-lg bg-default-300" />
      </Skeleton>
      <div className="mb-12 flex flex-col items-center space-y-3">
        <Skeleton className="w-3/5 rounded-lg">
          <div className="h-3 w-3/5 rounded-lg bg-default-200" />
        </Skeleton>
        <Skeleton className="w-2/5 rounded-lg">
          <div className="h-3 w-2/5 rounded-lg bg-default-300" />
        </Skeleton>
        <Skeleton className="w-4/5 rounded-lg">
          <div className="h-3 w-4/5 rounded-lg bg-default-200" />
        </Skeleton>
      </div>

      <div className="space-y-5 p-2">
        <Skeleton className="h-6 w-full rounded-lg">
          <div className="h-3 w-3/5 rounded-lg bg-default-200" />
        </Skeleton>
        <Skeleton className="h-6 w-full rounded-lg">
          <div className="h-3 w-3/5 rounded-lg bg-default-200" />
        </Skeleton>
        <Skeleton className="h-6 w-full rounded-lg">
          <div className="h-3 w-3/5 rounded-lg bg-default-200" />
        </Skeleton>
        <Skeleton className="h-6 w-full rounded-lg">
          <div className="h-3 w-3/5 rounded-lg bg-default-200" />
        </Skeleton>
        <Skeleton className="h-6 w-full rounded-lg">
          <div className="h-3 w-3/5 rounded-lg bg-default-200" />
        </Skeleton>
        <Skeleton className="h-14 w-full rounded-lg">
          <div className="h-3 w-3/5 rounded-lg bg-default-200" />
        </Skeleton>
      </div>
    </Card>
  );
}
