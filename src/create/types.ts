export type CreateOptions = {
  projectName?: string;
  git: boolean;
  install: boolean;
  skipPrompts: boolean;
  template?: string;
};

export type Options = Omit<CreateOptions, "skipPrompts"> & {
  template: string;
};
