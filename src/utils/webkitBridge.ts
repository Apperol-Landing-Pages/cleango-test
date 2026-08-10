declare global {
  interface Window {
    webkit?: {
      messageHandlers?: {
        appBridge?: {
          postMessage: (message: unknown) => void;
        };
      };
    };
    receiveFromIOS?: (json: string) => void;
  }
}

type IOSMessage = {
  event: string;
  [key: string]: unknown;
};

export function sendToIOS(trigger: string, payload: unknown): void {
  if (typeof window === "undefined") return;
  const message =
    payload === undefined ? { trigger } : { trigger, payload };
  window.webkit?.messageHandlers?.appBridge?.postMessage(message);
}

export function initIOSMessageReceiver(): void {
  if (typeof window === "undefined") return;
  window.receiveFromIOS = (json: string) => {
    try {
      const data = JSON.parse(json) as IOSMessage;
      window.dispatchEvent(new CustomEvent("ios_message", { detail: data }));
    } catch {
      // malformed message from iOS
    }
  };
}
