export interface User {
  accessToken: string;
  id: number;
  username: string;
  email: string;
  roles: [
    {
      id: number;
      roleName: string;
    }
  ];
  tokenType: string
}
