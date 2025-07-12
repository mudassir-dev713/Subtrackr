// Performance monitoring utilities

interface PerformanceMetric {
  name: string;
  value: number;
  unit: string;
  timestamp: number;
  metadata?: Record<string, any>;
}

class PerformanceMonitor {
  private metrics: PerformanceMetric[] = [];
  private isEnabled: boolean;

  constructor() {
    this.isEnabled = process.env.NODE_ENV === 'production';
  }

  // Start timing an operation
  startTimer(name: string): () => void {
    if (!this.isEnabled) return () => {};

    const startTime = performance.now();

    return () => {
      const endTime = performance.now();
      const duration = endTime - startTime;

      this.recordMetric({
        name,
        value: duration,
        unit: 'ms',
        timestamp: Date.now(),
      });
    };
  }

  // Record a custom metric
  recordMetric(metric: Omit<PerformanceMetric, 'timestamp'>): void {
    if (!this.isEnabled) return;

    this.metrics.push({
      ...metric,
      timestamp: Date.now(),
    });

    // Keep only last 1000 metrics to prevent memory leaks
    if (this.metrics.length > 1000) {
      this.metrics = this.metrics.slice(-1000);
    }
  }

  // Get metrics for a specific operation
  getMetrics(name?: string): PerformanceMetric[] {
    if (name) {
      return this.metrics.filter(metric => metric.name === name);
    }
    return [...this.metrics];
  }

  // Get average performance for an operation
  getAverageMetric(name: string): number | null {
    const metrics = this.getMetrics(name);
    if (metrics.length === 0) return null;

    const sum = metrics.reduce((acc, metric) => acc + metric.value, 0);
    return sum / metrics.length;
  }

  // Clear all metrics
  clearMetrics(): void {
    this.metrics = [];
  }

  // Export metrics for analysis
  exportMetrics(): PerformanceMetric[] {
    return [...this.metrics];
  }
}

// Global performance monitor instance
export const performanceMonitor = new PerformanceMonitor();

// Utility functions for common performance measurements
export const measureApiCall = async <T>(
  name: string,
  apiCall: () => Promise<T>
): Promise<T> => {
  const stopTimer = performanceMonitor.startTimer(`api_${name}`);

  try {
    const result = await apiCall();
    stopTimer();
    return result;
  } catch (error) {
    stopTimer();
    performanceMonitor.recordMetric({
      name: `api_${name}_error`,
      value: 1,
      unit: 'count',
      metadata: { error: error.message },
    });
    throw error;
  }
};

export const measureDatabaseQuery = async <T>(
  name: string,
  query: () => Promise<T>
): Promise<T> => {
  const stopTimer = performanceMonitor.startTimer(`db_${name}`);

  try {
    const result = await query();
    stopTimer();
    return result;
  } catch (error) {
    stopTimer();
    performanceMonitor.recordMetric({
      name: `db_${name}_error`,
      value: 1,
      unit: 'count',
      metadata: { error: error.message },
    });
    throw error;
  }
};

// React component performance measurement
export const measureComponentRender = (componentName: string) => {
  const stopTimer = performanceMonitor.startTimer(`render_${componentName}`);

  return () => {
    stopTimer();
  };
};

// Memory usage monitoring
export const getMemoryUsage = (): Record<string, number> => {
  if (typeof process !== 'undefined') {
    const usage = process.memoryUsage();
    return {
      rss: Math.round(usage.rss / 1024 / 1024), // MB
      heapTotal: Math.round(usage.heapTotal / 1024 / 1024), // MB
      heapUsed: Math.round(usage.heapUsed / 1024 / 1024), // MB
      external: Math.round(usage.external / 1024 / 1024), // MB
    };
  }
  return {};
};

// Performance budget checking
export const checkPerformanceBudget = (
  metricName: string,
  threshold: number
): boolean => {
  const average = performanceMonitor.getAverageMetric(metricName);
  return average !== null && average <= threshold;
};
