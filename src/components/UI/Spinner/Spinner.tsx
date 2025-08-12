import styles from "./Spinner.module.css";

interface SpinnerProps {
  size?: number;
  borderWidth?: number;
  color?: string;
  highlightColor?: string; // Цвет активной части линии
  animationDuration?: string;
}

const Spinner: React.FC<SpinnerProps> = ({
  size = 70,
  borderWidth = 2,
  color = "#808080",
  highlightColor = "#B4387A",
  animationDuration = "1.2s",
}) => {
  // радиус круга
  const radius = (size - borderWidth) / 2;
  // длина окружности
  const circumference = 2 * Math.PI * radius;

  return (
    <div
      className={styles.spinnerContainer}
      style={{ width: size, height: size }}
    >
      <svg
        className={styles.spinnerSvg}
        viewBox={`0 0 ${size} ${size}`} // Определяем область просмотра SVG
      >
        {/* Фоновый круг */}
        <circle
          className={styles.spinnerBackgroundCircle}
          cx={size / 2} // Центр по X
          cy={size / 2} // Центр по Y
          r={radius} // Радиус
          stroke={color}
          strokeWidth={borderWidth}
          fill="none"
        />
        {/* Активная часть (розовая) */}
        <circle
          className={styles.spinnerForegroundCircle}
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={highlightColor}
          strokeWidth={borderWidth}
          fill="none"
          strokeDasharray={circumference} // Полная длина окружности
          strokeDashoffset={circumference * 0.75} // Начальное смещение, чтобы показать часть
          style={{ animationDuration: animationDuration }} // Передаем длительность анимации
        />
      </svg>
    </div>
  );
};

export default Spinner;
