/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  UseInterceptors,
  UseFilters,
  ForbiddenException,
  HttpStatus,
  HttpCode,
  // UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
// import { Roles } from './role.decorator';
// import { AuthGuard } from 'src/guards/auth.guard';
import { ValidatePipe } from './../pipes/validate.pipe';
import * as Joi from 'joi';
import { JoiValidationPipe } from 'src/pipes/joi.pipe';
import { ActionLoggingInterceptor } from 'src/interceptors/logging.interceptor';
import { Repository } from 'typeorm';
import { AddFieldFilter } from 'src/filters/test.filter';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('api/v1/auth')
@ApiTags('Auth')
@UseInterceptors(ActionLoggingInterceptor)
// @UseGuards(AuthGuard)
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  
  @Post('/login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get Message' })
  @ApiBody({ required: true, type: LoginDto }) // Your DTO type for request body
  @ApiResponse({
    status: 200,
    description: 'Successful response',
    type: LoginDto, // DTO cho response
  })
  @UseFilters(AddFieldFilter)
  // @UsePipes(new ValidatePipe())
  // @UsePipes(
  //   new JoiValidationPipe(
  //     Joi.object({
  //       username: Joi.string().required(),
  //       password: Joi.string().required(),
  //     }),
  //   ),
  // )
  // @Roles(['admin1'])
  create(@Body() createAuthDto: LoginDto) {
    return this.authService.login(createAuthDto);
    // throw new ForbiddenException();
  }

  @Get()
  findAll() {
    return this.authService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthDto: RegisterDto) {
    return this.authService.update(+id, updateAuthDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
}

