"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

/**
 * Client cache for data the browser refreshes on its own.
 *
 * Created inside state rather than at module scope: a module-level client is
 * shared across requests on the server, which would leak one visitor's data
 * into another's render.
 */
export function QueryProvider({ children }: { children: React.ReactNode }) {
  const [client] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        // Market data is only worth refetching on a real interval, so a brief
        // stale window keeps remounts from firing duplicate requests.
        staleTime: 30_000,
        retry: 1,
        refetchOnWindowFocus: true
      }
    }
  }));

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}
