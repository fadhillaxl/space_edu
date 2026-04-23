"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

// BLE UUIDs from ESP32 code
const serviceUuid = "cf01f705-728b-4a4a-9db1-cc58ba514f77";
const characteristicUuid = "69db23e0-dd8e-42b7-a342-0193bb9eaf27";
type LegacyWindow = Window & { webkitAudioContext?: typeof AudioContext };
type BleRequestOptions = {
  filters: Array<{ namePrefix: string }>;
  optionalServices: string[];
};
type BleCharacteristic = EventTarget & {
  value: DataView | null;
  startNotifications: () => Promise<void>;
  addEventListener: (type: "characteristicvaluechanged", listener: (event: Event) => void) => void;
};
type BleService = {
  getCharacteristic: (uuid: string) => Promise<BleCharacteristic>;
};
type BleGattServer = {
  connect: () => Promise<BleGattServer>;
  getPrimaryService: (uuid: string) => Promise<BleService>;
};
type BleDevice = EventTarget & {
  gatt?: BleGattServer;
  addEventListener: (type: "gattserverdisconnected", listener: (event: Event) => void) => void;
};
type NavigatorWithBluetooth = Navigator & {
  bluetooth?: {
    requestDevice: (options: BleRequestOptions) => Promise<BleDevice>;
  };
};

export default function BleController() {
  const router = useRouter();
  const [status, setStatus] = useState<"disconnected" | "connecting" | "connected">("disconnected");
  const [lastCommand, setLastCommand] = useState<string>("");
  const reconnectTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const shouldAutoReconnectRef = useRef(false);
  const reconnectingRef = useRef(false);
  const reconnectDelayMs = 3000;

  const clearReconnectTimer = useCallback(() => {
    if (reconnectTimerRef.current) {
      clearTimeout(reconnectTimerRef.current);
      reconnectTimerRef.current = null;
    }
  }, []);

  const triggerAction = useCallback((command: string) => {
    const cmd = command.toLowerCase().trim();
    console.log(`BLE Command Received: ${cmd}`);
    setLastCommand(cmd);

    // Map commands to routes
    if (cmd === "usa") {
      router.push("/usa");
    } else if (cmd === "usa/#tech") {
      router.push("/usa#tech");
    } else if (cmd === "usa/#rs25") {
      router.push("/usa#rs25");
    } else if (cmd === "buran") {
      router.push("/buran");
    } else if (cmd === "buran/#buran-teknologi") {
      router.push("/buran#buran-teknologi");
    } else if (cmd === "buran/#buran-gallery") {
      router.push("/buran#buran-gallery");
    } else if (cmd === "geo") {
      router.push("/geo");
    } else if (cmd === "geo/#satria-specs") {
      router.push("/geo#satria-specs");
    } else if (cmd === "geo/#orbiter-tech") {
      router.push("/geo#orbiter-tech");
    }

    // Play feedback sound (optional, matching index.html)
    try {
      const AudioCtx = window.AudioContext || (window as LegacyWindow).webkitAudioContext;
      if (!AudioCtx) return;
      const audioCtx = new AudioCtx();
      if (audioCtx.state !== "running") audioCtx.resume();
      const oscillator = audioCtx.createOscillator();
      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(880, audioCtx.currentTime);
      oscillator.connect(audioCtx.destination);
      oscillator.start();
      oscillator.stop(audioCtx.currentTime + 0.1);
    } catch {
      // Audio context might be blocked or not supported
    }
  }, [router]);

  const handleCharacteristicValueChanged = useCallback((event: Event) => {
    const characteristic = event.target as BleCharacteristic | null;
    if (!characteristic?.value) return;
    const value = new TextDecoder().decode(characteristic.value);
    triggerAction(value);
  }, [triggerAction]);

  const connectToDevice = useCallback(async (bleDevice: BleDevice, isReconnect = false) => {
    try {
      setStatus("connecting");

      if (!bleDevice?.gatt) throw new Error("GATT not available");
      const server = await bleDevice.gatt.connect();
      if (!server) throw new Error("GATT server not found");

      const service = await server.getPrimaryService(serviceUuid);
      const characteristic = await service.getCharacteristic(characteristicUuid);

      await characteristic.startNotifications();
      characteristic.addEventListener("characteristicvaluechanged", handleCharacteristicValueChanged);

      setStatus("connected");
      reconnectingRef.current = false;
      clearReconnectTimer();
      console.log(isReconnect ? "BLE reconnected successfully!" : "BLE Connected successfully!");
      return true;
    } catch (error) {
      console.error(isReconnect ? "BLE reconnect error:" : "BLE connection error:", error);
      setStatus("disconnected");
      return false;
    }
  }, [clearReconnectTimer, handleCharacteristicValueChanged]);

  const scheduleReconnect = useCallback((bleDevice: BleDevice) => {
    if (!shouldAutoReconnectRef.current || reconnectingRef.current) return;
    reconnectingRef.current = true;

    const attemptReconnect = async () => {
      if (!shouldAutoReconnectRef.current) {
        reconnectingRef.current = false;
        return;
      }

      const ok = await connectToDevice(bleDevice, true);
      if (!ok) {
        reconnectTimerRef.current = setTimeout(attemptReconnect, reconnectDelayMs);
      }
    };

    reconnectTimerRef.current = setTimeout(attemptReconnect, reconnectDelayMs);
  }, [connectToDevice]);

  const handleDisconnect = useCallback((event: Event) => {
    const disconnectedDevice = event.target as BleDevice | null;
    console.log("BLE Device disconnected");
    setStatus("disconnected");
    if (disconnectedDevice) scheduleReconnect(disconnectedDevice);
  }, [scheduleReconnect]);

  const connectBluetooth = async () => {
    try {
      const nav = navigator as NavigatorWithBluetooth;
      if (!nav.bluetooth) {
        alert("Web Bluetooth API not supported in this browser.");
        return;
      }

      console.log("Requesting BLE device...");
      const bleDevice = await nav.bluetooth.requestDevice({
        filters: [{ namePrefix: "ESP32" }],
        optionalServices: [serviceUuid],
      });

      shouldAutoReconnectRef.current = true;
      clearReconnectTimer();
      bleDevice.addEventListener("gattserverdisconnected", handleDisconnect);
      await connectToDevice(bleDevice);
    } catch (error) {
      console.error("BLE connection error:", error);
      setStatus("disconnected");
    }
  };

  useEffect(() => {
    return () => {
      shouldAutoReconnectRef.current = false;
      clearReconnectTimer();
    };
  }, [clearReconnectTimer]);

  // UI state for button
  const statusColor = status === "connected" ? "bg-emerald-500 shadow-emerald-500/50" : status === "connecting" ? "bg-amber-500 shadow-amber-500/50" : "bg-slate-500/50 shadow-transparent";
  const statusText = status === "connected" ? "ESP32 Active" : status === "connecting" ? "Connecting..." : "Connect ESP32";

  return (
    <div className="flex items-center gap-3">
      {status === "connected" && lastCommand && (
        <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/30 px-2 py-0.5 rounded border border-cyan-800/50 animate-pulse">
          LAST: {lastCommand.toUpperCase()}
        </span>
      )}
      <button
        onClick={connectBluetooth}
        disabled={status === "connecting" || status === "connected"}
        className={`group relative flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 transition-all duration-300 hover:border-white/25 active:scale-95 ${
          status === "connected" ? "bg-emerald-950/20 text-emerald-100 cursor-default" : "bg-white/5 text-white/80 hover:bg-white/10"
        }`}
      >
        <span className={`w-2 h-2 rounded-full shadow-[0_0_8px] transition-all duration-500 ${statusColor}`} />
        <span className="text-xs font-semibold tracking-wide">
          {statusText}
        </span>
        {status === "disconnected" && (
          <div className="absolute inset-0 rounded-full bg-cyan-400 opacity-0 group-hover:opacity-10 transition-opacity" />
        )}
      </button>
    </div>
  );
}
