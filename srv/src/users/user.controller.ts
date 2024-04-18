import { Controller, Get, Logger, Query } from '@nestjs/common';
import { UserService } from './users.service';
import { UsersResponseDto } from './dto/users.response.dto';
import { PageDto, PageOptionsDto } from '../paginate/dto';

@Controller('users')
export class UserController {
  private readonly logger = new Logger(UserController.name);

  constructor(private userService: UserService) {}

  @Get()
  async getAllUsers(@Query() pageOptionsDto: PageOptionsDto): Promise<PageDto<UsersResponseDto>> {
    this.logger.log('Get all users');
    return await this.userService.findAll(pageOptionsDto);
  }
}
