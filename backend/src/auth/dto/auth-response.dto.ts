export class AuthResponseDto {
  user: {
    id: string;
    email: string;
    first_name: string;
    last_name: string;
    role: string;
    status: string;
    title?: string;
    bio?: string;
    address?: string;
    phone_number?: string;
  };
  message: string;
}
