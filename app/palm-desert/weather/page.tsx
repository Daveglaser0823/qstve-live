'use client';

import { useEffect, useState } from 'react';
import { Cloud, Sun, Droplets, Wind, Eye, Thermometer, ExternalLink } from 'lucide-react';

const WEATHER_ICONS: Record<string, string> = {
  'Sunny': '☀️', 'Clear': '🌙', 'Partly cloudy': '⛅', 'Cloudy': '☁️',
  'Overcast': '☁️', 'Mist': '🌫️', 'Fog': '🌫️', 'Light rain': '🌦️',
  'Rain': '🌧️', 'Heavy rain': '🌧️', 'Thunderstorm': '⛈️', 'Snow': '❄️',
  'Patchy rain possible': '🌦️', 'Light drizzle': '🌦️',
};

function getWeatherIcon(desc: string) {
  return WEATHER_ICONS[desc] || '🌤️';
}

function tempColor(f: number) {
  if (f >= 100) return '#ef4444';
  if (f >= 90) return '#f97316';
  if (f >= 80) return '#eab308';
  if (f >= 70) return '#4ade80';
  if (f >= 60) return '#60a5fa';
  return '#93c5fd';
}

export default function Weather() {
  const [weather, setWeather] = useState<any>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('https://wttr.in/Palm+Desert+CA?format=j1')
      .then(r => r.json())
      .then(setWeather)
      .catch(() => setError('Failed to load weather'));
  }, []);

  if (error) return <div style={{ textAlign: 'center', color: 'var(--pd-red)', padding: 64 }}>{error}</div>;
  if (!weather) return <div style={{ textAlign: 'center', color: 'var(--pd-text3)', padding: 64 }}>Loading weather...</div>;

  const current = weather.current_condition?.[0];
  const forecast = weather.weather || [];
  const todayHourly = forecast[0]?.hourly || [];

  const tempF = current?.temp_F;
  const feelsLike = current?.FeelsLikeF;
  const desc = current?.weatherDesc?.[0]?.value || 'Unknown';
  const humidity = current?.humidity;
  const windMph = current?.windspeedMiles;
  const visibility = current?.visibilityMiles;
  const uvIndex = current?.uvIndex;

  return (
    <div className="pd-space-y">
      <div>
        <h1 style={{ fontSize: 24, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 8 }}>
          <Sun size={28} color="var(--pd-gold)" /> Weather
        </h1>
        <p style={{ color: 'var(--pd-text2)', fontSize: 14, marginTop: 4 }}>Palm Desert, CA</p>
      </div>

      {/* Current Conditions */}
      <div className="pd-card" style={{ textAlign: 'center' }}>
        <div style={{ fontSize: 64 }}>{getWeatherIcon(desc)}</div>
        <div style={{ fontSize: 56, fontWeight: 800, color: tempColor(Number(tempF)) }}>{tempF}°F</div>
        <div style={{ fontSize: 18, color: 'var(--pd-text2)', marginBottom: 8 }}>{desc}</div>
        <div style={{ fontSize: 14, color: 'var(--pd-text3)' }}>Feels like {feelsLike}°F</div>

        <div className="pd-grid-4" style={{ marginTop: 20 }}>
          <div style={{ textAlign: 'center' }}>
            <Droplets size={20} color="var(--pd-blue)" style={{ margin: '0 auto 4px' }} />
            <div style={{ fontSize: 16, fontWeight: 600 }}>{humidity}%</div>
            <div style={{ fontSize: 11, color: 'var(--pd-text3)' }}>Humidity</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Wind size={20} color="var(--pd-text2)" style={{ margin: '0 auto 4px' }} />
            <div style={{ fontSize: 16, fontWeight: 600 }}>{windMph} mph</div>
            <div style={{ fontSize: 11, color: 'var(--pd-text3)' }}>Wind</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Eye size={20} color="var(--pd-text2)" style={{ margin: '0 auto 4px' }} />
            <div style={{ fontSize: 16, fontWeight: 600 }}>{visibility} mi</div>
            <div style={{ fontSize: 11, color: 'var(--pd-text3)' }}>Visibility</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Sun size={20} color="var(--pd-gold)" style={{ margin: '0 auto 4px' }} />
            <div style={{ fontSize: 16, fontWeight: 600 }}>{uvIndex}</div>
            <div style={{ fontSize: 11, color: 'var(--pd-text3)' }}>UV Index</div>
          </div>
        </div>
      </div>

      {/* 3-Day Forecast */}
      <div className="pd-card">
        <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16 }}>📅 3-Day Forecast</h2>
        <div className="pd-space-y-sm">
          {forecast.slice(0, 3).map((day: any, i: number) => {
            const d = new Date(day.date + 'T12:00:00');
            const dayName = i === 0 ? 'Today' : d.toLocaleDateString('en-US', { weekday: 'short' });
            const hi = day.maxtempF;
            const lo = day.mintempF;
            const dayDesc = day.hourly?.[4]?.weatherDesc?.[0]?.value || 'Clear';
            return (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, background: 'var(--pd-surface2)', borderRadius: 12, padding: 14 }}>
                <div style={{ width: 48, textAlign: 'center' }}>
                  <div style={{ fontSize: 28 }}>{getWeatherIcon(dayDesc)}</div>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600 }}>{dayName}</div>
                  <div style={{ fontSize: 13, color: 'var(--pd-text3)' }}>{dayDesc}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontWeight: 700, fontSize: 18, color: tempColor(Number(hi)) }}>{hi}°</span>
                  <span style={{ color: 'var(--pd-text3)', marginLeft: 8 }}>{lo}°</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Hourly Today */}
      <div className="pd-card">
        <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16 }}>🕐 Today Hourly</h2>
        <div style={{ display: 'flex', overflowX: 'auto', gap: 12, paddingBottom: 8 }}>
          {todayHourly.map((h: any, i: number) => {
            const hour = parseInt(h.time) / 100;
            const label = hour === 0 ? '12am' : hour < 12 ? `${hour}am` : hour === 12 ? '12pm' : `${hour - 12}pm`;
            const hDesc = h.weatherDesc?.[0]?.value || '';
            return (
              <div key={i} style={{ textAlign: 'center', minWidth: 64, background: 'var(--pd-surface2)', borderRadius: 12, padding: '12px 8px', flexShrink: 0 }}>
                <div style={{ fontSize: 12, color: 'var(--pd-text3)', marginBottom: 4 }}>{label}</div>
                <div style={{ fontSize: 24 }}>{getWeatherIcon(hDesc)}</div>
                <div style={{ fontWeight: 600, color: tempColor(Number(h.tempF)), marginTop: 4 }}>{h.tempF}°</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Weather.com Link */}
      <a href="https://weather.com/weather/today/l/33.72,-116.38" target="_blank" rel="noopener noreferrer"
         className="pd-btn pd-btn-primary" style={{ display: 'flex', justifyContent: 'center', width: '100%', padding: 14 }}>
        <ExternalLink size={16} /> View on Weather.com
      </a>
    </div>
  );
}
