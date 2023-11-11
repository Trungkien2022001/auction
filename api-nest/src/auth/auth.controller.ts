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

@Controller('api/v1/auth')
@UseInterceptors(ActionLoggingInterceptor)
// @UseGuards(AuthGuard)
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  
  @Post('/login')
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

