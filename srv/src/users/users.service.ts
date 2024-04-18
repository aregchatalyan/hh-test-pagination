import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, Logger } from '@nestjs/common';
import { UsersEntity } from './entities/users.entity';
import { Order, PageDto, PageMetaDto, PageOptionsDto } from '../paginate/dto';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    @InjectRepository(UsersEntity)
    private usersRepo: Repository<UsersEntity>,
  ) {}

  // get list of all users
  async findAll(dto: PageOptionsDto): Promise<PageDto<UsersEntity>> {
    const pageOptionsDto = new PageOptionsDto(dto);

    const [result, itemCount] = await this.usersRepo.findAndCount({
      take: pageOptionsDto.take,
      skip: pageOptionsDto.skip,
      order: {
        createdAt: pageOptionsDto.order || Order.ASC,
      },
    });

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    return new PageDto(result, pageMetaDto);
  }
}
