/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UseFilters,
  HttpStatus,
  HttpCode,
  // UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { DatabaseLoggingInterceptor } from '../core/interceptors';

@Controller('v1/auth')
@ApiTags('Auth')

// @UseGuards(AuthGuard)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @UseInterceptors(DatabaseLoggingInterceptor)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get Message' })
  @ApiBody({ required: true, type: LoginDto }) // Your DTO type for request body
  @ApiResponse({
    status: 200,
    description: 'Successful response',
    type: LoginDto, // DTO cho response
  })
  create(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
    // throw new ForbiddenException();
  }
}
