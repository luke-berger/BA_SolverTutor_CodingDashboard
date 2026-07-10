/**
 * Code execution service - communicates with the backend server
 */

const API_BASE_URL = '/api';

export interface ExecutionResponse {
  success: boolean;
  stdout: string;
  stderr: string;
  error?: string;
  testsFailed?: boolean;
}

/**
 * Execute Python code on the backend
 */
export async function executePython(code: string, timeout = 5000): Promise<ExecutionResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/execute`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code, timeout }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    return {
      success: false,
      stdout: '',
      stderr: `Connection error: ${error instanceof Error ? error.message : 'Unknown error'}`,
      error: `Failed to execute code: ${error instanceof Error ? error.message : 'Unknown error'}`,
    };
  }
}

/**
 * Run tests with modified task code
 */
export async function runTaskTests(
  taskCode: string,
  testCode: string,
  taskFilename = 'task1_bug.py',
  timeout = 10000
): Promise<ExecutionResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/run-task`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ taskCode, testCode, taskFilename, timeout }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    return {
      success: false,
      stdout: '',
      stderr: `Connection error: ${error instanceof Error ? error.message : 'Unknown error'}`,
      error: `Failed to run tests: ${error instanceof Error ? error.message : 'Unknown error'}`,
    };
  }
}

/**
 * Run pytest tests on the backend
 */
export async function runTests(testCode: string, timeout = 10000): Promise<ExecutionResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/test`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ testCode, timeout }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    return {
      success: false,
      stdout: '',
      stderr: `Connection error: ${error instanceof Error ? error.message : 'Unknown error'}`,
      error: `Failed to run tests: ${error instanceof Error ? error.message : 'Unknown error'}`,
    };
  }
}

/**
 * Check if the backend server is running
 */
export async function checkServerHealth(): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE_URL}/health`);
    return response.ok;
  } catch {
    return false;
  }
}
