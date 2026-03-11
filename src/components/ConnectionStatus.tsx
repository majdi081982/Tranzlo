"use client";

import React, { useEffect, useState } from 'react';
import { client } from '@/lib/appwrite';
import { Badge } from '@/components/ui/badge';
import { Wifi, WifiOff, Loader2, Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const ConnectionStatus = () => {
  const [status, setStatus] = useState<'checking' | 'online' | 'offline'>('checking');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkConnection = async () => {
      try {
        const response = await fetch(`${client.config.endpoint}/health`, { method: 'GET' });
        if (response.ok) {
          setStatus('online');
        } else {
          setStatus('offline');
          setError(`Status: ${response.status}`);
        }
      } catch (err: any) {
        setStatus('offline');
        setError(err.message || 'Network error');
      }
    };

    checkConnection();
  }, []);

  if (status === 'checking') {
    return (
      <div className="flex items-center gap-2 text-xs text-slate-400">
        <Loader2 className="h-3 w-3 animate-spin" /> Checking Appwrite...
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
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-red-50 text-red-600 border-red-100 gap-1 font-medium">
            <WifiOff className="h-3 w-3" /> API Unreachable
          </Badge>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Info className="h-4 w-4 text-slate-400 cursor-help" />
              </TooltipTrigger>
              <TooltipContent className="max-w-xs">
                <p className="font-bold mb-1">Debugging Info:</p>
                <p className="text-xs break-all">Endpoint: {client.config.endpoint}</p>
                <p className="text-xs mt-1 text-red-500">Error: {error}</p>
                <p className="text-xs mt-2 text-slate-500">Hint: Ensure your domain is added to Appwrite "Platforms". Check if you need HTTPS.</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      )}
    </div>
  );
};

export default ConnectionStatus;