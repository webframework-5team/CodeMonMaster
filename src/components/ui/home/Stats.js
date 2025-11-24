import statsData from "./StatusData";

export default function Stats() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8 max-w-4xl mx-auto">
      {statsData.map((item, idx) => (
        <div key={idx} className="bg-white rounded-lg p-4 text-center shadow-sm">
          <div className="text-2xl">{item.icon}</div>
          <div className="text-2xl font-bold">{item.value}</div>
          <div className="text-sm text-muted-foreground">{item.label}</div>
        </div>
      ))}
    </div>
  );
}
