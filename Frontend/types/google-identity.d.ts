interface GoogleCredentialResponse {
  credential: string;
}

type GoogleCallback = (response: GoogleCredentialResponse) => void;

interface GoogleAccountsId {
  initialize(config: {
    client_id: string;
    callback: GoogleCallback;
    auto_select?: boolean;
    ux_mode?: 'popup' | 'redirect';
  }): void;
  renderButton(
    parent: HTMLElement,
    options: {
      theme?: 'outline' | 'filled_blue' | 'filled_black';
      size?: 'large' | 'medium' | 'small';
      text?: 'signin_with' | 'signup_with' | 'continue_with' | 'signin';
      shape?: 'pill' | 'rectangular' | 'circle' | 'square';
      width?: number;
      logo_alignment?: 'left' | 'center';
    },
  ): void;
  prompt(): void;
}

interface GoogleAccounts {
  id: GoogleAccountsId;
}

interface GoogleGlobal {
  accounts: GoogleAccounts;
}

interface Window {
  google?: GoogleGlobal;
}
