import React, { useCallback, useRef } from "react";

const RangeSlider = ({ min, max, valueMin, valueMax, onChange, step = 1, formatLabel }) => {
  const trackRef = useRef(null);

  const pctMin = ((valueMin - min) / (max - min)) * 100;
  const pctMax = ((valueMax - min) / (max - min)) * 100;

  const handleMinChange = useCallback(
    (e) => {
      const next = Math.min(Number(e.target.value), valueMax - step);
      onChange(next, valueMax);
    },
    [valueMax, onChange, step]
  );

  const handleMaxChange = useCallback(
    (e) => {
      const next = Math.max(Number(e.target.value), valueMin + step);
      onChange(valueMin, next);
    },
    [valueMin, onChange, step]
  );

  const label = formatLabel || ((v) => v);

  return (
    <div className="range-slider">
      <div className="range-slider__track" ref={trackRef}>
        <div
          className="range-slider__fill"
          style={{ left: `${pctMin}%`, width: `${pctMax - pctMin}%` }}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={valueMin}
          onChange={handleMinChange}
          className="range-slider__input range-slider__input--min"
          aria-label="Minimum value"
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={valueMax}
          onChange={handleMaxChange}
          className="range-slider__input range-slider__input--max"
          aria-label="Maximum value"
        />
      </div>
      <div className="range-slider__labels">
        <span>{label(valueMin)}</span>
        <span>{label(valueMax)}</span>
      </div>
    </div>
  );
};

export default RangeSlider;
