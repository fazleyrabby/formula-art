export interface SandboxExecuteMessage {
  type: 'EXECUTE';
  code: string;
  params: Record<string, any>;
  width: number;
  height: number;
}

export interface SandboxResizeMessage {
  type: 'RESIZE';
  width: number;
  height: number;
  dpr: number;
}

export interface SandboxStatusMessage {
  type: 'STATUS';
  fps: number;
  hasError: boolean;
  error?: string;
}

export interface SandboxReadyMessage {
  type: 'READY';
}

export type ParentToSandboxMessage = SandboxExecuteMessage | SandboxResizeMessage;
export type SandboxToParentMessage = SandboxStatusMessage | SandboxReadyMessage;
