const API_BASE_URL = 'http://localhost:3001/api';

// send telemetry data to the backend API
export async function submitTelemetryData(endpoint: string, payload: unknown): Promise<Response> {
  const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error('network response was not ok');
  }

  return response;
}
