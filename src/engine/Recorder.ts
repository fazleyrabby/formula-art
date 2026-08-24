
export class CanvasRecorder {
  /**
   * Export high-resolution PNG snapshot from current canvas or offline canvas
   */
  public static async exportPNG(
    canvas: HTMLCanvasElement,
    filename = 'math-art.png',
    scale = 1
  ): Promise<void> {
    let targetCanvas = canvas;

    if (scale > 1) {
      // Create high-res offscreen canvas
      const offscreen = document.createElement('canvas');
      offscreen.width = canvas.width * scale;
      offscreen.height = canvas.height * scale;
      const ctx = offscreen.getContext('2d');
      if (ctx) {
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(canvas, 0, 0, offscreen.width, offscreen.height);
        targetCanvas = offscreen;
      }
    }

    return new Promise((resolve, reject) => {
      targetCanvas.toBlob((blob) => {
        if (!blob) {
          reject(new Error('Failed to create image blob'));
          return;
        }
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.download = filename;
        link.href = url;
        link.click();
        URL.revokeObjectURL(url);
        resolve();
      }, 'image/png');
    });
  }

  /**
   * Record seamless video clip using MediaRecorder and canvas stream
   */
  public static async recordVideo(
    canvas: HTMLCanvasElement,
    durationMs = 5000,
    fps = 60,
    filename = 'math-art.webm',
    onProgress?: (percent: number) => void
  ): Promise<void> {
    if (!('captureStream' in canvas)) {
      throw new Error('Canvas captureStream is not supported in this browser');
    }

    const stream = (canvas as any).captureStream(fps);
    const mimeTypes = [
      'video/webm;codecs=vp9',
      'video/webm;codecs=vp8',
      'video/webm',
    ];
    
    let selectedMimeType = '';
    for (const mime of mimeTypes) {
      if (MediaRecorder.isTypeSupported(mime)) {
        selectedMimeType = mime;
        break;
      }
    }

    if (!selectedMimeType) {
      throw new Error('No supported WebM mime type found');
    }

    const recorder = new MediaRecorder(stream, {
      mimeType: selectedMimeType,
      videoBitsPerSecond: 10000000, // 10 Mbps for crisp quality
    });

    const chunks: Blob[] = [];
    recorder.ondataavailable = (e) => {
      if (e.data.size > 0) chunks.push(e.data);
    };

    return new Promise((resolve, reject) => {
      const startTime = Date.now();
      const progressInterval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const percent = Math.min(100, Math.floor((elapsed / durationMs) * 100));
        if (onProgress) onProgress(percent);
      }, 100);

      recorder.onstop = () => {
        clearInterval(progressInterval);
        const blob = new Blob(chunks, { type: selectedMimeType });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.download = filename;
        link.href = url;
        link.click();
        URL.revokeObjectURL(url);
        resolve();
      };

      recorder.onerror = (e) => {
        clearInterval(progressInterval);
        reject(e);
      };

      recorder.start();
      setTimeout(() => {
        recorder.stop();
      }, durationMs);
    });
  }
}
