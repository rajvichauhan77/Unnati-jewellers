import React, { useState, useEffect, useMemo, useRef } from "react";
import { Link } from "react-router-dom";
import { fetchGoldRate, fetchGoldRateHistory } from "../services/goldRateService";
import * as echarts from "echarts";
import { io } from "socket.io-client";
import "./GoldRate.css";

// Helper to generate last 30 days of data based on today's rates
const generateHistoricalData = (today24k, today22k) => {
  const data = [];
  const today = new Date();

  for (let i = 29; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);

    // Create a smooth, deterministic wave for historical fluctuations
    // Wave ranges between -4% and +4%
    const wave = 0.03 * Math.sin(i * 0.35) + 0.015 * Math.cos(i * 0.2) - 0.005 * (i / 15);
    const finalFactor = i === 0 ? 0 : wave;

    const rate24 = Math.round(today24k * (1 + finalFactor));
    const rate22 = Math.round(today22k * (1 + finalFactor));
    const rate20 = Math.round(rate22 * 0.91); // 20k is approx 91% of 22k rate
    const rate18 = Math.round(rate22 * 0.83); // 18k is approx 83% of 22k rate

    data.push({
      date,
      displayDate: date.toLocaleDateString("en-GB", { day: "2-digit", month: "short" }), // e.g. "08 Jun"
      fullDate: date.toLocaleDateString("en-GB").replace(/\//g, "-"), // e.g. "08-07-2026"
      rate24kt: rate24,
      rate22kt: rate22,
      rate20kt: rate20,
      rate18kt: rate18,
    });
  }
  return data;
};

export default function GoldRate() {
  const [liveRate, setLiveRate] = useState(null);
  const [historyData, setHistoryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedKarat, setSelectedKarat] = useState("22"); // "18", "22", "24"
  const [trendVariant, setTrendVariant] = useState("all"); // "all", "18", "22", "24"
  const [timePeriod, setTimePeriod] = useState("24h"); // "24h", 7, 14, 30

  const chartRef = useRef(null);

  useEffect(() => {
    setLoading(true);

    Promise.all([fetchGoldRate(), fetchGoldRateHistory()])
      .then(([rate, history]) => {
        setLiveRate(rate);

        if (history && history.length > 0) {
          // Format history data to match expected structure
          // Carry forward last valid values to prevent drops
          const sorted = history.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
          
          let lastValidGold = 7250;
          
          const firstGold = sorted.find(item => item.goldCalculated?.k24 > 0);
          if (firstGold) lastValidGold = firstGold.goldCalculated.k24;

          const formatted = sorted.map(item => {
            const currentGold = item.goldCalculated?.k24 || 0;
            if (currentGold > 0) lastValidGold = currentGold;

            const date = new Date(item.createdAt);
            return {
              date,
              createdAt: item.createdAt,
              displayDate: date.toLocaleDateString("en-GB", { day: "2-digit", month: "short" }),
              fullDate: date.toLocaleDateString("en-GB").replace(/\//g, "-"),
              rate24kt: Math.round(lastValidGold),
              rate22kt: Math.round(lastValidGold * 0.89),
              rate20kt: Math.round(lastValidGold * 0.84),
              rate18kt: Math.round(lastValidGold * 0.76)
            };
          });
          setHistoryData(formatted);
        } else {
          // No dummy data! Populate with a single current rate point
          const date = new Date();
          setHistoryData([{
            date,
            createdAt: date.toISOString(),
            displayDate: date.toLocaleDateString("en-GB", { day: "2-digit", month: "short" }),
            fullDate: date.toLocaleDateString("en-GB").replace(/\//g, "-"),
            rate24kt: rate.rate24kt,
            rate22kt: rate.rate22kt,
            rate20kt: rate.rate20kt,
            rate18kt: rate.rate18kt
          }]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load live gold rates:', err);
        const fallbackRate = {
          rate22kt: 1329,
          rate24kt: 1429,
          currency: "₹",
          unit: "g",
        };
        setLiveRate(fallbackRate);
        const date = new Date();
        setHistoryData([{
          date,
          createdAt: date.toISOString(),
          displayDate: date.toLocaleDateString("en-GB", { day: "2-digit", month: "short" }),
          fullDate: date.toLocaleDateString("en-GB").replace(/\//g, "-"),
          rate24kt: fallbackRate.rate24kt,
          rate22kt: fallbackRate.rate22kt,
          rate20kt: Math.round(fallbackRate.rate22kt * 0.91),
          rate18kt: Math.round(fallbackRate.rate22kt * 0.83)
        }]);
        setLoading(false);
      });
  }, []);

  // Listen to Socket.io for live updates
  useEffect(() => {
    const socket = io('https://api.unnatijewellers.com', {
      transports: ['websocket']
    });

    socket.on('metal-rates-update', (payload) => {
      if (payload && payload.success && payload.data) {
        const data = payload.data;
        const newRate = {
          rate24kt: Math.round(data.goldCalculated.k24),
          rate22kt: Math.round(data.goldCalculated.k22),
          rate20kt: Math.round(data.goldCalculated.k20),
          rate18kt: Math.round(data.goldCalculated.k18),
          currency: "₹",
          unit: "g",
          lastUpdated: data.updatedAt || new Date().toISOString()
        };
        setLiveRate(newRate);

        setHistoryData(prev => {
          const date = new Date(data.updatedAt || new Date());
          const newHistoryItem = {
            date,
            createdAt: data.updatedAt || new Date().toISOString(),
            displayDate: date.toLocaleDateString("en-GB", { day: "2-digit", month: "short" }),
            fullDate: date.toLocaleDateString("en-GB").replace(/\//g, "-"),
            rate24kt: newRate.rate24kt,
            rate22kt: newRate.rate22kt,
            rate20kt: newRate.rate20kt,
            rate18kt: newRate.rate18kt
          };
          // Filter out exact duplicate timestamps and append
          const filtered = prev.filter(item => new Date(item.createdAt).getTime() !== new Date(newHistoryItem.createdAt).getTime());
          return [...filtered, newHistoryItem];
        });
      }
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  // Today vs. Yesterday rates
  const currentKaratRates = useMemo(() => {
    if (historyData.length < 2) {
      return { today: liveRate ? liveRate.rate22kt : 1329, yesterday: liveRate ? liveRate.rate22kt : 1329, change: 0, changePercent: 0 };
    }
    const todayData = historyData[historyData.length - 1];
    const yesterdayData = historyData[historyData.length - 2];

    const getRate = (data, karat) => {
      if (karat === "18") return data.rate18kt;
      if (karat === "20") return data.rate20kt;
      if (karat === "24") return data.rate24kt;
      return data.rate22kt;
    };

    const rateTodayVal = getRate(todayData, selectedKarat);
    const rateYesterdayVal = getRate(yesterdayData, selectedKarat);

    const changeVal = rateTodayVal - rateYesterdayVal;
    const changePercent = (changeVal / rateYesterdayVal) * 100;

    return {
      today: rateTodayVal,
      yesterday: rateYesterdayVal,
      change: changeVal,
      changePercent: changePercent,
    };
  }, [historyData, selectedKarat, liveRate]);

  // Filter history list based on selected Karat (shows latest 10 unique days)
  const historyList = useMemo(() => {
    const uniqueDays = {};
    [...historyData].reverse().forEach(item => {
      const dayKey = item.fullDate;
      if (!uniqueDays[dayKey]) {
        let rate = item.rate22kt;
        if (selectedKarat === "18") rate = item.rate18kt;
        if (selectedKarat === "20") rate = item.rate20kt;
        if (selectedKarat === "24") rate = item.rate24kt;
        uniqueDays[dayKey] = {
          fullDate: item.fullDate,
          rate: rate
        };
      }
    });
    return Object.values(uniqueDays).slice(0, 7);
  }, [historyData, selectedKarat]);

  // Initialize ECharts instance
  useEffect(() => {
    if (!chartRef.current || historyData.length === 0) return;

    const myChart = echarts.init(chartRef.current);
    const series = [];
    const colors = {
      '18': '#E2B13C',
      '20': '#C59B27',
      '22': '#A37E1C',
      '24': '#810B38'
    };

    const addSeries = (name, key, color, hasArea) => {
      let filteredList = historyData;
      if (timePeriod === "24h") {
        const cutoff = new Date(Date.now() - 24 * 60 * 60 * 1000);
        filteredList = historyData.filter(item => new Date(item.createdAt || item.date) >= cutoff);
      } else {
        filteredList = historyData.slice(-timePeriod);
      }

      const seriesData = filteredList.map(item => [
        new Date(item.createdAt || item.date).getTime(),
        item[key] * 10 // Graph represents price of 10 grams
      ]);

      const sObj = {
        name,
        type: 'line',
        smooth: true,
        showSymbol: false,
        lineStyle: { color, width: 2.5 },
        itemStyle: { color },
        data: seriesData
      };
      if (hasArea) {
        sObj.areaStyle = {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(129, 11, 56, 0.25)' },
            { offset: 1, color: 'rgba(129, 11, 56, 0.0)' }
          ])
        };
      }
      series.push(sObj);
    };

    if (trendVariant === "all" || trendVariant === "18") addSeries('18 Karat', 'rate18kt', colors['18'], false);
    if (trendVariant === "all" || trendVariant === "20") addSeries('20 Karat', 'rate20kt', colors['20'], false);
    if (trendVariant === "all" || trendVariant === "22") addSeries('22 Karat', 'rate22kt', colors['22'], false);
    if (trendVariant === "all" || trendVariant === "24") addSeries('24 Karat', 'rate24kt', colors['24'], trendVariant === '24' || trendVariant === 'all');

    const option = {
      animation: false,
      tooltip: {
        trigger: 'axis',
        formatter: (params) => {
          const dateStr = new Date(params[0].value[0]).toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          });
          let html = `<div style="font-weight: 600; margin-bottom: 5px; color: #333;">${dateStr}</div>`;
          params.forEach(p => {
            html += `<div style="display:flex; align-items:center; justify-content:space-between; gap:15px; margin-top:2px;">
              <span style="color:#666;"><span style="display:inline-block; width:8px; height:8px; border-radius:50%; background-color:${p.color}; margin-right:6px;"></span>${p.seriesName}</span>
              <span style="font-weight:600; color:#333;">₹ ${Math.round(p.value[1]).toLocaleString('en-IN')}</span>
            </div>`;
          });
          return html;
        },
        backgroundColor: 'rgba(255, 255, 255, 0.96)',
        borderColor: '#e2e8f0',
        borderWidth: 1,
        textStyle: { fontFamily: 'inherit', fontSize: 12 }
      },
      grid: {
        left: '2%',
        right: '2%',
        top: '6%',
        bottom: '15%',
        containLabel: true
      },
      xAxis: {
        type: 'time',
        boundaryGap: false,
        splitNumber: 24,
        minInterval: 3600 * 1000, // Show hourly ticks
        axisLine: { lineStyle: { color: '#cbd5e1' } },
        axisLabel: {
          color: '#64748b',
          formatter: (value) => {
            const date = new Date(value);
            if (timePeriod === "24h") {
              return date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
            }
            return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' });
          },
          style: { fontFamily: 'inherit' }
        },
        splitLine: { show: false }
      },
      yAxis: {
        type: 'value',
        scale: true,
        axisLine: { show: false },
        axisLabel: {
          color: '#64748b',
          formatter: (value) => '₹ ' + Math.round(value).toLocaleString('en-IN'),
          style: { fontFamily: 'inherit' }
        },
        splitLine: { lineStyle: { color: '#f1f5f9' } }
      },
      dataZoom: [
        {
          type: 'slider',
          show: true,
          xAxisIndex: [0],
          bottom: '2%',
          start: 0,
          end: 100,
          borderColor: '#e2e8f0',
          textStyle: { color: '#64748b', fontFamily: 'inherit' }
        }
      ],
      series
    };

    myChart.setOption(option, true);

    const handleResize = () => {
      myChart.resize();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      myChart.dispose();
    };
  }, [historyData, trendVariant, timePeriod]);

  return (
    <main className="gold-rate-page">
      {/* ── Page Hero ── */}
      <div className="gr-hero">
        <div className="gr-hero__container container">
          <h1 className="gr-hero__title">Live Gold Rate</h1>
          <p className="gr-hero__subtitle">
            Indicative live market rates for 24K, 22K, 20K and 18K gold.
          </p>
        </div>
      </div>

      <div className="gr-content container">
        {/* ── Section 1: Rates Tables Row ── */}
        <div className="gr-grid-tables">
          {/* Today vs Yesterday Table */}
          <div className="gr-card">
            <div className="gr-card__header">
              <h2 className="gr-card__title">{selectedKarat} Kt Gold Rate</h2>
              <div className="gr-karat-selector-pill">
                <button
                  className={`gr-pill-btn ${selectedKarat === "18" ? "active" : ""}`}
                  onClick={() => setSelectedKarat("18")}
                >
                  18K
                </button>
                <button
                  className={`gr-pill-btn ${selectedKarat === "20" ? "active" : ""}`}
                  onClick={() => setSelectedKarat("20")}
                >
                  20K
                </button>
                <button
                  className={`gr-pill-btn ${selectedKarat === "22" ? "active" : ""}`}
                  onClick={() => setSelectedKarat("22")}
                >
                  22K
                </button>
                <button
                  className={`gr-pill-btn ${selectedKarat === "24" ? "active" : ""}`}
                  onClick={() => setSelectedKarat("24")}
                >
                  24K
                </button>
              </div>
            </div>

            <div className="gr-table-wrap">
              <table className="gr-table">
                <thead>
                  <tr>
                    <th>Grammage</th>
                    <th className="text-right">Live Rate</th>
                  </tr>
                </thead>
                <tbody>
                  {[1, 10, 100].map((grams) => {
                    const todayVal = currentKaratRates.today * grams;
                    const changeVal = currentKaratRates.change * grams;
                    const isDrop = changeVal < 0;

                    return (
                      <tr key={grams}>
                        <td className="gr-grammage-cell">{grams} G</td>
                        <td className="gr-rate-cell text-right">
                          <span className="gr-rate-num">₹ {todayVal.toLocaleString("en-IN")}</span>
                          <span className={`gr-change-lbl ${isDrop ? "drop" : "rise"}`}>
                            {isDrop ? "" : "+"}{changeVal.toLocaleString("en-IN")} ({isDrop ? "" : "+"}{currentKaratRates.changePercent.toFixed(2)}%)
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* History Table */}
          <div className="gr-card">
            <div className="gr-card__header">
              <h2 className="gr-card__title">Gold Rate History</h2>
              <div className="gr-select-wrap">
                <select
                  value={selectedKarat}
                  onChange={(e) => setSelectedKarat(e.target.value)}
                  className="gr-karat-select"
                  aria-label="Select Karat for History"
                >
                  <option value="18">18 Karat</option>
                  <option value="20">20 Karat</option>
                  <option value="22">22 Karat</option>
                  <option value="24">24 Karat</option>
                </select>
              </div>
            </div>

            <div className="gr-table-wrap scrollable">
              <table className="gr-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th className="text-right">Rate / Gram</th>
                  </tr>
                </thead>
                <tbody>
                  {historyList.map((item) => (
                    <tr key={item.fullDate}>
                      <td className="gr-date-cell">{item.fullDate}</td>
                      <td className="gr-history-rate-cell text-right">₹ {item.rate.toLocaleString("en-IN")}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* ── Section 2: Trends Chart Card ── */}
        <div className="gr-card gr-trends-card">
          <div className="gr-card__header stack-mobile">
            <h2 className="gr-card__title">Gold Rate Trends</h2>
            <div className="gr-chart-filters">
              <button
                className={`gr-filter-btn ${trendVariant === "all" ? "active" : ""}`}
                onClick={() => setTrendVariant("all")}
              >
                All Variants
              </button>
              <button
                className={`gr-filter-btn variant-18 ${trendVariant === "18" ? "active" : ""}`}
                onClick={() => setTrendVariant("18")}
              >
                <span className="dot dot-18"></span> 18 Karat
              </button>
              <button
                className={`gr-filter-btn variant-20 ${trendVariant === "20" ? "active" : ""}`}
                onClick={() => setTrendVariant("20")}
              >
                <span className="dot dot-20"></span> 20 Karat
              </button>
              <button
                className={`gr-filter-btn variant-22 ${trendVariant === "22" ? "active" : ""}`}
                onClick={() => setTrendVariant("22")}
              >
                <span className="dot dot-22"></span> 22 Karat
              </button>
              <button
                className={`gr-filter-btn variant-24 ${trendVariant === "24" ? "active" : ""}`}
                onClick={() => setTrendVariant("24")}
              >
                <span className="dot dot-24"></span> 24 Karat
              </button>
            </div>
          </div>

          {/* ECharts Line Chart */}
          <div className="gr-chart-container" style={{ minHeight: '380px', position: 'relative' }}>
            <div ref={chartRef} style={{ width: '100%', height: '100%', minHeight: '380px' }}></div>
          </div>

          {/* Time Period Filter Buttons */}
          <div className="gr-time-period-selector">
            <span className="gr-time-label">Time Period :</span>
            <button
              className={`gr-period-btn ${timePeriod === "24h" ? "active" : ""}`}
              onClick={() => setTimePeriod("24h")}
            >
              24 Hours
            </button>
            <button
              className={`gr-period-btn ${timePeriod === 7 ? "active" : ""}`}
              onClick={() => setTimePeriod(7)}
            >
              7 Days
            </button>
            <button
              className={`gr-period-btn ${timePeriod === 14 ? "active" : ""}`}
              onClick={() => setTimePeriod(14)}
            >
              14 Days
            </button>
            <button
              className={`gr-period-btn ${timePeriod === 30 ? "active" : ""}`}
              onClick={() => setTimePeriod(30)}
            >
              30 Days
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
