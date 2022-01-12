export type RPCEventListener = () => void;

interface Battery {
  readonly charging: boolean;
  readonly level: number;
  readonly chargingTime: number;
  readonly dischargingTime: number;
  readonly onchargingchange: RPCEventListener;
  readonly onlevelchange: RPCEventListener;
  readonly onchargingtimechange: RPCEventListener;
  readonly ondischargingtimechange: RPCEventListener;
  addEventListener(
    type: 'chargingchange' | 'levelchange' | 'chargingtimechange' | 'dischargingtimechange',
    listener: RPCEventListener
  ): void;
}

interface NavigatorExtended extends Navigator {
  getBattery(): Promise<Battery>;
}

declare global {
  interface Window {
    rpc: {
      on: (event: string, callback: RPCEventListener) => void;
      removeListener: (event: string, callback: RPCEventListener) => void;
      emit: (event: string) => void;
    };
  }
}
