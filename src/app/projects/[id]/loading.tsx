export default function Loading() {
  return (
    <div className="space-y-1">
      {Array(10)
        .fill(0)
        .map((_, i) => i + 1)
        .map((index) => (
          <div key={index} className="h-[35px] w-full " />
        ))}
    </div>
  )
}
