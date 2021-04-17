import "./Action.scss";

export default function Action({ autoplay, onAutoplayChange, time = 0 }) {
  return (
    <div className="Action">
      <button
        onClick={() => onAutoplayChange(!autoplay)}
        aria-label={autoplay ? "Stop" : "Play"}
      >
        {autoplay ? "▶" : "■"}
      </button>
      <div className="timeline" style={{ width: `${time}%` }} />
    </div>
  );
}
