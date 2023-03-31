export type Args = string[];
export type RawOptions = {
  projectName?: string;
  git: boolean;
  install: boolean;
  skipPrompts: boolean;
  template?: string;
};
export type Options = Omit<RawOptions, "skipPrompts"> & {
  template: string;
};

export type Entity = {
  name: string;
  type: string;
  properties?: Entity[];
};

export type EntityProperties = {
  type: string;
  name: string;
};
