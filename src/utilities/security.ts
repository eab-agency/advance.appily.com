const ALLOWED_HOSTS = [process.env.NEXT_PUBLIC_CMS_URL].filter(Boolean);

export class SecurityError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'SecurityError';
  }
}

export function validateAndBuildUrl(baseUrl: string | undefined, path: string): URL {
  if (!baseUrl) {
    throw new SecurityError('Base URL is not configured');
  }

  try {
    // Parse the base URL
    const url = new URL(path, baseUrl);

    // Check if the resulting URL is in our allowed hosts list
    if (!ALLOWED_HOSTS.some(host => url.origin === new URL(host as string).origin)) {
      throw new SecurityError('URL is not in allowed hosts list');
    }

    // Validate URL doesn't try to access local network or use non-HTTP protocols
    if (!url.protocol.startsWith('http')) {
      throw new SecurityError('Invalid URL protocol');
    }

    // Prevent access to internal networks
    const hostname = url.hostname.toLowerCase();
    if (
      hostname === 'localhost' ||
      hostname === '127.0.0.1' ||
      hostname === '::1' ||
      hostname.endsWith('.local') ||
      hostname.includes('internal')
    ) {
      throw new SecurityError('Access to internal networks is not allowed');
    }

    return url;
  } catch (error) {
    if (error instanceof SecurityError) {
      throw error;
    }
    throw new SecurityError('Invalid URL');
  }
}

export async function safeFetch(
  baseUrl: string | undefined,
  path: string,
  options?: RequestInit
): Promise<Response> {
  const url = validateAndBuildUrl(baseUrl, path);

  // Add security headers
  const secureOptions = {
    ...options,
    headers: {
      ...options?.headers,
      'X-Requested-With': 'XMLHttpRequest',
    },
  };

  try {
    const response = await fetch(url.toString(), secureOptions);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}
