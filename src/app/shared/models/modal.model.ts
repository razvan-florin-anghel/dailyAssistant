export class Modal {
  header?: { title: string };
  body?: { text: string };
  buttons?: {
    yes?: { enabled?: boolean; text?: string };
    close?: { enabled?: boolean; text?: string };
  };
  payload?: any;
}
