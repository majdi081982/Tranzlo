"use client";

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Badge } from '@/components/ui/badge';
import { Wifi, WifiOff, Loader2, Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const ConnectionStatus = () => {
  const [status, setStatus] = useState<'checking' | 'online' | 'offline'>('checking');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkConnection = async () => {
      try {
        // We check the health of the Supabase auth endpoint
        const { error } = await supabase.auth.getSession();
        
        // If it's a "Failed to fetch" it usually throws before returning error
        if (error && error.message.includes('fetch')) {
          throw new Error(error.message);
        }
        
        setStatus('online');
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
        <Loader2 className="h-3 w-3 animate-spin" /> Checking Supabase...
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      {status === 'online' ? (
        <Badge variant="outline" className="bg-emerald-50 text-emerald-600 border-emerald-100 gap-1 font-medium">
          <Wifi className="h-3 w-3" /> Supabase Online
        </Badge>
      ) : (
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-red-50 text-red-600 border-red-100 gap-1 font-medium">
            <WifiOff className="h-3 w-3" /> Supabase Unreachable
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
                  1. <b>Mixed Content:</b> If your site is HTTPS, it cannot call an HTTP Supabase URL.<br/>
                  2. <b>CORS:</b> Ensure your domain is allowed in Supabase Auth settings.<br/>
                  3. <b>Protocol:</b> Try changing the URL to <b>https://</b> if supported.
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