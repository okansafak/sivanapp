
import { LogEntry, DeviceInfo } from '../types';

const LOG_STORAGE_KEY = 'system_logs';

// IP Adresini önbellekte tutmak için (Her logda tekrar fetch etmemek için)
let cachedIp: string | null = null;

// Uygulama başladığında IP'yi arka planda çekmeye çalış
if (typeof window !== 'undefined') {
  fetch('https://api.ipify.org?format=json')
    .then(response => response.json())
    .then(data => {
      cachedIp = data.ip;
    })
    .catch(err => console.warn("IP adresi alınamadı:", err));
}

export const getBrowserInfo = (): DeviceInfo => {
  if (typeof window === 'undefined') {
    return {
      userAgent: 'Server Side',
      platform: 'Unknown',
      language: 'Unknown',
      screenResolution: 'Unknown'
    };
  }

  const nav = window.navigator as any;
  
  return {
    userAgent: nav.userAgent,
    platform: nav.platform || 'Bilinmiyor',
    language: nav.language || 'Bilinmiyor',
    screenResolution: `${window.screen.width}x${window.screen.height}`,
    connectionType: nav.connection ? nav.connection.effectiveType : 'Bilinmiyor',
    ipAddress: cachedIp || 'Yükleniyor/Bilinmiyor'
  };
};

export const addLog = (action: string, details: string, userEmail: string) => {
  const deviceInfo = getBrowserInfo();

  const newLog: LogEntry = {
    id: Date.now().toString(),
    action,
    details,
    userEmail,
    timestamp: new Date().toISOString(),
    deviceInfo: deviceInfo
  };

  const logs = getLogs();
  // Keep last 500 logs
  const updatedLogs = [newLog, ...logs].slice(0, 500);
  localStorage.setItem(LOG_STORAGE_KEY, JSON.stringify(updatedLogs));
};

export const getLogs = (): LogEntry[] => {
  const stored = localStorage.getItem(LOG_STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const clearLogs = () => {
  localStorage.removeItem(LOG_STORAGE_KEY);
};