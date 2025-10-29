interface Window {
  google?: {
    search: {
      cse: {
        element: {
          getElement: (id: string) => {
            execute: (query: string) => void;
          } | null;
        };
      };
    };
  };
}
