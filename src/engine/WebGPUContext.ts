let devicePromise: Promise<GPUDevice | null> | null = null;

export function getSharedWebGPUDevice(): Promise<GPUDevice | null> {
  if (!devicePromise) {
    devicePromise = (async () => {
      if (!navigator.gpu) return null;
      const adapter = await navigator.gpu.requestAdapter({ powerPreference: 'low-power' });
      if (!adapter) return null;
      const device = await adapter.requestDevice();
      device.lost.then((info) => {
        console.warn(`WebGPU device lost: ${info.message || info.reason}`);
        devicePromise = null;
      });
      return device;
    })().catch((error) => {
      console.warn('Unable to initialize shared WebGPU device', error);
      devicePromise = null;
      return null;
    });
  }
  return devicePromise;
}
