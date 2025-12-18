import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

function ProgressChart({ data }) {
  if (!data.length) return null;

  return (
    <div className="card">
      <h3>Progress (Last Sessions)</h3>

      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />

          <Line
            type="monotone"
            dataKey="wpm"
            stroke="#38bdf8"
            strokeWidth={2}
          />

          <Line
            type="monotone"
            dataKey="accuracy"
            stroke="#22c55e"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ProgressChart;
