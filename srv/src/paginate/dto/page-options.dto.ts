export enum Order {
  ASC = 'ASC',
  DESC = 'DESC',
}

export class PageOptionsDto {
  readonly order?: Order;
  readonly page?: number;
  readonly take?: number;
  readonly skip?: number;

  constructor(options: PageOptionsDto) {
    this.order = options.order || Order.ASC;
    this.page = +options.page || 1;
    this.take = +options.take || 20;
    this.skip = (this.page - 1) * this.take;
  }
}
