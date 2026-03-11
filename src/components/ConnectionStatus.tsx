"use client";

import React, { useEffect, useState } from 'react';
import { client } from '@/lib/appwrite';
import { Badge } from '@/components/ui/badge';
import { Wifi, WifiOff, Loader2 } from 'lucide-react';

const ConnectionStatus = () => {
  const [status, setStatus] = useState<'checking' | 'online' | 'offline'>('checking');

  useEffect(() => {
    const checkConnection = async () => {
      try {
        // Appwrite health check doesn't need auth
        await fetch(`${client.config.endpoint}/health`, { method: 'GET' });
        setStatus('online');
      } catch (err) {
        setStatus('offline');
      }
    };

    checkConnection();
  }, []);

  if (status === 'checking') {
    return (
      <div className="flex items-center gap-2 text-xs text-slate-400">
        <Loader2 className="h-3 w-3 animate-spin" /> Checking server...
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      {status === 'online' ? (
        <Badge variant="outline" className="bg-emerald-50 text-emerald-600 border-emerald-100 gap-1 font-medium">
          <Wifi className="h-3 w-3" /> API Online
        </Badge>
      ) : (
        <Badge variant="outline" className="bg-red-50 text-red-600 border-red-100 gap-1 font-medium">
          <WifiOff className="h-3 w-3" /> API Unreachable
        </Badge>
      )}
    </div>
  );
};

export default ConnectionStatus;