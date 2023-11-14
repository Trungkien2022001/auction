import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtService {
  private readonly secretKey = 'your-secret-key'; // Thay thế bằng secret key thực tế của bạn

  generateToken(payload: any): string {
    return jwt.sign(payload, this.secretKey, { expiresIn: '1h' }); // Thời gian hết hạn token là 1 giờ
  }

  verifyToken(token: string): any {
    try {
      return jwt.verify(token, this.secretKey);
    } catch (error) {
      return null;
    }
  }
}
