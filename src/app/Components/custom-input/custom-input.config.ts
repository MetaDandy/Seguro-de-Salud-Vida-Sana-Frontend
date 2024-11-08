export interface CustomInputConfig {
  label: string;
  type: string;
  placeholder?: string;
  errorMessages?: {
    [key: string]: string;
  };
}
