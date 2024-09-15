export interface TDynamicConfig {
  reminder_step_interval?: number;
  powersync_endpoint?: string;
  powersync_audience?: string;
  powersync_jwt_issuer?: string;
  powersync_jwt_expiration_time?: number;
  update_old_reminder?: boolean;
}
