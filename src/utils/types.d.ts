import { Role } from 'src/auth/enums';

declare module 'express-session' {
  interface SessionData {
    user: {
      userId: string;
      username: string;
      roles: [Role];
    };
  }
}

declare module 'express' {
  interface Request {
    user: {
      userId: string;
      username: string;
      roles: [Role];
    };
  }
}
