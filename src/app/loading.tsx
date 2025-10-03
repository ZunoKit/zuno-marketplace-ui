export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen p-4 md:p-8">
      <div className="w-full max-w-md space-y-6 text-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
        <div className="space-y-3">
          <h1 className="text-4xl font-bold tracking-tighter text-foreground sm:text-5xl animate-bounce">
            Loading...
          </h1>
          <p className="text-muted-foreground">
            Please wait while we fetch the data...
          </p>
        </div>
      </div>
    </div>
  );
}
