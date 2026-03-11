"use client";

import React, { useEffect, useState } from 'react';
import { account } from '@/lib/appwrite';
import { Badge } from '@/components/ui/badge';
import { Wifi, WifiOff, Loader2, Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const ConnectionStatus = () => {
  const [status, setStatus] = useState<'checking' | 'online' | 'offline'>('checking');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkConnection = async () => {
      try {
        // Appwrite connection check
        await account.get();
        setStatus('online');
      } catch (err: any) {
        // Appwrite throws 401 if not logged in, but the server IS reachable.
        // We only mark as offline if the network actually fails.
        if (err.code === 401) {
          setStatus('online');
        } else {
          setStatus('offline');
          setError(err.message || 'Network error');
        }
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
        <Badge variant="outline" className="bg-indigo-50 text-indigo-600 border-indigo-100 gap-1 font-medium">
          <Wifi className="h-3 w-3" /> Appwrite Online
        </Badge>
      ) : (
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-red-50 text-red-600 border-red-100 gap-1 font-medium">
            <WifiOff className="h-3 w-3" /> Appwrite Unreachable
          </Badge>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Info className="h-4 w-4 text-slate-400 cursor-help" />
              </TooltipTrigger>
              <TooltipContent className="max-w-xs">
                <p className="font-bold mb-1">Debugging Info:</p>
                <p className="text-xs break-all">Error: {error}</p>
                <p className="text-xs mt-2 text-slate-500">
                  Possible issues:<br/>
                  1. <b>Mixed Content:</b> If your site is HTTPS, it cannot call an HTTP Appwrite URL.<br/>
                  2. <b>CORS:</b> Ensure your domain is allowed in Appwrite settings.<br/>
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      )}
    </div>
  );
};

export default ConnectionStatus;